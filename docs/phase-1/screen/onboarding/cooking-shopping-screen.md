---
type: screen
id: screen.onboarding.cooking_shopping
title: Onboarding Cooking & Shopping Screen
status: active
related_features:
  - feature.adjust_preferences
  - feature.place_grocery_order
  - feature.generate_shopping_list
related_components:
  - component.input.select
  - component.input.checkbox
  - component.button.primary
  - component.button.secondary
  - component.container.form
related_events:
  - event.user.sets_cooking_preferences
  - event.user.sets_shopping_preferences
related_requests:
  - request.setCookingPreferences
  - request.setShoppingPreferences
related_endpoints:
  - api.post.cooking_preferences
  - api.post.shopping_preferences
related_state:
  - state.onboarding.cookingPreferences
  - state.onboarding.shoppingPreferences
related_db:
  - db.cooking_preferences
  - db.shopping_preferences
metrics:
  - metric.conversionRate.preferences_setup
---