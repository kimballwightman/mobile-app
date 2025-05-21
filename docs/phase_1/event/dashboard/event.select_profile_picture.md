---
type: event
id: event.select_profile_picture
feature_id: feature.dashboard
title: Select Profile Picture
description: |
  Triggered when the user taps their profile picture in the dashboard side drawer. Opens a modal or picker to update the profile image.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.profile_picture: state.default

trigger:
  trigger_type: user_action
  component: component.profile_picture
  screen: screen.dashboard

api_request:
  endpoint: api.user_profile.PUT
  method: PUT
  url: /api/user/profile

db_interactions:
  relational:
    - table.user_profile:
        actions:
          - "Update user profile picture."
  graph:
    - node.user:
        actions:
          - "Update profile picture property."

state_changes:
  components:
    - component.profile_picture:
        state: state.editing
        description: "Profile picture component enters editing state."
  screens:
    - screen.dashboard:
        state: state.dashboard_default
        description: "Dashboard remains open."

navigation:
  - screen.dashboard

next_possible_events:
  - event.change_profile_picture

responses:
  - "Profile picture updated."
  - "User sees new profile image."
---
