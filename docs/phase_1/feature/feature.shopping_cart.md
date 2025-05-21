---
type: feature
id: feature.shopping_cart
title: Shopping Cart
description: |
  Allows users to manage their shopping cart, add or remove items, view cart details, proceed to checkout, and submit grocery orders. Integrates with meal planning and pantry management for seamless grocery workflows and real-time inventory updates.

sections:
  - name: Cart Modal & Viewing
    description: |
      User expands the shopping cart to view all cart items, prices, stores, and shopping status. Color-coded dots indicate item status (available, out of stock, in pantry, on the way).
    events:
      - event.expand_shopping_cart
      - event.view_cart_item
    screens:
      - screen.shopping_cart_modal
    components:
      - component.shopping_cart
      - component.shopping_status_dot
      - component.order_summary
    api_endpoint:
      - endpoint.api.cart_checkout_initiate.POST
    db:
      relational:
        - table.cart_items
      graph: []

  - name: Item Management
    description: |
      Users can add or remove items from the cart, either manually or by removing existing items. Cart updates are reflected in pantry inventory after order submission.
    events:
      - event.add_cart_item_manually
      - event.remove_cart_item
    screens:
      - screen.shopping_cart_modal
    components:
      - component.shopping_cart
      - component.order_item
      - component.save_button
    api_endpoint:
      - endpoint.api.cart_checkout_initiate.POST
    db:
      relational:
        - table.cart_items
      graph: []

  - name: Checkout & Order Submission
    description: |
      User proceeds to checkout, reviews grouped items by store, and submits the order. Pantry is updated with ordered items after successful checkout.
    events:
      - event.proceed_to_checkout
      - event.submit_order
    screens:
      - screen.shopping_cart_modal
      - screen.order_summary
    components:
      - component.shopping_cart
      - component.save_button
      - component.order_summary
    api_endpoint:
      - endpoint.api.order.submit.POST
    db:
      relational:
        - table.orders
        - table.pantry_items
      graph: []

design_system_reference: [design_system]
---
