---
type: component
id: component.order_summary
title: Order Summary
component_type: custom
description: |
  Summary section for orders, showing totals, payment method, and delivery information. Used in checkout and order review screens.

properties:
  - name: total
    type: number
    description: "Total price of the order."
  - name: paymentMethod
    type: string
    description: "Selected payment method."
  - name: deliveryInfo
    type: object
    description: "Delivery address and details."
  - name: onEditPayment
    type: function
    description: "Handler for editing payment method."
  - name: onEditDelivery
    type: function
    description: "Handler for editing delivery info."

states:
  - state.visible
  - state.updated

related:
  feature:
    - feature.shopping_cart
  event:
    - event.checkout
    - event.manage_payments
  screen:
    - screen.shopping_cart

design_system_reference: [design_system]
---
