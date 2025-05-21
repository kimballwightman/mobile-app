---
type: screen
id: screen.settings.profile_account
title: Profile & Account Settings Screen
status: active
related_features:
  - feature.manage_account
  - feature.reset_password
related_components:
  - component.input.text
  - component.input.email
  - component.input.password
  - component.button.primary
  - component.button.secondary
  - component.container.form
  - component.container.avatar
related_events:
  - event.user.updates_profile
  - event.user.changes_password
  - event.user.updates_account
related_requests:
  - request.updateUserProfile
  - request.updateUserAccount
  - request.resetPassword
related_endpoints:
  - api.put.user_profile
  - api.put.user_account
  - api.post.password_reset
related_state:
  - state.settings.profile
  - state.settings.account
  - state.auth.user
related_db:
  - db.users
  - db.user_profiles
  - db.user_accounts
metrics:
  - metric.engagement.profile_updates
  - metric.conversionRate.account_updates
---