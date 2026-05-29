// app-chrome.jsx — bottom tab bar + price area chart for the OBE app UI kit

// ── Bottom tab bar ────────────────────────────────────────────
function BottomNav({ active, onNav }) {
  const tabs = [
    { id:'home',    label:'Home',    icon:'house' },
    { id:'market',  label:'Markets', icon:'chart-candlestick' },
    { id:'trade',   label:'Trade',   icon:'arrow-right-left' },
    { id:'futures', label:'Futures', icon:'trending-up' },
    { id:'assets',  label:'Assets',  icon:'wallet' },
  ];
  return (
    <div style={{ display:'flex', borderTop:'1px solid var(--divider-1)', background:'var(--bg-base)',
      padding:'8px 6px 26px', flexShrink:0 }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={()=>onNav(t.id)} style={{ flex:1, border:0, background:'transparent',
            display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer',
            color: on?'var(--fg-1)':'var(--fg-3)' }}>
            <Icon name={t.icon} size={23} stroke={on?2.4:2} />
            <span style={{ fontSize:10, fontWeight:600, fontFamily:'var(--font-ui)' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Price area chart (deterministic) ──────────────────────────
function AreaChart({ seed, up, w=360, h=180 }) {
  const raw = spark(seed, up);
  const pts = raw.concat(raw.slice(0,6).map(v=>v));
  const max = Math.max(...pts), min = Math.min(...pts);
  const nx = (i)=> (i/(pts.length-1))*w;
  const ny = (v)=> h-8 - ((v-min)/(max-min||1))*(h-24);
  const line = pts.map((v,i)=>`${nx(i)},${ny(v)}`).join(' ');
  const area = `0,${h} ${line} ${w},${h}`;
  const col = up?'var(--buy)':'var(--sell)';
  const gid = 'g'+seed+(up?'u':'d');
  const lastY = ny(pts[pts.length-1]);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display:'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={col} stopOpacity="0.22" />
          <stop offset="100%" stopColor={col} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline points={line} fill="none" stroke={col} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="0" y1={lastY} x2={w} y2={lastY} stroke={col} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx={w} cy={lastY} r="3.5" fill={col} />
    </svg>
  );
}

Object.assign(window, { BottomNav, AreaChart });
