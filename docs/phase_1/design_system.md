---
type: design_system
id: design_system
title: Core Design System
description: "Defines the visual and interaction rules for all components, screens, and states. Aligned with the app brand: clean, modern, minimal, and tech-forward."
typography:
  font_family: Neue Haas Grotesk, Inter, sans-serif
  heading_sizes:
    h1: 48px
    h2: 36px
    h3: 28px
    h4: 22px
    h5: 18px
    h6: 16px
  body_text:
    regular: 16px
    small: 14px
    extra_small: 12px
  font_weight:
    regular: 400
    medium: 500
    bold: 700
  line_height:
    base: "1.5"
    heading: "1.35"
colors:
  primary: "#3b82f6"
  primary_hover: "#2563eb"
  neutral: "#f9fafb"
  neutral_dark: "#e5e7eb"
  surface: "#ffffff"
  text_primary: "#111827"
  text_secondary: "#6b7280"
  error: "#ef4444"
  success: "#22c55e"
  warning: "#f97316"
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
border_radius:
  sm: 4px
  md: 8px
  lg: 16px
shadows:
  sm: 0 1px 2px rgba(0, 0, 0, 0.04)
  md: 0 3px 6px rgba(0, 0, 0, 0.06)
interaction_states:
  focus_ring:
    color: "#3b82f6"
    width: 2px
    style: solid
  hover_transition:
    duration: 200ms
    easing: ease-in-out
elevation:
  low: z-10
  medium: z-20
  high: z-40
  modal: z-50
components:
  button:
    default:
      background_color: primary
      text_color: surface
      border_radius: md
      padding: sm md
      font_weight: bold
    hover:
      background_color: primary_hover
    disabled:
      background_color: neutral_dark
      text_color: text_secondary
  input:
    default:
      border_color: neutral_dark
      background_color: surface
      padding: sm
      font_size: body_text.regular
    focus:
      border_color: primary
      box_shadow: 0 0 0 2px rgba(59, 130, 246, 0.3)
breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px
animations:
  duration:
    fast: 150ms
    medium: 300ms
    slow: 500ms
  easing:
    standard: ease-in-out
    acceleration: ease-in
    deceleration: ease-out
grid_system:
  columns: 12
  gutter_width: 16px
  max_width: 1280px
---
