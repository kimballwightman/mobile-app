---
type: event
id: event.manage_profile
feature_id: feature.settings_management
title: Manage Profile Information
description: |
  This event is triggered when the user is on the Profile & Account screen and makes changes to their profile information, such as name, email, or other personal details.

preconditions:
  screens:
    - screen.profile_account: state.rendered
  components:
    - component.profile_form: state.loaded

trigger:
  trigger_type: user_action
  component: component.edit_profile_button
  screen: screen.profile_account

api_request:
  endpoint: endpoint.api.user.profile.PATCH
  method: PATCH
  url: /api/user/profile

db_interactions:
  relational:
    - table.users:
        actions:
          - "Update user profile information."
  graph: []

state_changes:
  components:
    - component.profile_form:
        state: state.submitting
        description: "Profile form is being submitted."
    - component.profile_form:
        state: state.success
        description: "Profile update was successful."
  screens:
    - screen.profile_account:
        state: state.profile_updated
        description: "Profile & Account screen shows updated information."

navigation: []

next_possible_events:
  - event.change_profile_picture

responses:
  - "Profile information updated successfully."
  - "User profile reflects the changes."
---
