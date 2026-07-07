# PCK Embed Guide

How buyers should install UI kit components and calculators without flash, duplication, or broken styles.

---

## UI Kit components

### Single component on a page

1. Copy everything inside the `#pck-*` wrapper from the `.html` file.
2. In the host page `<head>`, load Tailwind **once**:

```html
<style>html:not(.pck-tw-ready){visibility:hidden}</style>
<script src="https://cdn.tailwindcss.com"></script>
```

3. Paste the component HTML where it should appear.
4. Paste the `tailwind.config = { important: '#pck-…', … }` script **after** the markup.
5. Append: `document.documentElement.classList.add('pck-tw-ready');`
6. If the component has extra JS (nav toggle), paste that last.

**Remove** from the paste block when embedding:
- `<html>`, `<head>`, `<body>` wrappers
- The preview-only `body:has()` background style
- Duplicate Tailwind `<script src="cdn.tailwindcss.com">` if already in host `<head>`

### Multiple components on one page

Load Tailwind once. Merge all `theme.extend` tokens into one config:

```html
<script>
tailwind.config = {
  important: true,
  theme: {
    extend: {
      colors: { pck: { ink: '…', muted: '…', accent: '…', gold: '…', line: '…', cream: '…', surface: '…' } },
      fontFamily: { serif: ['Georgia', 'serif'], sans: ['system-ui', 'sans-serif'] },
      boxShadow: { pck: '0 25px 50px -12px rgba(0,0,0,0.1)' }
    }
  }
};
</script>
```

Each component keeps its own `#pck-*` root. Do **not** nest two components in the same `#pck-*` id.

### Theming

Edit `theme.extend.colors.pck` in the config script, or override on the host site:

```css
#pck-hero-villa { --tw-prose-body: #your-color; } /* optional */
```

Replace Unsplash URLs with buyer assets. Keep `loading="lazy"` on below-the-fold images.

### Production tip

For best Core Web Vitals, compile Tailwind to a static `.css` file instead of the Play CDN. The HTML markup and class names stay the same; only the CSS delivery changes.

---

## Calculators

### Embed

1. Copy the `<div class="pck-*-calc" …>` block and its `<style>` + `<script>`.
2. **Do not** copy the preview `body:has()` block.
3. No external dependencies — works on any CMS HTML block.

### Theming

Override CSS variables on the root class:

```css
.pck-mortgage-calc { --w-accent: #1e3a5f; --w-ink: #1c1917; }
.pck-airbnb-calc   { --w-accent: #44403c; }
.pck-autoloan-calc { --w-accent: #18181b; }
```

### Currency

User selects currency in the widget. Outputs use `Intl.NumberFormat` with the correct locale per currency. **No FX conversion** — all amounts are in the chosen currency.

### Shareable state (built-in)

Calculators restore from, in order:

1. URL query params (e.g. `?pck-ma-income=90000&currency=EUR`)
2. `localStorage` fallback (same session/device)

Changing inputs updates the URL with `history.replaceState` (no page reload). Buyers can link to pre-filled scenarios.

### Airbnb white-label logo

Set in the script block:

```javascript
var PCK_AB_CONFIG = { logoSrc: 'https://yoursite.com/logo.png' };
```

Leave empty to hide the logo slot.

---

## Booking slider

Same pattern as calculators — copy `.pck-booking-slider` through `</script>`, omit preview `body:has()`.

- Configure nights range via `PCK_BS_CONFIG = { maxNights: 7, minNights: 1 }`
- Pricing rules in **Pricing rules** panel (base rate, max discount, OTA %)
- **Night pills** + centered rate card — not the calculator split layout
- State persists to URL + `localStorage`

See [BOOKING_SLIDER_SPEC.md](BOOKING_SLIDER_SPEC.md).

---

## Email blocks

1. Open the block `.html` in a browser.
2. Copy between `<!-- PASTE START -->` and `<!-- PASTE END -->`.
3. Paste into Mailchimp *Code* or Klaviyo HTML block.
4. Host images on your ESP/CDN — replace Unsplash URLs.
5. Swap `{{ unsubscribe_url }}` for your ESP merge tag (see [EMAIL_BLOCKS_SPEC.md](EMAIL_BLOCKS_SPEC.md)).

---

## Checklist before go-live

- [ ] Tailwind loaded once (UI kit only)
- [ ] Preview `body:has()` removed
- [ ] `pck-tw-ready` class added after config (UI kit)
- [ ] Images replaced or kept with lazy loading
- [ ] Disclaimer line retained
- [ ] Test mobile width + desktop split (calculators ≥640px)
- [ ] Test currency switch + share URL
- [ ] Email: test Gmail, Apple Mail, Outlook (blocks)
