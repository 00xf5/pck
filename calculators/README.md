# Calculators Pack (Phase 1)

Three self-contained HTML calculators — one file per product. Copy-paste into any site; no external dependencies.

| Product | File | Status |
|---------|------|--------|
| Mortgage Affordability | [mortgage-affordability/mortgage-affordability.html](mortgage-affordability/mortgage-affordability.html) | Ready |
| Airbnb Revenue Estimator | [airbnb-revenue/airbnb-revenue.html](airbnb-revenue/airbnb-revenue.html) | Ready |
| Auto-Loan Amortization | [auto-loan-amortization/auto-loan-amortization.html](auto-loan-amortization/auto-loan-amortization.html) | Ready |

Full input/output spec: [../docs/CALCULATORS_SPEC.md](../docs/CALCULATORS_SPEC.md)  
Embed & share: [../docs/EMBED_GUIDE.md](../docs/EMBED_GUIDE.md)

## How to use (buyers)

1. Open the `.html` file in a browser to preview.
2. Copy the calculator block + its `<style>` and `<script>` (omit the preview `body:has()` wrapper).
3. Paste into a WordPress HTML block, Webflow embed, or any page template.
4. Customize colors via CSS variables on the root class.
5. **Share scenarios** — inputs sync to the URL and `localStorage` automatically.
