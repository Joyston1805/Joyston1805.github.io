import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070B14',
          900: '#0B1220',
          800: '#121B2E',
          700: '#1A2740',
          600: '#263248',
        },
        paper: '#E8ECF1',
        signal: {
          amber: '#F2B705',
          teal: '#2DD4BF',
        },
        // Theme-aware: darker in light mode for contrast (see globals.css).
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
      },
      // Text-only overrides. Amber and teal backgrounds/borders keep the bright
      // brand colours in both themes; amber/teal *text* switches to darker
      // shades in light mode so it passes WCAG AA on white.
      textColor: {
        signal: {
          amber: 'rgb(var(--c-amber-text) / <alpha-value>)',
          teal: 'rgb(var(--c-teal-text) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(124,138,160,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,138,160,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, 30px) scale(1.1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        drift: 'drift 14s ease-in-out infinite',
        'drift-slow': 'drift 20s ease-in-out infinite reverse',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
