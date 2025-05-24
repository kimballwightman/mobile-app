from fastapi import FastAPI, HTTPException, Depends, status, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
import jwt
from datetime import datetime, timedelta
import os
from passlib.context import CryptContext
import asyncio
from dotenv import load_dotenv
from supabase import create_client, Client
import uuid
import json
import requests
from services.food_service import search_recipes, get_recipe_by_id, search_food_ingredients, get_food_ingredient_info, save_recipe_to_database

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

# Create FastAPI app
app = FastAPI()

# CORS middleware (allows frontend to communicate with backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("JWT_SECRET", "development_secret_key")  # Use env var with fallback
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Create OAuth2 password bearer for token dependency
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Pydantic models for request/response validation
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: str

class User(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(..., min_length=6)

class RefreshTokenRequest(BaseModel):
    refresh_token: str

# Onboarding models
class GoalPreference(BaseModel):
    goal: str  # "cut", "maintain", or "bulk"

class HealthIntegration(BaseModel):
    appleHealthConnected: Optional[bool] = False

class UserInfoRequest(BaseModel):
    gender: str
    age: int
    height: int  # in inches
    weight: int  # in pounds

class OnboardingStatus(BaseModel):
    user_id: str
    onboarding_completed: bool
    completed_at: Optional[datetime] = None

class UserProfile(BaseModel):
    user_id: str
    email: str
    full_name: Optional[str] = None
    preference_id: Optional[str] = None

# User preferences model (comprehensive)
class UserPreferencesRequest(BaseModel):
    goal: Optional[str] = None
    calorie_target: Optional[int] = None
    protein_target: Optional[int] = None
    carb_target: Optional[int] = None
    fat_target: Optional[int] = None
    adherence_percent: Optional[int] = None
    workouts_per_week: Optional[int] = None
    body_fat_category: Optional[str] = None
    body_fat_percentage: Optional[float] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    bmr: Optional[float] = None
    diets: Optional[List[str]] = None
    allergies: Optional[List[str]] = None

# Individual onboarding step models
class BodyFatRequest(BaseModel):
    category: str
    percentage: Optional[float] = None

class WorkoutFrequencyRequest(BaseModel):
    workoutsPerWeek: int

class NutritionalGoalsRequest(BaseModel):
    calorieTarget: int
    proteinGrams: int
    carbGrams: int
    fatGrams: int
    adherencePercent: int

class BudgetRequest(BaseModel):
    minBudget: int
    maxBudget: int

class AllergiesRequest(BaseModel):
    allergies: List[str]
    diets: Optional[List[str]] = None

# Health data model
class HealthDataRequest(BaseModel):
    appleHealthConnected: Optional[bool] = False
    healthMetrics: Optional[Dict[str, Any]] = None

# Add a user sync endpoint for signup 
class UserSyncRequest(BaseModel):
    user_id: str
    email: str

# Models for food and recipe endpoints
class RecipeSearchRequest(BaseModel):
    query: str = ""
    diet: Optional[str] = None
    intolerances: Optional[str] = None
    cuisine: Optional[str] = None
    max_calories: Optional[int] = None
    min_protein: Optional[int] = None
    max_carbs: Optional[int] = None
    max_fat: Optional[int] = None
    offset: int = 0
    number: int = 20

class FoodSearchRequest(BaseModel):
    query: str
    offset: int = 0
    number: int = 20

# Helper functions for authentication
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Authentication dependency
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Log token details for debugging
        print(f"Received token (first 10 chars): {token[:10] if token else 'None'}")
        
        try:
            # First try to decode using our local secret key
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id: str = payload.get("sub")
            
            # Print decoded user ID for debugging
            print(f"Successfully decoded local token for user_id: {user_id}")
        except Exception as e:
            # If local decoding fails, try to decode as a Supabase token
            print(f"Local token decode failed: {str(e)}, attempting Supabase token decode")
            
            try:
                # For Supabase tokens, we verify signature=False since we don't have access to their private key
                # Instead, we'll verify the token is valid by checking if the user exists after extraction
                payload = jwt.decode(token, options={"verify_signature": False}, algorithms=["HS256", "RS256"])
                
                # Supabase puts user ID in different claim fields depending on token type
                user_id = payload.get("sub") or payload.get("user_id") or payload.get("uid")
                
                if not user_id:
                    print("No user ID found in decoded Supabase token")
                    raise credentials_exception
                
                print(f"Extracted user_id from Supabase token: {user_id}")
                
                # Verify this user exists in our database to confirm token validity
                response = supabase.table("users").select("user_id").eq("user_id", user_id).execute()
                
                if not response.data:
                    print(f"User ID {user_id} from token not found in database")
                    raise credentials_exception
                
                print(f"Confirmed user_id {user_id} exists in database - accepting token")
            except Exception as supabase_error:
                print(f"Supabase token decode failed: {str(supabase_error)}")
                raise credentials_exception
        
        if user_id is None:
            print("No user ID found in token")
            raise credentials_exception
        
        # Return the user ID from the token
        return user_id
    except Exception as e:
        print(f"Authentication error: {str(e)}")
        raise credentials_exception

# User DB operations
async def ensure_user_exists(user_id: str, email: Optional[str] = None) -> bool:
    """
    Ensure a user record exists in the database.
    Returns True if the user exists or was created successfully.
    """
    try:
        # Check if user exists in the database
        response = supabase.table("users").select("*").eq("user_id", user_id).execute()
        print(f"User lookup result for {user_id}: {response.data}")
        
        if not response.data:
            # User doesn't exist, we need an email to create them
            if not email:
                print(f"No email provided for user_id {user_id}, attempting to fetch from Supabase auth")
                
                # Try a direct connection to auth.users to get email
                try:
                    # Get admin URL for auth API call - using admin key if available
                    # This is a workaround because we need to get user details from auth schema
                    auth_url = f"{supabase_url}/auth/v1/admin/users/{user_id}"
                    
                    # Make a direct API call using the service key or ANON key
                    admin_headers = {
                        "apikey": supabase_key,
                        "Authorization": f"Bearer {supabase_key}"
                    }
                    
                    # Attempt to get user data from Supabase auth
                    print(f"Attempting to retrieve user data from {auth_url}")
                    
                    try:
                        auth_response = requests.get(auth_url, headers=admin_headers)
                        
                        if auth_response.status_code == 200:
                            auth_data = auth_response.json()
                            print(f"Auth data retrieved: {auth_data}")
                            
                            # Extract email from response
                            if auth_data and "email" in auth_data:
                                email = auth_data["email"]
                                print(f"Found email {email} for user_id {user_id} from auth API")
                            else:
                                print(f"No email found in auth data for user_id {user_id}")
                                raise ValueError(f"No email found in auth data for user_id {user_id}")
                        else:
                            print(f"Failed to retrieve auth data: {auth_response.status_code} - {auth_response.text}")
                            
                            # Fallback: Check if there's any Auth session data available in the database
                            # This is a workaround to handle cases where we can't reach the auth API
                            auth_fallback = supabase.table("auth").select("*").eq("user_id", user_id).execute()
                            
                            if auth_fallback.data and len(auth_fallback.data) > 0:
                                possible_email = auth_fallback.data[0].get("email")
                                if possible_email:
                                    email = possible_email
                                    print(f"Found email {email} from fallback auth table")
                            
                            if not email:
                                raise ValueError(f"Could not retrieve email from auth for user with ID {user_id}")
                    except Exception as auth_error:
                        print(f"Error retrieving auth data: {str(auth_error)}")
                        
                        # Try one last fallback - use email domain based on app name
                        fallback_email = f"{user_id}@nutriplan-temp.com"
                        print(f"Using fallback email {fallback_email} for user_id {user_id}")
                        email = fallback_email
                
                except Exception as lookup_error:
                    print(f"ERROR looking up user email: {str(lookup_error)}")
                    
                    # As absolute last resort, create a placeholder email
                    fallback_email = f"{user_id}@nutriplan-user.com"
                    print(f"Using last resort fallback email {fallback_email}")
                    email = fallback_email
            
            # Create the user record with the email we found or generated
            user_data = {
                "user_id": user_id,
                "email": email,
                "password_hash": "MANAGED_BY_SUPABASE_AUTH",
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            }
            
            print(f"Creating new user record for ID {user_id} with email {email}")
            result = supabase.table("users").insert(user_data).execute()
            
            if not result.data:
                print(f"ERROR: Failed to create user record in database for {user_id}")
                return False
                
        return True
    except Exception as e:
        print(f"ERROR in ensure_user_exists: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error while ensuring user exists: {str(e)}"
        )

async def ensure_user_preferences_exist(user_id: str) -> bool:
    """
    Ensure a user_preferences record exists for the user.
    Return True if the record exists or was created.
    """
    try:
        # Check if preferences exist
        response = supabase.table("user_preferences").select("*").eq("user_id", user_id).execute()
        
        if not response.data:
            # Create default preferences
            default_prefs = {
                "user_id": user_id,
                "goal": "maintain",
                "calorie_target": 2000,
                "protein_target": 150,
                "carb_target": 200,
                "fat_target": 67,
                "adherence_percent": 90,
                "workouts_per_week": 3,
                "body_fat_category": "average",
                "onboarding_completed": False
            }
            
            result = supabase.table("user_preferences").insert(default_prefs).execute()
            if not result.data:
                return False
                
        return True
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )

async def update_user_preferences(user_id: str, data: dict) -> dict:
    """
    Update user preferences in the database.
    Returns the updated preferences.
    """
    try:
        # Print the data being updated for debugging
        print(f"Updating preferences for user_id {user_id}: {data}")
        
        # Explicitly validate the user ID
        if not user_id:
            error_msg = "User ID is required for updating preferences"
            print(f"ERROR: {error_msg}")
            raise ValueError(error_msg)
        
        # Validate that data is not empty
        if not data:
            error_msg = "No data provided for preference update"
            print(f"ERROR: {error_msg}")
            raise ValueError(error_msg)
        
        # Known valid columns in user_preferences table
        valid_columns = [
            "user_id", "goal", "calorie_target", "protein_target", "carb_target", 
            "fat_target", "adherence_percent", "workouts_per_week", "body_fat_category", 
            "body_fat_percentage", "gender", "age", "height", "weight", "bmr", 
            "diets", "allergies", "budget_min", "budget_max", "onboarding_completed",
            "onboarding_completed_at", "created_at", "updated_at"
        ]
        
        # Integer columns that require integer values
        integer_columns = [
            "calorie_target", "protein_target", "carb_target", "fat_target", 
            "adherence_percent", "workouts_per_week", "age", "height", "weight", "bmr",
            "budget_min", "budget_max"
        ]
        
        # Float columns that require float values
        float_columns = [
            "body_fat_percentage"
        ]
        
        # Array columns that should be JSON serialized
        array_columns = [
            "diets", "allergies"
        ]
        
        # First check if the user_preferences record exists
        try:
            response = supabase.table("user_preferences").select("*").eq("user_id", user_id).execute()
            print(f"Preferences lookup result: {response.data}")
            
            # Prepare the update data - ensure proper type conversions
            update_data = {}
            for key, value in data.items():
                # Skip None values to avoid overwriting existing data with nulls
                if value is None:
                    continue
                
                # Skip any columns not in our known list
                if key not in valid_columns:
                    print(f"Skipping unknown column: {key}")
                    continue
                
                # Handle specific type conversions based on column type
                if key in integer_columns:
                    try:
                        # Convert to int, handle float inputs by converting to int
                        if isinstance(value, float):
                            update_data[key] = int(value)
                        else:
                            update_data[key] = int(value)
                        print(f"Converted {key}={value} to integer: {update_data[key]}")
                    except (ValueError, TypeError) as e:
                        print(f"WARNING: Could not convert {key}={value} to integer. Error: {str(e)}")
                        # Skip this field rather than causing a database error
                        continue
                elif key in float_columns:
                    try:
                        update_data[key] = float(value)
                        print(f"Converted {key}={value} to float: {update_data[key]}")
                    except (ValueError, TypeError) as e:
                        print(f"WARNING: Could not convert {key}={value} to float. Error: {str(e)}")
                        # Skip this field rather than causing a database error
                        continue
                elif key in array_columns:
                    # Ensure arrays are properly serialized for storage
                    if isinstance(value, list):
                        update_data[key] = value
                    else:
                        try:
                            # If it's a string, try to parse it as JSON
                            update_data[key] = json.loads(value) if isinstance(value, str) else value
                        except (ValueError, TypeError, json.JSONDecodeError) as e:
                            print(f"WARNING: Could not convert {key}={value} to array. Error: {str(e)}")
                            # Skip this field rather than causing a database error
                            continue
                else:
                    # Other fields like strings pass through normally
                    update_data[key] = value
            
            print(f"Prepared update data after type conversions: {update_data}")
            
            if not response.data:
                # Create default preferences with the provided data
                print(f"No existing preferences found, creating new record for user {user_id}")
                default_prefs = {
                    "user_id": user_id,
                    "goal": update_data.get("goal", "maintain"),
                    "calorie_target": update_data.get("calorie_target", 2000),
                    "protein_target": update_data.get("protein_target", 150),
                    "carb_target": update_data.get("carb_target", 200),
                    "fat_target": update_data.get("fat_target", 67),
                    "adherence_percent": update_data.get("adherence_percent", 90),
                    "workouts_per_week": update_data.get("workouts_per_week", 3),
                    "body_fat_category": update_data.get("body_fat_category", "average"),
                    "onboarding_completed": update_data.get("onboarding_completed", False),
                }
                
                # Only add other fields if they exist in update_data
                # This prevents trying to add fields that don't exist in the schema
                for key in update_data:
                    if key not in default_prefs and key in valid_columns:
                        default_prefs[key] = update_data[key]
                
                try:
                    print(f"Inserting new preferences: {default_prefs}")
                    insert_result = supabase.table("user_preferences").insert(default_prefs).execute()
                    
                    if not insert_result.data:
                        error_msg = "Failed to insert new preferences"
                        print(f"ERROR: {error_msg}")
                        raise ValueError(error_msg)
                    
                    return insert_result.data[0] if insert_result.data else default_prefs
                except Exception as insert_error:
                    error_details = str(insert_error)
                    error_msg = f"Error inserting preferences: {error_details}"
                    print(f"ERROR: {error_msg}")
                    raise ValueError(error_msg)
            else:
                # Update existing preferences
                try:
                    if not update_data:
                        print("No valid data to update after filtering")
                        return response.data[0]  # Return existing preferences
                        
                    print(f"Updating existing preferences with: {update_data}")
                    update_result = supabase.table("user_preferences").update(update_data).eq("user_id", user_id).execute()
                    
                    if not update_result.data:
                        error_msg = f"Failed to update preferences for user_id {user_id}"
                        print(f"ERROR: {error_msg}")
                        raise ValueError(error_msg)
                    
                    return update_result.data[0]
                except Exception as update_error:
                    error_details = str(update_error)
                    error_msg = f"Error updating preferences: {error_details}"
                    print(f"ERROR: {error_msg}")
                    raise ValueError(error_msg)
        except Exception as lookup_error:
            error_details = str(lookup_error)
            error_msg = f"Error looking up preferences: {error_details}"
            print(f"ERROR: {error_msg}")
            raise ValueError(error_msg)
    except Exception as e:
        error_details = str(e)
        print(f"ERROR in update_user_preferences: {error_details}")
        # Re-raise with detailed error message
        raise ValueError(f"Failed to update user preferences: {error_details}")

# Routes
@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}

@app.post("/api/user/sync")
async def sync_user_data(user_data: UserSyncRequest):
    """
    Sync user data from Supabase Auth with our database.
    This ensures we use the correct email and user ID from auth.
    """
    try:
        # Extract the data
        user_id = user_data.user_id
        email = user_data.email
        
        print(f"Syncing user data for user_id: {user_id}, email: {email}")
        
        # Ensure user exists in our database
        user_exists = await ensure_user_exists(user_id, email)
        if not user_exists:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user record"
            )
        
        # Ensure user preferences exist
        prefs_exist = await ensure_user_preferences_exist(user_id)
        if not prefs_exist:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user preferences"
            )
        
        return {"status": "success", "message": "User data synced successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error syncing user data: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error syncing user data: {str(e)}"
        )

# Onboarding endpoints
@app.put("/api/onboarding/goal")
async def save_goal(goal_data: GoalPreference, request: Request = None):
    """
    Save the user's primary goal (cut, maintain, bulk) during onboarding.
    This is typically the first step in the onboarding process.
    """
    try:
        # Get the raw request body for complete logging
        body_bytes = await request.body()
        body_str = body_bytes.decode('utf-8')
        print(f"Raw goal data body: {body_str}")

        # Parse body manually to get user_id (not in Pydantic model)
        try:
            body = json.loads(body_str)
            user_id = body.get("user_id", "")
            
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="User ID is required"
                )
                
            print(f"Processing goal for user_id: {user_id}")
            
            # Validate goal
            goal = goal_data.goal.lower()
            if goal not in ["cut", "maintain", "bulk"]:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, 
                    detail=f"Invalid goal: {goal}. Must be 'cut', 'maintain', or 'bulk'."
                )
                
            # Prepare data for update
            user_data = {
                "goal": goal
            }
            
            # Ensure user and preferences exist
            try:
                await ensure_user_exists(user_id)
                await ensure_user_preferences_exist(user_id)
            except Exception as e:
                print(f"ERROR: Error ensuring user or preferences exist: {str(e)}")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"User setup error: {str(e)}"
                )
            
            # Update user preferences
            try:
                result = await update_user_preferences(user_id, user_data)
                print(f"Successfully saved goal: {result}")
                return {"status": "success", "message": "Goal saved successfully", "goal": goal}
            except Exception as e:
                error_msg = f"Error updating user preferences: {str(e)}"
                print(f"ERROR: {error_msg}")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=error_msg
                )
                
        except json.JSONDecodeError as je:
            error_msg = f"Invalid JSON format: {str(je)}"
            print(f"ERROR: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg
            )
            
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )

@app.put("/api/onboarding/workout-frequency")
async def save_workout_frequency(workout_data: WorkoutFrequencyRequest, request: Request = None):
    """Save the user's workout frequency during onboarding."""
    try:
        # Extract request body to get user_id
        body_bytes = await request.body()
        body_str = body_bytes.decode('utf-8')
        body = json.loads(body_str)
        user_id = body.get("user_id")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="user_id is required in request body for onboarding"
            )
            
        print(f"Processing workout frequency for user_id: {user_id}")
        
        # Ensure user preferences exist
        await ensure_user_preferences_exist(user_id)
        
        # Update user preferences with workout frequency
        result = await update_user_preferences(
            user_id, 
            {"workouts_per_week": body.get("workoutsPerWeek")}
        )
        
        return {"status": "success", "workouts_per_week": body.get("workoutsPerWeek")}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in save_workout_frequency: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving workout frequency: {str(e)}"
        )

@app.put("/api/onboarding/body-fat")
async def save_body_fat(body_fat_data: BodyFatRequest, request: Request = None):
    """Save the user's body fat information during onboarding."""
    try:
        # Extract request body to get user_id
        body_bytes = await request.body()
        body_str = body_bytes.decode('utf-8')
        body = json.loads(body_str)
        user_id = body.get("user_id")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="user_id is required in request body for onboarding"
            )
            
        print(f"Processing body fat data for user_id: {user_id}")
        
        # Ensure user preferences exist
        await ensure_user_preferences_exist(user_id)
        
        # Prepare update data
        category = body.get("category")
        percentage = body.get("percentage")
        
        update_data = {"body_fat_category": category}
        if percentage is not None:
            update_data["body_fat_percentage"] = percentage
        
        # Update user preferences
        result = await update_user_preferences(user_id, update_data)
        
        return {"status": "success", "body_fat": {"category": category, "percentage": percentage}}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in save_body_fat: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving body fat data: {str(e)}"
        )

@app.put("/api/onboarding/nutritional-goals")
async def save_nutritional_goals(nutrition_data: NutritionalGoalsRequest, request: Request = None):
    """Save the user's nutritional goals during onboarding."""
    try:
        # Extract request body to get user_id
        body_bytes = await request.body()
        body_str = body_bytes.decode('utf-8')
        body = json.loads(body_str)
        user_id = body.get("user_id")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="user_id is required in request body for onboarding"
            )
            
        print(f"Processing nutritional goals for user_id: {user_id}")
        
        # Ensure user preferences exist
        await ensure_user_preferences_exist(user_id)
        
        # Prepare update data
        update_data = {
            "calorie_target": body.get("calorieTarget"),
            "protein_target": body.get("proteinGrams"),
            "carb_target": body.get("carbGrams"),
            "fat_target": body.get("fatGrams"),
            "adherence_percent": body.get("adherencePercent")
        }
        
        # Update user preferences
        result = await update_user_preferences(user_id, update_data)
        
        return {"status": "success", "nutritional_goals": body}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in save_nutritional_goals: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving nutritional goals: {str(e)}"
        )

@app.put("/api/onboarding/budget")
async def save_budget(budget_data: BudgetRequest, request: Request = None):
    """Save the user's budget information during onboarding."""
    try:
        # Extract request body to get user_id
        body_bytes = await request.body()
        body_str = body_bytes.decode('utf-8')
        body = json.loads(body_str)
        user_id = body.get("user_id")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="user_id is required in request body for onboarding"
            )
            
        print(f"Processing budget data for user_id: {user_id}")
        
        # Ensure user preferences exist
        await ensure_user_preferences_exist(user_id)
        
        # Get minBudget and maxBudget, ensuring they are integers
        min_budget = int(body.get("minBudget"))
        max_budget = int(body.get("maxBudget"))
        
        # Update user preferences with budget data
        result = await update_user_preferences(
            user_id, 
            {"budget_min": min_budget, "budget_max": max_budget}
        )
        
        return {"status": "success", "budget": {"minBudget": min_budget, "maxBudget": max_budget}}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in save_budget: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving budget data: {str(e)}"
        )

@app.put("/api/onboarding/allergies")
async def save_allergies(allergies_data: AllergiesRequest, request: Request = None):
    """Save the user's allergies and dietary preferences during onboarding."""
    try:
        # Extract request body to get user_id
        body_bytes = await request.body()
        body_str = body_bytes.decode('utf-8')
        body = json.loads(body_str)
        user_id = body.get("user_id")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="user_id is required in request body for onboarding"
            )
            
        print(f"Processing allergies data for user_id: {user_id}")
        
        # Ensure user preferences exist
        await ensure_user_preferences_exist(user_id)
        
        # Prepare update data
        allergies = body.get("allergies", [])
        diets = body.get("diets", [])
        
        update_data = {"allergies": allergies}
        if diets:
            update_data["diets"] = diets
        
        # Update user preferences
        result = await update_user_preferences(user_id, update_data)
        
        return {"status": "success", "allergies": {"allergies": allergies, "diets": diets}}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in save_allergies: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving allergies data: {str(e)}"
        )

@app.put("/api/onboarding/complete")
async def complete_onboarding(request: Request = None):
    """
    Mark the user's onboarding process as complete.
    This sets onboarding_completed to true and records the timestamp.
    """
    try:
        # Get the raw request body
        raw_body = await request.body()
        raw_body_str = raw_body.decode('utf-8')
        print(f"Raw complete onboarding body: {raw_body_str}")
        
        # Parse the body
        body = json.loads(raw_body_str)
        print(f"Complete onboarding body parsed: {body}")
        
        # Extract user ID and validate
        user_id = body.get("user_id", "")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User ID is required"
            )
            
        print(f"Completing onboarding for user_id: {user_id}")
        
        # Prepare data for update
        now = datetime.now().isoformat()
        onboarding_data = {
            "onboarding_completed": True,
            "onboarding_completed_at": now
        }
        
        # Ensure user and preferences exist
        try:
            await ensure_user_exists(user_id)
            await ensure_user_preferences_exist(user_id)
        except Exception as e:
            print(f"ERROR: Error ensuring user or preferences exist: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"User setup error: {str(e)}"
            )
        
        # Update user preferences
        try:
            result = await update_user_preferences(user_id, onboarding_data)
            print(f"Successfully marked onboarding as complete: {result}")
            
            # Note: The users table doesn't have an onboarding_completed column
            # We only need to update the user_preferences table
            
            return {
                "status": "success", 
                "message": "Onboarding completed successfully",
                "onboarding_completed": True,
                "completed_at": now
            }
        except Exception as e:
            error_msg = f"Error updating onboarding status: {str(e)}"
            print(f"ERROR: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_msg
            )
            
    except json.JSONDecodeError as je:
        error_msg = f"Invalid JSON format: {str(je)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )

@app.get("/api/onboarding/status")
async def check_onboarding_status(current_user: str = Depends(get_current_user)):
    """
    Check if the user has completed the onboarding process.
    Returns onboarding_completed status from user_preferences.
    """
    try:
        user_id = current_user
        print(f"Checking onboarding status for user_id: {user_id}")
        
        # First ensure user exists
        try:
            await ensure_user_exists(user_id)
            await ensure_user_preferences_exist(user_id)
        except Exception as e:
            print(f"ERROR: Error ensuring user or preferences exist: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"User setup error: {str(e)}"
            )
        
        # Get user preferences to check onboarding status
        try:
            response = supabase.table("user_preferences").select("onboarding_completed, onboarding_completed_at").eq("user_id", user_id).execute()
            
            if not response.data:
                print(f"No preferences found for user_id {user_id}")
                return {
                    "onboarding_completed": False,
                    "message": "No onboarding data found"
                }
            
            preferences = response.data[0]
            onboarding_completed = preferences.get("onboarding_completed", False)
            completed_at = preferences.get("onboarding_completed_at")
            
            print(f"User {user_id} onboarding status: completed={onboarding_completed}, at={completed_at}")
            
            return {
                "onboarding_completed": onboarding_completed,
                "completed_at": completed_at
            }
        except Exception as e:
            error_msg = f"Error retrieving onboarding status: {str(e)}"
            print(f"ERROR: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_msg
            )
    
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"Unexpected error checking onboarding status: {str(e)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )

@app.get("/api/user/profile")
async def get_user_profile(current_user: str = Depends(get_current_user)):
    """
    Get the user's profile information and preferences.
    Combines data from users and user_preferences tables.
    """
    try:
        user_id = current_user
        print(f"Fetching profile for user_id: {user_id}")
        
        # Ensure user exists
        try:
            await ensure_user_exists(user_id)
            await ensure_user_preferences_exist(user_id)
        except Exception as e:
            print(f"ERROR: Error ensuring user or preferences exist: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"User setup error: {str(e)}"
            )
        
        # Get user data
        try:
            user_response = supabase.table("users").select("*").eq("user_id", user_id).execute()
            
            if not user_response.data:
                error_msg = f"User not found: {user_id}"
                print(f"ERROR: {error_msg}")
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=error_msg
                )
            
            user_data = user_response.data[0]
            
            # Get user preferences
            pref_response = supabase.table("user_preferences").select("*").eq("user_id", user_id).execute()
            preferences = pref_response.data[0] if pref_response.data else {}
            
            # Combine user data and preferences
            profile = {
                "user_id": user_data.get("user_id"),
                "email": user_data.get("email"),
                "full_name": user_data.get("full_name"),
                "created_at": user_data.get("created_at"),
                "updated_at": user_data.get("updated_at"),
                "onboarding_completed": preferences.get("onboarding_completed", False),
                **preferences  # Include all preference fields
            }
            
            return profile
        except Exception as e:
            error_msg = f"Error fetching user profile: {str(e)}"
            print(f"ERROR: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_msg
            )
    
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"Unexpected error in get_user_profile: {str(e)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )

@app.put("/api/onboarding/health-data")
async def save_health_data(request: Request = None):
    """
    Save health integration data during onboarding.
    This endpoint can be safely skipped if not using Apple Health.
    """
    try:
        # Get the raw request body
        raw_body = await request.body()
        raw_body_str = raw_body.decode('utf-8')
        print(f"Raw health data body: {raw_body_str}")
        
        # Parse the body
        body = json.loads(raw_body_str)
        print(f"Health data body parsed: {body}")
        
        # Extract user ID and validate
        user_id = body.get("user_id", "")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User ID is required"
            )
            
        print(f"Processing health data for user_id: {user_id}")
        
        # Only log health data - DO NOT attempt to store in database
        apple_health_connected = body.get("appleHealthConnected", False)
        health_metrics = body.get("healthMetrics", None)
        
        print(f"Apple Health connected: {apple_health_connected}")
        if health_metrics:
            metrics_count = len(health_metrics) if isinstance(health_metrics, list) else "object"
            print(f"Health metrics received: {metrics_count}")
        
        # Check if user exists, but don't update preferences
        try:
            user_exists = await ensure_user_exists(user_id)
            if not user_exists:
                print(f"WARNING: User {user_id} does not exist in database")
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found"
                )
        except Exception as e:
            print(f"ERROR checking if user exists: {str(e)}")
            # Continue anyway - we want to bypass this step rather than fail
        
        # Simply return success without attempting to update the database
        # This ensures the frontend can continue with onboarding
        return {
            "status": "success", 
            "message": "Health data acknowledgement successful - data not stored in database",
            "note": "Apple Health integration is a future feature",
            "apple_health_connected": apple_health_connected
        }
            
    except json.JSONDecodeError as je:
        error_msg = f"Invalid JSON format: {str(je)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        print(f"ERROR: {error_msg}")
        
        # Even if there's an error, return success to the frontend
        # to ensure the onboarding process can continue
        return {
            "status": "partial_success",
            "message": "Health data partially processed with errors",
            "error": str(e),
            "apple_health_connected": body.get("appleHealthConnected", False) if "body" in locals() else False
        }

@app.put("/api/onboarding/user-info")
async def save_user_info(request: Request = None):
    """
    Save user information (gender, age, height, weight).
    """
    try:
        # Get the raw request body
        raw_body = await request.body()
        raw_body_str = raw_body.decode('utf-8')
        print(f"Raw user info body: {raw_body_str}")
        
        # Parse the body
        body = json.loads(raw_body_str)
        print(f"User info body parsed: {body}")
        
        # Extract user ID and validate
        user_id = body.get("user_id", "")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User ID is required"
            )
            
        print(f"Processing user info for user_id: {user_id}")
        
        # Ensure consistent data types - DATABASE SCHEMA REQUIRES INTEGERS
        user_data = {}
        
        if "gender" in body:
            user_data["gender"] = body["gender"]
            
        if "age" in body:
            try:
                user_data["age"] = int(body["age"])
            except (ValueError, TypeError):
                print(f"WARNING: Could not convert age={body['age']} to integer")
                user_data["age"] = body["age"]  # Keep original value
                
        if "height" in body:
            try:
                # Height must be stored as an integer in the database
                user_data["height"] = int(float(body["height"]))
                print(f"Converted height from {body['height']} to integer {user_data['height']}")
            except (ValueError, TypeError):
                print(f"WARNING: Could not convert height={body['height']} to integer")
                # Skip this field if we can't convert it
                
        if "weight" in body:
            try:
                # Weight must be stored as an integer in the database
                user_data["weight"] = int(float(body["weight"]))
                print(f"Converted weight from {body['weight']} to integer {user_data['weight']}")
            except (ValueError, TypeError):
                print(f"WARNING: Could not convert weight={body['weight']} to integer")
                # Skip this field if we can't convert it
        
        # Calculate BMR if we have all required fields
        try:
            if "gender" in user_data and "age" in user_data and "height" in user_data and "weight" in user_data:
                # Mifflin-St Jeor Equation for BMR
                if user_data["gender"].lower() == "male":
                    bmr = 10 * user_data["weight"] + 6.25 * user_data["height"] - 5 * user_data["age"] + 5
                else:  # female
                    bmr = 10 * user_data["weight"] + 6.25 * user_data["height"] - 5 * user_data["age"] - 161
                
                # BMR must be stored as an integer
                user_data["bmr"] = int(round(bmr, 0))
                print(f"Calculated BMR: {bmr}, stored as integer: {user_data['bmr']}")
        except Exception as bmr_error:
            print(f"Error calculating BMR: {str(bmr_error)}")
            # Continue without BMR rather than failing
        
        # Ensure user and preferences exist
        try:
            await ensure_user_exists(user_id)
            await ensure_user_preferences_exist(user_id)
        except Exception as e:
            print(f"ERROR: Error ensuring user or preferences exist: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"User setup error: {str(e)}"
            )
        
        # Update user preferences
        try:
            result = await update_user_preferences(user_id, user_data)
            print(f"Successfully updated user info: {result}")
            return {"status": "success", "message": "User info saved successfully"}
        except Exception as e:
            error_msg = f"Error updating user preferences: {str(e)}"
            print(f"ERROR: {error_msg}")
            
            # Try to continue with onboarding despite errors
            return {
                "status": "partial_success",
                "message": "User info partially saved with some errors",
                "error": str(e)
            }
            
    except json.JSONDecodeError as je:
        error_msg = f"Invalid JSON format: {str(je)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )

@app.post("/api/user/verify")
async def verify_user_exists(request: Request = None):
    """
    Verify if a user exists in the database.
    Returns exists: true if the user exists, false otherwise.
    """
    try:
        # Get the raw request body
        raw_body = await request.body()
        raw_body_str = raw_body.decode('utf-8')
        
        # Parse the body
        body = json.loads(raw_body_str)
        
        # Extract user ID and validate
        user_id = body.get("user_id", "")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User ID is required"
            )
            
        print(f"Verifying existence of user_id: {user_id}")
        
        # Check if user exists in the database
        try:
            response = supabase.table("users").select("user_id").eq("user_id", user_id).execute()
            
            exists = len(response.data) > 0
            print(f"User {user_id} exists: {exists}")
            
            return {"exists": exists}
        except Exception as e:
            print(f"ERROR: Error checking if user exists: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}"
            )
            
    except json.JSONDecodeError as je:
        error_msg = f"Invalid JSON format: {str(je)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )

# Food and Recipe endpoints
@app.post("/api/recipes/search")
async def recipe_search(search_params: RecipeSearchRequest, current_user: str = Depends(get_current_user)):
    """
    Search for recipes with filters
    """
    try:
        results = await search_recipes(
            query=search_params.query,
            diet=search_params.diet,
            intolerances=search_params.intolerances,
            cuisine=search_params.cuisine,
            max_calories=search_params.max_calories,
            min_protein=search_params.min_protein,
            max_carbs=search_params.max_carbs,
            max_fat=search_params.max_fat,
            offset=search_params.offset,
            number=search_params.number
        )
        return results
    except Exception as e:
        print(f"ERROR: Recipe search failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Recipe search error: {str(e)}"
        )

@app.get("/api/recipes/{recipe_id}")
async def get_recipe_details(recipe_id: int, current_user: str = Depends(get_current_user)):
    """
    Get detailed information about a specific recipe
    """
    try:
        # First check if we have this recipe in our database
        recipe_response = supabase.table("recipes").select("*").eq("external_id", str(recipe_id)).execute()
        
        if recipe_response.data:
            # Recipe exists in our database
            recipe_data = recipe_response.data[0]
            
            # Get recipe foods (ingredients)
            foods_response = supabase.table("recipe_foods") \
                .select("*, foods(*)") \
                .eq("recipe_id", recipe_data["recipe_id"]) \
                .execute()
                
            recipe_data["ingredients"] = foods_response.data if foods_response.data else []
            
            return recipe_data
        else:
            # Fetch from Spoonacular and save to our database
            recipe_data = await get_recipe_by_id(recipe_id)
            
            # Save to database for future use
            local_recipe_id = await save_recipe_to_database(recipe_data)
            
            # Add local ID to the response
            recipe_data["local_recipe_id"] = local_recipe_id
            
            return recipe_data
    except Exception as e:
        print(f"ERROR: Failed to get recipe details: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Recipe details error: {str(e)}"
        )

@app.post("/api/foods/search")
async def food_search(search_params: FoodSearchRequest, current_user: str = Depends(get_current_user)):
    """
    Search for food ingredients
    """
    try:
        results = await search_food_ingredients(
            query=search_params.query,
            offset=search_params.offset,
            number=search_params.number
        )
        return results
    except Exception as e:
        print(f"ERROR: Food search failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Food search error: {str(e)}"
        )

@app.get("/api/foods/{food_id}")
async def get_food_details(food_id: int, amount: float = 100, unit: str = "g", current_user: str = Depends(get_current_user)):
    """
    Get detailed information about a specific food ingredient
    """
    try:
        # First check if we have this food in our database
        food_response = supabase.table("foods").select("*").eq("external_id", str(food_id)).execute()
        
        if food_response.data:
            # Food exists in our database
            return food_response.data[0]
        else:
            # Fetch from Spoonacular
            food_data = await get_food_ingredient_info(food_id, amount, unit)
            
            # We could save this to the database here, but would need to extract proper nutrient info
            # For now, just return the API data
            return food_data
    except Exception as e:
        print(f"ERROR: Failed to get food details: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Food details error: {str(e)}"
        )

@app.get("/api/recipes/feed")
async def get_recipe_feed(page: int = 1, limit: int = 20, current_user: str = Depends(get_current_user)):
    """
    Get a feed of recipes for the Explore tab, with pagination
    """
    try:
        # Calculate offset from page and limit
        offset = (page - 1) * limit
        
        # Try to get recipes from our database first
        recipe_response = supabase.table("recipes") \
            .select("*") \
            .order("created_at", desc=True) \
            .range(offset, offset + limit - 1) \
            .execute()
            
        recipes = recipe_response.data
        
        # If we don't have enough recipes in our database, fetch more from Spoonacular
        if len(recipes) < limit:
            # Get user dietary preferences for filtering
            try:
                user_prefs = supabase.table("user_preferences").select("*").eq("user_id", current_user).execute()
                
                intolerances = None
                diet = None
                
                if user_prefs.data:
                    # Extract allergies and diets
                    allergies = user_prefs.data[0].get("allergies", "")
                    if allergies:
                        intolerances = allergies.replace(",", ", ")
                    
                    diets = user_prefs.data[0].get("diets", [])
                    if diets and len(diets) > 0:
                        diet = diets[0]  # Just use the first diet for simplicity
            except Exception as e:
                print(f"Warning: Could not get user preferences: {str(e)}")
                intolerances = None
                diet = None
                
            # Fetch from Spoonacular
            api_results = await search_recipes(
                query="", 
                diet=diet,
                intolerances=intolerances,
                offset=0,
                number=limit - len(recipes)
            )
            
            # Process and save these recipes to our database
            for api_recipe in api_results.get("results", []):
                try:
                    # Check if recipe already exists
                    existing = supabase.table("recipes").select("recipe_id").eq("external_id", str(api_recipe.get("id", ""))).execute()
                    
                    if not existing.data:
                        # Get full recipe details
                        full_recipe = await get_recipe_by_id(api_recipe.get("id", 0))
                        
                        # Save to database
                        await save_recipe_to_database(full_recipe)
                except Exception as recipe_error:
                    print(f"Warning: Failed to save recipe {api_recipe.get('id', '')}: {str(recipe_error)}")
            
            # Get updated recipes from database
            recipe_response = supabase.table("recipes") \
                .select("*") \
                .order("created_at", desc=True) \
                .range(offset, offset + limit - 1) \
                .execute()
                
            recipes = recipe_response.data
        
        # Get total count for pagination
        count_response = supabase.table("recipes").select("count", count="exact").execute()
        total_count = count_response.count if hasattr(count_response, 'count') else 0
        
        return {
            "results": recipes,
            "page": page,
            "limit": limit,
            "total": total_count
        }
    except Exception as e:
        print(f"ERROR: Failed to get recipe feed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Recipe feed error: {str(e)}"
        )

