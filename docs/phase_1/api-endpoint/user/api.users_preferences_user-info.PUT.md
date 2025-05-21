---
type: endpoint
id: endpoint.api.users_preferences_user-info.PUT
protocol: REST
description: |
  Updates the user's demographic and physical information (gender, age, height, weight, activity level) as part of onboarding or settings management. This data is essential for:
  1. Calculating the user's Basal Metabolic Rate (BMR) and total daily energy expenditure
  2. Personalizing meal recommendations based on caloric needs
  3. Tailoring workout suggestions based on physical attributes
  4. Auto-filling additional screens if data is sourced from Apple Health

request:
  headers:
    - name: Content-Type
      value: application/json
    - name: Authorization
      value: Bearer <token>

rest:
  path: /api/users/preferences/user-info
  method: PUT
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
      description: "Unique identifier for the user"
    - name: gender
      type: string
      required: true
      example: "female"
      description: "User's gender identity, used for BMR calculations"
    - name: age
      type: integer
      required: true
      example: 30
      description: "User's age in years, used for BMR calculations"
    - name: height_cm
      type: number
      required: true
      example: 170
      description: "User's height in centimeters, used for BMR calculations"
    - name: weight_kg
      type: number
      required: true
      example: 65
      description: "User's weight in kilograms, used for BMR calculations"
    - name: activity_level
      type: string
      required: true
      example: "moderate"
      description: "User's activity level (sedentary, light, moderate, very active, extremely active)"
    - name: data_source
      type: string
      required: false
      example: "apple_health"
      description: "Source of the user information data if imported from external service"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: User info updated successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: gender
        type: string
        example: "female"
      - name: age
        type: integer
        example: 30
      - name: height_cm
        type: number
        example: 170
      - name: weight_kg
        type: number
        example: 65
      - name: activity_level
        type: string
        example: "moderate"
      - name: estimated_bmr
        type: number
        example: 1456
        description: "Calculated Basal Metabolic Rate based on user info"
      - name: estimated_tdee
        type: number
        example: 2184
        description: "Calculated Total Daily Energy Expenditure based on user info and activity level"
  - status: 400
    description: Invalid request or missing parameters.
    body:
      - name: error
        type: string
        example: "Missing user_id."

related:
  feature:
    - feature.onboarding_flow
    - feature.settings_management
  event:
    - event.complete_onboarding
    - event.select_gender
    - event.select_age
    - event.select_height
    - event.select_weight
  screen:
    - screen.complete_onboarding
    - screen.user_info
    - screen.connect_to_apple_health
  component:
    - component.next_screen_button
    - component.multi_select_button_group
    - component.wheel_picker
    - component.toggle_bar
  api_endpoint: []
  db:
    relational:
      - table.users
      - table.user_preferences
    graph:
      - node.user
---
