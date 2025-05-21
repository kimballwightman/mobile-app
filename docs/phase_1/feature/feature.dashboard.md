---
type: feature
id: feature.dashboard
title: Dashboard
description: |
  The Dashboard is the central hub for performance tracking, daily/weekly goal progress, meal/workout logging, and quick access to settings and integrations. It provides a high-level overview of the user's nutrition, activity, and trends, designed for experienced users who want actionable data and automation.

sections:
  - name: Top Bar Date Selector
    description: |
      Displays the active date, navigation arrows, and calendar access for viewing different days.
    events:
      - event.change_dashboard_date
      - event.open_calendar_modal
    screens:
      - screen.dashboard
    components:
      - component.dashboard_top_bar
    api_endpoint:
      - endpoint.dashboard_data.GET
    db:
      relational:
        - table.user_metrics
      graph:
        - node.user_performance
  - name: Daily Nutrient Bars & Goal Tiles
    description: |
      Displays daily nutrient bars (calories consumed vs burned, macros), with segmented displays for each meal/snack in chronological order. Each segment appears hollow until the meal is logged. Goal tiles show the difference between consumed and target values, with color-coding for goal achievement.
    events:
      - event.toggle_metric_type
      - event.tap_summary_tile
    screens:
      - screen.dashboard
    components:
      - component.nutrient_bar
      - component.goal_tile
    api_endpoint:
      - endpoint.dashboard_data.GET
    db:
      relational:
        - table.user_metrics
      graph:
        - node.user_performance
  - name: Daily Meal & Workout Tiles
    description: |
      Horizontally scrollable, drag-and-drop row of meal and workout tiles. Tapping a meal tile opens options to cook, log, swap, or skip. Workout tiles can be logged manually or connected with wearable data.
    events:
      - event.log_meal
      - event.log_workout
      - event.drag_meal_workout_tile
      - event.cook_meal
      - event.swap_meal
      - event.skip_meal
    screens:
      - screen.dashboard
    components:
      - component.meal_workout_tile
      - component.meal_history_tile
    api_endpoint:
      - endpoint.log_meal.POST
      - endpoint.log_workout.POST
    db:
      relational:
        - table.meal_log
        - table.workout_log
      graph:
        - node.meal_event
        - node.workout_event
  - name: Weekly & Trend Analysis
    description: |
      Displays weekly summary tiles (Avg. Daily Calorie Diff, Avg. Macro Split percentages) over a 7-day window with color-coded borders. Interactive 7-day rolling trends graph with toggle for different metrics, and swipeable week-by-week trendline for long-term analysis.
    events:
      - event.toggle_graph_metric
      - event.swipe_trend_graph
      - event.tap_graph_day
    screens:
      - screen.dashboard
    components:
      - component.weekly_summary_tile
      - component.trend_graph
      - component.week_by_week_trendline
    api_endpoint:
      - endpoint.weekly_metrics.GET
    db:
      relational:
        - table.user_metrics
      graph:
        - node.user_performance
  - name: Settings & Integrations
    description: |
      Access to side drawer for account, integrations, goals, notifications, and payments via profile picture.
    events:
      - event.open_side_drawer
      - event.open_settings_section
      - event.open_integrations
      - event.open_goals_preferences
      - event.open_notifications
      - event.open_payments
      - event.select_profile_picture
    screens:
      - screen.dashboard
    components:
      - component.side_drawer
      - component.profile_picture
      - component.integration_tile
    api_endpoint:
      - endpoint.user_settings.GET
      - endpoint.user_integrations.GET
    db:
      relational:
        - table.user_settings
        - table.user_integrations
      graph:
        - node.user_settings
        - node.user_integration

design_system_reference: [design_system]
---
