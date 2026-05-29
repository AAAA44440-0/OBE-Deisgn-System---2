// app.jsx — OBE mobile app root: nav + overlays, mounted in IOSDevice
const { useState: useS } = React;

function AppHeader({ view, onNav }) {
  if (view === 'home') {
    return (
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'52px 16px 8px', flexShrink:0 }}>
        <img className="obe-logo-dark" src="../../assets/logo-dark.svg" alt="OBE" style={{ height:22, display:'block' }} />
        <img className="obe-logo-light" src="../../assets/logo-light.svg" alt="OBE" style={{ height:22, display:'block' }} />
        <div style={{ marginLeft:'auto', display:'flex', gap:6 }}>
          <button onClick={()=>onNav('market')} style={{ border:0, background:'transparent', cursor:'pointer', color:'var(--fg-1)', padding:6, display:'inline-flex' }}><Icon name="search" size={22} /></button>
          <button style={{ border:0, background:'transparent', cursor:'pointer', color:'var(--fg-1)', padding:6, display:'inline-flex' }}><Icon name="bell" size={22} /></button>
        </div>
      </div>
    );
  }
  const title = { market:'Markets', trade:'Trade', futures:'Futures', assets:'Assets' }[view];
  return (
    <div style={{ display:'flex', alignItems:'center', padding:'52px 16px 8px', flexShrink:0 }}>
      <span style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:26, letterSpacing:'-0.01em', color:'var(--fg-1)' }}>{title}</span>
      {view==='assets' && <button style={{ marginLeft:'auto', border:0, background:'transparent', cursor:'pointer', color:'var(--fg-1)', padding:6, display:'inline-flex' }}><Icon name="history" size={22} /></button>}
    </div>
  );
}

function FuturesScreen({ onCoin }) {
  const list = COINS.slice(0,7);
  return (
    <div>
      <div style={{ margin:'4px 16px 12px', padding:'14px 16px', background:'var(--bg-inverse)', color:'#fff', borderRadius:14, display:'flex', alignItems:'center', gap:10 }}>
        <Icon name="trending-up" size={22} color="var(--fg-brand)" />
        <div style={{ fontSize:13, lineHeight:1.4 }}>Perpetual contracts · up to <b>125×</b> leverage</div>
      </div>
      <div style={{ display:'flex', padding:'0 16px 6px', fontSize:11, color:'var(--fg-3)' }}>
        <span>Contract</span><span style={{ marginLeft:'auto' }}>Last / Index</span><span style={{ minWidth:80, textAlign:'right' }}>24h</span>
      </div>
      {list.map(c=>(
        <button key={c.t} onClick={()=>onCoin(c)} style={{ display:'flex', alignItems:'center', gap:12, width:'100%', border:0, background:'transparent', cursor:'pointer', padding:'10px 16px', borderBottom:'1px solid var(--divider-1)' }}>
          <div style={{ textAlign:'left' }}>
            <div style={{ fontWeight:600, fontSize:15, color:'var(--fg-1)', display:'flex', alignItems:'center', gap:6 }}>{c.t}USDT <Tag tone="lime" style={{ fontSize:10, padding:'1px 5px' }}>Perp</Tag></div>
            <div style={{ fontSize:11, color:'var(--fg-brand)', fontFamily:'var(--font-num)', fontWeight:600 }}>20×</div>
          </div>
          <div style={{ marginLeft:'auto', fontFamily:'var(--font-num)', fontWeight:600, fontSize:15, color:'var(--fg-1)', fontVariantNumeric:'tabular-nums' }}>{fmt(c.price)}</div>
          <div style={{ minWidth:80, display:'flex', justifyContent:'flex-end' }}><Chg v={c.chg} block /></div>
        </button>
      ))}
      <div style={{ height:12 }} />
    </div>
  );
}

function App() {
  const [view, setView] = useS('home');
  const [detail, setDetail] = useS(null);   // coin object or null
  const [trade, setTrade] = useS(null);     // {coin, side} or null  (overlay ticket)
  const [order, setOrder] = useS(null);     // confirm sheet order
  const [result, setResult] = useS(null);   // result order

  const openCoin = (c) => setDetail(c);
  const startTrade = (c, side) => { setDetail(null); setTrade({ coin:c, side }); };
  const place = (o) => setOrder(o);
  const confirm = () => { setResult(order); setOrder(null); setTrade(null); };

  let body;
  if (view==='home')    body = <HomeScreen onNav={setView} onCoin={openCoin} />;
  if (view==='market')  body = <MarketScreen onCoin={openCoin} />;
  if (view==='trade')   body = <TradeScreen onPlace={place} />;
  if (view==='futures') body = <FuturesScreen onCoin={openCoin} />;
  if (view==='assets')  body = <AssetsScreen onCoin={openCoin} onNav={setView} />;

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--bg-base)', position:'relative', overflow:'hidden' }}>
      <AppHeader view={view} onNav={setView} />
      <div style={{ flex:1, overflow:'auto' }}>{body}</div>
      <BottomNav active={view} onNav={(v)=>{ setDetail(null); setTrade(null); setView(v); }} />

      {/* Coin detail overlay */}
      {detail && (
        <div style={{ position:'absolute', inset:0, zIndex:70, paddingTop:44, background:'var(--bg-base)' }}>
          <CoinDetail c={detail} onBack={()=>setDetail(null)} onTrade={startTrade} />
        </div>
      )}

      {/* Trade ticket overlay (from detail buy/sell) */}
      {trade && (
        <div style={{ position:'absolute', inset:0, zIndex:75, paddingTop:44, background:'var(--bg-base)', display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 12px' }}>
            <button onClick={()=>setTrade(null)} style={{ border:0, background:'transparent', cursor:'pointer', color:'var(--fg-1)', display:'inline-flex', padding:6 }}><Icon name="x" size={24} /></button>
            <span style={{ fontWeight:600, fontSize:17 }}>{trade.coin.t}/USDT</span>
          </div>
          <div style={{ flex:1, overflow:'auto' }}><TradeScreen coin={trade.coin} side={trade.side} onPlace={place} /></div>
        </div>
      )}

      <ConfirmSheet order={order} onClose={()=>setOrder(null)} onConfirm={confirm} />
      {result && <ResultView order={result} onDone={()=>{ setResult(null); setView('assets'); }} />}
    </div>
  );
}

Object.assign(window, { App, FuturesScreen });
