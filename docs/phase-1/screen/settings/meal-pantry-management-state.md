---
type: screen
id: screen.settings.meal_pantry_management
title: Meal & Pantry Management Settings Screen
status: active
related_features:
  - feature.track_pantry_items
  - feature.track_ingredient_expiration
  - feature.update_pantry_after_meal
  - feature.auto_generate_meal_plan
related_components:
  - component.input.toggle
  - component.input.select
  - component.button.primary
  - component.button.secondary
  - component.container.form
  - component.container.management_preview
related_events:
  - event.user.updates_meal_settings
  - event.user.updates_pantry_settings
  - event.user.views_management_summary
related_requests:
  - request.updateMealSettings
  - request.updatePantrySettings
  - request.getManagementSummary
related_endpoints:
  - api.put.meal_settings
  - api.put.pantry_settings
  - api.get.management_summary
related_state:
  - state.settings.mealManagement
  - state.settings.pantryManagement
  - state.settings.managementSummary
related_db:
  - db.meal_settings
  - db.pantry_settings
  - db.management_summaries
metrics:
  - metric.engagement.management_updates
  - metric.conversionRate.management_settings
---