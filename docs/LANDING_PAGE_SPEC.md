# Landing Page Templates — Specification

Phase 4 deliverables: self-contained static landing folders, one per template.

---

## Boutique Villa

**Path:** [../landing-pages/boutique-villa/](../landing-pages/boutique-villa/)  
**Status:** Ready

### Delivery format

```
boutique-villa/
├── index.html
├── modules/css/     six stylesheets, loaded in order
├── modules/js/      five scripts, loaded before </body>
├── assets/img/      bundled JPEGs — no remote image URLs
└── README.md
```

No build step. No npm. Relative paths only.

### Module map

| CSS | Scope |
|-----|--------|
| `tokens.css` | Colors, radii, fonts |
| `base.css` | Reset, typography, reveal |
| `frame.css` | Header, hero frame, glass strip |
| `carousel.css` | Carousels, suite cards, dots |
| `sections.css` | Page sections, footer |
| `responsive.css` | Breakpoints, reduced motion |

| JS | Role |
|----|------|
| `carousel.js` | `BVCarousel` — snap and slide modes |
| `hero.js` | `BVHero` — background crossfade |
| `hero-strip.js` | `BVHeroStrip` — dual-row marquee |
| `reveal.js` | Scroll-in animations |
| `main.js` | Initializes all modules |

### Buyer workflow

1. Open `index.html` locally to preview.
2. Replace copy in `index.html`.
3. Swap images in `assets/img/` (same filenames).
4. Adjust `tokens.css` for brand colors.
5. Upload folder to host or paste sections into a CMS.

### Planned templates

| Template | Folder | Status |
|----------|--------|--------|
| Boutique villa | `boutique-villa/` | Ready |
| Architecture studio | `architecture-studio/` | Planned |
| Premium agency | `premium-agency/` | Planned |

---

*See also [PRODUCT_BUNDLE.md](PRODUCT_BUNDLE.md) Phase 4.*
