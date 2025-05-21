---
type: screen
id: screen.shopping_cart_modal
title: Shopping Cart Modal
description: |
  Full-screen modal for viewing, editing, and checking out items in the shopping cart. Accessed when the shopping cart component is expanded from its collapsed state.
route: /shopping-cart-modal

states:
  - state.open
  - state.closed

related:
  feature:
    - feature.meal_plan_calendar
    - feature.shopping_cart
  event:
    - event.expand_shopping_cart
    - event.proceed_to_checkout
    - event.submit_order
  component:
    - component.shopping_cart
    - component.order_summary
    - component.save_button
    - component.shopping_status_dot

design_system_reference: [design_system]
--- 