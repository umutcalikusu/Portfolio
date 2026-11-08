# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary audience: recruiters and developers** (updated Nov 2026). Recruiters and hiring managers evaluate Umut's experience and usually leave with the CV; fellow developers look at his work, stack and code on GitHub. Both need to understand quickly who he is and what he has built.

**Secondary audience: people with an idea** (founders, businesses) who want to reach him about a project. They need a clear, direct way to make contact.

Visitors may be English or Turkish speakers; the site is English only.

## Product Purpose

A personal portfolio for Umut Çalıkuşu, Computer Engineer and Full-Stack Developer, whose first job is to **introduce him**: who he is, where he works, what he has built and with which stack. Its second job is to let people with an idea reach him ("Have an idea? Let's build it.").

Success means a recruiter or developer leaves with a clear picture of Umut (and often the CV), and a visitor with an idea finds a direct way to contact him. **The CV download is important and stays in the header.**

## Positioning

**Enterprise backend first.** The lead claim is hands-on work on business-critical systems in two regulated, high-reliability domains, delivered via Techne Bilişim:

- **Payment systems** for Ziraat Katılım (2025 to present): migrating Ziraat Bank's payment systems module to a participation bank. Reshaping the .NET services and database workflows (SQL Server and Oracle PL/SQL) for the new bank's requirements, and rebuilding the original React screens in plain JavaScript.
- **Telecommunications** for Türk Telekom (2024 to present): maintaining and extending a query system fed by many SOAP services and an Oracle database. Fixing bugs across these integrations, tuning slow Oracle (PL/SQL) queries, and building new features. No SQL Server or T-SQL in this project.

Full-stack range (React, Vue.js) and the side projects support that claim. They are not the headline. Few junior or mid portfolios can truthfully claim production payment and telecom work at once; that combination is the differentiator.

## Operating Context

- Visitors usually come from a CV, a LinkedIn profile, or a direct link, and decide in seconds whether to read further.
- Recruiters may open it on a phone between other candidates; people with an idea may forward it to a co-founder.
- Contact runs through `mailto:umut54709@gmail.com`, GitHub (`github.com/umutcalikusu`), and LinkedIn. There is no contact form or backend.

## Capabilities and Constraints

- Existing codebase: React 18 + Vite, Tailwind CSS 3, Framer Motion, Lenis smooth scroll, react-icons. Single page with sections Home, About, Experience, Skills, Projects (Work), Contact. Static site, no backend.
- **English only** (decided Nov 2026): no Turkish version or language switch is planned. `index.html` declares `lang="en"`.
- Enterprise work may be described with **anonymized detail**: the problem, the approach, and rough scale are allowed. No confidential system names, internal screenshots, exact client metrics, or anything under NDA.
- Projects data lives in `src/data/data.js`. **None of the side projects has a live deployment** (confirmed): only GitHub code links exist, and the site shows no "Live demo" link. Movie Application has no public repository.
- Visual direction: a dark, lively site with light 3D moments (project gallery, particle text) and the warm "Çalıkuşu" palette (see Brand Commitments). A calm/restrained redesign was tried and rejected (Nov 2026).

## Brand Commitments

- Name: **Umut Çalıkuşu**. Always keep the Turkish characters (ç, ı, ş).
- Title: "Computer Engineer & Full-Stack Developer".
- Existing logo: `public/logo.png` / `src/assets/logo.png`.
- **Colour palette: the "Çalıkuşu" palette is confirmed and binding** (Nov 2026). Its single source is `src/theme.js`; keep it unless Umut asks for a change.
  - Ground `#14110F`, surface `#1C1815`, raised surface `#26201C`, borders `#F2EDE6` at 10%.
  - Text: primary `#F2EDE6`, secondary `#A39A90`, muted `#8C8278` (lightened from `#6E655C` to pass WCAG AA).
  - Accent: rust orange `#D9622B` (hover `#E6743D`); secondary accent: light honey `#E8C07A`, used sparingly (terminal prompt, small details, badges).
- Signature mark: the çalıkuşu (wren) silhouette in `src/components/Wren.jsx`, used on the 404 page and the "View My Work" hover.
- Voice so far: confident, first person, direct ("Have an idea? Let's build it.").

## Evidence on Hand

- Portrait: `src/assets/umut.jpg`.
- CV: `public/Umut-CV.pdf`.
- Experience entries (Ziraat Katılım payments, Türk Telekom telecom, Computer Engineering degree) in `src/components/Experience.jsx`.
- Side-project screenshots in `src/assets/projects/`: Corona, Weather, Movie, self-playing Dino game (AI), Kanban, Restaurant & QR Menu platform, plus unused images (login, music player, QR code, quiz, todo).
- Hero stats (5+ projects, 2+ years, 10+ tech, 24/7 learning) were removed from the hero at the user's request (Nov 2026).
- **Absent, do not fabricate:** testimonials, client or employer quotes, freelance client names, performance metrics for enterprise systems, the university name (not needed: the education entry stays "University" by choice), and live demo URLs (none exist).

## Product Principles

1. **Lead with the hard work.** Payment and telecom backend experience comes first; side projects are supporting evidence.
2. **Introduce first, invite second.** The site's main job is presenting Umut; the CV download stays prominent in the header. The project conversation ("Have an idea?") is the secondary path and remains easy to find.
3. **Concrete over adjectives.** Describe real problems, approaches, and stacks at an anonymized level rather than generic claims like "passionate about clean code".
4. **Truthful by default.** Never invent proof, metrics, or clients; honor NDA limits on enterprise work.
