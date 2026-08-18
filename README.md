# Zebrano Interiors — Redesigned Website

Premium, from-scratch multipage website for Zebrano Interiors, a turnkey interior & exterior
design studio in Delhi & NCR. Dark "zebrano" espresso identity, editorial specimen plates,
reactbits-style motion (split text, magnetic buttons, tilt/spotlight cards, marquee, counters).

## Pages
Home · About · Services · Projects · Process · Contact

## Run
```bash
cd zebrano-redesign
python -m http.server 4173
```
Open http://localhost:4173 — or just open `index.html`.

## Notes
- No build step, no dependencies to install. GSAP/Lenis/Google Fonts load from CDN;
  every effect degrades gracefully to a fully readable static page if offline.
- Contact form validates locally, then opens WhatsApp (prefilled) / mailto — the studio's
  real channels. No backend required.
- Design system recorded in `docs/DESIGN.md`; frozen product facts in `docs/PRODUCT.md`.