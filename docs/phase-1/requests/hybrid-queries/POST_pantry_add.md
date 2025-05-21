---
# Basic Identity
id: screen_dashboard_main                    # Globally unique identifier
type: frontend_screen                        # Type of doc (see types below)
name: Main Dashboard                         # Human-readable name
status: stable                               # ["draft", "in_progress", "stable", "deprecated"]

# Contextual Metadata
description: >
  The main dashboard screen for users after login. Displays summary metrics, 
  recent activity, and navigational access to other parts of the app.

tags: [dashboard, authenticated, analytics, screen]

created_by: kimballwightman
created_at: 2024-04-14
updated_at: 2025-04-14

# Relationships / Traceability
related_components:
  - component_card_metric_summary
  - component_nav_sidebar
calls_api:
  - api_get_user_metrics
  - api_get_recent_activity
writes_to: []
reads_from:
  - db_table_user_stats
  - db_table_activity_log
triggers_events:
  - event_navigate_to_user_profile
linked_docs:
  - route_dashboard
  - layout_main_container

# Intent / Purpose
user_intent: view_dashboard_data
business_goal: Provide a high-level snapshot of user activity and KPIs

# RAG & Embedding Optimization
embedding_summary: >
  This screen is the authenticated landing page for users after login. 
  It presents personalized metrics, recent activity, and quick access 
  to key navigation elements. It is tightly coupled with analytics API endpoints 
  and supports user intent tracking for personalization.

# Optional Extensibility Block
custom:
  telemetry_tracked: true
  language: react
  layout: 2-column
  ai_generated: false
---

# 📱 Main Dashboard Screen

This is the default landing screen for users once authenticated. It acts as the central hub for the app's key features. Users can view...

- A summary of core metrics
- Recent actions they've taken
- Navigational access to...

**POST /pantry/add**  
_Adds a food item to the pantry._

- **Input:** `{ userId, foodId, quantity, expirationDate }`
    
- **Response:** `{ success: true }`