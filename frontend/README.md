# Mobile App Frontend

This is the frontend for the mobile nutrition and fitness app.

## Using the Spoonacular API in the Frontend

The backend provides several endpoints to access food and recipe data from Spoonacular. Here are examples of how to use them in your frontend code:

### 1. Searching for Recipes

```typescript
// Example function to search for recipes
async function searchRecipes(query: string, options: any = {}) {
  const queryParams = new URLSearchParams({
    query,
    offset: options.offset || '0',
    limit: options.limit || '20',
    ...(options.diet && { diet: options.diet }),
    ...(options.maxCalories && { maxCalories: options.maxCalories.toString() }),
    ...(options.minProtein && { minProtein: options.minProtein.toString() }),
    ...(options.cuisine && { cuisine: options.cuisine }),
  });

  const response = await fetch(`/api/food/recipes/search?${queryParams.toString()}`);
  return await response.json();
}

// Usage example
const recipes = await searchRecipes('pasta', { 
  diet: 'vegetarian',
  maxCalories: 800,
  minProtein: 15
});
```

### 2. Getting Recipe Details

```typescript
// Example function to get recipe details
async function getRecipeDetails(recipeId: string) {
  const response = await fetch(`/api/food/recipes/${recipeId}`);
  return await response.json();
}

// Usage example
const recipeDetails = await getRecipeDetails('716429');
```

### 3. Searching for Ingredients

```typescript
// Example function to search for ingredients
async function searchIngredients(query: string, options: any = {}) {
  const queryParams = new URLSearchParams({
    query,
    offset: options.offset || '0',
    limit: options.limit || '20',
  });

  const response = await fetch(`/api/food/ingredients/search?${queryParams.toString()}`);
  return await response.json();
}

// Usage example
const ingredients = await searchIngredients('apple');
```

### 4. Getting Ingredient Details

```typescript
// Example function to get ingredient details
async function getIngredientDetails(ingredientId: string) {
  const response = await fetch(`/api/food/ingredients/${ingredientId}`);
  return await response.json();
}

// Usage example
const ingredientDetails = await getIngredientDetails('11297');
```

### 5. Food Search Component Example

Here's an example React component for searching foods:

```tsx
import React, { useState, useEffect } from 'react';

interface Food {
  id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
}

const FoodSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchFood = async () => {
      if (!query || query.length < 2) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/api/food/recipes/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setFoods(data.results || []);
      } catch (error) {
        console.error('Error searching for food:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchFood, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div>
      <h2>Food Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for food..."
      />

      {loading && <p>Loading...</p>}

      <div className="food-list">
        {foods.map((food) => (
          <div key={food.id} className="food-item">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>Calories: {food.calories}</p>
            <p>Protein: {food.protein}g</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSearch;
```

## Recipe Feed Component Example

Here's an example of a recipe feed component:

```tsx
import React, { useState, useEffect } from 'react';

interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  calories: number;
  protein: number;
}

const RecipeFeed: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadRecipes = async (reset = false) => {
    setLoading(true);
    try {
      const newPage = reset ? 0 : page;
      const response = await fetch(`/api/food/recipes/feed?offset=${newPage * 20}&limit=20`);
      const data = await response.json();
      
      if (reset) {
        setRecipes(data.results || []);
      } else {
        setRecipes(prev => [...prev, ...(data.results || [])]);
      }
      
      setHasMore((data.results || []).length === 20);
      setPage(reset ? 1 : newPage + 1);
    } catch (error) {
      console.error('Error loading recipe feed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes(true);
  }, []);

  return (
    <div>
      <h2>Recipe Feed</h2>
      
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <div className="recipe-meta">
              <span>{recipe.readyInMinutes} min</span>
              <span>{recipe.servings} servings</span>
            </div>
            <div className="recipe-nutrition">
              <span>{recipe.calories} cal</span>
              <span>{recipe.protein}g protein</span>
            </div>
          </div>
        ))}
      </div>
      
      {loading && <p>Loading more recipes...</p>}
      
      {hasMore && !loading && (
        <button onClick={() => loadRecipes(false)}>Load More</button>
      )}
    </div>
  );
};

export default RecipeFeed;
```

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
