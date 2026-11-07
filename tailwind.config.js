/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        ink: '#050814',
        panel: '#091022',
        line: 'rgba(132, 158, 211, 0.16)',
        muted: '#8d99ad',
        // DEFAULT keeps `text-blue` working without wiping Tailwind's blue-50…950 scale.
        blue: { DEFAULT: '#328cff' },
        violet: { DEFAULT: '#7357ff' },
      },
      boxShadow: {
        glow: '0 0 70px rgba(50, 140, 255, .16)',
      },
    },
  },
  plugins: [],
};
