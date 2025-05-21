---
type: event
id: event.forgot_password_resend_email_error
title: Forgot Password Resend Email Error
description: |
  This event occurs when the user clicks on the "Resend Email" link during the Forgot Password flow, and the Forgot Password API responds with an error (e.g., email not found or API failure). It triggers an error message to be displayed on the screen and provides feedback to the user that the resend attempt failed.
preconditions:
  - User is on the Forgot Password screen
  - Email field is rendered and contains a previously entered email
trigger:
  trigger_type: api_response
  api_endpoint: /forgot-password/resend-email
responses:
  - Show error message (e.g., “An error occurred while resending the email”)
  - Provide visual feedback (e.g., highlight input fields or display an icon indicating failure)
related:
  feature:
    - Authentication
  screen:
    - Forgot Password
  api_endpoint:
    - /forgot-password/resend-email
state_changes:
  components:
    - component.forgot_password_resend_email:
        state: error
        description: "Indicates that the resend email process has failed"
  screens:
    - screen.forgot_password:
        state: error
        description: "Displays an error message on the Forgot Password screen"
next_possible_events:
  - event.forgot_password_resend_email_link
  - event.forgot_password_back_to_login
---
