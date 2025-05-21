---
type: screen
id: screen.plan.day_view
title: Meal Plan Day View
status: active
related_features:
  - feature.add_meal_to_plan
  - feature.drag_and_drop_meal
  - feature.swap_foods_in_meal
  - feature.view_meal_details
  - feature.view_recipe
related_components:
  - component.container.meal_card
  - component.container.meal_list
  - component.button.add
  - component.button.swap
  - component.button.view_details
  - component.container.drag_handle
related_events:
  - event.user.views_day_plan
  - event.user.adds_meal_to_plan
  - event.user.drags_meal
  - event.user.swaps_foods
  - event.user.views_meal_details
related_requests:
  - request.getDayPlan
  - request.addMealToPlan
  - request.updateMealPlan
  - request.getMealDetails
related_endpoints:
  - api.get.day_plan
  - api.post.meal_plan
  - api.put.meal_plan
  - api.get.meal_details
related_state:
  - state.plan.dayView
  - state.plan.selectedMeals
  - state.plan.dragState
  - state.plan.selectedMealDetails
related_db:
  - db.meal_plans
  - db.meals
  - db.meal_plan_items
  - db.recipes
metrics:
  - metric.engagement.meal_planning
  - metric.conversionRate.plan_updates
---