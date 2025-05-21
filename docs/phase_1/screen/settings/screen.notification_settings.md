---
type: screen
id: screen.notification_settings
title: Notification Settings
description: |
  Screen where users configure push and email notification preferences, including toggles for different notification types.
route: /settings/notifications

states:
  - state.rendered

related:
  feature:
    - feature.settings_management
  event:
    - event.manage_notifications
  component:
    - component.settings_list

design_system_reference: [design_system]
---
