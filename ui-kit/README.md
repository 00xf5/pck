# UI Kit (Phase 2)

**18 individual HTML components** — copy-paste blocks for hospitality & premium brands.

- **HTML only** (JSX pack later)
- **Tailwind via CDN** — scoped per component with `important: '#pck-…'`
- **Neutral luxury** theme · variants later
- **One file = one product** (sold separately)

## Components

| Component | File |
|-----------|------|
| Buttons | [components/buttons/buttons.html](components/buttons/buttons.html) |
| Nav header (+ mobile) | [components/nav-header/nav-header.html](components/nav-header/nav-header.html) |
| Hero (villa) | [components/hero-villa/hero-villa.html](components/hero-villa/hero-villa.html) |
| Property card | [components/property-card/property-card.html](components/property-card/property-card.html) |
| Pricing table | [components/pricing-table/pricing-table.html](components/pricing-table/pricing-table.html) |
| Testimonial | [components/testimonial/testimonial.html](components/testimonial/testimonial.html) |
| CTA banner | [components/cta-banner/cta-banner.html](components/cta-banner/cta-banner.html) |
| Footer | [components/footer/footer.html](components/footer/footer.html) |
| Feature grid | [components/feature-grid/feature-grid.html](components/feature-grid/feature-grid.html) |
| Split block | [components/split-block/split-block.html](components/split-block/split-block.html) |
| Stats row | [components/stats-row/stats-row.html](components/stats-row/stats-row.html) |
| Newsletter | [components/newsletter/newsletter.html](components/newsletter/newsletter.html) |
| FAQ accordion | [components/faq-accordion/faq-accordion.html](components/faq-accordion/faq-accordion.html) |
| Gallery grid | [components/gallery-grid/gallery-grid.html](components/gallery-grid/gallery-grid.html) |
| Contact form | [components/contact-form/contact-form.html](components/contact-form/contact-form.html) |
| Logo bar | [components/logo-bar/logo-bar.html](components/logo-bar/logo-bar.html) |
| Team card | [components/team-card/team-card.html](components/team-card/team-card.html) |
| Badge pills | [components/badge-pills/badge-pills.html](components/badge-pills/badge-pills.html) |

Tokens: [tokens/DESIGN_TOKENS.md](tokens/DESIGN_TOKENS.md)

## Embed

See **[docs/EMBED_GUIDE.md](../docs/EMBED_GUIDE.md)** for load order, multi-component pages, and production tips.

Paste the `#pck-*` block into your page. Load Tailwind CDN **once** in `<head>`. Merge `tailwind.config` when combining components.

## Customize

Edit `theme.extend.colors.pck` in the inline `tailwind.config` script block.
