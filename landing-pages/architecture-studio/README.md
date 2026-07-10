# Architecture Studio — Landing Page

**Status:** Ready

Static architecture / interiors studio landing page (HALDEN). Open `index.html` in a browser or upload the folder to any host.

## Folder layout

```
architecture-studio/
├── index.html
├── modules/
│   ├── css/          tokens, base, header-hero, works, sections, responsive
│   └── js/           hero, filter, viewer, counters, reveal, contact, main
└── assets/
    └── img/          bundled photography
```

## Sections

| Section | Description |
|---------|-------------|
| Hero | Full-bleed crossfade, brand-led first viewport |
| Works | Live filter (All / Residential / Cultural / Hospitality) |
| Viewer | Project dialog with next/prev + keyboard |
| Approach | Three-step process |
| Studio | Profile + count-up stats |
| Enquire | Contact form (client-side success) |
| Footer | Links and contact |

## Customize

| Task | Location |
|------|----------|
| Brand name, copy | `index.html` |
| Colors, fonts | `modules/css/tokens.css` |
| Project list | `[data-as-project]` buttons in `index.html` |
| Hero timing | `modules/js/hero.js` → `interval` |
| Images | Replace files in `assets/img/` |

## Deploy

**Static host:** Upload the entire `architecture-studio/` folder.

Only external dependency: Google Fonts (Syne + DM Sans + IBM Plex Mono). Remove the `<link>` tags and set `--as-display` / `--as-font` / `--as-mono` in `tokens.css` for offline use.
