import { palette as p, rgba } from "./src/theme.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Fallbacks are metric-matched so text doesn't reflow when the web
        // fonts arrive: "Manrope Fallback" (index.css) is Arial resized to
        // Manrope's width; Courier New has DM Mono's exact 0.6em advance.
        sans: ["Manrope", "Manrope Fallback", "sans-serif"],
        mono: ["DM Mono", "Courier New", "Menlo", "Roboto Mono", "monospace"],
      },
      // Semantic colour roles; components use only these.
      colors: {
        bg: p.bg,
        surface: p.surface,
        raised: p.raised,
        line: rgba(p.fg, 0.1),
        fg: { DEFAULT: p.fg, 2: p.fg2, 3: p.fg3 },
        accent: { DEFAULT: p.accent, hover: p.accentHover },
        honey: p.honey,
      },
      boxShadow: {
        glow: `0 0 70px ${rgba(p.accent, 0.06)}`,
        cta: `0 15px 45px ${rgba(p.accent, 0.18)}`,
        "accent-line": `0 0 12px ${rgba(p.accent, 0.55)}`,
      },
      dropShadow: {
        accent: `0 0 8px ${rgba(p.accent, 0.4)}`,
      },
      backgroundImage: {
        "hero-glow": `radial-gradient(circle at 72% 20%, ${rgba(p.accent, 0.06)}, transparent 30%), radial-gradient(circle at 40% 50%, ${rgba(p.honey, 0.03)}, transparent 35%)`,
      },
    },
  },
  plugins: [],
};
