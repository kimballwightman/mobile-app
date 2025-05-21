---
type: feature
id: feature.authentication
title: Authentication
description: |
  Handles user authentication, including login, sign up, password reset, OAuth (Google and Apple), and session management. Ensures secure access to the app and manages user sessions.

sections:
  - name: Login Flow
    description: |
      User login with email and password, including error handling and session management. This corresponds to "Screen 1: Login / Signup Selection" in the blueprint, with app logo at top.
    events:
      - event.app_launch
      - event.login_input_email
      - event.login_input_password
      - event.login_submit
      - event.login_success
      - event.login_error
      - event.auth_token_expires
      - event.logout
      - event.network_failure
      - event.loading_spinner_timeout
    screens:
      - screen.login
      - screen.dashboard
    components:
      - component.input_field
      - component.submit_button
      - component.text_container
      - component.image_container
    api_endpoint:
      - endpoint.api.auth_login.POST
    db:
      relational:
        - table.users
      graph:
        - node.user

  - name: Sign Up Flow
    description: |
      User registration with email, password, and confirm password, including validation and error handling. This corresponds to "Screen 2: Sign up" in the blueprint.
    events:
      - event.create_account_link
      - event.create_account_input_email
      - event.create_account_input_password
      - event.create_account_confirm_password
      - event.create_account_submit
      - event.create_account_back_to_login
    screens:
      - screen.create_account
    components:
      - component.input_field
      - component.submit_button
      - component.go_back_button
      - component.text_container
    api_endpoint:
      - endpoint.api.auth_signup.POST
    db:
      relational:
        - table.users
      graph: []

  - name: Forgot Password
    description: |
      Password reset flow, including email input, sending reset email, and resending if needed. This corresponds to "Screen 3: Forgot password" in the blueprint, with explicit "Resend email" button functionality.
    events:
      - event.forgot_password_link
      - event.forgot_password_input_email
      - event.forgot_password_submit
      - event.forgot_password_resend_email_link
      - event.forgot_password_back_to_login
    screens:
      - screen.forgot_password
    components:
      - component.input_field
      - component.submit_button
      - component.go_back_button
      - component.text_container
    api_endpoint:
      - endpoint.api.auth_forgot_password.POST
    db:
      relational:
        - table.users
        - table.password_resets
      graph: []

  - name: OAuth (Google Login)
    description: |
      Login and registration using Google OAuth.
    events:
      - event.google_login
    screens:
      - screen.login
      - screen.onboarding
      - screen.dashboard
    components:
      - component.submit_button
      - component.input_field
    api_endpoint:
      - endpoint.api.auth_oauth_google.POST
    db:
      relational:
        - table.users
      graph: []

  - name: OAuth (Apple Login)
    description: |
      Login and registration using Apple OAuth.
    events:
      - event.apple_login
    screens:
      - screen.login
      - screen.onboarding
      - screen.dashboard
    components:
      - component.submit_button
      - component.input_field
    api_endpoint:
      - endpoint.api.auth_oauth_apple.POST
    db:
      relational:
        - table.users
      graph: []

  - name: Session Management
    description: |
      Handles session expiration, logout, and error states.
    events:
      - event.auth_token_expires
      - event.logout
      - event.network_failure
      - event.loading_spinner_timeout
    screens:
      - screen.login
      - screen.dashboard
      - screen.onboarding
      - screen.profile_account
      - screen.meal_planning_tab
    components:
      - component.input_field
      - component.submit_button
      - component.settings_tile
    api_endpoint: []
    db:
      relational: []
      graph: []

design_system_reference: [design_system]
---
