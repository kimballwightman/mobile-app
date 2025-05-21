---
type: screen
id: screen.onboarding.complete
title: Onboarding Complete Screen
status: active
related_features:
  - feature.onboarding_flow
related_components:
  - component.button.primary
  - component.container.success
  - component.container.progress
related_events:
  - event.user.completes_onboarding
  - event.user.starts_exploring
related_requests:
  - request.completeOnboarding
  - request.getInitialRecommendations
related_endpoints:
  - api.post.complete_onboarding
  - api.get.initial_recommendations
related_state:
  - state.onboarding.completed
  - state.onboarding.initialState
related_db:
  - db.user_onboarding
  - db.user_preferences
metrics:
  - metric.conversionRate.onboarding_completion
---