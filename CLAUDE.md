# Zebrano Interiors — redesigned website

## What this is
From-scratch premium multipage static site for a Delhi & NCR turnkey interior design studio.
Contract/assumptions: dark "zebrano" espresso world, cinnabar accent, reactbits-grade motion,
multipage (6 pages), no backend — contact routes to WhatsApp/mail/phone. Facts from the live
site are frozen (stats, services, process, contact details) — see docs/PRODUCT.md.

## Tech stack
- Static HTML/CSS/JS, no build step. Serve with `python -m http.server`.
- CDN: GSAP 3.12 + ScrollTrigger (cdnjs), Lenis 1.1 (unpkg), Google Fonts (Gloock, Archivo, JetBrains Mono).
- No framework. All animation enhancement-only, gated by `html.js` + `prefers-reduced-motion`.

## Folder map
- `index.html about.html services.html projects.html process.html contact.html` — pages
- `assets/css/tokens.css` — design tokens only (espresso world, see docs/DESIGN.md)
- `assets/css/main.css` — all component + page styles
- `assets/js/main.js` — shell: preloader, nav, lenis, cursor, grain, page transitions
- `assets/js/motion.js` — splitter, reveals, counters, marquee, magnet, tilt, spotlight, gallery, form
- `assets/img/` — real studio renders (JPEG), `assets/favicon.svg`
- `docs/` — PRD.md, PRODUCT.md (frozen facts), DESIGN.md (visual world), TASKS.md (execution)

## Rules
- Never invent facts: stats, services, process steps, contact info are frozen (docs/PRODUCT.md).
- Change the product → update docs/PRODUCT.md (and PRD.md) first, then code.
- Motion is enhancement-only; content must be readable with JS off, no blinking under reduced-motion.
- Images: explicit width/height, lazy below fold, JPEG; keep no CLS.
- One visual world everywhere: espresso ground, bone ink, cinnabar accent, hairline rules, mono labels.
- Delete replaced code; no dead files.

## Commands
- Run: `python -m http.server 4173` from this folder → http://localhost:4173
- Verify: Playwright screenshots + console-error check