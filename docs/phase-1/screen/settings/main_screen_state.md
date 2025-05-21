---
type: screen
id: screen.settings.main
title: Settings Main Screen
status: active
related_features:
  - feature.manage_account
  - feature.manage_notifications
  - feature.adjust_preferences
  - feature.set_nutrition_goals
  - feature.link_payment_methods
  - feature.report_issues
  - feature.rate_the_app
related_components:
  - component.container.settings_list
  - component.button.settings_item
  - component.button.logout
  - component.container.section_header
related_events:
  - event.user.views_settings
  - event.user.navigates_to_setting
  - event.user.logs_out
related_requests:
  - request.getUserSettings
  - request.logoutUser
related_endpoints:
  - api.get.user_settings
  - api.post.logout
related_state:
  - state.settings.main
  - state.settings.selectedSection
  - state.auth.isAuthenticated
related_db:
  - db.user_settings
  - db.users
metrics:
  - metric.engagement.settings
  - metric.conversionRate.settings_updates
---