# DESIGN.md — Zebrano Interiors · Visual World

## Direction contract (recorded before build)
- **THESIS:** The site behaves like a material sample book of the very wood it is named for — a dark
  zebrano-stripe system, editorial "specimen plates", reactbits-grade motion. It refuses the generic
  light-warm real-estate template the studio formerly ran.
- **OWN-WORLD:** espresso ground (#1B140C), bone ink (#F2E9D8), cinnabar accent (#E0653F) honoring the red
  round logo, brass secondary (#C1954E). Zebrano grain = vertical stripe motif on edges/frames. Hairline rules,
  index numerals (01–04), specimen plates (image + mono caption + frame), Gloock display serif + Archivo body
  + JetBrains Mono labels.
- **STORY:** visitor understands "turnkey interior studio, Delhi NCR, real craft" in seconds; believes it from
  real render plates + numbered process; acts via WhatsApp/consultation.
- **FIRST VIEWPORT:** full-bleed espresso. Left: mono kicker `Interior + Turnkey · Delhi NCR`, Gloock headline
  ("Spaces, made to feel inevitable.") with line-mask split reveal, one-line sub, magnetic CTAs (Book a
  consultation / View selected works). Right: portrait living-room render in a specimen frame with caption +
  index. Zebrano stripe edge on the right; grain overlay across the surface.
- **FORM:** brief-pinned reactbits-style component language, hand-built (no framework): SplitText line masks,
  Magnet buttons, TiltedCard + glare, SpotlightCard, Marquee, CountUp stats, ScrollReveal + clip reveals,
  PreLoader, TrailingCursor (fine pointers only), page-transition curtain, Lenis smooth scroll.

## Tokens
```css
/* ground */
--ink-950:#12100A; --ink-900:#1B140C; --ink-800:#241B11; --ink-700:#33281A; --ink-600:#443723;
/* ink */
--bone-50:#F4EBD9; --bone-200:#E3D6BE; --stone-400:#B3A48C;   /* ≥4.5:1 on ink-900 */
/* accents */
--cinnabar-400:#E57A52; --cinnabar-500:#E0653F; --cinnabar-700:#B3442C; --brass-400:#C1954E;
/* bone surfaces (light pacing band) */
--bone-surface:#EFE4CD; --bone-ink:#241B11; --bone-stone:#6B5D46;
/* lines & grain */
--hairline:rgba(244,235,217,.14); --grain-line:rgba(244,235,217,.05);
```
- Restrained strategy: neutrals + one committed accent (cinnabar). Bone band used once for pacing (stats/projects marquee).

## Typography
- Display: **Gloock** (400) — carved-stone high-contrast serif; fallback Georgia, 'Times New Roman', serif.
  Sizes: hero clamp(2.9rem, 7vw, 6.25rem)/1.02; section clamp(2rem, 4.6vw, 3.75rem)/1.06; tight tracking -0.02em.
- Body: **Archivo** 400/500/600/700, 16px/1.7; fallback system sans.
- Labels: **JetBrains Mono** 400/500, 10.5–12px, letter-spacing .16em, uppercase; index numerals same face.

## Grid & spacing
- 12-column grid, gap 1rem → 1.5rem (≥900px), max content 1440px, page pad clamp(20px, 4vw, 64px).
- 4px rhythm. Section pad clamp(96px, 11vw, 168px). More space above a heading than below (headline margin-top ≥ margin-bottom ×2).
- Spine rule: 1px hairline column at left edge of content on alternating sections.

## Components (inventory + motion)
- PreLoader: ink plate, ZEBRANO letter stagger + grain sweep, auto-dismiss (reduced-motion: instant).
- TrailingCursor: dot+ring lerp, blend-difference; fine pointers only; grows on interactive hover.
- Line-mask split (own splitter): `.line{overflow:hidden}` `.line-inner{translateY(115%)→0}` stagger .09 power4.out.
- Magnet: interactive chips/buttons translate ≤10px toward cursor, spring back.
- TiltCard: ≤8° Y/X + radial glare following pointer (projects, services).
- SpotlightCard: radial spotlight at cursor on hover (services, CTA panels).
- Marquee: two tracks, CSS transform loop, Gloock outline text, aria-hidden duplicate.
- CountUp: 532 / 15 / 80 on view, 1.4s power2.out.
- Specimen plate: image in 1px hairline frame, mono caption row (index · title · year), hover slight scale.
- Page transition: ink curtain sweep 700ms expo.inOut on plain left-click internal nav (never hijack modified clicks).
- Grain: inline SVG feTurbulence data-URI, opacity .05–.07, mix-blend overlay.
- Zebrano edge: repeating-linear-gradient vertical stripes (bone-on-ink at .05) for right edge / section dividers.

## Rules
- Dark-led: espresso ground default; one bone pacing band per page max.
- Motion is enhancement-only: content visible without JS; everything gated by `html.js`; respect `prefers-reduced-motion`.
- Images: explicit width/height, lazy below fold (hero eager+preload), JPEG.
- Focus-visible rings (2px cinnabar offset) everywhere; 44px min targets; skip-link first.
- No emoji icons; inline SVG only, stroke 1.5px consistent.
- Micro-interactions 150–300ms; reveals power4.out; never blur/filter animations on large surfaces.