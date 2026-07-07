# Phase 5 — Booking Discount Slider

**Status:** Ready

Single self-contained HTML file — scoped CSS, no external dependencies.

---

## Behavior

1. Guest picks **1–7 nights** via pill buttons (configurable via `PCK_BS_CONFIG`).
2. **List rate** shown struck-through; **nightly rate steps down** with a discount badge.
3. **Ladder bar** fills to show progress; stats row shows total, savings, stay length.
4. Optional **OTA comparison** strip below stats.

Not a booking engine — a conversion widget for property pages.

---

## Visual identity

| Trait | Detail |
|-------|--------|
| Layout | Single-column ticket card — no results \| inputs split |
| Interaction | Night **pills**, not range slider |
| Palette | Terracotta `#9a4e2a`, warm paper `#fffdf9` |
| Hero | Centered price stack with badge |

---

## File

`booking-slider/booking-discount-slider.html`

---

## Config (optional)

```javascript
var PCK_BS_CONFIG = { maxNights: 7, minNights: 1 };
```

Buyers adjust base rate, max discount, and OTA % in the collapsed **Rates & comparison** panel, or set defaults in HTML.

---

## Theming

```css
.pck-booking-slider { --bk-accent: #9a4e2a; --bk-save: #2d6a4f; }
```

---

## Shared with calculators

- Currency map + `Intl` formatting
- `saveState` / `loadState` URL pattern
- `prefers-reduced-motion`
- Preview canvas: warm `#ebe4dc` body (omit when embedding)
