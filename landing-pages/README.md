# Landing Page Templates

Three self-contained static landing folders — no build step.

| Template | Folder | README |
|----------|--------|--------|
| Boutique villa | [boutique-villa/](boutique-villa/) | [README](boutique-villa/README.md) |
| Architecture studio | [architecture-studio/](architecture-studio/) | [README](architecture-studio/README.md) |
| Premium agency | [premium-agency/](premium-agency/) | [README](premium-agency/README.md) |

Each template also ships a single-file build at `standalone/index.html` (HTML + CSS + JS inlined; images still load from `../assets/`).

## Contact forms

Forms post natively via [FormSubmit](https://formsubmit.co). In each `index.html` (and matching standalone), replace the placeholder email in `action="https://formsubmit.co/…"` with the buyer’s inbox. First submit sends a confirmation email to activate the endpoint.
