---
type: event
id: event.forgot_password_submit
feature_id: feature.authentication
title: User Submits Forgot Password Form
description: |
  This event is triggered when the user taps the "Send Email" button on the Forgot Password screen. The app sends a password reset request to the backend, which generates a reset token and sends a password reset email if the email exists in the system.

preconditions:
  screens:
    - screen.forgot_password: state.email_input_updated
  components:
    - component.input_field: state.updated
    - component.submit_button: state.enabled

trigger:
  trigger_type: user_action
  component: component.submit_button
  screen: screen.forgot_password

api_request:
  endpoint: api.auth_forgot_password.POST
  method: POST
  url: /api/auth/forgot-password

db_interactions:
  relational:
    - table.users:
        actions:
          - "Find user by email."
    - table.password_resets:
        actions:
          - "Generate and store secure, time-limited reset token."
  graph: []

state_changes:
  components:
    - component.submit_button:
        state: state.loading
        description: "Send Email button shows loading state while request is in progress."
    - component.input_field:
        state: state.disabled
        description: "Input field is disabled during submission."
    - component.submit_button:
        state: state.resend
        description: "Button label changes to 'Resend Email' after success."
  screens:
    - screen.forgot_password:
        state: state.email_sent
        description: "Screen shows confirmation that reset email was sent."
    - screen.forgot_password:
        state: state.error
        description: "Screen shows error message if email is not found."

navigation: []

next_possible_events:
  - event.forgot_password_resend_email_link
  - event.forgot_password_back_to_login

responses:
  - On success, show confirmation message and update button to 'Resend Email'.
  - Optionally add cooldown before allowing resend.
  - On failure, show inline error if email is not found.
---
