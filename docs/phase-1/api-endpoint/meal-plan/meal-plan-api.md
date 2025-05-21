---
type: api
id: api.meal_plan
title: Meal Plan API
status: active
related_features:
  - feature.auto_generate_meal_plan
  - feature.add_meal_to_plan
  - feature.drag_and_drop_meal
related_screens:
  - screen.plan.auto_generate
  - screen.plan.add_meal
  - screen.plan.edit_plan
related_components:
  - component.button.generate
  - component.button.add_meal
  - component.button.edit_plan
related_events:
  - event.user.generates_plan
  - event.user.adds_meal
  - event.user.edits_plan
related_requests:
  - request.meal_plan.generate
  - request.meal_plan.add
  - request.meal_plan.update
related_state:
  - state.meal.plan
  - state.meal.editing
related_db:
  - db.relational.meal_plans
  - db.relational.meals
metrics:
  - metric.performance.meal_plan_api
  - metric.errorRate.meal_plan_api
---
