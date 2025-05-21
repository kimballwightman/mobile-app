---
type: feature
id: feature.meal_plan_calendar
title: Meal Plan Calendar
description: |
  Allows users to build and manage weekly meal plans on a drag-and-drop calendar. Integrates with shopping cart, pantry, and meal history. Supports FAB actions for auto-planning, adding from favorites, browsing history, and using pantry items. Includes calendar navigation, macro/cals summary, and shopping cart functionality.

sections:
  - name: Calendar Meal Planning
    description: |
      Users can add, remove, and drag-and-drop meals or foods into calendar slots (Breakfast, Lunch, Dinner, Snacks). Macro and calorie summaries are shown for each day. Tapping a meal opens the expanded meal view.
    events:
      - event.add_favorite_meal_to_plan
      - event.add_from_pantry
      - event.remove_food_from_plan
      - event.drag_and_drop_meal
      - event.expand_meal_card
    screens:
      - screen.meal_planning_tab
    components:
      - component.meal_calendar_grid
      - component.meal_plan_slot
      - component.macro_bar
      - component.floating_action_button
      - component.meal_card
    api_endpoint:
      - endpoint.api.user-meal-plan.POST
      - endpoint.api.user-meal-plan_manual-entry.POST
      - endpoint.api.user-meal-plan_id.PATCH
      - endpoint.api.user-meal-plan_id.DELETE
    db:
      relational:
        - table.user_meal_plan
        - table.shopping_cart_items
        - table.pantry_items
      graph:
        - node.user

  - name: FAB Actions & Meal History
    description: |
      Floating Action Button (FAB) opens menu for Plan My Week (auto-generate), Add from Favorites, Browse Meal History, and Use from Pantry. Users can re-plan past meals from history.
    events:
      - event.open_fab_menu
      - event.plan_my_week
      - event.add_from_favorites
      - event.browse_meal_history
      - event.use_from_pantry
    screens:
      - screen.meal_planning_tab
    components:
      - component.fab_plan_my_week
      - component.meal_history_tile
      - component.searchable_drop_down
    api_endpoint:
      - endpoint.api.user-meal-history.GET
    db:
      relational:
        - table.user_meal_plan
        - table.recipes
      graph:
        - node.user

  - name: Shopping Cart Integration
    description: |
      Shopping cart appears as a bottom bar that expands to a full modal. Auto-populated from meal plans, with color-coded status dots. Checkout flow for placing grocery orders.
    events:
      - event.expand_shopping_cart
      - event.proceed_to_checkout
      - event.submit_order
    screens:
      - screen.meal_planning_tab
      - screen.shopping_cart_modal
    components:
      - component.shopping_cart
      - component.shopping_status_dot
      - component.order_summary
      - component.save_button
      - component.cart_icon
      - component.cart_window_selection_modal
    api_endpoint:
      - endpoint.api.cart_checkout_initiate.POST
      - endpoint.api.order.submit.POST
    db:
      relational:
        - table.orders
        - table.pantry_items
        - table.cart_windows
      graph: []

  - name: Calendar Navigation
    description: |
      Users can swipe between days, toggle between day/3-day view, and open a calendar modal to jump to any day.
    events:
      - event.swipe_to_different_day
      - event.switch_calendar_view
      - event.open_calendar_modal
    screens:
      - screen.meal_planning_tab
    components:
      - component.meal_calendar_grid
      - component.segmented_control
      - component.calendar_modal
    api_endpoint: []
    db:
      relational: []
      graph: []

design_system_reference: [design_system]
---
