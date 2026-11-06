import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Sparkles, ShoppingBag, Boxes, Landmark, LifeBuoy, Truck, Megaphone, CheckCircle2 } from 'lucide-react'
import { Card, Kpi, Alert, AI, eur, Bars, Badge, Progress } from '../components/ui'
import { greeting, numbers as n, stories as s, dailyOrders, approvals, activity, dispatchToday, openTickets } from '../data/muzikkon'

const answers: Record<string, string> = {
  "What's stopping today's orders shipping?": `23 orders are waiting to be keyed into the Muzikkon ERP (€6,184). The oldest, MZK-10511 (Cèilidh Harp to Galway), is 31 hours old and will miss the 48 hour Ireland promise unless it ships today. 21 can sync automatically right now; 2 need Tomasz (address mismatch on MZK-10516, unknown SKU on MZK-10518). Of today's 14 parcels, 7 are packed and the DPD and DHL cut-off is 16:30.`,
  'Which harps will sell out before Christmas?': `The 29 String Trinity Harp Rosewood will stock out on 9 Nov: 2 left, 7 sold in 14 days, 38 day lead time from Sialkot Heritage Instruments. That's about 6 lost sales (€5,070). PO-2026-0218 for 12 units is drafted and waiting on Salahuddin. The Trinity 36 String is already out of stock, and the Boru 22 Walnut reaches its reorder point in about 3 weeks.`,
  'Who owes us money?': `€21,740 is outstanding across 14 trade invoices, €9,315 of it overdue on 5 invoices. The biggest is Ballymore School of Music: INV-2026-0412, €3,860, 41 days overdue. They placed a new €1,240 order yesterday (TR-3318), so the Finance Agent recommends holding it until they pay. Next: Kilkenny Strings & Things €2,140 at 25 days.`,
  'How is support doing this week?': `156 emails in the last 7 days, 64 of them "where is my order" (41%). The Support Agent drafted 52 replies; 38 were approved and sent and 14 are waiting. Average first reply has dropped from 9 hours to 14 minutes. The urgent one is Jonathan Hale (TCK-2291): his €1,199.99 lute has been held at US customs for 6 days and he's emailed 3 times.`,
}

function Chat() {
  const first = "What's stopping today's orders shipping?"
  const [msgs, setMsgs] = useState<{ r: 'user' | 'bot'; t: string }[]>([{ r: 'user', t: first }, { r: 'bot', t: answers[first] }])
  const [q, setQ] = useState('')
  const ask = (text: string) => {
    if (!text.trim()) return
    const a = answers[text] || `Looking across Shopify, the Muzikkon ERP, eBay and the support inbox: today you have ${n.ordersToday} orders, 23 waiting to sync, ${openTickets.length} open tickets and €${n.overdue.toLocaleString()} overdue from trade accounts. Ask me about orders, stock, support, cash or marketing for detail.`
    setMsgs(m => [...m, { r: 'user', t: text }, { r: 'bot', t: a }])
    setQ('')
  }
  return (
    <Card className="gold" style={{ display: 'flex', flexDirection: 'column' }} title={<span className="row"><Sparkles size={15} color="#b8995a" /> Ask Pulse</span>} sub="Knows your orders, stock, customers, support and finances">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minHeight: 200, maxHeight: 420, overflowY: 'auto', marginBottom: 10 }}>
        {msgs.length === 0 && (
          <div className="small muted">Ask anything about Muzikkon. Pulse answers from live data across Shopify, the ERP, eBay, couriers and the inbox.</div>
        )}
        {msgs.map((m, i) => <div key={i} className={'chat-msg ' + m.r}>{m.t}</div>)}
      </div>
      <div className="row" style={{ flexWrap: 'wrap', marginBottom: 10 }}>
        {Object.keys(answers).map(k => <button key={k} className="chip" onClick={() => ask(k)}>{k}</button>)}
      </div>
      <form className="row" onSubmit={e => { e.preventDefault(); ask(q) }}>
        <input className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="Ask Pulse about Muzikkon…" />
        <button className="btn primary" type="submit"><ArrowUp size={14} /></button>
      </form>
    </Card>
  )
}

export default function Home() {
  const packed = dispatchToday.filter(d => d.status === 'Packed').length
  const today = new Date().toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long' })
  return (
    <div className="stack">
      <div className="between">
        <div>
          <div className="muted small">{today}</div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -.5 }}>{greeting()}, Umer</div>
          <div className="muted">Christmas peak has started. 14 orders today, 4 things need a decision.</div>
        </div>
        <div className="row"><Badge tone="green">Business health 78 / 100</Badge><Badge tone="gold">Peak season</Badge></div>
      </div>

      <div className="grid g6">
        <Kpi hl label="Revenue MTD" value={eur(n.revenueMTD)} delta={`Forecast ${eur(n.novForecast)} for November`} tone="up" />
        <Kpi label="Orders today" value={n.ordersToday} delta="▲ 75% vs last Friday" tone="up" />
        <Kpi label="Waiting for ERP" value={s.sync.pending} delta={`${eur(s.sync.value)} · oldest ${s.sync.oldestHrs}h`} tone="down" />
        <Kpi label="Overdue trade" value={eur(n.overdue)} delta={`${n.overdueCount} invoices`} tone="down" />
        <Kpi label="Open tickets" value={openTickets.length} delta={`${s.inbox.wismo} "where is my order" this week`} tone="down" />
        <Kpi label="Gross margin" value={n.grossMargin + '%'} delta="▲ 1.2 pts vs Oct" tone="up" />
      </div>

      <div className="grid g311">
        <div className="stack">
          <AI title="Morning briefing · 09:02">
            Good morning Umer. <b>23 Shopify and eBay orders are still not in the ERP</b>, oldest 31 hours, €6,184 at risk of missing the 48 hour promise; 21 can sync automatically now. The <b>29 String Trinity Harp Rosewood has 2 left</b> and sells out on 9 Nov; PO-2026-0218 for 12 units is waiting on Salahuddin. <b>Ballymore School of Music is 41 days overdue on €3,860</b> and ordered again yesterday. The Boston lute (MZK-10482) is still in US customs and the customer has emailed 3 times.
          </AI>
          <div className="grid g2">
            <Card title="Needs attention" sub="Ranked by revenue at risk" right={<Link to="/work/approvals" className="btn">Open Work</Link>}>
              <Alert tone="red" title="23 orders waiting for the ERP">MZK-10511 to Galway is 31h old. 48h Ireland promise at risk.</Alert>
              <Alert tone="red" title="Trinity 29 Rosewood stock-out on 9 Nov">2 left, 38 day lead time, ~€5,070 of Christmas sales at risk.</Alert>
              <Alert tone="amber" title="Boston lute held at US customs, 6 days">MZK-10482, €1,199.99. Jonathan Hale has emailed 3 times.</Alert>
              <Alert tone="amber" title="Ballymore School of Music, 41 days overdue">INV-2026-0412 €3,860. New €1,240 order placed yesterday.</Alert>
            </Card>
            <Card title="Decisions for you" sub={`${approvals.length} approvals waiting`}>
              {approvals.slice(0, 5).map(a => (
                <div key={a.what} className="list-row">
                  <div style={{ flex: 1 }}><div className="b small">{a.what}</div><div className="tiny muted">{a.why}</div></div>
                  <Badge tone="gold">{a.value}</Badge>
                </div>
              ))}
            </Card>
          </div>
        </div>
        <Chat />
      </div>

      <div className="grid g3">
        <Card title="Orders received vs dispatched" sub="Last 14 days">
          <Bars data={[dailyOrders.received, dailyOrders.dispatched]} labels={dailyOrders.labels.map((l, i) => i % 2 ? '' : l)} series={['Received', 'Dispatched']} h={240} />
        </Card>
        <Card title="Today's dispatch" sub="Courier cut-off 16:30">
          <div className="between"><span className="b" style={{ fontSize: 22 }}>{packed} / {dispatchToday.length}</span><Badge tone="blue">parcels packed</Badge></div>
          <div style={{ margin: '10px 0' }}><Progress v={(packed / dispatchToday.length) * 100} /></div>
          {[['An Post', 'Ireland'], ['DPD', 'Large IE & UK'], ['DHL Express', 'EU & worldwide']].map(([c, r]) => (
            <div className="list-row" key={c}><Truck size={14} /><span className="small" style={{ flex: 1 }}>{c} <span className="muted">· {r}</span></span><span className="b small">{dispatchToday.filter(d => d.courier === c).length}</span></div>
          ))}
          <Alert tone="gold" title="Dispatch Agent">Generated 4 DHL labels and customs docs this morning.</Alert>
        </Card>
        <Card title="Where we're winning" sub="This month">
          <Alert tone="green" title="Harps up 38% vs October">Cèilidh 15 and Boru 22 lead Christmas demand.</Alert>
          <Alert tone="green" title="Google Shopping ROAS 5.4">Best channel by far. Meta is 1.9.</Alert>
          <Alert tone="green" title="First reply 9h → 14 min">Support Agent handled 38 replies this week.</Alert>
          <Alert tone="red" title="Losing money">Meta Ads €2,140 at 1.9 ROAS and 3 payouts unmatched (€1,912.40).</Alert>
        </Card>
      </div>

      <div className="grid g21">
        <Card title="Story threads" sub="What management is tracking this week">
          <div className="grid g3">
            {[
              { ic: ShoppingBag, t: 'The Sync Backlog', d: '23 orders · €6,184 · 6.5 staff hours a week', to: '/orders/sync' },
              { ic: Boxes, t: 'The Christmas Harp', d: 'Trinity 29 · 2 left · €5,070 at risk', to: '/inventory/reorder' },
              { ic: Landmark, t: 'Ballymore School of Music', d: '€3,860 · 41 days overdue', to: '/finance/debtors' },
              { ic: LifeBuoy, t: 'The Boston Lute', d: 'MZK-10482 · 6 days in customs', to: '/support/tickets' },
              { ic: LifeBuoy, t: 'The Inbox Flood', d: '64 of 156 emails are order status', to: '/support/overview' },
              { ic: Megaphone, t: 'Meta vs Shopping', d: 'ROAS 1.9 vs 5.4 · shift €800', to: '/marketing/channels' },
            ].map(x => (
              <Link to={x.to} key={x.t} className="card" style={{ padding: 12, background: 'rgba(255,255,255,.5)' }}>
                <div className="row"><x.ic size={15} color="#b8995a" /><span className="b">{x.t}</span></div>
                <div className="small muted" style={{ marginTop: 4 }}>{x.d}</div>
              </Link>
            ))}
          </div>
        </Card>
        <Card title="What AI handled today" right={<Link className="btn" to="/agents">Agents</Link>}>
          {[
            ['Support replies approved and sent', 38], ['Web chats resolved automatically', 4], ['Orders ready to auto-sync', 21],
            ['Shipping labels and customs docs', 14], ['Invoice reminders sent', 2], ['Stock-out forecasts raised', 3],
          ].map(([l, v]) => (
            <div className="list-row" key={l as string}><CheckCircle2 size={14} color="#2f8f5b" /><span className="small" style={{ flex: 1 }}>{l}</span><span className="b">{v}</span></div>
          ))}
        </Card>
      </div>

      <Card title="Live activity" right={<Link className="btn" to="/activity">All activity</Link>}>
        <div className="grid g2">
          {[activity.slice(0, 5), activity.slice(5, 10)].map((col, i) => (
            <div key={i}>
              {col.map(a => (
                <div className="feed-item" key={a.t + a.who}>
                  <div className={'feed-ic ' + a.kind}>{a.who.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                  <div style={{ flex: 1 }}><div className="small"><b>{a.who}</b> {a.text}</div><div className="tiny muted">{a.t}</div></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
