---
type: table
id: table.user_preferences
title: User Preferences
description: |
  Stores user-specific preferences, goals, and dietary restrictions.

fields:
  - id: preference_id
    type: uuid
    description: Unique identifier for the preference record.
    constraints: [primary key, not null]
  - id: user_id
    type: uuid
    description: Reference to the user.
    constraints: [foreign key, not null]
  - id: goal
    type: string
    description: User's selected goal (cut, maintain, bulk).
    constraints: [not null]
  - id: calorie_target
    type: int
    description: Daily calorie target.
    constraints: [not null]
  - id: protein_target
    type: int
    description: Daily protein target (grams).
    constraints: [not null]
  - id: carb_target
    type: int
    description: Daily carbohydrate target (grams).
    constraints: [not null]
  - id: fat_target
    type: int
    description: Daily fat target (grams).
    constraints: [not null]
  - id: adherence_percent
    type: int
    description: Adherence strictness percentage.
    constraints: [not null]
  - id: allergies
    type: string
    description: Comma-separated list of allergies.
    constraints: []
  - id: budget_min
    type: int
    description: Minimum weekly grocery budget.
    constraints: []
  - id: budget_max
    type: int
    description: Maximum weekly grocery budget.
    constraints: []

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.set_macro_goals
    - event.select_budget
  screen:
    - screen.tracking_goals
    - screen.budget
  component:
    - component.macro_input_group
    - component.budget_slider
  api_endpoint:
    - endpoint.users_preferences_tracking-goals.PUT
  db:
    graph:
      - node.user
---
