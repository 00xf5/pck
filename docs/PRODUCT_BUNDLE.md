# Product Bundle — Full Specification & Roadmap

This document captures the complete **Premium Creative Kit (PCK)** vision so we can build incrementally without losing scope on later phases.

---

## Overall intent

This is **not one monolithic app**. It is a **toolkit of separate deliverables** that share a common design language:

- **Clean, flat, unbranded** — easy for buyers to rebrand
- **Hospitality / direct-booking focus** — reduce OTA dependency, look premium
- **Copy-paste or drop-in** — low friction for marketers (Mailchimp/Klaviyo) and developers (React/Vue/HTML)

### Target audience

- Boutique hotels and Airbnb hosts
- Villa and vacation-rental operators
- Hospitality-adjacent brands (architecture studios, premium agencies)
- Developers and designers building sites for the above

### How the pieces fit together

```
┌─────────────────────────────────────────────────────────────┐
│  Brand owner (villa, boutique hotel, agency)                │
└─────────────────────────────────────────────────────────────┘
         │
         ├── Landing pages (HTML)     → public website
         ├── UI kit (React/Vue)       → custom site/app build
         ├── Calculators              → embed on site (trust, planning)
         ├── Discount slider          → embed on booking page (conversion)
         └── Email blocks             → guest comms (Mailchimp/Klaviyo)
```

---

## Phase 1 — Interactive Financial & ROI Calculators Pack

**Status:** Active (start here)

A bundle of **3 clean, flat calculation blocks** — standalone widgets embeddable on a website. Inputs update results live in the browser (client-side, no backend required unless we add it later).

| Calculator | Purpose | Typical inputs |
|------------|---------|----------------|
| **Mortgage Affordability** | "How much house can I afford?" | Income, down payment, interest rate, term, debts |
| **Airbnb Revenue Estimator** | Hosts/investors estimate rental income | Nightly rate, occupancy %, nights booked, expenses |
| **Auto-Loan Amortization** | Payment schedule over loan life | Principal, APR, term, optional extra payments |

### Design direction

- Clean, flat UI — minimal chrome, clear typography
- Unbranded neutral palette; easy to theme
- Responsive layout
- Accessible form labels and readable result areas

### Delivery format (decided)

Each calculator is sold **separately** as **one self-contained HTML file**:

- Copy-paste into any page (WordPress, Webflow, Squarespace, raw HTML) — works immediately
- **No external** CSS, JS, fonts, or CDN links
- All styles in a `<style>` block, all logic in a `<script>` block, markup in the same file
- **Scoped CSS** via a unique root wrapper class (e.g. `.pck-mortgage-calc`) so styles never leak into the host site

No shared folder, no shared assets — each product is 100% independent.

### Repo structure (Phase 1)

```
calculators/
├── README.md                           # pack overview + links to each product
│
├── mortgage-affordability/
│   ├── mortgage-affordability.html   # THE product — single file buyers get
│   └── README.md                       # embed steps, customization notes
│
├── airbnb-revenue/
│   ├── airbnb-revenue.html
│   └── README.md
│
└── auto-loan-amortization/
    ├── auto-loan-amortization.html
    └── README.md
```

Optional (dev only, not shipped):

```
mortgage-affordability/
├── src/                    # split files while building (optional)
│   ├── styles.css
│   └── calculator.js
├── mortgage-affordability.html   # built/inlined — this is what ships
└── README.md
```

If using a `src/` split during development, the **only file sold** is still the single inlined HTML.

### Single-file anatomy

```html
<div class="pck-mortgage-calc">
  <!-- all markup inside this wrapper -->
</div>

<style>
  .pck-mortgage-calc { /* scoped reset + layout */ }
  .pck-mortgage-calc input { /* ... */ }
  .pck-mortgage-calc .pck-result { /* ... */ }
</style>

<script>
  (function () {
    var root = document.querySelector('.pck-mortgage-calc');
    // all logic scoped to root — no globals
  })();
</script>
```

### Open decisions (Phase 1)

- [x] Vanilla JS only — single HTML file per calculator
- [x] No shared assets — sold separately
- [x] Scoped CSS under unique root class per calculator
- [ ] Optional dev-time `src/` split + inline build step, or edit the HTML directly
- [ ] Formula sources and disclaimer copy for financial outputs

---

## Phase 2 — Tailwind CSS UI Kit

**Status:** Ready (18 HTML components)

HTML-only paste blocks · Tailwind CDN · neutral luxury theme · sold individually. JSX pack planned later.

See [UI_KIT_SPEC.md](UI_KIT_SPEC.md) and [../ui-kit/README.md](../ui-kit/README.md).

### Decisions (locked)

- [x] HTML only (JSX pack later)
- [x] Tailwind via CDN — scoped with `important: '#pck-*'`
- [x] 18 components — nav, hero, pricing, cards, forms, etc.
- [x] One neutral luxury theme · variants later
- [x] JS only where needed (nav mobile); FAQ uses `<details>`
- [x] Individual files per component

---

## Phase 3 — Email Template Pack / Newsletter Templates

**Status:** Planned

**6 or more** ultra-clean, **raw responsive HTML email blocks** that hospitality brands can copy and paste directly into **Mailchimp** or **Klaviyo** to send luxury updates to guests.

### Requirements

- Raw HTML (not tied to one ESP)
- Table-based or hybrid markup compatible with major email clients
- Inline-safe CSS patterns where needed
- Hospitality-oriented content placeholders (pre-arrival, offers, property highlights, etc.)

### Likely block types (to confirm)

- Hero / property feature
- Two-column image + text
- Offer / promo CTA
- Guest testimonial
- Footer with social + unsubscribe placeholder
- Pre-arrival checklist or itinerary teaser

### Open decisions (Phase 3)

- [ ] Exact block count and naming
- [ ] Test matrix (Gmail, Apple Mail, Outlook)
- [ ] Include Klaviyo/Mailchimp paste notes per block

---

## Phase 4 — Landing Page / Portfolio Templates

**Status:** Planned

Distinct, highly aesthetic **website landing layouts** shipped as **flat static HTML/CSS files** (no build step, no CMS required).

### Templates (from brief)

| Template | Audience |
|----------|----------|
| **Boutique villa** | Property showcase, direct booking positioning |
| **Modern architecture studio** | Portfolio, projects, studio credibility |
| **Premium digital service agency** | Services, case studies, premium positioning |

### Requirements

- Static `index.html` + CSS (+ assets folder)
- Strong typography, imagery, spacing — sell the *look*, not just structure
- Responsive
- Unbranded / easy to customize

### Open decisions (Phase 4)

- [ ] Shared asset pipeline vs. fully self-contained folders per template
- [ ] Include calculator/slider embed hooks in villa template
- [ ] Font licensing (Google Fonts vs. system stack)

---

## Phase 5 — Direct Booking Discount Slider Tool

**Status:** Planned

**The Multi-Night Booking Discounter Slider** — an interactive visual widget for boutique hotels and Airbnb hosts.

### Behavior

1. Website guest drags a slider from **1 night** to **7 nights** (or configurable max).
2. The **daily room rate** on screen **ticks down** as nights increase.
3. Communicates **direct-booking savings** vs. shorter stays or OTA booking.

### Purpose

Conversion tool on a booking or property page — visual proof of "book direct and save more the longer you stay." Not a full booking engine.

### Likely delivery format

- HTML/CSS/JS embeddable widget
- Configurable base rate, discount curve, currency, copy

### Open decisions (Phase 5)

- [ ] Linear vs. tiered discount model
- [ ] Show total price, nightly rate, or both
- [ ] Animation style for "ticking" rate
- [ ] Tie-in with Phase 1 Airbnb calculator theming

---

## Cross-cutting standards

Apply consistently across all phases:

| Topic | Guideline |
|-------|-----------|
| Visual style | Clean, flat, luxury-adjacent, generous whitespace |
| Branding | Unbranded defaults; CSS variables or Tailwind theme for overrides |
| Responsiveness | Mobile-first |
| Licensing | Define before public sale (single site vs. unlimited client projects) |
| Documentation | Each phase gets a README with embed/install instructions |

---

## Suggested build order

1. **Calculators** — self-contained, establishes math + UI patterns
2. **Booking slider** — related hospitality conversion widget (could swap with UI kit)
3. **UI kit** — reusable atoms for landing pages and apps
4. **Landing pages** — compose templates using kit patterns where possible
5. **Email templates** — parallel-friendly; different constraints (email HTML)

Order can shift; this doc preserves **what** each phase is regardless of **when** we build it.

---

## Ambiguities to resolve (global)

- [ ] Single zip bundle vs. separate SKUs per phase
- [ ] All client-side only, or any live API data (e.g. real mortgage rates)?
- [ ] Commercial license terms
- [ ] Demo/hosting site for previews

---

*Last updated: July 2026 — Phase 1 active.*
