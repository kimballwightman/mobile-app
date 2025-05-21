---
type: table
id: table.users
title: Users
description: |
  Stores user account information and core profile data.

fields:
  - id: user_id
    type: uuid
    description: Unique identifier for the user.
    constraints: [primary key, not null]
  - id: email
    type: string
    description: User's email address.
    constraints: [unique, not null]
  - id: password_hash
    type: string
    description: Hashed password for authentication.
    constraints: [not null]
  - id: created_at
    type: timestamp
    description: Account creation timestamp.
    constraints: [not null]
  - id: updated_at
    type: timestamp
    description: Last profile update timestamp.
    constraints: [not null]

related:
  feature:
    - feature.authentication
    - feature.onboarding_flow
  event:
    - event.create_account_submit
    - event.login_submit
  screen:
    - screen.login
    - screen.create_account
  component:
    - component.input_field
  api_endpoint:
    - endpoint.auth_register.POST
    - endpoint.auth_login.POST
  db:
    graph:
      - node.user
---
