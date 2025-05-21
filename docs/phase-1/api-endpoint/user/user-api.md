---
type: api
id: api.user
title: User API
status: active
related_features:
  - feature.manage_account
  - feature.adjust_preferences
  - feature.user_settings
related_screens:
  - screen.settings.account
  - screen.preferences.main
  - screen.settings.main
related_components:
  - component.button.update_profile
  - component.button.save_preferences
  - component.button.settings
related_events:
  - event.user.updates_profile
  - event.user.updates_preferences
  - event.user.changes_settings
related_requests:
  - request.user.update_profile
  - request.user.update_preferences
  - request.user.update_settings
related_state:
  - state.user.profile
  - state.user.preferences
related_db:
  - db.relational.users
  - db.relational.user_preferences
metrics:
  - metric.performance.user_api
  - metric.errorRate.user_api
---
