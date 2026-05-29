// screens-trade.jsx — coin detail, order ticket, confirm sheet, result

function Stat({ label, value, tone }) {
  return (
    <div style={{ flex:1 }}>
      <div style={{ fontSize:11, color:'var(--fg-3)', marginBottom:2 }}>{label}</div>
      <div style={{ fontFamily:'var(--font-num)', fontWeight:600, fontSize:14, fontVariantNumeric:'tabular-nums', color: tone||'var(--fg-1)' }}>{value}</div>
    </div>
  );
}

function CoinDetail({ c, onBack, onTrade }) {
  const [range, setRange] = useState('1D');
  const up = c.chg>=0;
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg-base)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px' }}>
        <button onClick={onBack} style={{ border:0, background:'transparent', cursor:'pointer', color:'var(--fg-1)', display:'inline-flex', padding:6 }}><Icon name="chevron-left" size={26} /></button>
        <CoinIcon t={c.t} size={26} />
        <span style={{ fontWeight:600, fontSize:17 }}>{c.t}/USDT</span>
        <Tag tone="lime" style={{ marginLeft:4 }}>Spot</Tag>
        <button style={{ marginLeft:'auto', border:0, background:'transparent', cursor:'pointer', color:'var(--fg-2)', display:'inline-flex', padding:6 }}><Icon name="star" size={22} /></button>
      </div>
      <div style={{ flex:1, overflow:'auto' }}>
        <div style={{ padding:'4px 18px 0' }}>
          <div style={{ fontFamily:'var(--font-num)', fontWeight:600, fontSize:34, letterSpacing:'-0.02em', color: up?'var(--buy)':'var(--sell)', fontVariantNumeric:'tabular-nums' }}>{fmt(c.price)}</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--fg-3)' }}>
            <Chg v={c.chg} /> <span style={{ fontFamily:'var(--font-num)' }}>≈ {fmtUsd(c.price)}</span>
          </div>
        </div>
        <div style={{ marginTop:10 }}><AreaChart seed={c.t} up={up} /></div>
        <div style={{ display:'flex', gap:6, padding:'10px 16px 0' }}>
          {['15m','1H','1D','1W','1M'].map(r=>(
            <button key={r} onClick={()=>setRange(r)} style={{ flex:1, height:30, borderRadius:8, border:0, cursor:'pointer',
              fontFamily:'var(--font-ui)', fontWeight:600, fontSize:12,
              background: range===r?'var(--fill-2)':'transparent', color: range===r?'var(--fg-1)':'var(--fg-3)' }}>{r}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:14, padding:'18px 18px 0' }}>
          <Stat label="24h High" value={fmt(c.price*1.04)} />
          <Stat label="24h Low" value={fmt(c.price*0.96)} />
          <Stat label="24h Vol" value={c.vol} />
        </div>
        <div style={{ height:20 }} />
      </div>
      <div style={{ display:'flex', gap:12, padding:'12px 16px 26px', borderTop:'1px solid var(--divider-1)' }}>
        <Btn variant="buy" full onClick={()=>onTrade(c,'buy')}>Buy</Btn>
        <Btn variant="sell" full onClick={()=>onTrade(c,'sell')}>Sell</Btn>
      </div>
    </div>
  );
}

function TradeScreen({ coin, side: side0='buy', onPlace }) {
  const [side, setSide] = useState(side0);
  const [coinSel] = useState(coin || COINS[0]);
  const [amt, setAmt] = useState('');
  const [pct, setPct] = useState(0);
  useEffect(()=>{ setSide(side0); }, [side0, coin]);
  const isBuy = side==='buy';
  const bal = isBuy ? 1204.55 : coinSel.hold || 0.482;
  const balUnit = isBuy ? 'USDT' : coinSel.t;
  const setPctVal = (p)=>{ setPct(p); setAmt(((bal*p/100)).toFixed(isBuy?2:4)); };
  const total = parseFloat(amt||0) * (isBuy?1:coinSel.price);
  return (
    <div style={{ padding:'8px 16px 16px' }}>
      <div style={{ display:'flex', background:'var(--fill-2)', borderRadius:10, padding:3, marginBottom:18 }}>
        <button onClick={()=>setSide('buy')} style={{ flex:1, height:38, border:0, borderRadius:8, cursor:'pointer', fontWeight:600, fontSize:15,
          background: isBuy?'var(--buy)':'transparent', color: isBuy?'#fff':'var(--fg-2)' }}>Buy</button>
        <button onClick={()=>setSide('sell')} style={{ flex:1, height:38, border:0, borderRadius:8, cursor:'pointer', fontWeight:600, fontSize:15,
          background: !isBuy?'var(--sell)':'transparent', color: !isBuy?'#fff':'var(--fg-2)' }}>Sell</button>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', background:'var(--fill-2)', borderRadius:12, marginBottom:10 }}>
        <CoinIcon t={coinSel.t} size={28} />
        <div><div style={{ fontWeight:600, fontSize:15 }}>{coinSel.t}/USDT</div><div style={{ fontSize:11, color:'var(--fg-3)', fontFamily:'var(--font-num)' }}>{fmt(coinSel.price)}</div></div>
        <Icon name="chevron-down" size={18} color="var(--fg-3)" style={{ marginLeft:'auto' }} />
      </div>

      <div style={{ fontSize:12, color:'var(--fg-2)', marginBottom:6 }}>Amount</div>
      <div style={{ display:'flex', alignItems:'center', background:'var(--bg-base)', border:'1px solid var(--border-selected)', borderRadius:12, height:54, padding:'0 14px', marginBottom:10 }}>
        <input value={amt} onChange={e=>{setAmt(e.target.value);setPct(0);}} placeholder="0.00" inputMode="decimal"
          style={{ border:0, outline:0, background:'transparent', flex:1, fontFamily:'var(--font-num)', fontWeight:600, fontSize:22, color:'var(--fg-1)' }} />
        <span style={{ fontFamily:'var(--font-num)', fontWeight:600, color:'var(--fg-2)' }}>{isBuy?'USDT':coinSel.t}</span>
      </div>

      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        {[25,50,75,100].map(p=>(
          <button key={p} onClick={()=>setPctVal(p)} style={{ flex:1, height:32, borderRadius:8, cursor:'pointer', border:0,
            fontFamily:'var(--font-num)', fontWeight:600, fontSize:13,
            background: pct===p?(isBuy?'var(--buy)':'var(--sell)'):'var(--fill-2)', color: pct===p?'#fff':'var(--fg-2)' }}>{p}%</button>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--fg-2)', marginBottom:6 }}>
        <span>Available</span><span style={{ fontFamily:'var(--font-num)' }}>{fmt(bal)} {balUnit}</span>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--fg-2)', marginBottom:20 }}>
        <span>Est. {isBuy?'cost':'proceeds'}</span><span style={{ fontFamily:'var(--font-num)', color:'var(--fg-1)', fontWeight:600 }}>{fmtUsd(total||0)}</span>
      </div>

      <Btn variant={isBuy?'buy':'sell'} full size="lg" style={{ height:52 }} onClick={()=>onPlace({ coin:coinSel, side, amt:amt||'0', total })}>
        {isBuy?'Buy':'Sell'} {coinSel.t}
      </Btn>
    </div>
  );
}

function ConfirmSheet({ order, onClose, onConfirm }) {
  if (!order) return null;
  const isBuy = order.side==='buy';
  return (
    <div onClick={onClose} style={{ position:'absolute', inset:0, zIndex:80, background:'var(--bg-mask)', display:'flex', alignItems:'flex-end' }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:'100%', background:'var(--bg-pop)', borderRadius:'20px 20px 0 0', padding:'10px 18px 30px', boxShadow:'var(--shadow-pop)' }}>
        <div style={{ width:36, height:4, borderRadius:2, background:'var(--divider-3)', margin:'4px auto 14px' }} />
        <div style={{ fontWeight:600, fontSize:19, textAlign:'center', marginBottom:18 }}>Confirm order</div>
        {[['Pair', order.coin.t+'/USDT'],['Side', isBuy?'Buy':'Sell'],['Type','Market'],['Amount', order.amt+' '+(isBuy?'USDT':order.coin.t)],['Price', fmt(order.coin.price)+' USDT'],['Est. total', fmtUsd(order.total)]].map(([k,v],i)=>(
          <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: i<5?'1px solid var(--divider-1)':'0', fontSize:14 }}>
            <span style={{ color:'var(--fg-3)' }}>{k}</span>
            <span style={{ fontFamily:'var(--font-num)', fontWeight:600, color: k==='Side'?(isBuy?'var(--buy)':'var(--sell)'):'var(--fg-1)' }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop:20 }}><Btn variant={isBuy?'buy':'sell'} full size="lg" style={{ height:52 }} onClick={onConfirm}>Confirm {isBuy?'Buy':'Sell'}</Btn></div>
      </div>
    </div>
  );
}

function ResultView({ order, onDone }) {
  const isBuy = order.side==='buy';
  return (
    <div style={{ position:'absolute', inset:0, zIndex:90, background:'var(--bg-base)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:32, textAlign:'center' }}>
      <div style={{ width:76, height:76, borderRadius:'50%', background:'var(--success-bg)', color:'var(--buy)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}><Icon name="check" size={40} stroke={2.6} /></div>
      <div style={{ fontWeight:600, fontSize:22 }}>Order submitted</div>
      <div style={{ color:'var(--fg-3)', fontSize:15, marginTop:8, lineHeight:1.5 }}>
        Your {isBuy?'buy':'sell'} order for<br/><span style={{ fontFamily:'var(--font-num)', fontWeight:600, color:'var(--fg-1)' }}>{order.amt} {isBuy?'USDT':order.coin.t}</span> of {order.coin.t} was placed.
      </div>
      <div style={{ position:'absolute', left:16, right:16, bottom:30 }}><Btn variant="primary" full size="lg" style={{ height:52 }} onClick={onDone}>Done</Btn></div>
    </div>
  );
}

Object.assign(window, { CoinDetail, TradeScreen, ConfirmSheet, ResultView });
