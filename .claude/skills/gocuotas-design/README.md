# GOcuotas Design System

Design system for **GOcuotas** — an Argentine/Uruguayan fintech that lets shoppers **pay in interest-free installments with their debit or prepaid card**, plus their companion products **GOqr** (pay in installments at any QR-code checkout) and **GOtarjeta** (a prepaid Mastercard).

This repo is the brand's visual + interaction source of truth for AI-generated landings, decks, prototypes and in-product mocks.

---

## Sources

- **Figma** — `GO - Landings.fig`, mounted read-only. 1 page ("Landings"), 4 top-level frames:
  - `GOcuotas---Desptop` / `Frame2256` — v1 desktop landing (pink hero, "Comprá en cuotas sin interés con tu débito")
  - `GOcuotas---Desptop2` / `Main` — v2 desktop landing (illustration-led hero, same product)
  - `GOcuotas---Desptop3` / `Main` — v3 desktop landing
  - `GOcuotas---Mobile` / `Frame2255` — mobile (412 wide) counterpart
- No codebase was attached. All component code here is reconstructed from the Figma JSX pseudocode — typography, color, spacing and instance-override text are accurate, but per-character styles and deep nested instance swaps may differ slightly.
- Copy and voice are pulled directly from the frames' Spanish (Rioplatense: "vos" / "comprá" / "gocuoteá") strings.

---

## Products represented

| Product | What it is | Where you'll see it |
| --- | --- | --- |
| **GOcuotas** | The core product. Pay online or in-store in **interest-free installments** ("sin interés") using your **debit or prepaid** card, via the GOcuotas app. | Every landing, app hero, "Cómo funciona" 3-step card, merchant directory. |
| **GOqr** | Scan any QR code at checkout; pay that QR in fixed GOcuotas installments. Tagged "¡Novedad!". | Card inside the product-family section on landings. |
| **GOtarjeta** | A prepaid **Mastercard** issued by GOcuotas — top up from the app, spend anywhere Mastercard is accepted. | Purple card in the product-family section; Mastercard lock-up. |

Secondary concepts surfaced in the copy: **GOpremios** (rewards), merchant categories (Moda, Tecnología, Hogar, Gastronomía, etc.), "Más de 70.000 comercios".

---

## Index — what lives in this folder

```
/
├── README.md                      ← you are here
├── SKILL.md                       ← portable skill entry-point (Claude Code compatible)
├── colors_and_type.css            ← CSS variables: colors, type scale, radii, shadow, buttons
├── assets/                        ← logos, product photos, illustrations, icon SVGs
│   ├── logo-iso-pink.svg          ← "G" mark (primary)
│   ├── logo-iso-white.svg         ← "G" mark (on pink)
│   ├── logo-wordmark-pink.svg     ← "gocuotas" wordmark
│   ├── logo-wordmark-white.svg    ← "gocuotas" wordmark on pink
│   ├── hero-phone.png             ← hero hand-holding-phone
│   ├── step-cellphone.png         ← "Bajá la app" step illustration
│   ├── step-creditcard.png        ← "Elegís el comercio" step illustration
│   ├── step-handshake.png         ← "¡Comprás y listo!" step illustration
│   ├── illust-couch.png           ← alt hero illustration (couch/shopping)
│   ├── illust-card.png            ← prepaid-card illustration
│   ├── illust-coin.png            ← coin / rewards illustration
│   ├── categories.png             ← merchant-category mosaic
│   ├── store-appstore.png         ← App Store badge
│   ├── store-googleplay.png       ← Google Play badge
│   ├── person-1.png               ← testimonial hero photo
│   ├── person-avatar.png          ← testimonial avatar
│   └── icons/                     ← local SVGs (star, arrow-right-circle, question-circle, calendar4-event)
├── preview/                       ← HTML cards rendered in the Design System tab
├── ui_kits/
│   └── landing/                   ← full desktop + mobile landing recreation
│       ├── README.md
│       ├── index.html
│       └── *.jsx                  ← Nav, Hero, HowItWorks, ProductFamily, FAQ, Footer, …
└── fonts/                         ← (empty — Poppins is loaded from Google Fonts CDN)
```

Fonts note: **Poppins** is the brand face. No .ttf files ship in `fonts/`; `colors_and_type.css` `@import`s it from Google Fonts. If you need local files for an offline build, drop them in `fonts/` and swap the import for a `@font-face` block.

---

## CONTENT FUNDAMENTALS — voice, tone, copywriting

### Language
- **Spanish (Rioplatense)**. Uses **"vos"** and the voseo imperative: *"Comprá", "Descubrí", "Registrate", "Llegá", "Gocuoteá"*. Never `tú` / `compra`.
- **Product verbs as slogans.** "Gocuoteá" is an invented verb from the brand name. Treat it as a lifestyle verb, not jargon. *"Gocuoteá todos los servicios"*, *"Gocuoteá con GOqr"*.

### Tone
- **Warm, informal, enthusiastic, never corporate.** Exclamations are common but not spammy — one per section max. *"¡Comprás y listo!"*, *"¡Más de 70.000 comercios para elegir!"*, *"¡Novedad!"*.
- **Clarity before cleverness.** Feature names are literal: *"Cómo funciona en 1 minuto"*, *"Preguntas frecuentes"*, *"Buscar"*.
- **Second-person address.** You (vos) are the subject: *"Elegís el comercio"*, *"Comprás"*, *"Pagás en cuotas fijas"*. Not "the user" / "customers".
- **No jargon, no English loan-words** beyond product names (GOcuotas, GOqr, GOtarjeta). Avoid "APR", "BNPL", "checkout".

### Casing
- **Sentence case** for UI and headings — "Cómo funciona", "Nuestros comercios", "Preguntas frecuentes".
- **Brand marks**: the logo wordmark is all-lowercase "**gocuotas**". In running copy the product name is capitalized "**GOcuotas**" (two caps, no space). Sub-brands follow the same pattern: **GOqr**, **GOtarjeta**, **GOpremios**.

### Patterns that repeat
- **Eyebrow + headline** stack above every section — a short pink 16/20 Regular sentence question acts as the eyebrow, with the real H2 below in ink: *"¿Dónde podés comprar?" → "Nuestros comercios"*. *"¿Cómo funciona?" → "Comprá en 3 pasos"*.
- **3-step explainers.** The product is always explained as three cards: *"Bajá la app" → "Elegís el comercio" → "¡Comprás y listo!"*.
- **Numbers in copy** are spelled with thousand separators using a period: "70.000", "1.000.000". Currency is "$". Percent always "sin interés" not "0% APR".
- **CTA verbs** are imperative and short: *"Registrarme gratis"*, *"Crear mi cuenta"*, *"Ingresar"*, *"Buscar"*, *"Descargar"*.
- **Emoji**: none. The brand does not use emoji. It also does not use unicode decorative chars ("✦", "—") beyond standard hyphens and ellipses.

### Example snippets (lifted verbatim)
- Hero: *"Comprá en cuotas sin interés con tu débito"*
- Sub-hero: *"¡Más de 70.000 comercios para elegir!"*
- Section: *"¿Cómo funciona? — Comprá en 3 pasos"*
- Trust: *"¡Conocé las experiencias y opiniones!"*
- Product card: *"GOqr — ¡Comprá con cualquier QR! Y pagá en cuotas fijas."*

---

## VISUAL FOUNDATIONS

### Color
- **Primary is `#EE2A7B` — the "GOcuotas pink"**. It is the hero background, the logo fill, every primary button, every link, every eyebrow line, every "paid" accent. Unusually dominant — the hero is a full-bleed pink wall.
- **Ink `#1C263F`** is used for every body text and H1/H2 on light backgrounds. `#333C4C` for emphasis, `#3D3D3E` for a darker neutral, `#828282` for hints/placeholders, `#6C757D` for disabled.
- **Accents** live inside illustrations and tags: orange `#EF9300` ("Sin interés" tag), warm yellow `#FDBC46` (gradient partner), green `#00AA31` (success/paid), blue `#00A1DF`. Mastercard (`#EB001B`, `#F79E1B`) and Visa (`#1434CB`) marks appear in card lockups.
- **Soft surfaces**: `#F8F9FA` for cards and subtle panels; `#FDEAF2` for the footer tint (pink-50); `#E3EBFF` / `#EFF3FF` for FAQ-open and app-CTA panels.
- **One gradient, one place.** The accent button — "Registrarme gratis" — uses `linear-gradient(180deg, #FB627D 0%, #FDBC46 100%)`. Nothing else in the system uses gradients. Resist the temptation to add more.
- **Vibe of imagery**: warm, saturated, cheerful, slightly glossy. Real-person photos are bright and colourful (pink/coral tones). Product illustrations are flat 3D-ish vector renders with the brand-pink backdrop isolated from the scene.

### Type
- **Poppins**, three weights: 400 Regular, 500 Medium, 700 Bold. No italics, no 600, no condensed.
- **Display scale**: 60 / 36 / 24 / 20 / 18 / 16 / 14 / 12 with tight line-heights (64 / 42 / 28 / 24 / 22 / 20 / 18 / 16). The hero is **60/64 Bold white**.
- Buttons carry 14/18 Medium. The hero accent button breaks that rule and uses 20/24 Bold.
- No letter-spacing tricks; default tracking.
- Text is left-aligned on hero and testimonial blocks, centred on section titles and step-cards.

### Layout
- **1440 container** with **64px outer gutter** on desktop. Mobile is **412 wide with 20px gutter**.
- **Grid rhythm**: sections are separated by **112px** of vertical air (desktop), 64px on mobile. Inside a section, the eyebrow→H2 gap is **4px**; H2→body is **16–24px**.
- **Cards align to a 3-column grid** of 416px for the "how it works" step cards. The hero splits 634px copy / 540px imagery.
- **Nothing floats fixed** — no sticky nav, no floating CTA button, no scroll-indicator bar in the Figma. The top nav is static at the top of the pink hero.
- **No hard borders** between sections — colour + whitespace separate them. Footer sits on the pink-50 tint.

### Backgrounds & texture
- **Solid flat color only.** Full-bleed pink hero, white body, `#F8F9FA` soft section, `#FDEAF2` footer. No noise, no repeating pattern, no decorative SVG behind content.
- **Images bleed out of step-cards** — each of the 3 "Cómo funciona" cards has its illustration overflowing upward by ~158px on a card that's 292px tall.

### Radii
- **Cards & panels**: **8px**.
- **Buttons & inputs**: **pill** (`999999px`). Every button is a pill; the search input is a pill too.
- **Large surfaces / hero imagery**: not rounded — full-bleed.

### Shadow / elevation
- **One shadow, used everywhere.** `3px 3px 3px 0 rgba(209, 213, 223, 0.3)`. It's a subtle diagonal drop, not a hover/elevation system. Applied to cards, the search input, step-cards, and the FAQ dropdown.
- **No inner shadows**, no multi-layer shadows, no coloured shadows.

### Borders
- Buttons use **1px** borders for `secondary` / `secondary-light` / `tertiary`. Primary and accent are borderless.
- FAQ rows use a **1px #E9ECEF** bottom separator when closed, and turn into a filled `#E3EBFF`/`#EFF3FF` panel with `border-radius: 8` when open.
- No container divider lines outside FAQs.

### Motion
- **No animated elements** in the Figma — this is a static landing. Interaction states exist (hover, open/closed FAQ, button default) but no keyframed motion.
- Suggested when implementing: **150ms ease** on hover colour + filter changes, **80ms ease** transforms for press (subtle `translateY(1px)` feedback). FAQ open/close: `180ms ease-out` height + fade.
- No bouncing, no confetti, no parallax. The brand's energy comes from **colour and copy**, not motion.

### States
- **Hover**: `filter: brightness(0.94)` on filled buttons; for outline buttons, fill the pill with the border colour and flip text to white.
- **Press**: a 1px downward `translateY` — no shrink/scale, no shadow change.
- **Focus**: `2px solid #EE2A7B` outline with `outline-offset: 2px`. Use on every interactive element.
- **Disabled**: `#6C757D` text on `#F8F9FA` fill, no border, `cursor: not-allowed`.

### Transparency & blur
- Not used. Backgrounds are opaque. The one exception is the card shadow's 30% alpha. No glassmorphism, no scrim overlays, no `backdrop-filter`.

### Components quick-reference
- **Buttons**: 5 variants — Primary (pink fill / white text), Secondary (pink outline), SecondaryLight (white outline, pink-hero only), Tertiary (text-only grey), Accent (gradient, larger — hero CTA only).
- **Cards**: `#F8F9FA` fill, `8px` radius, single card shadow, no border. Step-cards allow imagery to overflow the top edge.
- **FAQ row (closed)**: white, 1px bottom divider, question-circle icon left, + right, ink text.
- **FAQ row (open)**: `#E3EBFF` header band + `#EFF3FF` body, 8px radius, ink text, no divider.
- **Input**: pill shape, `#F8F9FA` fill, 12/16 grey placeholder, right-side pink button.

---

## ICONOGRAPHY

- **Bootstrap Icons 1.x**. Every `<Icon*>` component in the Figma maps 1-to-1 to a Bootstrap Icon glyph — `arrow-right-circle`, `arrow-left-short`, `arrow-right-short`, `arrow-up-circle`, `arrow-down-circle`, `calendar4-event`, `question-circle`, `star`, `play-fill`, etc. Names are taken directly from `https://icons.getbootstrap.com/`.
- **Stroke / fill style**: Bootstrap Icons' default — 16×16 viewport, solid fills or thick strokes, rounded line caps, ~2px optical stroke. The brand uses them recolored with `fill="currentColor"` — never multi-colour.
- **Delivered as SVG**. Copied representatives sit in `assets/icons/` (`star.svg`, `arrow-right-circle.svg`, `question-circle.svg`, `calendar4-event.svg`). For broader coverage, load the CDN:
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <i class="bi bi-arrow-right-circle"></i>
  ```
- **Emoji**: never used.
- **Unicode decorations** (✦, ★, •): never used — a real `bi-star-fill` is used for ratings, not ★.
- **Logo**: two assets — the **iso** (the rounded-square "G" mark, 34×34) and the **wordmark** (lowercase "gocuotas", ~52×10 at logo baseline). They lock-up horizontally with a 4px gap. Pink on light, white on pink. Never tint any other colour.
- **Payment-network logos** (Mastercard red/yellow circles, Visa wordmark) appear in the GOtarjeta card lock-up only. Don't redraw — use the official SVGs the user provides.
- **Substitution flagged**: no icon font shipped with the brand; Bootstrap Icons is a visually exact CDN match because the Figma library was itself built on it. Safe to use.

---

## Substitution / caveats flagged for the user

1. **No font files were provided.** I've wired Poppins from Google Fonts — a pixel-identical match. If you need an offline bundle, ship the TTFs and swap the `@import` in `colors_and_type.css` for `@font-face`.
2. **Bootstrap Icons CDN** is used for any icon not already extracted. Same family as the Figma library, so visually identical.
3. **No production codebase was attached.** The UI kit is reconstructed from Figma JSX pseudocode; it matches the visual design but component APIs are illustrative.
4. **Mastercard / Visa / App Store / Google Play** logos: the ones in `assets/` are raster extractions from the Figma; for production please drop official brand SVGs in their place.

---

## Using this system

- For marketing landings / decks / throwaway prototypes, **load `colors_and_type.css`** at the top of the page and import UI kit components from `ui_kits/landing/`.
- For production code handoff, lift the variables and patterns but treat the JSX as pseudocode — re-implement against your framework of choice.
- **Do not invent new palette entries, new radii, new shadows, or new gradients.** If the design seems to need one, it probably doesn't — the brand's power comes from the discipline of one pink + one shadow + one gradient.
