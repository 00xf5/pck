# Phase 3 — Email Blocks Specification

**Status:** Ready (6 HTML blocks)

Each block is a **single self-contained HTML file** — table layout, inline styles, no external CSS.

---

## Design


| Principle  | Detail                                                                               |
| ---------- | ------------------------------------------------------------------------------------ |
| Width      | 600px content column (email standard)                                                |
| Layout     | `role="presentation"` tables — Outlook-safe                                          |
| Typography | System UI stack — no web fonts                                                       |
| Palette    | PCK neutral luxury — ink `#1c1917`, accent `#1e3a5f`, gold `#a6833d`, line `#e7e5e4` |
| Images     | Replace `src` with hosted URLs (ESP or CDN)                                          |
| Preview    | Cream `#f5f0eb` body when opening `.html` locally — not part of the paste block      |


---



## Blocks


| #   | File                           | Use                                  |
| --- | ------------------------------ | ------------------------------------ |
| 01  | `blocks/01-hero-property.html` | Property hero image + headline + CTA |
| 02  | `blocks/02-two-column.html`    | Image + story / feature copy         |
| 03  | `blocks/03-promo-cta.html`     | Direct-booking offer on navy panel   |
| 04  | `blocks/04-testimonial.html`   | Guest quote + attribution            |
| 05  | `blocks/05-pre-arrival.html`   | Check-in essentials list             |
| 06  | `blocks/06-footer.html`        | Brand, social, address, unsubscribe  |


---



## How to embed (buyers)

1. Open the `.html` file in a browser to preview.
2. Copy everything between `<!-- PASTE START -->` and `<!-- PASTE END -->`.
3. In **Mailchimp**: drag a *Code* block into the campaign → paste.
4. In **Klaviyo**: drag a *Text* block → source / HTML mode → paste.
5. Replace image URLs, links, property name, and `{{ unsubscribe_url }}` with your ESP merge tags.
6. Send a test to Gmail, Apple Mail, and Outlook before going live.



### ESP merge tags (examples)


| ESP       | Unsubscribe                                       |
| --------- | ------------------------------------------------- |
| Mailchimp | `*|UNSUB|*`                                       |
| Klaviyo   | `{% unsubscribe %}`                               |
| Generic   | `{{ unsubscribe_url }}` (placeholder in block 06) |


---



## Customization

- **Colors** — find/replace hex values or edit inline `style` attributes.
- **Buttons** — navy `#1e3a5f` fill; invert to white button on dark blocks (see block 03).
- **Mobile** — blocks 01–02 include `@media` stack rules; test on a phone.

---



## Distinct layouts


| Block       | Visual identity                         |
| ----------- | --------------------------------------- |
| Hero        | Full-bleed image, gold kicker, navy CTA |
| Two-column  | 260px image + copy, stacks on mobile    |
| Promo       | Solid navy panel, white CTA             |
| Testimonial | Stone background, gold accent bar       |
| Pre-arrival | Row list with muted labels              |
| Footer      | Centered, minimal legal                 |


