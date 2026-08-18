# TASKS.md — Zebrano Interiors Redesign · Execution Plan

## Phase 1 — Foundation
- [x] T001: Harvest brand content + 24 real project images from live site — Done when: facts frozen, images local
- [x] T002: Design system (ui-ux-pro-max) + direction contract (impeccable) recorded — Done when: docs/PRD.md, PRODUCT.md, DESIGN.md written
- [x] T003: Convert heavy PNG renders → JPEG q82 — Done when: all imgs ≤ ~600KB, refs updated
- [x] T004: Skeleton world: tokens.css, main.css, main.js, motion.js, favicon, 6 page shells, index hero — Done when: static server serves every page clean, no console errors, screenshots OK

## Phase 2 — Pages
- [ ] T005: index.html full (hero, marquee, stats band, services preview w/ spotlight, selected works, process strip, CTA) — Done when: scroll choreography + counters + marquee run, reduced-motion OK
- [ ] T006: about.html (story, values grid, night plate, process preview) — Done when: reveals + split run
- [ ] T007: services.html (4 core offers w/ Tilt/Spotlight cards + 6 service chips + images) — Done when: tilt + spotlight verified
- [ ] T008: projects.html (specimen grid + rolling gallery + lightbox-free captions) — Done when: tilt grid + horizontal gallery scroll verified
- [ ] T009: process.html (4-step vertical journey + layout-plate + plan image) — Done when: step reveals verified
- [ ] T010: contact.html (form → WhatsApp/mail intents, validation, contact cards, directions link) — Done when: validation works, no fake submit

## Phase 3 — Integration & verification
- [ ] T011: Metadata/OG/JSON-LD on every page — Done when: fixing-metadata checks pass
- [ ] T012: Accessibility pass: skip-link, focus-visible, aria, reduced-motion, contrast spot-check — Done when: audit passes
- [ ] T013: Playwright screenshots desktop+mobile all 6 pages + console-error check + impeccable detect.mjs — Done when: zero console errors, detector clean