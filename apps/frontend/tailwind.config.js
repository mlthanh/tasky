const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      backgroundSize: {
        full: '100% 100%'
      },
      backgroundImage: {
        auth_background: "url('/auth/background.png')"
      },
      fontFamily: {
        Jost: ['Jost', 'sans-serif'],
        Quicksand: ['Quicksand', 'sans-serif']
      },
      fontWeight: {
        display: {
          light: 300,
          normal: 400,
          semibold: 600,
          bold: 700
        }
      },
      colors: {
        'dark-mode': '#212332',
        'light-mode': '#fff',
        destructive: '#F85640',
        foreground: 'oklch(0.145 0 0)',
        accent: 'oklch(0.97 0 0)',
        'accent-foreground': 'oklch(0.205 0 0)',
        muted: 'oklch(0.97 0 0)',
        'muted-foreground': 'oklch(0.556 0 0)',
        red: '#F85640',
        orange: '#FBA63C',
        green: '#13854E',
        background: '#F5F5F5',
        primary: {
          DEFAULT: '#00ADB5',
          100: '#CCF2F4',
          200: '#99E5E9',
          300: '#66D8DE',
          400: '#33CCD3',
          500: '#00ADB5',
          600: '#009AA1',
          700: '#007A80'
        }
      },
      boxShadow: {
        cardShadow:
          'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.04)) drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.04)) drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.06))'
      },
      dropShadow: {
        titleShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        inputShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'
      },
      fontSize: {
        '2xs': '0.625rem', // Extra small
        xs: '0.75rem', // Small
        sm: '0.875rem', // Sub-compact
        base: '1rem', // Base
        lg: '1.125rem', // Large
        xl: '1.25rem', // Extra large
        '2xl': '1.5rem', // Double extra large
        '3xl': '1.875rem', // Triple extra large
        '4xl': '2.25rem', // Quadruple extra large
        '5xl': '3rem', // Penta extra large
        '6xl': '3.75rem', // Hexa extra large
        '7xl': '4.5rem', // Hepta extra large
        '8xl': '6rem', // Octa extra large
        '9xl': '8rem' // Nona extra large
      },
      padding: {
        auth: '60px',
        app: '40px'
      },
      sidebar: {
        DEFAULT: 'hsl(var(--sidebar-background))',
        foreground: 'hsl(var(--sidebar-foreground))',
        primary: 'hsl(var(--sidebar-primary))',
        'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        accent: 'hsl(var(--sidebar-accent))',
        'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        border: 'hsl(var(--sidebar-border))',
        ring: 'hsl(var(--sidebar-ring))'
      },
      keyframes: {
        progress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' }
        }
      },
      animation: {
        progress: 'progress 3s linear forwards'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};
