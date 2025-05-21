---
type: api
id: api.meals
title: Meals API
status: active
related_features:
  - feature.view_meal_details
  - feature.meal_search
  - feature.swap_foods_in_meal
related_screens:
  - screen.explore.meal_details
  - screen.explore.search
  - screen.explore.filter
related_components:
  - component.container.meal
  - component.input.search
  - component.button.swap
related_events:
  - event.user.views_meal
  - event.user.searches_meals
  - event.user.swaps_food
related_requests:
  - request.graph.get_meal
  - request.graph.meals_search
  - request.graph.meals_swap
related_state:
  - state.meal.current
  - state.meal.search
related_db:
  - db.graph.meals
  - db.graph.foods
metrics:
  - metric.performance.meals_api
  - metric.errorRate.meals_api
---
