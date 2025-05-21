---
type: component
id: component.cart_icon
title: Cart Icon
component_type: button
description: |
  A clickable icon in the Plan tab header that provides access to cart windows. Displays a badge with the number of items in the current cart window when applicable.

properties:
  - name: itemCount
    type: number
    description: "Number of items in the current cart window to display as a badge."
  - name: onClick
    type: function
    description: "Handler for when the icon is clicked, typically opens the cart window selection modal."
  - name: currentCartWindowId
    type: string
    description: "ID of the currently selected cart window, if any."

states:
  - state.default
  - state.has_items
  - state.no_window_selected

related:
  feature:
    - feature.meal_plan_calendar
    - feature.shopping_cart
  event:
    - event.go_to_cart_windows
  screen:
    - screen.meal_planning_tab

design_system_reference: [design_system]
--- 