---
type: feature
id: feature.settings_management
title: Settings Management
description: |
  Allows users to manage their profile, integrations, notification preferences, payment methods, and restart onboarding to update goals and preferences. Centralizes user account and app configuration in a side-drawer accessible from the Dashboard by tapping the profile picture in the top-left corner.

sections:
  - name: Profile Management
    description: |
      Users can edit their profile information and change their profile picture from the side-drawer.
    events:
      - event.manage_profile
      - event.change_profile_picture
    screens:
      - screen.profile_account
    components:
      - component.profile_picture
      - component.settings_tile
    api_endpoint:
      - endpoint.api.user.profile.PATCH
    db:
      relational:
        - table.users
      graph: []

  - name: Integrations
    description: |
      Users can manage integrations with wearables, health data, and stores from the side-drawer.
    events:
      - event.open_integrations
    screens:
      - screen.integrations
    components:
      - component.integration_tile
      - component.settings_tile
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Notifications
    description: |
      Users can configure which types of push or email notifications they want to receive.
    events:
      - event.manage_notifications
      - event.open_notifications
    screens:
      - screen.notification_settings
    components:
      - component.settings_tile
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Payments
    description: |
      Users can view, add, remove, or edit payment methods for grocery checkout.
    events:
      - event.manage_payments
      - event.open_payments
    screens:
      - screen.payment_settings
    components:
      - component.settings_tile
    api_endpoint: []
    db:
      relational: []
      graph: []

  - name: Onboarding Restart
    description: |
      Users can restart the onboarding flow to update goals, dietary preferences, and other settings.
    events:
      - event.restart_onboarding_flow
      - event.open_goals_preferences
    screens:
      - screen.onboarding
    components:
      - component.settings_tile
    api_endpoint: []
    db:
      relational: []
      graph: []

design_system_reference: [design_system]
---
