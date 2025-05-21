---
type: event
id: event.manage_payments
feature_id: feature.settings_management
title: Manage Payment Methods
description: |
  This event is triggered when the user selects the Payments option from the side drawer and interacts with the Payment Settings screen to view, add, edit, or remove payment methods.

preconditions:
  screens:
    - screen.payment_settings: state.rendered
  components:
    - component.payment_method_list: state.loaded

trigger:
  trigger_type: user_action
  component: component.payment_settings_action
  screen: screen.payment_settings

api_request:
  endpoint: endpoint.api.payment_methods.GET
  method: GET
  url: /api/payment-methods

db_interactions:
  relational:
    - table.payment_methods:
        actions:
          - "Retrieve user payment methods."
  graph: []

state_changes:
  components:
    - component.payment_method_list:
        state: state.updated
        description: "Payment methods list is updated with latest data."
  screens:
    - screen.payment_settings:
        state: state.payment_methods_loaded
        description: "Payment Settings screen displays all payment methods."

navigation: []

next_possible_events:
  - event.add_payment_method
  - event.edit_payment_method
  - event.remove_payment_method

responses:
  - "Payment methods displayed successfully."
  - "User can manage their payment options."
---
