---
type: screen
id: screen.settings.notifications
title: Notifications Settings Screen
status: active
related_features:
  - feature.manage_notifications
related_components:
  - component.input.toggle
  - component.input.select
  - component.button.primary
  - component.button.secondary
  - component.container.form
  - component.container.notification_preview
related_events:
  - event.user.updates_notification_settings
  - event.user.tests_notification
  - event.user.views_notification_logs
related_requests:
  - request.updateNotificationSettings
  - request.testNotification
  - request.getNotificationLogs
related_endpoints:
  - api.put.notification_settings
  - api.post.test_notification
  - api.get.notification_logs
related_state:
  - state.settings.notifications
  - state.settings.notificationLogs
  - state.settings.testNotification
related_db:
  - db.notification_settings
  - db.notification_logs
metrics:
  - metric.engagement.notification_updates
  - metric.conversionRate.notification_settings
---