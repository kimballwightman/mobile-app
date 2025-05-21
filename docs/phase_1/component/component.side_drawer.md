---
type: component
id: component.side_drawer
title: Side Drawer
component_type: navigation
description: |
  A navigation drawer that slides in from the side, providing access to account, integrations, goals, notifications, and payments settings.

properties:
  - name: isOpen
    type: boolean
    description: "Whether the drawer is open."
  - name: onClose
    type: function
    description: "Callback to close the drawer."
  - name: menuItems
    type: array
    description: "List of menu items to display."

states:
  - state.open
  - state.closed

related:
  feature:
    - feature.dashboard
  event:
    - event.open_side_drawer
  screen:
    - screen.dashboard

design_system_reference: [design_system]
---
