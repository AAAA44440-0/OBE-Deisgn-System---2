---
name: obe-design
description: Use this skill to generate well-branded interfaces and assets for OBE (a crypto exchange / Web3 wallet), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What's here
- `README.md` — product context, content + visual foundations, iconography, caveats.
- `colors_and_type.css` — the design contract: primitive palette → semantic tokens (`--fg-1`, `--bg-base`, `--buy`, `--sell`…) → type roles. Light default; add `class="dark"` or `data-theme="dark"` for dark mode. **Link this file and use the semantic vars.**
- `preview/` — design-system specimen cards (colors, type, spacing, components).
- `ui_kits/app/` — interactive iPhone recreation of the OBE exchange app (React + Babel). Reusable components: `Btn, Tag, Chg, CoinIcon, Icon, Spark, BottomNav, AreaChart` + full screens.
- `assets/` — logo + icon notes (CDN substitutions; no binary art shipped).

## Non-negotiables when designing for OBE
- Brand orange is `#F59505` — one accent, used deliberately (brand button, warnings, active emphasis). In-app primary CTAs are black/white, not orange.
- **Trading color is directional:** buy/long/up = green `#00AB6C`; sell/short/down = magenta `#ED4178`. Never decorative.
- Type: **Switzer** for display + all numerals (tabular-nums for prices), **IBM Plex Sans** for UI/body, **PingFang SC** for Chinese.
- Flat layered surfaces, hairline dividers, soft radii (cards 12, sheets 16–24), restrained ease-out motion. No emoji in product UI.
- Icons: Lucide (UI) + cryptocurrency-icons (coins) via CDN — substitutions; flag if the user has real exports.
