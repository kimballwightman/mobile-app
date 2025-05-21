---
type: screen
id: screen.plan.three_day_view
title: Meal Plan Three Day View
status: active
related_features:
  - feature.add_meal_to_plan
  - feature.drag_and_drop_meal
  - feature.auto_generate_meal_plan
  - feature.add_favorite_meal_to_plan
  - feature.swap_foods_in_meal
related_components:
  - component.container.meal_card
  - component.container.meal_grid
  - component.button.add
  - component.button.generate
  - component.button.swap
  - component.container.drag_handle
related_events:
  - event.user.views_three_day_plan
  - event.user.adds_meal_to_plan
  - event.user.drags_meal
  - event.user.swaps_foods
  - event.user.generates_plan
related_requests:
  - request.getThreeDayPlan
  - request.addMealToPlan
  - request.updateMealPlan
  - request.generateMealPlan
related_endpoints:
  - api.get.three_day_plan
  - api.post.meal_plan
  - api.put.meal_plan
  - api.post.generate_plan
related_state:
  - state.plan.threeDayView
  - state.plan.selectedMeals
  - state.plan.dragState
  - state.plan.generationStatus
related_db:
  - db.meal_plans
  - db.meals
  - db.meal_plan_items
metrics:
  - metric.engagement.meal_planning
  - metric.conversionRate.plan_updates
---