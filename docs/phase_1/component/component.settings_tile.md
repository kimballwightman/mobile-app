---
type: component
id: component.settings_tile
title: Settings Tile
component_type: list
description: |
  List item representing a single settings option, such as account, notifications, or payment. Can include icon, label, and navigation arrow.

properties:
  - name: icon
    type: string
    description: "Icon representing the setting."
  - name: label
    type: string
    description: "Text label for the setting."
  - name: onClick
    type: function
    description: "Handler called when the tile is pressed."
  - name: disabled
    type: boolean
    description: "Whether the tile is disabled."

states:
  - state.enabled
  - state.disabled
  - state.selected

related:
  feature:
    - feature.settings_management
  event:
    - event.manage_account_details
    - event.manage_notifications
    - event.manage_payments
  screen:
    - screen.profile_account
    - screen.notification_settings
    - screen.payment_settings

design_system_reference: [design_system]
---
