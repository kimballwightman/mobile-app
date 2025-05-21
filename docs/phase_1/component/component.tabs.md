---
type: component
id: component.tabs
title: Tabs
component_type: navigation
description: |
  A tabbed navigation component that allows switching between different views or content sections. Used in screens with multiple content panels like the Meal Reviews Center.

properties:
  - name: tabs
    type: array
    description: "Array of tab objects, each with a label and optional badge count."
  - name: activeTab
    type: number
    description: "Index of the currently active tab."
  - name: onTabChange
    type: function
    description: "Handler called when a tab is selected."
  - name: tabPosition
    type: string
    description: "Position of the tabs (top, bottom)."
  - name: style
    type: object
    description: "Custom styles for the tab bar."
  - name: indicatorStyle
    type: object
    description: "Custom styles for the active tab indicator."
  - name: badgeColor
    type: string
    description: "Color for any badge counters on tabs."

states:
  - state.default
  - state.active
  - state.disabled

related:
  feature:
    - feature.meal_reviews
    - feature.dashboard
  screen:
    - screen.meal_reviews_center
    - screen.dashboard
  component:
    - component.badge

design_system_reference: [design_system]
--- 