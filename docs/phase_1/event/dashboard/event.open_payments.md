---
type: event
id: event.open_payments
feature_id: feature.dashboard
title: Open Payments Section
description: |
  Triggered when the user selects the Payments option from the dashboard side drawer. Navigates to the payments settings screen for managing payment methods and subscriptions.

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
  endpoint: api.user_payments.GET
  method: GET
  url: /api/user/payments

db_interactions:
  relational:
    - table.user_payments:
        actions:
          - "Fetch user payment methods and subscriptions."
  graph:
    - node.user:
        actions:
          - "Read payment relationships."

state_changes:
  components:
    - component.side_drawer:
        state: state.closed
        description: "Side drawer closes after selection."
  screens:
    - screen.payment_settings:
        state: state.payment_settings_open
        description: "Payment settings screen is displayed."

navigation:
  - screen.payment_settings

next_possible_events:
  - event.manage_payments

responses:
  - "Payment methods and subscriptions loaded."
  - "User can manage payment options."
---
