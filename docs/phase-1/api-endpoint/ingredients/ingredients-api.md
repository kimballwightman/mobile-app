---
type: api
id: api.ingredients
title: Authentication API
status: active
related_features:
  - feature.sign_in
  - feature.sign_up
  - feature.reset_password
related_screens:
  - screen.auth.sign_in
  - screen.auth.sign_up
  - screen.auth.reset_password
related_components:
  - component.input.email
  - component.input.password
  - component.button.login
related_events:
  - event.user.signs_in
  - event.user.signs_up
  - event.user.resets_password
related_requests:
  - request.user.login
  - request.user.signup
  - request.user.reset_password
related_state:
  - state.auth.user
  - state.auth.token
related_db:
  - db.relational.users
  - db.relational.auth_tokens
metrics:
  - metric.performance.auth_api
  - metric.errorRate.auth_api
---