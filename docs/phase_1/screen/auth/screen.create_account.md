---
type: screen
id: screen.create_account
title: Sign Up
description: |
  The sign up screen (Screen 2 in the blueprint) where users can create a new account by entering email, password, and confirming password.
route: /signup

states:
  - state.initial
  - state.rendered
  - state.email_input_updated
  - state.password_input_updated
  - state.confirm_password_updated
  - state.submitting
  - state.error

related:
  feature:
    - feature.authentication
  event:
    - event.create_account_input_email
    - event.create_account_input_password
    - event.create_account_confirm_password
    - event.create_account_submit
    - event.create_account_back_to_login
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
    
  - component: component.input_field
    position: middle
    props:
      type: password
      placeholder: "Password"
    description: "Password input field"
    
  - component: component.input_field
    position: middle
    props:
      type: password
      placeholder: "Confirm Password"
    description: "Confirm password input field"
    
  - component: component.submit_button
    position: middle
    props:
      text: "Sign Up"
    description: "Sign Up button to create account"
    
  - component: component.go_back_button
    position: bottom
    props:
      text: "Back to Login"
    description: "Button to return to login screen"
---
