---
type: endpoint
id: endpoint.api.users_preferences_tracking-goals.PUT
protocol: REST
description: |
  Updates the user's nutritional goals (calories, macros, adherence) as part of onboarding or settings management. This data is essential for:
  1. Personalizing meal recommendations based on specific calorie and macro targets
  2. Determining the acceptable range for daily nutrition metrics based on adherence settings
  3. Analyzing user performance against targets in the dashboard
  4. Providing appropriate food swapping options that match nutritional goals

request:
  headers:
    - name: Content-Type
      value: application/json
    - name: Authorization
      value: Bearer <token>

rest:
  path: /api/users/preferences/tracking-goals
  method: PUT
  params: []
  body:
    - name: user_id
      type: string
      required: true
      example: "user_123"
      description: "Unique identifier for the user"
    - name: calories_target
      type: number
      required: true
      example: 2000
      description: "Target daily calorie intake, relative to maintenance level"
    - name: carbs_grams
      type: number
      required: true
      example: 250
      description: "Target daily carbohydrates in grams"
    - name: carbs_percent
      type: number
      required: true
      example: 50
      description: "Percentage of total calories from carbohydrates"
    - name: fat_grams
      type: number
      required: true
      example: 70
      description: "Target daily fat in grams"
    - name: fat_percent
      type: number
      required: true
      example: 30
      description: "Percentage of total calories from fat"
    - name: protein_grams
      type: number
      required: true
      example: 150
      description: "Target daily protein in grams"
    - name: protein_percent
      type: number
      required: true
      example: 20
      description: "Percentage of total calories from protein"
    - name: adherence_percent
      type: number
      required: true
      example: 95
      description: "Adherence percentage that defines acceptable range around targets"

graphql:
  operationType: null
  operationName: null
  query: |
    # Not applicable
  variables: []

responses:
  - status: 200
    description: Nutritional goals updated successfully.
    body:
      - name: user_id
        type: string
        example: "user_123"
      - name: calories_target
        type: number
        example: 2000
      - name: carbs_grams
        type: number
        example: 250
      - name: carbs_percent
        type: number
        example: 50
      - name: fat_grams
        type: number
        example: 70
      - name: fat_percent
        type: number
        example: 30
      - name: protein_grams
        type: number
        example: 150
      - name: protein_percent
        type: number
        example: 20
      - name: adherence_percent
        type: number
        example: 95
      - name: acceptable_range
        type: object
        example: { "calories_min": 1900, "calories_max": 2100, "carbs_min": 238, "carbs_max": 263, "fat_min": 67, "fat_max": 74, "protein_min": 143, "protein_max": 158 }
        description: "Calculated acceptable range based on targets and adherence percentage"
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
    - event.set_calorie_goal
    - event.set_macro_goals
    - event.set_adherence_percent
  screen:
    - screen.complete_onboarding
    - screen.tracking_goals
  component:
    - component.next_screen_button
    - component.input_field
    - component.macro_input_group
    - component.adherence_slider
  api_endpoint: []
  db:
    relational:
      - table.users
      - table.user_preferences
    graph:
      - node.user
---
