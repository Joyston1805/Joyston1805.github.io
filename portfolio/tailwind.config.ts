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
        muted: '#7C8AA0',
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
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
