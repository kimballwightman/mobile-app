---
type: component
id: component.searchable_drop_down
title: Searchable Drop Down
component_type: picklist
description: |
  Dropdown selector with search/filter capability, allowing users to quickly find and select from a large list of options.

properties:
  - name: value
    type: string
    description: "Current selected value."
  - name: options
    type: array
    description: "Available options to select from."
  - name: onChange
    type: function
    description: "Handler called when the selection changes."
  - name: onSearch
    type: function
    description: "Handler called when the search query changes."
  - name: searchQuery
    type: string
    description: "Current search query."
  - name: disabled
    type: boolean
    description: "Whether the dropdown is disabled."

states:
  - state.enabled
  - state.disabled
  - state.open
  - state.closed
  - state.searching

related:
  feature:
    - feature.onboarding_flow
  event:
    - event.select_goal
  screen:
    - screen.define_goal

design_system_reference: [design_system]
---
