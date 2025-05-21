---
type: api
id: api.foods
title: Foods API
status: active
related_features:
  - feature.view_meal_details
  - feature.swap_foods_in_meal
  - feature.view_nutrition_summary
related_screens:
  - screen.explore.meal_details
  - screen.explore.nutrition
  - screen.recipes.edit_recipe
related_components:
  - component.card.food
  - component.list.nutrition
  - component.button.swap
related_events:
  - event.user.views_food
  - event.user.swaps_food
  - event.user.views_nutrition
related_requests:
  - request.graph.get_food
  - request.graph.swap_food
  - request.graph.get_nutrition
related_state:
  - state.food.current
  - state.food.nutrition
related_db:
  - db.graph.foods
  - db.graph.nutrition
metrics:
  - metric.performance.foods_api
  - metric.errorRate.foods_api
---
