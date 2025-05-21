---
type: event
id: event.meal_review_swipe
feature_id: feature.meal_review
title: User Swipes Meal Review Card
description: |
  This event is triggered when the user swipes a meal card left (bad/skipped) or right (good/ate it) on the Meal Review screen. After the swipe, options appear to provide detailed feedback before submitting.

preconditions:
  screens:
    - screen.meal_review: state.rendered
  components:
    - component.meal_review_card_deck: state.loaded
    - component.meal_review_card: state.active

trigger:
  trigger_type: user_action
  component: component.meal_review_card
  screen: screen.meal_review

api_request: {}

db_interactions:
  relational: []
  graph: []

state_changes:
  components:
    - component.meal_review_card:
        state: state.swiped
        description: "Meal review card is swiped left or right, triggering feedback options."
    - component.feedback_popup:
        state: state.rendered
        description: "Feedback popup/modal appears for user to provide details."
  screens:
    - screen.meal_review:
        state: state.rendered
        description: "Meal review deck updates to reflect swipe and show feedback options."

navigation: []

next_possible_events:
  - event.submit_detailed_feedback
  - event.meal_review_swipe

responses:
  - Triggers feedback popup/modal for detailed input.
  - Animates card swipe and updates deck.
---
