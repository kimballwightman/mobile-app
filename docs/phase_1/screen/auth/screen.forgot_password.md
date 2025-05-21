---
type: screen
id: screen.forgot_password
title: Forgot Password
description: |
  The forgot password screen (Screen 3 in the blueprint) where users can request a password reset by entering their email address, with "Reset password" button and "Resend email" functionality.
route: /forgot-password

states:
  - state.initial
  - state.rendered
  - state.email_input_updated
  - state.submitting
  - state.email_sent
  - state.error

related:
  feature:
    - feature.authentication
  event:
    - event.forgot_password_input_email
    - event.forgot_password_submit
    - event.forgot_password_resend_email_link
    - event.forgot_password_back_to_login
  component:
    - component.input_field
    - component.submit_button
    - component.go_back_button
    - component.text_container
    - component.loading_spinner

design_system_reference: [design_system]

layout:
  - component: component.input_field
    position: top
    props:
      type: email
      placeholder: "Email Address"
    description: "Email input field"
    
  - component: component.submit_button
    position: middle
    props:
      text: "Reset Password"
    description: "Reset password button that sends an email to user with password reset link"
    
  - component: component.submit_button
    position: middle
    props:
      text: "Resend Email"
      isVisible: "state.email_sent"
    description: "Resend email button that allows user to resend email for password reset"
    
  - component: component.go_back_button
    position: bottom
    props:
      text: "Back to Login"
    description: "Button to return to login screen"
    
  - component: component.text_container
    position: middle
    props:
      text: "If an account with that email exists, you'll receive a password reset link"
      isVisible: "state.email_sent"
    description: "Confirmation message displayed after email is sent"
---
