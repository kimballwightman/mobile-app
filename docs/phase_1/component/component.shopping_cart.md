---
type: component
id: component.shopping_cart
title: Shopping Cart
component_type: container
description: |
  A multi-state shopping cart component that appears as a persistent bar at the bottom of the Plan tab and can expand to a full-screen modal. When collapsed, it shows a summary of cart items, total price, and checkout button. When expanded, it displays the complete cart details including item list, prices, status indicators, and checkout actions.

properties:
  - name: cartWindowId
    type: string
    description: "ID of the currently selected cart window."
  - name: items
    type: array
    description: "Array of cart items with details."
  - name: totalPrice
    type: number
    description: "Total price of all items in the cart."
  - name: itemCount
    type: number
    description: "Number of items in the cart."
  - name: statusDots
    type: array
    description: "Status indicators for each item (available, out of stock, in pantry, on the way)."
  - name: dateRange
    type: object
    description: "Start and end dates of the current cart window."
  - name: onExpand
    type: function
    description: "Handler for expanding the bar to modal view."
  - name: onCollapse
    type: function
    description: "Handler for collapsing back to bar view."
  - name: onCheckout
    type: function
    description: "Handler for initiating checkout."
  - name: onRemoveItem
    type: function
    description: "Handler for removing an item from the cart."

states:
  - state.collapsed
  - state.expanded
  - state.hidden
  - state.empty
  - state.filled
  - state.checkout_in_progress
  - state.no_window_selected

related:
  feature:
    - feature.meal_plan_calendar
    - feature.shopping_cart
  event:
    - event.expand_shopping_cart
    - event.proceed_to_checkout
    - event.remove_cart_item
    - event.add_cart_item_manually
    - event.submit_order
  screen:
    - screen.meal_planning_tab
    - screen.shopping_cart_modal
  component:
    - component.shopping_status_dot
    - component.order_summary
    - component.cart_item_list

design_system_reference: [design_system]
---
