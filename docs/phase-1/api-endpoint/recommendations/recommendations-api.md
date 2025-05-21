---
type: api
id: api.recommendations
title: Recommendations API
status: active
related_features:
  - feature.personalized_recommendations
  - feature.meal_search
  - feature.filter_meals
related_screens:
  - screen.explore.recommendations
  - screen.explore.search
  - screen.explore.filter
related_components:
  - component.container.recommendations
  - component.input.search
  - component.list.filter
related_events:
  - event.user.views_recommendations
  - event.user.searches_meals
  - event.user.filters_meals
related_requests:
  - request.recommendations.get
  - request.graph.meals_search
  - request.graph.filter_meals
related_state:
  - state.recommendations.current
  - state.meal.search
related_db:
  - db.graph.recommendations
  - db.graph.meals
metrics:
  - metric.performance.recommendations_api
  - metric.errorRate.recommendations_api
---
