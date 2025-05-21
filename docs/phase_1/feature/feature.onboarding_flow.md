---
type: feature
id: feature.onboarding_flow
title: Onboarding Flow
description: |
  Guides new users through a multi-step onboarding process to collect goals, sync health data, user info, workouts per week, body fat %, nutritional goals, adherence %, budget, and allergies. Ensures user profile is fully set up for personalized recommendations and performance tracking.

sections:
  - name: Define Goal
    description: |
      User selects their primary goal (Cut, Maintain, Bulk) as the first onboarding step.
    events:
      - event.select_goal
      - event.go_to_next_page
      - event.go_to_previous_page
    screens:
      - screen.define_goal
    components:
      - component.multi_select_button_group
      - component.next_screen_button
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Connect to Apple Health
    description: |
      User can sync with Apple Health to autofill user info (gender, height, weight, birthdate) and workout data in subsequent screens.
    events:
      - event.sync_health_data
      - event.go_to_next_page
      - event.go_to_previous_page
    screens:
      - screen.connect_to_apple_health
    components:
      - component.toggle_bar
      - component.next_screen_button
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: User Info
    description: |
      User enters demographic and physical information (gender, height, weight, birthdate). This screen may be auto-filled if Apple Health was connected in the previous step.
    events:
      - event.select_gender
      - event.select_height
      - event.select_weight
      - event.select_age
      - event.go_to_next_page
      - event.go_to_previous_page
    screens:
      - screen.user_info
    components:
      - component.multi_select_button_group
      - component.wheel_picker
      - component.next_screen_button
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Workouts Per Week
    description: |
      User selects their typical number of workouts per week (0-2, 3-5, 6+). This information may be auto-filled if Apple Health was connected.
    events:
      - event.select_workouts_per_week
      - event.go_to_next_page
      - event.go_to_previous_page
    screens:
      - screen.workouts_per_week
    components:
      - component.multi_select_button_group
      - component.next_screen_button
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Body Fat %
    description: |
      User selects their estimated body fat percentage from a multi-select group (3-4%, 5-7%, 8-12%, 13-17%, 18-23%, 14-29%, 30-34%, 35-39%, 40%+).
    events:
      - event.select_body_fat
      - event.go_to_next_page
      - event.go_to_previous_page
    screens:
      - screen.body_fat
    components:
      - component.multi_select_button_group
      - component.next_screen_button
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Nutritional Goals
    description: |
      User sets calorie goals (+/- calories above or below maintenance level), macro gram totals (Carbs, Fats, Protein) and their % of total macros, and selects adherence % (95% by default) to determine the acceptable range around the goals.
    events:
      - event.set_calorie_goal
      - event.set_macro_goals
      - event.set_adherence_percent
      - event.go_to_next_page
      - event.go_to_previous_page
    screens:
      - screen.tracking_goals
    components:
      - component.input_field
      - component.macro_input_group
      - component.adherence_slider
      - component.next_screen_button
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Budget
    description: |
      User selects their weekly grocery budget range using a two-node horizontal range slider for budget min and max per week.
    events:
      - event.select_budget
      - event.go_to_next_page
      - event.go_to_previous_page
    screens:
      - screen.budget
    components:
      - component.budget_slider
      - component.next_screen_button
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Allergies
    description: |
      User selects any allergies from a multi-select button group (nuts, gluten, etc.).
    events:
      - event.select_allergy
      - event.go_to_next_page
      - event.go_to_previous_page
    screens:
      - screen.allergies
    components:
      - component.allergy_chip
      - component.multi_select_button_group
      - component.next_screen_button
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Completion
    description: |
      User completes onboarding with confirmation message "You're all set!" and "Let's Get Started" button. Preferences are saved, and user is navigated into the Dashboard tab.
    events:
      - event.complete_onboarding
    screens:
      - screen.complete_onboarding
    components:
      - component.confirmation_message
      - component.next_screen_button
    api_endpoint: []
    db:
      relational:
        - table.users
        - table.user_preferences
      graph:
        - node.user

design_system_reference: [design_system]
---
