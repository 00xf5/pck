# Direct Booking Discount Slider (Phase 5)

**Status:** Ready

Interactive widget for boutique hotels and vacation rentals — guests slide nights from **1 to 7** and see the **nightly rate step down** as length of stay increases.

## Product file

[booking-discount-slider.html](booking-discount-slider.html)

## Features

- **Ticket-style layout** — centered hero rate, night pills, discount ladder (not calculator split-panel)
- **Terracotta palette** — distinct from navy / stone / black calculators
- Strikethrough list rate + live nightly price + stay discount badge
- **1–7 night pills** (configurable via `PCK_BS_CONFIG`) instead of a range slider
- 3-stat row: total · savings · stay length
- Optional OTA comparison strip
- 18-currency selector (compact, top-right)
- URL + `localStorage` persistence

## Embed

Copy the `.pck-booking-slider` block through its `</script>`. Omit the preview `body:has()` wrapper.
