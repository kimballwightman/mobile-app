// Design system based on docs/phase_1/design_system.md
export const theme = {
  typography: {
    fontFamily: 'Neue Haas Grotesk, Inter, sans-serif',
    headingSizes: {
      h1: 48,
      h2: 36,
      h3: 28,
      h4: 22,
      h5: 18,
      h6: 16,
    },
    bodyText: {
      regular: 16,
      small: 14,
      extraSmall: 12,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
    lineHeight: {
      base: 1.5,
      heading: 1.35,
    },
  },
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    neutral: '#f9fafb',
    neutralDark: '#e5e7eb',
    surface: '#ffffff',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f97316',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 3px 6px rgba(0, 0, 0, 0.06)',
  },
  interactionStates: {
    focusRing: {
      color: '#3b82f6',
      width: 2,
      style: 'solid',
    },
    hoverTransition: {
      duration: '200ms',
      easing: 'ease-in-out',
    },
  },
  elevation: {
    low: 10,
    medium: 20,
    high: 40,
    modal: 50,
  },
  components: {
    button: {
      default: {
        backgroundColor: 'primary',
        textColor: 'surface',
        borderRadius: 'md',
        padding: '8px 16px',
        fontWeight: 'bold',
      },
      hover: {
        backgroundColor: 'primaryHover',
      },
      disabled: {
        backgroundColor: 'neutralDark',
        textColor: 'textSecondary',
      },
    },
    input: {
      default: {
        borderColor: 'neutralDark',
        backgroundColor: 'surface',
        padding: 'sm',
        fontSize: 16,
      },
      focus: {
        borderColor: 'primary',
        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
      },
    },
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },
  animations: {
    duration: {
      fast: 150,
      medium: 300,
      slow: 500,
    },
    easing: {
      standard: 'ease-in-out',
      acceleration: 'ease-in',
      deceleration: 'ease-out',
    },
  },
  gridSystem: {
    columns: 12,
    gutterWidth: 16,
    maxWidth: 1280,
  },
};

export type Theme = typeof theme;
export default theme; 