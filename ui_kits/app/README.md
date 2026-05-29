# OBE — Mobile App UI Kit

A high-fidelity, interactive recreation of the **OBE crypto exchange mobile app** (iPhone). Built on the OBE design tokens (`../../colors_and_type.css`) — light + dark via a single class toggle. This is a *cosmetic* recreation for prototyping, not production code.

## Run
Open `index.html`. The app mounts inside an iPhone frame (auto-scaled to fit). Use the **Dark / Light** toggle (top-right) to switch themes. Everything is clickable.

## Interactive flow
- **Home** — portfolio balance card, quick actions, Hot / Gainers market list.
- Tap any coin → **Coin detail** (price, area chart, range tabs, 24h stats, Buy/Sell).
- **Buy/Sell** → order ticket (side toggle, amount, 25/50/75/100% presets, available + est. total).
- **Place order** → confirm bottom sheet → **Order submitted** result → lands on Assets.
- Bottom nav: **Home · Markets · Trade · Futures · Assets**. Markets has search + filter tabs; Assets shows holdings; Futures lists perpetuals.

## Files
| File | Exports | What |
|---|---|---|
| `app-data.jsx` | `COINS, coinUrl, fmt, fmtUsd, signPct, spark, PORTFOLIO` | Fake market data + number formatters |
| `app-components.jsx` | `Icon, CoinIcon, Btn, Tag, Chg, Spark` | Shared primitives |
| `app-chrome.jsx` | `BottomNav, AreaChart` | Tab bar + price chart |
| `screens-home.jsx` | `HomeScreen` | Portfolio + market movers |
| `screens-market.jsx` | `MarketScreen, AssetsScreen` | Market list + holdings |
| `screens-trade.jsx` | `CoinDetail, TradeScreen, ConfirmSheet, ResultView` | Detail + order flow |
| `app.jsx` | `App, FuturesScreen` | Root: nav state + overlays |
| `ios-frame.jsx` | `IOSDevice` … | iPhone bezel (starter component) |
| `index.html` | — | Entry: loads React + Babel + Lucide, mounts `<App/>` |

## Conventions used
- **Trading color is directional:** buy/up = green `--buy`, sell/down = magenta `--sell`. Never decorative.
- **Numerals** use Switzer + `tabular-nums` so prices/balances align.
- **In-app primary CTA is black/white** (`--btn-primary`); **orange is the brand button** (Deposit), used deliberately. Buy/Sell use the trading colors.
- **Icons:** Lucide (UI) + cryptocurrency-icons (coins), both CDN substitutions — see `../../assets/README.md`.
- Bottom sheets slide from the bottom over a 50% scrim; cards are flat with hairline dividers between list rows.

## Caveats
- **Futures** screen is a light extrapolation (the source kit lists the Futures nav + perpetual/leverage terms but no full screen).
- Charts are deterministic pseudo-data, not real candlesticks.
- Icons/logo are CDN substitutions pending real OBE exports.
