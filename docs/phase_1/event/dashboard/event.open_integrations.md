---
type: event
id: event.open_integrations
feature_id: feature.dashboard
title: Open Integrations Section
description: |
  Triggered when the user selects the Integrations option from the dashboard side drawer. Navigates to the integrations settings screen for managing connections with wearables, health data, and stores.

preconditions:
  screens:
    - screen.dashboard: state.dashboard_default
  components:
    - component.side_drawer: state.open

trigger:
  trigger_type: user_action
  component: component.side_drawer
  screen: screen.dashboard

api_request:
  endpoint: api.user_integrations.GET
  method: GET
  url: /api/user/integrations

db_interactions:
  relational:
    - table.user_integrations:
        actions:
          - "Fetch user integrations."
  graph:
    - node.user:
        actions:
          - "Read integration relationships."

state_changes:
  components:
    - component.side_drawer:
        state: state.closed
        description: "Side drawer closes after selection."
  screens:
    - screen.integrations:
        state: state.integrations_open
        description: "Integrations settings screen is displayed."

navigation:
  - screen.integrations

next_possible_events:
  - event.manage_integrations

responses:
  - "Integrations loaded."
  - "User can manage integrations."
---
