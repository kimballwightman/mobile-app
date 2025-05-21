---
type: event
id: event.create_cart_window
feature_id: feature.meal_plan_calendar
title: Create Cart Window
description: |
  Triggered when the user creates a new cart window to group meals for shopping or planning. The user selects a date range for the window using the interval calendar component within the cart window selection modal.

preconditions:
  screens:
    - screen.meal_planning_tab: state.rendered
  components:
    - component.cart_window_selection_modal: state.create_new_mode
    - component.choose_interval_calendar: state.idle

trigger:
  trigger_type: user_action
  component: component.choose_interval_calendar
  screen: screen.meal_planning_tab

api_request:
  endpoint: endpoint.api.cart_checkout_initiate.POST
  method: POST
  url: /api/cart-windows
  body:
    user_id: <user_id>
    start_date: <start_date>
    end_date: <end_date>
    name: <window_name>

db_interactions:
  relational:
    - table.cart_windows:
        actions:
          - "Insert new cart window with user ID, name, and selected date range."
    - table.shopping_cart:
        actions:
          - "Create a new shopping cart associated with this cart window."
  graph: []

state_changes:
  components:
    - component.cart_window_selection_modal:
        state: state.default
        description: "Cart window selection modal returns to default state showing the list of windows including the new one."
    - component.shopping_cart:
        state: state.collapsed
        description: "Shopping cart becomes visible in collapsed state with the new cart window selected."
    - component.cart_icon:
        state: state.has_items
        description: "Cart icon in the Plan tab header updates to show the new window is selected."
  screens:
    - screen.meal_planning_tab:
        state: state.rendered
        description: "Meal planning tab is updated to reflect the newly created cart window."

navigation: []

next_possible_events:
  - event.select_cart_window
  - event.expand_shopping_cart

responses:
  - Creates a new cart window with the selected date range
  - Creates an associated shopping cart instance
  - Updates the cart window selection modal to show the new window
  - Automatically selects the new window as the active one
  - Shows the shopping cart at the bottom of the screen
---
