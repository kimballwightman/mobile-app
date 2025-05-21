---
type: screen
id: screen.profile_account
title: Profile & Account
description: |
  Screen where users can view and edit their profile information, including name, email, profile picture, and other metadata.
route: /settings/profile

states:
  - state.rendered

related:
  feature:
    - feature.settings_management
  event:
    - event.manage_profile
    - event.change_profile_picture
  component:
    - component.settings_list
    - component.profile_picture

design_system_reference: [design_system]
---
