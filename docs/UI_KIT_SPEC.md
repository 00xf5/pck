# Phase 2 — UI Kit Specification

**Status:** Ready (18 HTML components)

## Delivery

| Rule | Detail |
|------|--------|
| Format | One `.html` file per component — sold individually |
| CSS | Tailwind Play CDN (`cdn.tailwindcss.com`) — load in `<head>`, config after markup |
| Scope | `tailwind.config = { important: '#pck-component-id' }` |
| Theme | Neutral luxury — `pck-*` color tokens |
| JS | Only where needed (nav mobile toggle). FAQ uses native `<details>` |
| Preview load | Tailwind in `<head>` + `pck-tw-ready` after config; `prefers-reduced-motion` respected |
| JSX pack | Planned later |

## Components (18)

| # | ID | JS |
|---|-----|-----|
| 1 | `pck-buttons` | — |
| 2 | `pck-nav-header` | Mobile menu toggle |
| 3 | `pck-hero-villa` | — |
| 4 | `pck-property-card` | — |
| 5 | `pck-pricing-table` | — |
| 6 | `pck-testimonial` | — |
| 7 | `pck-cta-banner` | — |
| 8 | `pck-footer` | — |
| 9 | `pck-feature-grid` | — |
| 10 | `pck-split-block` | — |
| 11 | `pck-stats-row` | — |
| 12 | `pck-newsletter` | — |
| 13 | `pck-faq-accordion` | — (native details) |
| 14 | `pck-gallery-grid` | — |
| 15 | `pck-contact-form` | — |
| 16 | `pck-logo-bar` | — |
| 17 | `pck-team-card` | — |
| 18 | `pck-badge-pills` | — |

## Multi-component pages

Load Tailwind CDN **once**. Merge `theme.extend` from any component. Each block keeps its own `#pck-*` wrapper with `important` scoping — use one combined config:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {
  important: true,
  theme: { extend: { colors: { pck: { /* shared tokens */ } } } }
};
</script>
<!-- paste #pck-nav-header block -->
<!-- paste #pck-hero-villa block -->
```

Or keep per-block configs if pasting one component only.

## Customize

Edit `theme.extend.colors.pck` in each file's inline script, or replace gradient placeholders with `<img>` tags.
