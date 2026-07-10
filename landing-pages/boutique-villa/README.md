# Boutique Villa — Landing Page

**Status:** Ready

Static hospitality landing page. Open `index.html` in a browser or upload the folder to any host.

## Folder layout

```
boutique-villa/
├── index.html
├── modules/
│   ├── css/          tokens, base, frame, carousel, sections, responsive
│   └── js/           carousel, hero, hero-strip, reveal, main
└── assets/
    └── img/          bundled photography (see below)
```

## Sections

| Section | Description |
|---------|-------------|
| Hero | Framed full-viewport slider, dual-row collection strip, thumb controls |
| Collections | Horizontal villa cards |
| Architecture | Split image + feature list |
| Gallery | Autoplay image strip |
| Experience | Four amenity tiles |
| Reviews | Guest quote carousel |
| Reserve | Direct-booking CTA band |
| Contact | Notify me availability form |
| Footer | Links and contact |

## Images

All photography ships in `assets/img/`. Replace files in place — filenames are referenced throughout `index.html`.

| File | Typical use |
|------|-------------|
| `hero.jpg` | Primary hero slide, strip thumbnail |
| `01-exterior.jpg` | Exterior / facade |
| `02-pool.jpg` | Pool, terrace, amenities |
| `03-architecture.jpg` | Architecture, gardens |
| `04-interior.jpg` | Interiors, living spaces |
| `05-stone.jpg` | Stone villas, facades |
| `06-courtyard.jpg` | Courtyards, outdoor dining |

Recommended export: JPEG, 1600px wide minimum for hero, 800px for cards.

## Customize

| Task | Location |
|------|----------|
| Brand name, copy | `index.html` |
| Colors, radii | `modules/css/tokens.css` |
| Hero timing | `modules/js/hero.js` → `interval` |
| Carousel autoplay | `data-autoplay` / `data-interval` on `[data-carousel]` |

## Deploy

**Static host:** Upload the entire `boutique-villa/` folder.

**WordPress:** Upload to child theme; paste sections from `index.html` into block editor, or load `index.html` as a page template.

**Shopify:** Upload images via Settings → Files; update `src` paths in HTML.

Only external dependency: Google Fonts (Inter). Remove the `<link>` tags in `index.html` and set `--bv-font` in `tokens.css` to use system fonts offline.
