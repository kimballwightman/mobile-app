---
type: component
id: component.cart_window_selection_modal
title: Cart Window Selection Modal
component_type: modal
description: |
  Modal that displays existing cart windows and allows users to select one or create a new cart window. Includes a list of existing cart windows with date ranges and a button to create a new window.

properties:
  - name: cartWindows
    type: array
    description: "List of existing cart windows with their details."
  - name: onSelectWindow
    type: function
    description: "Handler for when a cart window is selected."
  - name: onCreateNewWindow
    type: function
    description: "Handler for when the create new window button is clicked."
  - name: onClose
    type: function
    description: "Handler for closing the modal."
  - name: currentWindowId
    type: string
    description: "ID of the currently selected cart window, if any."

states:
  - state.default
  - state.loading
  - state.empty
  - state.create_new_mode

related:
  feature:
    - feature.meal_plan_calendar
    - feature.shopping_cart
  event:
    - event.go_to_cart_windows
    - event.select_cart_window
    - event.create_cart_window
  screen:
    - screen.meal_planning_tab
  component:
    - component.choose_interval_calendar

design_system_reference: [design_system]
--- 