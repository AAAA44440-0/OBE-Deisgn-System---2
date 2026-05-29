# OBE Design System

OBE is a **crypto exchange & Web3 wallet** product. The interface is mobile-first (bottom tab bar: **Home · Market · Trade · Assets · Futures**) with a parallel desktop/web surface (480 / 680px modal widths in the kit). The system is bilingual (English + Simplified Chinese) and ships **light and dark themes** that switch purely through semantic tokens — no DOM or token-name changes.

The visual signature: a warm **brand orange `#F59505`**, a cool near-black/white neutral ramp, and **directional trading colors** — buy/long is green `#00AB6C`, sell/short is a distinctive **magenta `#ED4178`** (not the usual red). Dense, data-rich screens with tabular numerals, restrained surfaces, and a single confident accent.

---

## Sources

This design system was generated from a single attached source — no Figma/GitHub links were provided live, but the kit references its origin:

- **`OBE-Kit/`** — a token + documentation kit auto-extracted from the Figma file `OBE-Kit.fig` (original name 「OBE-测试」, exported 2026-05-29). Contains:
  - `docs/01-design-tokens.md` … `05-component-details.md` — token tables, color system, typography, 30 component categories (~2,683 master components), per-component variant matrices.
  - `tokens/tokens.css · .scss · .js · .json · tailwind.config.js` — 164 design tokens (149 color, 15 spacing, 24 type styles), light + dark.
  - `data/` — raw token alias chains, component property trees, typography JSON.
- The kit is **tokens + docs only** — it contains **no font files, no logo art, no icon SVGs, and no radius/shadow tokens**. Those are substituted (see Iconography & Visual Foundations) and flagged below.

> ⚠️ **Substitutions to confirm with the user** — see "Caveats" at the bottom.

---

## Index / Manifest

| File | What it is |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography |
| `colors_and_type.css` | The CSS contract: primitive palette → semantic tokens → type roles, light + dark |
| `preview/*.html` | Design-system tab cards (colors, type, spacing, components) |
| `ui_kits/app/` | **Mobile exchange app** UI kit — README, `index.html`, JSX components |
| `SKILL.md` | Agent Skill manifest for reuse in Claude Code |
| `assets/` | Logo + brand notes (the source kit shipped no binary assets) |

There is **no slide template** in the source, so no `slides/` folder was created.

---

## Content Fundamentals

How OBE writes copy. Mirror this voice in any new surface.

- **Bilingual, Chinese-led structure.** The source documents are written in Simplified Chinese with English technical terms inline (e.g. 「主要按钮」/Primary, 「购买按钮」/Success). Product UI labels are typically short English nouns — **Home, Market, Trade, Assets, Futures, Buy, Sell, Deposit, Withdraw** — with Chinese used for descriptive/body copy. Match the language of the surface you're building; keep labels terse in either language.
- **Casing:** Title- or sentence-case for labels, never ALL-CAPS for UI. Crypto tickers are uppercase (`BTC`, `ETH`, `USDT`). Numbers dominate the UI — always formatted with thousands separators and fixed decimals (`64,182.50`, `+2.34%`).
- **Tone:** neutral, precise, financial. No marketing fluff inside the app; informational and action-first ("Confirm", "Place Order", "Insufficient balance"). Empty/result states are plain and reassuring ("No assets yet", "Order submitted").
- **Voice:** addresses the user directly and sparingly ("Your assets", "You'll receive"). Avoids exclamation and hype.
- **Numbers & status:** gains are green and prefixed `+`, losses magenta and prefixed `−`. Pending/processing states use orange. Percentages always carry a sign in market contexts.
- **No emoji** in product UI. Iconography and color carry meaning instead.
- **Examples of vibe:** `BTC/USDT  64,182.50  +2.34%` · `可用余额 Available 1,204.55 USDT` · `Buy BTC` (green) / `Sell BTC` (magenta) · `Order submitted · 订单已提交`.

---

## Visual Foundations

Everything that makes a surface look like OBE.

**Color & theme.** Two-layer token architecture: a primitive palette (brand orange, neutral `gary` ramp, green/red functional ramps) feeds semantic tokens (`--fg-1`, `--bg-base`, `--buy`, `--sell`…). Light is the default; dark mode re-points the same semantic tokens. Light backgrounds are pure white (`#FFFFFF`) over a faint cool gray section layer (`#F7F7FA`); dark backgrounds are near-black (`#070808`) over `#131516`. **One accent only** — orange — used for the brand mark, primary CTAs in marketing/onboarding, warnings, and selected/active emphasis. In-app primary actions are typically **black (light) / white (dark)**, not orange; orange is the *brand* button, used deliberately.

**Trading color is directional, not decorative.** Green `#00AB6C` = buy/long/up. Magenta `#ED4178` = sell/short/down. These are reserved for price movement, P&L, and buy/sell controls — never for generic UI chrome.

**Typography.** Three families working together: **Switzer** (Semibold) for display headings and all **numerals/prices** (tight, confident, tabular); **IBM Plex Sans** for headings, subtitles, body, and UI labels; **PingFang SC** for Chinese. Display sizes run 80 / 56 px; headings 48→24; body 16→14; captions 12→10. Letter-spacing tightens on large display sizes. Prices use `font-variant-numeric: tabular-nums` so columns align.

**Spacing.** A 2-based scale: `0 · 2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48`. `16` is the default screen gutter and card padding; `8`/`12` for internal gaps; `4`/`6` for tight chip/badge padding. Mobile hit targets ≥ 44px (button sizes 24/32/40/48).

**Backgrounds.** Flat color, no photographic hero imagery in-app. Surfaces are layered by value (base → section layer → popover), separated by **hairline dividers** (`#0B0C0E0A` light / `#FFFFFF14` dark) rather than heavy borders. Marketing/onboarding may use a soft brand-orange tint (`--bg-brand`) or a subtle gradient mask (the kit defines `new-Gradient Bg 0%→100%` fades for fading content edges). No repeating patterns or textures.

**Corner radii** (inferred — kit ships no radius tokens): chips/inputs ~8px, cards ~12px, sheets/modals ~16–24px, pills/avatars fully rounded. Keep radii soft but not playful.

**Elevation & shadows** (inferred — kit ships no shadow tokens): light mode uses soft, low-contrast shadows (`0 4px 16px rgba(11,12,14,.08)`) for popovers/sheets; dark mode leans on background-value steps and borders more than shadows. Bottom sheets and modals carry the most elevation; cards inside a screen usually sit flat, separated by dividers.

**Borders.** Two weights: a near-invisible `--border-primary` (8% black / white) for resting component edges, and `--border-secondary` (14%) for emphasis. Selected states use a solid black/white `--border-selected`. Inputs use a fill (`--fill-2`) rather than a visible border at rest.

**Masks / overlays.** Modal scrims are `~50%` dark (`#0E0F1180`); heavier 55% / 75% masks exist for full-screen takeovers. Tooltips sit on a dark `#38393D` bubble in both themes.

**Animation.** Restrained and functional. Sheets slide up from the bottom; tabs/segmented controls slide an indicator; toasts/global banners fade+slide in from the top. No bounce, no playful spring; ease-out, ~150–250ms. Carousel indicators and step bars animate the active marker only.

**Hover / press states.** Buttons darken on press via dedicated tokens (Primary `#0B0C0E`→press `#000000`; Brand `#F59505`→hover `#F6A01E`→press `#DC8605`; Buy `#00AB6C`→press `#05903C`; Sell `#ED4178`→press `#CA2458`). Secondary/soft components use a `Component-Hover` gray fill. Press generally darkens color rather than scaling; selection toggles a solid border or active fill.

**Transparency & blur.** Used sparingly — scrims, gradient content-fades, and alpha hairline dividers. No pervasive frosted-glass; OBE prefers solid layered surfaces.

**Cards.** Flat surface (`--bg-base` or `--bg-layer`), ~12px radius, hairline or no border, generous `16px` padding, separated from siblings by `8–12px` gaps or dividers. Lists (markets, assets) are divider-separated rows rather than boxed cards.

---

## Iconography

The source kit lists **124 icon components** (≈99 UI glyphs + 25 cryptocurrency coin icons) **by name only — no SVG/PNG art is included.** Approach:

- **UI icons** are an **outline/line style** (names like `Icon_line_Star`, `Icon_fill_Star`, `Icon_chevron_left/right/up/down`, `Icon_add`, `Icon_subtract`, `Icon_close`, circle-filled status icons for success/info/warning/error). Both line and filled variants exist; line is the default, filled is used for active/emphasis states.
  - **Substitution (flagged):** we use **[Lucide](https://lucide.dev)** via CDN — a 1.5–2px outline set that matches OBE's line weight and rounded joins. Status icons (success/error/warning/info) use Lucide's circle-* glyphs.
- **Coin/crypto icons** (BTC, ETH, USDT, BNB, USDC, DOGE, SOL, LINK, DAI, TRX, SHIB, AVAX, SUI, LTC, BCH …) are brand marks.
  - **Substitution (flagged):** we use the **[cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons)** set via jsDelivr CDN (`/gh/spothq/cryptocurrency-icons/svg/color/<ticker>.svg`) — full-color official coin glyphs.
- **Emoji:** never used in product UI.
- **Unicode chars** are used for tiny affordances (arrows `↑ ↓`, the `+ / −` signs on P&L) but real icons are preferred for anything tappable.

See `assets/README.md` for CDN links and the substitution flags. **Replace these with OBE's real icon exports when available.**

---

## Caveats / substitutions to confirm

1. **Fonts** — **Switzer** is loaded from the Fontshare CDN and **IBM Plex Sans / Mono** from Google Fonts. If you have licensed `.woff2` files, drop them in `fonts/` and update `colors_and_type.css`.
2. **Icons** — Lucide (UI) and cryptocurrency-icons (coins) are **substitutions**; the real OBE icon set was not in the source. Replace when available.
3. **Logo** — no logo art was provided; the kit renders a wordmark placeholder ("OBE" in Switzer Semibold + brand orange dot). Provide the real logo SVG.
4. **Radii & shadows** — inferred (the kit has no radius/elevation tokens). Confirm against the real Figma.
