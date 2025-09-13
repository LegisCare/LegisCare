/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // emerald-500
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // gray-900
        primary: {
          DEFAULT: 'var(--color-primary)', // white
          foreground: 'var(--color-primary-foreground)', // gray-900
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // gray-50
          foreground: 'var(--color-secondary-foreground)', // gray-900
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-100
          foreground: 'var(--color-muted-foreground)', // gray-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // emerald-500
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // gray-900
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // gray-900
        },
        surface: {
          DEFAULT: 'var(--color-surface)', // gray-100
          foreground: 'var(--color-surface-foreground)', // gray-900
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-600
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-600
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600
          foreground: 'var(--color-error-foreground)', // white
        },
        'chat-bubble-user': {
          DEFAULT: 'var(--color-chat-bubble-user)', // emerald-500
          foreground: 'var(--color-chat-bubble-user-foreground)', // white
        },
        'chat-bubble-ai': {
          DEFAULT: 'var(--color-chat-bubble-ai)', // gray-100
          foreground: 'var(--color-chat-bubble-ai-foreground)', // gray-900
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)', // 16px
        md: 'var(--radius-md)', // 12px
        sm: 'var(--radius-sm)', // 8px
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)', // 0 1px 3px rgba(0,0,0,0.05)
        'md': 'var(--shadow-md)', // 0 4px 12px rgba(0,0,0,0.08)
        'lg': 'var(--shadow-lg)', // 0 8px 24px rgba(0,0,0,0.12)
        'widget': '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        'tooltip': '0 4px 12px rgba(0,0,0,0.08)',
      },
      animation: {
        'breathe': 'breathe 2s ease-in-out infinite',
        'typing-dots': 'typing-dots 1.4s ease-in-out infinite',
        'slide-up': 'slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scale-in 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        'widget': '9999',
        'tooltip': '10000',
        'modal': '10001',
      },
      backdropBlur: {
        'xs': '2px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      maxWidth: {
        'chat': '380px',
        'chat-mobile': '100vw',
      },
      maxHeight: {
        'chat': '600px',
        'chat-mobile': '80vh',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}