---
type: screen
id: screen.settings.payment_subscription
title: Payment & Subscription Settings Screen
status: active
related_features:
  - feature.link_payment_methods
  - feature.checkout_flow
related_components:
  - component.input.card
  - component.input.select
  - component.button.primary
  - component.button.secondary
  - component.container.form
  - component.container.payment_methods
  - component.container.subscription_details
related_events:
  - event.user.adds_payment_method
  - event.user.updates_subscription
  - event.user.views_billing_history
related_requests:
  - request.addPaymentMethod
  - request.updateSubscription
  - request.getBillingHistory
related_endpoints:
  - api.post.payment_methods
  - api.put.subscription
  - api.get.billing_history
related_state:
  - state.settings.paymentMethods
  - state.settings.subscription
  - state.settings.billingHistory
related_db:
  - db.payment_methods
  - db.subscriptions
  - db.billing_history
metrics:
  - metric.engagement.payment_updates
  - metric.conversionRate.subscription_updates
---