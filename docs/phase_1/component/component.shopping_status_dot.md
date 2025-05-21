---
type: component
id: component.shopping_status_dot
title: Shopping Status Dot
component_type: custom
description: |
  A small dot indicator showing the shopping status of an item (e.g., available, out of stock, in pantry, on the way) in the shopping cart or meal plan.

properties:
  - name: status
    type: string
    description: "Shopping status (available, out_of_stock, in_pantry, on_the_way)."

states:
  - state.available
  - state.out_of_stock
  - state.in_pantry
  - state.on_the_way

related:
  feature:
    - feature.shopping_cart
    - feature.pantry_management
  event:
    - event.expand_shopping_cart
  screen:
    - screen.meal_planning_tab
    - screen.pantry_tab

design_system_reference: [design_system]
---
