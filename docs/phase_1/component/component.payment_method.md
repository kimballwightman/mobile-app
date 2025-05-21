---
type: component
id: component.payment_method
title: Payment Method
component_type: card
description: |
  List item or card displaying a user's payment method (e.g., credit card, Apple Pay, PayPal) with options to edit, remove, or set as default.

properties:
  - name: type
    type: string
    description: "Type of payment method (e.g., 'credit_card', 'apple_pay')."
  - name: last4
    type: string
    description: "Last four digits of the card or account."
  - name: isDefault
    type: boolean
    description: "Whether this is the default payment method."
  - name: onEdit
    type: function
    description: "Handler for editing the payment method."
  - name: onRemove
    type: function
    description: "Handler for removing the payment method."

states:
  - state.default
  - state.selected
  - state.editing
  - state.removing

related:
  feature:
    - feature.settings_management
  event:
    - event.manage_payments
  screen:
    - screen.payment_settings

design_system_reference: [design_system]
---
