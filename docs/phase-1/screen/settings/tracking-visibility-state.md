---
type: screen
id: screen.settings.tracking_visibility
title: Tracking & Visibility Settings Screen
status: active
related_features:
  - feature.adjust_preferences
  - feature.view_nutrition_summary
related_components:
  - component.input.toggle
  - component.input.select
  - component.button.primary
  - component.button.secondary
  - component.container.form
  - component.container.visibility_preview
related_events:
  - event.user.updates_tracking_settings
  - event.user.updates_visibility_settings
  - event.user.views_privacy_summary
related_requests:
  - request.updateTrackingSettings
  - request.updateVisibilitySettings
  - request.getPrivacySummary
related_endpoints:
  - api.put.tracking_settings
  - api.put.visibility_settings
  - api.get.privacy_summary
related_state:
  - state.settings.tracking
  - state.settings.visibility
  - state.settings.privacySummary
related_db:
  - db.tracking_settings
  - db.visibility_settings
  - db.privacy_summaries
metrics:
  - metric.engagement.tracking_updates
  - metric.conversionRate.visibility_updates
---