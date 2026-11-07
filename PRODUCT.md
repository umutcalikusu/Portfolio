# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary audience: freelance clients** (businesses, founders) with a product idea or technical problem, deciding whether Umut can be trusted to build or fix it. They need to see competence and a direct way to make contact. Umut is **not looking for a job** (confirmed Nov 2026), so the site does not court recruiters; the CV stays available as background, not as a hiring call to action.

Visitors arrive in English or Turkish.

## Product Purpose

A personal portfolio for Umut Çalıkuşu, Computer Engineer and Full-Stack Developer. It turns a visitor's first impression into a project conversation: "Have an idea? Let's build it." Success means a qualified visitor emails Umut about a project.

## Positioning

**Enterprise backend first.** The lead claim is hands-on work on business-critical systems in two regulated, high-reliability domains, delivered via Techne Bilişim:

- **Payment systems** for Ziraat Katılım (2025 to present): transaction processing, secure payment integrations, .NET and SQL backend services.
- **Telecommunications** for Türk Telekom (2024 to present): data-heavy query systems, validation flows, query optimization (T-SQL / PL-SQL), high-availability services.

Full-stack range (React, Vue.js) and the side projects support that claim. They are not the headline. Few junior or mid portfolios can truthfully claim production payment and telecom work at once; that combination is the differentiator.

## Operating Context

- Visitors usually come from a CV, a LinkedIn profile, or a direct link, and decide in seconds whether to read further.
- Freelance clients may open it on a phone and forward it to a co-founder.
- Contact runs through `mailto:umut54709@gmail.com`, GitHub (`github.com/umutcalikusu`), and LinkedIn. There is no contact form or backend.

## Capabilities and Constraints

- Existing codebase: React 18 + Vite, Tailwind CSS 3, Framer Motion, Lenis smooth scroll, react-icons. Single page with sections Home, About, Experience, Skills, Projects (Work), Contact. Static site, no backend.
- **Bilingual: English and Turkish**, with a language switch. Currently all content is English while `index.html` declares `lang="tr"`. This mismatch must be fixed when i18n is added: `lang` follows the active language.
- Enterprise work may be described with **anonymized detail**: the problem, the approach, and rough scale are allowed. No confidential system names, internal screenshots, exact client metrics, or anything under NDA.
- Projects data lives in `src/data/data.js`. **None of the side projects has a live deployment** (confirmed): only GitHub code links exist, and the site shows no "Live demo" link. Movie Application has no public repository.
- Visual direction: keep the existing dark, lively site and its energy. Light 3D animation is wanted later, as the final step; a calm/restrained redesign was tried and rejected (Nov 2026).

## Brand Commitments

- Name: **Umut Çalıkuşu**. Keep the Turkish characters (ç, ı, ş) in every language.
- Title: "Computer Engineer & Full-Stack Developer".
- Existing logo: `public/logo.png` / `src/assets/logo.png`.
- Voice so far: confident, first person, direct ("Have an idea? Let's build it.").

## Evidence on Hand

- Portrait: `src/assets/umut.jpg`.
- CV: `public/Umut-CV.pdf`.
- Experience entries (Ziraat Katılım payments, Türk Telekom telecom, Computer Engineering degree) in `src/components/Experience.jsx`.
- Side-project screenshots in `src/assets/projects/`: Corona, Weather, Movie, self-playing Dino game (AI), Kanban, Restaurant & QR Menu platform, plus unused images (login, music player, QR code, quiz, todo).
- Hero stats confirmed as-is by the user: 5+ Projects, 2+ Years Exp., 10+ Tech Stack, 24/7 Learning.
- **Absent, do not fabricate:** testimonials, client or employer quotes, freelance client names, performance metrics for enterprise systems, the university name (the education entry says "University" until Umut provides it), and live demo URLs (none exist).

## Product Principles

1. **Lead with the hard work.** Payment and telecom backend experience comes first; side projects are supporting evidence.
2. **Every road leads to a project conversation.** The main action is emailing Umut about an idea; the CV is supporting material, not a hiring pitch.
3. **Concrete over adjectives.** Describe real problems, approaches, and stacks at an anonymized level rather than generic claims like "passionate about clean code".
4. **Truthful by default.** Never invent proof, metrics, or clients; honor NDA limits on enterprise work.
5. **Equal footing in both languages.** Turkish is a first-class version, not a machine-translated afterthought.
