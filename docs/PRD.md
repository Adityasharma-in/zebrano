# PRD — Zebrano Interiors · Redesigned Website

## Problem
The studio's current site is a generic WordPress/Elementor template ("hellix" theme) — dated, visually
silent about the craft, and indistinguishable from a hundred template sites. It undersells 15+ years of
turnkey interior work in Delhi & NCR, and it is not built to convert browsing homeowners into conversations.

## Who it's for
- Homeowners in Delhi & NCR (and NRIs planning homes remotely) planning renovation, new flats, or turnkey
  interiors/exteriors.
- Primary device: mobile (WhatsApp-first market) with desktop parity; the hero of the experience is the work itself.

## Job to be done
> When a homeowner wants their home designed, they want to *trust* the studio and *start a conversation*
> without friction. The site must prove craftsmanship through real project imagery, state the offer in one
> line, and open WhatsApp/phone within seconds.

## Requirements (prioritized)
- [ ] P0 — Multipage site: Home, About, Services, Projects, Process, Contact — the deliverable is explicitly multipage
- [ ] P0 — Real project renders/photos from the studio's own portfolio (harvested from existing uploads)
- [ ] P0 — Frictionless contact: WhatsApp deep link + phone + mail + address/directions
- [ ] P0 — Distinctive premium identity: dark "zebrano" espresso world with cinnabar accent (brand-red commitment)
- [ ] P1 — Signature motion system in the spirit of reactbits.dev: line-mask split text, magnetic buttons,
        tilted spotlight cards, marquee, count-up stats, scroll reveals, grain
- [ ] P1 — SEO metadata + LocalBusiness JSON-LD per page
- [ ] P2 — Accessibility: prefers-reduced-motion respected, keyboard focus, 44px targets, contrast ≥ 4.5:1
- [ ] P2 — Performance: no CLS (explicit image dims), lazy below-the-fold media, JPEG-converted renders

## Out of scope
No CMS, no backend, no booking engine, no blog, no multilingual, no payments, no third-party map API.

## Success looks like
A first-time visitor understands "turnkey interior studio, Delhi NCR, real work" within 5 seconds, scrolls
through proof, and initiates a WhatsApp/phone conversation within 60 seconds. Lighthouse performance and
accessibility in the high band; reduced-motion and keyboard audits pass; every page looks and behaves like
one designed system, not a template.