---
type: screen
id: screen.settings.legal_policies
title: Legal & Policies Settings Screen
status: active
related_features:
  - feature.manage_account
  - feature.adjust_preferences
related_components:
  - component.container.policy_list
  - component.button.policy_item
  - component.container.policy_content
  - component.button.accept
  - component.button.decline
related_events:
  - event.user.views_policy
  - event.user.accepts_policy
  - event.user.declines_policy
related_requests:
  - request.getPolicies
  - request.acceptPolicy
  - request.declinePolicy
related_endpoints:
  - api.get.policies
  - api.post.policy_acceptance
  - api.post.policy_decline
related_state:
  - state.settings.policies
  - state.settings.policyAcceptance
  - state.settings.selectedPolicy
related_db:
  - db.policies
  - db.policy_acceptances
  - db.user_policies
metrics:
  - metric.engagement.policy_views
  - metric.conversionRate.policy_acceptance
---