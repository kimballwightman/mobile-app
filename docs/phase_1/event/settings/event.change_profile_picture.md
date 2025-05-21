---
type: event
id: event.change_profile_picture
feature_id: feature.settings_profile_picture
title: Change Profile Picture
description: |
  This event is triggered when the user selects a new profile picture from the Edit Profile screen, either by taking a photo or choosing from the gallery, and saves the change.

preconditions:
  screens:
    - screen.edit_profile: state.rendered
  components:
    - component.profile_picture: state.editable

trigger:
  trigger_type: user_action
  component: component.profile_picture_edit_button
  screen: screen.edit_profile

api_request:
  method: PATCH
  endpoint: /api/user/profile
  body:
    user_id: <user_id>
    profile_picture: <image_data_or_url>
  description: Updates the user's profile picture in the backend.

db_interactions:
  relational:
    - action: update
      table: users
      description: Update the user's profile picture with the new image.
  graph: []

state_changes:
  components:
    - component.profile_picture:
        state: state.updated
        description: "Profile picture is updated in the UI."
  screens:
    - screen.edit_profile:
        state: state.rendered
        description: "Edit Profile screen reflects the new profile picture."

navigation: []

next_possible_events:
  - event.manage_profile

responses:
  - Updates profile picture in the UI.
  - Shows confirmation or error message.
---
