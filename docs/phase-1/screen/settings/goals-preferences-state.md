---
type: screen
id: screen.settings.goals_preferences
title: Goals & Preferences Settings Screen
status: active
related_features:
  - feature.set_nutrition_goals
  - feature.adjust_preferences
  - feature.view_nutrition_summary
related_components:
  - component.input.number
  - component.input.select
  - component.input.checkbox
  - component.button.primary
  - component.button.secondary
  - component.container.form
  - component.container.progress
related_events:
  - event.user.sets_goals
  - event.user.updates_preferences
  - event.user.views_nutrition_summary
related_requests:
  - request.setUserGoals
  - request.updateUserPreferences
  - request.getNutritionSummary
related_endpoints:
  - api.post.user_goals
  - api.post.user_preferences
  - api.get.nutrition_summary
related_state:
  - state.settings.goals
  - state.settings.preferences
  - state.settings.nutritionSummary
related_db:
  - db.user_goals
  - db.user_preferences
  - db.nutrition_summaries
metrics:
  - metric.engagement.goals_updates
  - metric.conversionRate.preferences_updates
---