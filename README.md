# Umut Çalıkuşu — Portfolio

Personal portfolio of Umut Çalıkuşu, Computer Engineer & Full-Stack Developer: backend work on payment systems (Ziraat Katılım) and telecom data (Türk Telekom) via Techne Bilişim, plus side projects.

A dark, animated single-page site with sections Home, About, Experience, Skills, Projects and Contact.

## Stack
- React 18 + Vite
- Tailwind CSS 3
- Framer Motion (section animations)
- Three.js + React Three Fiber + Drei (3D scenes, lazy-loaded)
- Lenis (smooth scrolling, turned off when the visitor prefers reduced motion)
- react-icons

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
npm run preview
```
The build goes to `dist/`.

## Editing content
| What | Where |
|---|---|
| Projects (name, screenshot, description, GitHub link, optional `tech` badges) | `src/data/data.js` |
| Project screenshots | `src/assets/projects/` |
| Hero text, stats and tech badges | `src/components/Home.jsx` |
| Experience entries | `src/components/Experience.jsx` |
| Skills | `src/components/Skills.jsx` |
| CV (PDF) | `public/Umut-CV.pdf` |
| Page title, description and share image | `index.html` |

The projects have no live deployments, so each card links only to its GitHub repository. Leave `github` empty for a private repository and the card shows "Private".

## 3D scenes
The 3D code lives in `src/three/` and loads only after the page is open:
- `HeroNetwork.jsx`: the data network behind the hero, which fades out as you scroll.
- `ProjectGallery.jsx`: the 3D project arc, shown on desktop (1024px+ with a mouse). Phones and tablets get the regular project cards.
- `ParticleText.jsx`: draws "Let’s build it." in Contact as particles that scatter around the cursor.

Each scene animates only while it is on screen, and none of them load without WebGL or when the visitor prefers reduced motion; the normal page shows instead.

## Colours and fonts
Theme colours live in `tailwind.config.js` (`ink`, `panel`, `blue`, `violet`, …). `blue` and `violet` are defined with `DEFAULT`, so `text-blue` uses the brand blue while Tailwind's own `blue-300`…`blue-600` shades keep working. Fonts are Manrope and DM Mono, loaded in `src/index.css`.
