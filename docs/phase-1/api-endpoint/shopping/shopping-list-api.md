---
type: api
id: api.shopping
title: Shopping List API
status: active
related_features:
  - feature.generate_shopping_list
  - feature.view_shopping_cart
  - feature.place_grocery_order
related_screens:
  - screen.shopping.list
  - screen.shopping.cart
  - screen.shopping.checkout
related_components:
  - component.container.shopping_list
  - component.button.generate_list
  - component.button.checkout
related_events:
  - event.user.generates_list
  - event.user.views_cart
  - event.user.places_order
related_requests:
  - request.shopping.generate_list
  - request.shopping.get_cart
  - request.shopping.checkout
related_state:
  - state.shopping.list
  - state.shopping.cart
related_db:
  - db.relational.shopping_lists
  - db.relational.shopping_cart
metrics:
  - metric.performance.shopping_api
  - metric.errorRate.shopping_api
---

