---
type: component
id: component.food_list_item_tile
title: Food List Item Tile
component_type: list
description: |
  Tile or list item displaying a food or ingredient, with name, quantity, nutrition, and color-coded status. Used in expanded meal view and swap mode.

properties:
  - name: name
    type: string
    description: "Name of the food or ingredient."
  - name: quantity
    type: number
    description: "Quantity or amount."
  - name: status
    type: string
    description: "Status indicator (e.g., in pantry, out of stock, to buy)."
  - name: onClick
    type: function
    description: "Handler for selecting or swapping the food item."
  - name: nutrition
    type: object
    description: "Nutrition info (calories, macros, etc.)."

states:
  - state.idle
  - state.selected
  - state.colored
  - state.swapped

related:
  feature:
    - feature.expanded_meal_view
    - feature.meal_discovery
  event:
    - event.select_food_item
    - event.select_food_swap
    - event.expand_meal_card
  screen:
    - screen.explore_grid


design_system_reference: [design_system]
---
