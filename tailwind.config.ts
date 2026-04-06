import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        elevated: '#131313',
        border: '#2A2A2A',
        text: {
          DEFAULT: '#F5F2E8',
          muted: '#C0C0C0',
        },
        accent: {
          gold: '#B08D57',
          silver: '#C0C0C0',
          crimson: '#8B0000',
        },
        graphite: '#454343',
        glass: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
