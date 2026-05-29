# OBE — Assets

The source kit (`OBE-Kit.fig` export) shipped **no binary assets** — no logo art, no icon SVGs, no imagery. Everything below is either a documented CDN substitution (flagged) or a placeholder to replace with real OBE exports.

## Logo
**Real OBE (OneBullEx) logo is in place:**
- `logo-dark.svg` — dark wordmark, use on **light** backgrounds
- `logo-light.svg` — light wordmark, use on **dark** backgrounds

Both are full-color (brand orange `#F59505` accent + bull mark). The app header and logo specimen swap automatically by theme.

## UI icons — Lucide (substitution, flagged)
OBE's own outline icon set (~99 glyphs) was not in the source. We substitute **[Lucide](https://lucide.dev)** — a 1.5–2px outline set matching OBE's line weight.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="chevron-right"></i>
<script>lucide.createIcons();</script>
```

Mapping: `Icon_chevron_*` → `chevron-*`, `Icon_add/subtract` → `plus`/`minus`, `Icon_close` → `x`, `Icon_circlefilled_success` → `check-circle`, `…_error` → `x-circle`, `…_warning` → `alert-circle`, `…_info` → `info`, `Icon_line_Star`/`Icon_fill_Star` → `star`.

## Coin icons — cryptocurrency-icons (substitution, flagged)
The 25 crypto coin marks were not in the source. We substitute **[spothq/cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons)** (full-color):

```
https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/<ticker>.svg
```
e.g. `.../btc.svg`, `.../eth.svg`, `.../usdt.svg`, `.../bnb.svg`, `.../sol.svg`.

## Replace these
Provide real OBE logo + icon exports and these CDN substitutions can be retired.
