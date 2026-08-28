# GOcuotas — Landing UI Kit

A pixel-faithful recreation of the GOcuotas marketing landing page from Figma (`Frame2256`, desktop 1440).

## What's in here
- `index.html` — the full landing, stitched together from the components below
- `Nav.jsx` — pink top nav with logo + "Ayuda" / "Ingresar"
- `Hero.jsx` — pink hero: 60/64 headline, accent CTA, phone artwork
- `HowItWorks.jsx` — 3-step cards with illustrations overflowing the top edge
- `MerchantSearch.jsx` — "¿Dónde podés comprar?" section + pill search + category grid
- `ProductFamily.jsx` — GOqr / GOtarjeta cards
- `AppDownload.jsx` — "Bajá la app" with store badges
- `Testimonials.jsx` — quote card with avatar
- `FAQ.jsx` — accordion rows (default closed)
- `Footer.jsx` — pink-50 footer with wordmark + link columns

## Running it
Open `index.html` directly. Poppins loads from Google Fonts, Bootstrap Icons from jsDelivr. React + Babel via unpkg (pinned).

## Caveats
- Reconstructed from Figma pseudocode, not a production codebase. Component APIs are illustrative.
- Mastercard / Visa / App Store / Google Play marks are raster extractions from the Figma — swap for official SVGs in production.
