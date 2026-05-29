// app-data.jsx — fake market data + helpers for the OBE app UI kit
const COINS = [
  { t:'BTC',  name:'Bitcoin',   price:64182.50, chg:+2.34, vol:'1.2B',  hold:0.4821 },
  { t:'ETH',  name:'Ethereum',  price:3418.07,  chg:+1.02, vol:'820M',  hold:3.150 },
  { t:'SOL',  name:'Solana',    price:148.96,   chg:-3.71, vol:'410M',  hold:18.42 },
  { t:'BNB',  name:'BNB',       price:592.18,   chg:+0.48, vol:'290M',  hold:0 },
  { t:'USDT', name:'Tether',    price:1.0001,   chg:+0.01, vol:'5.1B',  hold:1204.55 },
  { t:'DOGE', name:'Dogecoin',  price:0.16240,  chg:-0.58, vol:'180M',  hold:0 },
  { t:'LINK', name:'Chainlink', price:17.83,    chg:+4.12, vol:'96M',   hold:0 },
  { t:'AVAX', name:'Avalanche', price:38.07,    chg:-1.24, vol:'74M',   hold:0 },
  { t:'SUI',  name:'Sui',       price:4.21,     chg:+8.90, vol:'120M',  hold:0 },
  { t:'LTC',  name:'Litecoin',  price:88.40,    chg:+0.31, vol:'52M',   hold:0 },
];

const coinUrl = (t) => `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${t.toLowerCase()}.svg`;

function fmt(n, dp) {
  if (dp === undefined) dp = n >= 1000 ? 2 : (n >= 1 ? 2 : (n >= 0.01 ? 4 : 5));
  return n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
}
const fmtUsd = (n) => '$' + fmt(n);
const signPct = (n) => (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(2) + '%';

// deterministic pseudo sparkline points (0..1) seeded by ticker + trend
function spark(seed, up) {
  let s = 0; for (let i=0;i<seed.length;i++) s += seed.charCodeAt(i);
  const n = 24, pts = [];
  let v = 0.5;
  for (let i=0;i<n;i++){
    s = (s*9301+49297) % 233280;
    const r = s/233280 - 0.5;
    v += r*0.18 + (up?0.012:-0.012);
    v = Math.max(0.08, Math.min(0.92, v));
    pts.push(v);
  }
  return pts;
}

const PORTFOLIO = { usd: 32904.18, chg: +3.42, chgUsd: +1088.40 };

Object.assign(window, { COINS, coinUrl, fmt, fmtUsd, signPct, spark, PORTFOLIO });
