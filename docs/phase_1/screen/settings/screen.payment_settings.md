---
type: screen
id: screen.payment_settings
title: Payment Settings
description: |
  Screen where users can view, add, remove, or edit payment methods for grocery checkout.
route: /settings/payments

states:
  - state.rendered

related:
  feature:
    - feature.settings_management
  event:
    - event.manage_payments
  component:
    - component.settings_list

design_system_reference: [design_system]
---
