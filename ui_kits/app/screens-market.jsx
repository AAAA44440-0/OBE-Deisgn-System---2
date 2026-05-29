// screens-market.jsx — Markets list + Assets holdings

function SearchBar({ value, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--fill-2)', borderRadius:10, height:40, padding:'0 12px', margin:'4px 16px 8px' }}>
      <Icon name="search" size={18} color="var(--fg-3)" />
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder="Search coins"
        style={{ border:0, background:'transparent', outline:0, flex:1, fontFamily:'var(--font-ui)', fontSize:15, color:'var(--fg-1)' }} />
    </div>
  );
}

function MarketScreen({ onCoin }) {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('All');
  const tabs = ['Favorites','All','Gainers','New'];
  let list = COINS.filter(c => (c.t+c.name).toLowerCase().includes(q.toLowerCase()));
  if (tab==='Gainers') list = [...list].sort((a,b)=>b.chg-a.chg);
  if (tab==='Favorites') list = list.slice(0,4);
  return (
    <div>
      <SearchBar value={q} onChange={setQ} />
      <div style={{ display:'flex', gap:22, padding:'0 16px', borderBottom:'1px solid var(--divider-2)' }}>
        {tabs.map(t=>{
          const on = tab===t;
          return <a key={t} onClick={()=>setTab(t)} style={{ position:'relative', fontWeight:600, fontSize:15, padding:'8px 0 12px', cursor:'pointer', color: on?'var(--fg-1)':'var(--fg-3)' }}>{t}
            {on && <span style={{ position:'absolute', left:0, right:0, bottom:-1, height:2, background:'var(--fg-1)', borderRadius:2 }} />}</a>;
        })}
      </div>
      <div style={{ display:'flex', padding:'10px 16px 4px', fontSize:11, color:'var(--fg-3)' }}>
        <span>Name / Vol</span><span style={{ marginLeft:'auto' }}>Last price</span><span style={{ minWidth:80, textAlign:'right' }}>24h</span>
      </div>
      {list.map(c=>(
        <button key={c.t} onClick={()=>onCoin(c)} style={{ display:'flex', alignItems:'center', gap:12, width:'100%', border:0, background:'transparent', cursor:'pointer', padding:'10px 16px', borderBottom:'1px solid var(--divider-1)' }}>
          <CoinIcon t={c.t} />
          <div style={{ textAlign:'left' }}>
            <div style={{ fontWeight:600, fontSize:15, color:'var(--fg-1)' }}>{c.t}<span style={{ color:'var(--fg-4)', fontWeight:500 }}>/USDT</span></div>
            <div style={{ fontSize:11, color:'var(--fg-3)', fontFamily:'var(--font-num)' }}>Vol {c.vol}</div>
          </div>
          <div style={{ marginLeft:'auto', fontFamily:'var(--font-num)', fontWeight:600, fontSize:15, color:'var(--fg-1)', fontVariantNumeric:'tabular-nums' }}>{fmt(c.price)}</div>
          <div style={{ minWidth:80, display:'flex', justifyContent:'flex-end' }}><Chg v={c.chg} block /></div>
        </button>
      ))}
      {list.length===0 && <div style={{ textAlign:'center', color:'var(--fg-3)', padding:'48px 0', fontSize:14 }}>No coins match "{q}"</div>}
      <div style={{ height:12 }} />
    </div>
  );
}

function AssetsScreen({ onCoin, onNav }) {
  const held = COINS.filter(c=>c.hold>0);
  const total = held.reduce((s,c)=>s+c.hold*c.price,0);
  return (
    <div>
      <div style={{ margin:'4px 16px 0', background:'var(--bg-brand)', borderRadius:18, padding:'18px' }}>
        <div style={{ fontSize:13, color:'var(--fg-2)', fontWeight:500 }}>Estimated value (USD)</div>
        <div style={{ fontFamily:'var(--font-num)', fontWeight:600, fontSize:34, letterSpacing:'-0.02em', marginTop:3, color:'var(--fg-1)', fontVariantNumeric:'tabular-nums' }}>{fmtUsd(total)}</div>
        <div style={{ display:'flex', gap:10, marginTop:16 }}>
          <Btn variant="primary" size="md" full onClick={()=>onNav('trade')}>Deposit</Btn>
          <Btn variant="secondary" size="md" full onClick={()=>onNav('trade')}>Withdraw</Btn>
          <Btn variant="secondary" size="md" full onClick={()=>onNav('trade')}>Transfer</Btn>
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', padding:'18px 16px 6px' }}>
        <span style={{ fontWeight:600, fontSize:17 }}>Holdings</span>
        <span style={{ marginLeft:'auto', fontSize:13, color:'var(--fg-3)' }}>{held.length} assets</span>
      </div>
      {held.map(c=>(
        <button key={c.t} onClick={()=>onCoin(c)} style={{ display:'flex', alignItems:'center', gap:12, width:'100%', border:0, background:'transparent', cursor:'pointer', padding:'11px 16px', borderBottom:'1px solid var(--divider-1)' }}>
          <CoinIcon t={c.t} />
          <div style={{ textAlign:'left' }}>
            <div style={{ fontWeight:600, fontSize:15, color:'var(--fg-1)' }}>{c.t}</div>
            <div style={{ fontSize:11, color:'var(--fg-3)' }}>{c.name}</div>
          </div>
          <div style={{ marginLeft:'auto', textAlign:'right' }}>
            <div style={{ fontFamily:'var(--font-num)', fontWeight:600, fontSize:15, color:'var(--fg-1)', fontVariantNumeric:'tabular-nums' }}>{fmtUsd(c.hold*c.price)}</div>
            <div style={{ fontSize:12, color:'var(--fg-3)', fontFamily:'var(--font-num)' }}>{fmt(c.hold)} {c.t}</div>
          </div>
        </button>
      ))}
      <div style={{ height:12 }} />
    </div>
  );
}

Object.assign(window, { MarketScreen, AssetsScreen });
