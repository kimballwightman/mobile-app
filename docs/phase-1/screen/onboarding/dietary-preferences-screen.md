---
type: screen
id: screen.onboarding.dietary_preferences
title: Onboarding Dietary Preferences Screen
status: active
related_features:
  - feature.adjust_preferences
  - feature.set_nutrition_goals
related_components:
  - component.input.select
  - component.input.checkbox
  - component.button.primary
  - component.button.secondary
  - component.container.form
related_events:
  - event.user.sets_dietary_preferences
  - event.user.updates_preferences
related_requests:
  - request.setDietaryPreferences
  - request.updateUserPreferences
related_endpoints:
  - api.post.dietary_preferences
  - api.post.user_preferences
related_state:
  - state.onboarding.dietaryPreferences
  - state.onboarding.preferences
related_db:
  - db.dietary_preferences
  - db.user_preferences
metrics:
  - metric.conversionRate.preferences_setup
---