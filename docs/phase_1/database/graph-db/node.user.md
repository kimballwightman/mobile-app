---
type: node
id: node.user
title: User
description: |
  Represents a user in the graph database, with relationships to preferences, meal plans, pantry, and more.

properties:
  - id: user_id
    type: uuid
    description: Unique identifier for the user.
  - id: email
    type: string
    description: User's email address.
  - id: name
    type: string
    description: User's display name.
  - id: profile_picture
    type: string
    description: URL to the user's profile picture.

edges:
  - type: HAS_PREFERENCE
    to_node: node.user_preferences
    direction: outbound
    description: User has preferences.
  - type: HAS_MEAL_PLAN
    to_node: node.user_meal_plan
    direction: outbound
    description: User has meal plans.
  - type: HAS_PANTRY_ITEM
    to_node: node.pantry_items
    direction: outbound
    description: User has pantry items.
  - type: HAS_SHOPPING_CART
    to_node: node.shopping_cart
    direction: outbound
    description: User has shopping carts.
  - type: HAS_ORDER
    to_node: node.order
    direction: outbound
    description: User has orders.
  - type: HAS_FAVORITE
    to_node: node.user_favorites
    direction: outbound
    description: User has favorite foods/recipes.

related:
  feature:
    - feature.authentication
    - feature.onboarding_flow
  event:
    - event.create_account_submit
    - event.login_submit
  screen:
    - screen.login
    - screen.create_account
  component:
    - component.input_field
  api_endpoint:
    - endpoint.auth_register.POST
    - endpoint.auth_login.POST
  db:
    relational:
      - table.users
---
