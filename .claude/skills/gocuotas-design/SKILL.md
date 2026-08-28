---
name: gocuotas-design
description: Use this skill to generate well-branded interfaces and assets for GOcuotas (the Argentine/Uruguayan fintech that lets you pay in interest-free installments with a debit or prepaid card), including its companion products GOqr and GOtarjeta. Covers landings, decks, prototypes and in-product mocks — for either production code or throwaway designs. Ships design guidelines, colors, type, fonts, brand assets, and a reusable UI kit.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Load `colors_and_type.css` at the top of your HTML, then import components from `ui_kits/landing/`. For Bootstrap Icons, include `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">`.

If working on production code, copy the assets and read the rules in README.md — especially the VISUAL FOUNDATIONS and CONTENT FUNDAMENTALS sections — to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience, surface, language — GOcuotas copy is Spanish Rioplatense, use "vos"), and act as an expert designer who outputs HTML artifacts or production code, depending on the need.

Key rules that protect the brand's visual identity:
- Pink `#EE2A7B` is THE color. Use it deliberately — hero wall, primary CTA, eyebrow lines, logo.
- Poppins only, weights 400/500/700. No italics.
- One gradient, one place: pink → warm yellow, only on the hero "Registrarme gratis" CTA.
- One card shadow: `3px 3px 3px rgba(209,213,223,.3)`. Don't invent new elevation tiers.
- Every button is a pill; every card is 8 px radius.
- No emoji, no motion, no glass/blur, no left-border accent cards.
- Copy uses "vos" imperatives ("Comprá", "Gocuoteá") and a pink eyebrow + ink headline pattern on every section.
