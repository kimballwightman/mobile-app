---
type: screen
id: screen.login
title: Login / Signup Selection
description: |
  The main authentication screen (Screen 1 in the blueprint) where users enter their email and password to log in. Includes app name/logo at the top, a "Continue" button, links to sign up and forgot password, and supports both Google and Apple OAuth login.
route: /login

states:
  - state.initial
  - state.rendered
  - state.email_input_updated
  - state.password_input_updated
  - state.submitting
  - state.error

related:
  feature:
    - feature.authentication
  event:
    - event.login_input_email
    - event.login_input_password
    - event.login_submit
    - event.login_success
    - event.login_error
    - event.create_account_link
    - event.forgot_password_link
    - event.google_login
    - event.apple_login
    - event.auth_token_expires
    - event.logout
    - event.network_failure
    - event.loading_spinner_timeout
  component:
    - component.input_field
    - component.submit_button
    - component.text_container
    - component.loading_spinner
    - component.image_container

design_system_reference: [design_system]

layout:
  - component: component.image_container
    position: top
    description: "App name/logo displayed at the top of the screen"
  
  - component: component.input_field
    position: middle
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
    
  - component: component.submit_button
    position: middle
    props:
      text: "Continue"
    description: "Continue button to submit login credentials"
    
  - component: component.text_container
    position: bottom
    props:
      text: "Forgot password?"
      isLink: true
    description: "Forgot password link"
    
  - component: component.text_container
    position: bottom
    props:
      text: "Sign up"
      isLink: true
    description: "Sign up link"
    
  - component: component.submit_button
    position: bottom
    props:
      text: "Sign in with Google"
      variant: "outline"
    description: "Google OAuth login button"
    
  - component: component.submit_button
    position: bottom
    props:
      text: "Sign in with Apple"
      variant: "outline"
    description: "Apple OAuth login button"
---
