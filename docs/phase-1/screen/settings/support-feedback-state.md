---
type: screen
id: screen.settings.support_feedback
title: Support & Feedback Settings Screen
status: active
related_features:
  - feature.report_issues
  - feature.rate_the_app
  - feature.view_feedback_logs
related_components:
  - component.input.text
  - component.input.textarea
  - component.button.primary
  - component.button.secondary
  - component.container.form
  - component.container.feedback_history
related_events:
  - event.user.submits_issue
  - event.user.rates_app
  - event.user.views_feedback_history
related_requests:
  - request.submitIssue
  - request.submitRating
  - request.getFeedbackHistory
related_endpoints:
  - api.post.issues
  - api.post.ratings
  - api.get.feedback_history
related_state:
  - state.settings.supportIssue
  - state.settings.appRating
  - state.settings.feedbackHistory
related_db:
  - db.issues
  - db.ratings
  - db.feedback_history
metrics:
  - metric.engagement.support_usage
  - metric.conversionRate.feedback_submission
---