---
type: api
id: api.pantry
title: Pantry API
status: active
related_features:
  - feature.track_pantry_items
  - feature.track_ingredient_expiration
  - feature.update_pantry_after_meal
related_screens:
  - screen.pantry.view_items
  - screen.pantry.expiration
  - screen.pantry.update
related_components:
  - component.container.pantry_item
  - component.button.track_expiration
  - component.button.update
related_events:
  - event.user.views_pantry
  - event.user.tracks_expiration
  - event.user.updates_pantry
related_requests:
  - request.pantry.get_items
  - request.pantry.track_expiration
  - request.pantry.update
related_state:
  - state.pantry.items
  - state.pantry.expiration
related_db:
  - db.relational.pantry_items
  - db.relational.ingredients
metrics:
  - metric.performance.pantry_api
  - metric.errorRate.pantry_api
---
