// app-components.jsx — shared primitives for the OBE app UI kit
const { useState, useEffect, useRef } = React;

// ── Lucide icon wrapper ───────────────────────────────────────
function Icon({ name, size = 22, stroke = 2, color, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const host = ref.current; if (!host) return;
    host.innerHTML = '';
    const i = document.createElement('i');
    i.setAttribute('data-lucide', name);
    i.setAttribute('width', size); i.setAttribute('height', size);
    i.setAttribute('stroke-width', stroke);
    host.appendChild(i);
    if (window.lucide) window.lucide.createIcons();
  });
  return <span ref={ref} style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:size, height:size, color, ...style }} />;
}

// ── Coin icon (CDN svg, falls back to lettered disc) ──────────
function CoinIcon({ t, size = 36 }) {
  const [err, setErr] = useState(false);
  if (err) return (
    <div style={{ width:size, height:size, borderRadius:'50%', background:'var(--fill-1)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-num)', fontWeight:700, fontSize:size*0.34, color:'var(--fg-2)' }}>{t[0]}</div>
  );
  return <img src={coinUrl(t)} width={size} height={size} onError={()=>setErr(true)} style={{ borderRadius:'50%', display:'block' }} />;
}

// ── Button ────────────────────────────────────────────────────
function Btn({ children, variant='primary', size='lg', full, onClick, style }) {
  const [press, setPress] = useState(false);
  const bg = {
    primary:'var(--btn-primary)', secondary:'var(--btn-secondary)', brand:'var(--btn-brand)',
    buy:'var(--buy)', sell:'var(--sell)', ghost:'transparent',
  }[variant];
  const pressBg = {
    primary:'var(--btn-primary-press)', secondary:'var(--btn-secondary-press)', brand:'var(--btn-brand-press)',
    buy:'var(--buy-press)', sell:'var(--sell-press)', ghost:'var(--fill-2)',
  }[variant];
  const fg = variant==='secondary' ? 'var(--fg-1)' : variant==='ghost' ? 'var(--fg-1)' : '#fff';
  const h = { lg:48, md:40, sm:32 }[size];
  return (
    <button onClick={onClick}
      onMouseDown={()=>setPress(true)} onMouseUp={()=>setPress(false)} onMouseLeave={()=>setPress(false)}
      style={{ height:h, width: full?'100%':'auto', padding:`0 ${size==='sm'?14:20}px`,
        background: press?pressBg:bg, color:fg, border: variant==='ghost'?'1px solid var(--border-secondary)':'0',
        borderRadius:999, fontFamily:'var(--font-ui)', fontWeight:600, fontSize: size==='sm'?13:15,
        cursor:'pointer', transition:'background .12s', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, ...style }}>
      {children}
    </button>
  );
}

// ── Tag / pill ────────────────────────────────────────────────
function Tag({ children, tone='neutral', pill, style }) {
  const map = {
    neutral:['var(--fill-2)','var(--fg-2)'], up:['var(--success-bg)','var(--success-fg)'],
    down:['var(--danger-bg)','var(--danger-fg)'], warn:['var(--warning-bg)','var(--warning-fg)'],
    brand:['var(--bg-brand)','var(--fg-brand)'], solid:['var(--btn-primary)','#fff'], lime:['var(--fill-lime)','#1b3c00'],
  }[tone];
  return <span style={{ background:map[0], color:map[1], fontSize:12, fontWeight:600, padding:'3px 8px', borderRadius: pill?999:6, ...style }}>{children}</span>;
}

// ── Change chip (signed pct, colored) ─────────────────────────
function Chg({ v, block }) {
  const up = v >= 0;
  if (block) return (
    <span style={{ background: up?'var(--buy)':'var(--sell)', color:'#fff', fontFamily:'var(--font-num)', fontWeight:600,
      fontSize:13, padding:'6px 0', borderRadius:8, minWidth:74, textAlign:'center', display:'inline-block' }}>{signPct(v)}</span>
  );
  return <span style={{ color: up?'var(--buy)':'var(--sell)', fontFamily:'var(--font-num)', fontWeight:600, fontVariantNumeric:'tabular-nums' }}>{signPct(v)}</span>;
}

// ── Sparkline ─────────────────────────────────────────────────
function Spark({ seed, up, w=64, h=28 }) {
  const pts = spark(seed, up);
  const d = pts.map((p,i)=>`${(i/(pts.length-1))*w},${h-p*h}`).join(' ');
  const col = up?'var(--buy)':'var(--sell)';
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display:'block' }}>
      <polyline points={d} fill="none" stroke={col} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

Object.assign(window, { Icon, CoinIcon, Btn, Tag, Chg, Spark });
