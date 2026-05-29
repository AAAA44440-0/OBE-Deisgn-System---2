// screens-home.jsx — Home / portfolio overview

function PortfolioCard({ onTrade }) {
  const [hide, setHide] = useState(false);
  return (
    <div style={{ margin:'4px 16px 0', background:'var(--bg-inverse)', borderRadius:18, padding:'18px 18px 16px', color:'#fff', border:'1px solid var(--border-primary)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, color:'rgba(255,255,255,.6)', fontSize:13, fontWeight:500 }}>
        Total balance (USD)
        <span onClick={()=>setHide(!hide)} style={{ cursor:'pointer', display:'inline-flex' }}><Icon name={hide?'eye-off':'eye'} size={15} stroke={2} /></span>
      </div>
      <div style={{ fontFamily:'var(--font-num)', fontWeight:600, fontSize:38, letterSpacing:'-0.02em', marginTop:4, fontVariantNumeric:'tabular-nums' }}>
        {hide ? '••••••' : fmtUsd(PORTFOLIO.usd)}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:6 }}>
        <span style={{ background:'var(--buy)', color:'#fff', fontFamily:'var(--font-num)', fontWeight:600, fontSize:12, padding:'2px 7px', borderRadius:6 }}>{signPct(PORTFOLIO.chg)}</span>
        <span style={{ color:'var(--buy)', fontFamily:'var(--font-num)', fontSize:13 }}>+{fmtUsd(PORTFOLIO.chgUsd)} today</span>
      </div>
      <div style={{ display:'flex', gap:10, marginTop:16 }}>
        <Btn variant="brand" size="md" full onClick={onTrade}>Deposit</Btn>
        <Btn variant="secondary" size="md" full onClick={onTrade} style={{ background:'rgba(255,255,255,.14)', color:'#fff' }}>Withdraw</Btn>
      </div>
    </div>
  );
}

function QuickActions({ onNav }) {
  const items = [
    { icon:'arrow-down-to-line', label:'Deposit', go:'assets' },
    { icon:'arrow-right-left',   label:'Trade',   go:'trade' },
    { icon:'piggy-bank',         label:'Earn',    go:'market' },
    { icon:'gift',               label:'Rewards', go:'home' },
  ];
  return (
    <div style={{ display:'flex', padding:'18px 16px 6px' }}>
      {items.map(it => (
        <button key={it.label} onClick={()=>onNav(it.go)} style={{ flex:1, border:0, background:'transparent', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:7 }}>
          <span style={{ width:48, height:48, borderRadius:14, background:'var(--bg-brand)', color:'var(--fg-brand)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={it.icon} size={22} /></span>
          <span style={{ fontSize:12, fontWeight:500, color:'var(--fg-2)' }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}

function HomeMarketRow({ c, onClick }) {
  return (
    <button onClick={onClick} style={{ display:'flex', alignItems:'center', gap:12, width:'100%', border:0, background:'transparent', cursor:'pointer', padding:'11px 16px' }}>
      <CoinIcon t={c.t} />
      <div style={{ textAlign:'left' }}>
        <div style={{ fontWeight:600, fontSize:15, color:'var(--fg-1)' }}>{c.t}</div>
        <div style={{ fontSize:11, color:'var(--fg-3)' }}>{c.name}</div>
      </div>
      <div style={{ marginLeft:'auto' }}><Spark seed={c.t} up={c.chg>=0} /></div>
      <div style={{ textAlign:'right', minWidth:84 }}>
        <div style={{ fontFamily:'var(--font-num)', fontWeight:600, fontSize:15, color:'var(--fg-1)', fontVariantNumeric:'tabular-nums' }}>{fmt(c.price)}</div>
        <div style={{ fontSize:12, marginTop:1 }}><Chg v={c.chg} /></div>
      </div>
    </button>
  );
}

function HomeScreen({ onNav, onCoin }) {
  const [tab, setTab] = useState('Hot');
  const list = tab==='Gainers' ? [...COINS].sort((a,b)=>b.chg-a.chg) : COINS;
  return (
    <div>
      <PortfolioCard onTrade={()=>onNav('trade')} />
      <QuickActions onNav={onNav} />
      <div style={{ height:8, background:'var(--bg-layer)', margin:'10px 0 0' }} />
      <div style={{ display:'flex', alignItems:'center', padding:'14px 16px 4px' }}>
        <div style={{ display:'flex', gap:20 }}>
          {['Hot','Gainers'].map(t=>(
            <span key={t} onClick={()=>setTab(t)} style={{ fontWeight:600, fontSize:17, cursor:'pointer', color: tab===t?'var(--fg-1)':'var(--fg-3)' }}>{t}</span>
          ))}
        </div>
        <span onClick={()=>onNav('market')} style={{ marginLeft:'auto', fontSize:13, color:'var(--fg-3)', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:2 }}>More <Icon name="chevron-right" size={15} /></span>
      </div>
      <div>
        {list.slice(0,6).map(c => <HomeMarketRow key={c.t} c={c} onClick={()=>onCoin(c)} />)}
      </div>
      <div style={{ height:12 }} />
    </div>
  );
}

Object.assign(window, { HomeScreen });
