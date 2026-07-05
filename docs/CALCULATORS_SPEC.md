# Phase 1 — Calculators Specification

Each calculator is a **single self-contained HTML file** — scoped CSS, no external dependencies, sold separately.

---

## Widget design philosophy

These are **embeddable widgets**, not standalone apps. The buyer's page supplies the headline, branding, and layout context.

| Principle | Why |
|-----------|-----|
| **No outer card** | No border, shadow, or padding wrapper — blends into any site |
| **No built-in title** | Buyer adds their own `<h2>` above the paste block |
| **`font: inherit`** | Picks up host typography where possible |
| **`max-width` ~400px** | Fits sidebars, blog columns, and property pages |
| **Transparent background** | Works on light, dark, or image backgrounds (inputs stay white) |
| **Distinct UI per product** | Each calculator looks different — not a shared template |
| **Compact product shell** | Soft shadow + rounded card (~400px) — polished when pasted, themeable via CSS vars |
| **Preview canvas** | Opening the `.html` file shows a gradient backdrop; omit the `body:has()` block when embedding |
| **Collapsible = optional only** | `<details>` for advanced fields, not for core flow |
| **One-line disclaimer** | Tiny footnote, not a centered banner |

### Theming (per product)

Override CSS variables on the root class to match a host site:

```css
.pck-mortgage-calc { --w-accent: #your-brand; --w-border: #ddd; }
.pck-airbnb-calc   { --w-accent: #your-brand; }
.pck-autoloan-calc { --w-accent: #your-brand; }
```

### Distinct layouts

| Calculator | Visual identity |
|------------|-----------------|
| **Mortgage** | Navy gradient result header · frosted stat rows · prefixed currency inputs |
| **Airbnb** | Teal gradient hero · custom range sliders · pill toggle · stat chips |
| **Auto-loan** | Black payment hero · KPI strip · dark table header · zebra schedule |

---

## Shared behavior

- Live recalculation on input change
- Currency via `Intl.NumberFormat`
- Scoped CSS under unique root class; logic in IIFE, no globals
- Mobile: single column below ~360–400px

---

## 1. Mortgage Affordability

**File:** `calculators/mortgage-affordability/mortgage-affordability.html`

### Inputs

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| Annual gross income | currency | $85,000 | Pre-tax household income |
| Monthly debt payments | currency | $450 | Car, student loans, cards, etc. |
| Down payment | currency | $40,000 | Cash toward purchase |
| Interest rate | % | 6.5 | Annual note rate |
| Loan term | select | 30 years | 15 / 20 / 30 |
| Property tax (annual) | currency | $3,600 | Optional; ÷12 for monthly |
| Home insurance (monthly) | currency | $120 | Optional |
| HOA (monthly) | currency | $0 | Optional |

### Outputs

| Output | Description |
|--------|-------------|
| Max affordable home price | Headline result |
| Max loan, monthly housing | Stat list rows |
| Front / back DTI | Combined stat row |
| Guideline status | One-line text (color-coded) |

Tax, insurance, HOA are **collapsed by default** — most users skip them initially.

### Logic

- 28% front-end cap: max housing ≤ 28% of gross monthly income  
- 36% back-end cap: housing ≤ (36% of gross monthly) − existing debts  
- Affordable P&I = min(28% housing, 36% housing room) − tax − insurance − HOA  
- Loan amount from payment: standard amortization inverse  
- Home price = loan amount + down payment  

---

## 2. Airbnb Revenue Estimator

**File:** `calculators/airbnb-revenue/airbnb-revenue.html`

### Inputs (visible by default)

| Field | Type | Default |
|-------|------|---------|
| Nightly rate | range slider | $185 |
| Occupancy rate | range slider | 72% |
| Period | pill toggle | Monthly / Annual |

### Inputs (collapsed — "Fees & expenses")

| Field | Default |
|-------|---------|
| Avg. stay length | 3 nights |
| Cleaning fee | $75 |
| Fixed costs / month | $350 |
| Platform fee | 3% |
| Listings | 1 |

### Outputs

| Output | Description |
|--------|-------------|
| Net revenue | Large headline number |
| Booked nights, gross, after fees | One-line breakdown |

### Logic

- Booked nights = round(days × occupancy% × listings)  
- Stays = booked nights ÷ avg stay length  
- Gross = (booked nights × nightly rate) + (stays × cleaning fee)  
- Net = gross − (gross × platform fee%) − fixed expenses (annualized if yearly view)  

---

## 3. Auto-Loan Amortization

**File:** `calculators/auto-loan-amortization/auto-loan-amortization.html`

### Inputs

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| Vehicle price | currency | $32,000 | Sticker / sale price |
| Down payment | currency | $5,000 | Cash down |
| Trade-in value | currency | $0 | Optional |
| Sales tax | % | 8.25 | Applied to taxable amount |
| APR | % | 5.9 | Annual percentage rate |
| Loan term | select | 60 mo | 36 / 48 / 60 / 72 |
| Extra monthly payment | currency | $0 | Optional accelerated paydown |

### Inputs (visible by default)

Price, down payment, APR, term, sales tax.

### Inputs (collapsed — "Trade-in & extra payment")

Trade-in value, extra monthly payment.

### Outputs

| Output | Description |
|--------|-------------|
| Monthly payment | Top paybar |
| Financed, total interest, payoff | 3-column KPI row |
| Interest saved | Shown only when extra payment &gt; 0 |
| Amortization table | **Collapsed by default** — user opens when needed |

### Logic

- Taxable base = max(0, price − trade-in)  
- Tax = taxable × sales tax %  
- Financed = price − down − trade-in + tax  
- Monthly rate = APR / 12 / 100  
- Payment = P × r(1+r)^n / ((1+r)^n − 1)  
- Schedule loop with optional extra principal each month  

---

## Disclaimer (all calculators)

Educational estimates only — not financial, tax, or legal advice. Actual rates, fees, and terms vary by lender and market.
