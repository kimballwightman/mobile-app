---
type: event
id: event.forgot_password_resend_email_link
feature_id: feature.authentication
title: User Resends Forgot Password Email
description: |
  This event is triggered when the user taps the "Resend Email" link or button on the Forgot Password screen after a previous attempt to send the reset email failed or timed out. The app resends the password reset request to the backend, which generates a new reset token and sends another password reset email if the email exists in the system.

preconditions:
  screens:
    - screen.forgot_password: state.email_sent
  components:
    - component.submit_button: state.resend

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
          - "Generate and store new secure, time-limited reset token."
  graph: []

state_changes:
  components:
    - component.submit_button:
        state: state.loading
        description: "Resend Email button shows loading state while request is in progress."
    - component.input_field:
        state: state.disabled
        description: "Input field is disabled during submission."
    - component.submit_button:
        state: state.resend
        description: "Button remains as 'Resend Email' after success."
  screens:
    - screen.forgot_password:
        state: state.email_sent
        description: "Screen shows confirmation that reset email was resent."
    - screen.forgot_password:
        state: state.error
        description: "Screen shows error message if resend fails."

navigation: []

next_possible_events:
  - event.forgot_password_resend_email_link
  - event.forgot_password_back_to_login

responses:
  - On success, show confirmation message that email was resent.
  - Optionally add cooldown before allowing another resend.
  - On failure, show inline error if resend fails.
---
