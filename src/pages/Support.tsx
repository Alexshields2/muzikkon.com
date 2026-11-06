import React, { useState } from 'react'
import { Mail, MessageCircle, Phone, MessagesSquare, Send, Pencil, Sparkles, Search, CheckCircle2, Package, Truck } from 'lucide-react'
import { Card, Kpi, Table, Status, Badge, AI, Bars, Donut, Alert, Progress, HBars } from '../components/ui'
import { tickets, openTickets, stories as s, inboxWeek, ticketTypes, reviews, numbers as n, Ticket } from '../data/muzikkon'
import type { Tab } from '../App'

const chIcon = (c: string) => c === 'Email' ? <Mail size={13} /> : c === 'WhatsApp' ? <MessageCircle size={13} /> : c === 'Phone' ? <Phone size={13} /> : <MessagesSquare size={13} />
const priTone = (p: string) => (p === 'Urgent' ? 'red' : p === 'High' ? 'amber' : p === 'Medium' ? 'blue' : '') as any

function Overview() {
  const aiResolved = tickets.filter(t => t.status === 'Resolved by AI').length
  return (
    <div className="stack">
      <div className="grid g6">
        <Kpi hl label="Open tickets" value={openTickets.length} delta="1 SLA breached" tone="down" />
        <Kpi label="Emails, 7 days" value={s.inbox.total} />
        <Kpi label='"Where is my order"' value={s.inbox.wismo} delta={s.inbox.pct + '% of inbox'} tone="down" />
        <Kpi label="AI drafted" value={s.inbox.drafted} delta={`${s.inbox.sent} sent · ${s.inbox.waiting} waiting`} tone="up" />
        <Kpi label="First reply" value={s.inbox.after} delta={'was ' + s.inbox.before} tone="up" />
        <Kpi label="Resolved by AI today" value={aiResolved} delta="No human needed" tone="up" />
      </div>
      <div className="grid g21">
        <Card title="Inbox volume" sub="Last 7 days, all channels">
          <Bars stacked data={[inboxWeek.wismo, inboxWeek.other]} labels={inboxWeek.labels} series={['Where is my order', 'Everything else']} h={210} />
        </Card>
        <Card title="Why customers contact us"><Donut items={ticketTypes} center="156" sub="last 7 days" /></Card>
      </div>
      <div className="grid g3">
        <AI title="Support Agent">41% of the inbox is customers asking where their order is. I answer these with live An Post, DPD and DHL tracking and the ERP status, and Aoife approves with one click. Turning on the <b>customer tracking portal</b> would stop about 70% of them arriving at all.</AI>
        <Card title="Channels">
          {[['Email · info@muzikkon.com', 104], ['WhatsApp Business', 27], ['Web chat', 18], ['Phone (logged)', 7]].map(([l, v]) => (
            <div key={l as string} style={{ padding: '6px 0' }}><div className="between small"><span>{l}</span><b>{v}</b></div><Progress v={(v as number) / 1.04} /></div>
          ))}
        </Card>
        <Card title="Needs a human">
          <Alert tone="red" title="TCK-2291 · Jonathan Hale">Boston lute in customs 6 days. 3rd email. SLA breached.</Alert>
          <Alert tone="amber" title="TCK-2306 · Seán Coughlan">Harp arrived with broken lever. Damage claim.</Alert>
          <Alert tone="amber" title="TCK-2308 · Élodie Martin">Address change, DHL already moving.</Alert>
        </Card>
      </div>
    </div>
  )
}

function Tickets() {
  const [f, setF] = useState('Open')
  const rows = tickets.filter(t => f === 'All' ? true : f === 'Open' ? !/Resolved/.test(t.status) : f === 'AI resolved' ? /Resolved/.test(t.status) : t.type === 'Where is my order')
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Open" value={openTickets.length} />
        <Kpi label="Urgent" value={tickets.filter(t => t.pri === 'Urgent').length} tone="down" />
        <Kpi label="Awaiting approval" value={tickets.filter(t => t.status === 'Awaiting approval').length} delta="AI drafts ready" />
        <Kpi label="Resolved by AI" value={tickets.filter(t => /Resolved/.test(t.status)).length} tone="up" />
        <Kpi label="SLA met, 7 days" value="93%" delta="Target 4h first reply" />
      </div>
      <Card title="Tickets" sub="Email, WhatsApp, web chat and phone in one queue" right={
        <div className="row">{['Open', 'Where is my order', 'AI resolved', 'All'].map(c => <button key={c} className="chip" style={f === c ? { borderColor: '#b8995a', color: '#1c1c1e', fontWeight: 600 } : {}} onClick={() => setF(c)}>{c}</button>)}</div>
      }>
        <Table rows={rows} hl={t => t.id === s.lute.ticket} cols={[
          { h: 'Ticket', r: (t: Ticket) => <b>{t.id}</b> },
          { h: 'Subject', r: t => <div><div className="small b">{t.subject}</div><div className="tiny muted">{t.customer}{t.order ? ' · ' + t.order : ''}</div></div> },
          { h: 'Channel', r: t => <span className="row small">{chIcon(t.ch)}{t.ch}</span> },
          { h: 'Type', r: t => <span className="small">{t.type}</span> },
          { h: 'Priority', r: t => <Badge tone={priTone(t.pri)}>{t.pri}</Badge> },
          { h: 'Owner', r: t => <span className="small">{t.owner}</span> },
          { h: 'SLA', r: t => <Badge tone={/Breached/.test(t.sla) ? 'red' : /h left|m left/.test(t.sla) ? 'amber' : ''}>{t.sla}</Badge> },
          { h: 'AI', r: t => <Badge tone="gold"><Sparkles size={10} />{t.ai}</Badge> },
          { h: 'Status', r: t => <Status s={t.status} /> },
        ]} />
      </Card>
    </div>
  )
}

const threads: Record<string, { from: string; msgs: { who: string; t: string; text: string }[]; draft: string; context: string[] }> = {
  'TCK-2291': {
    from: 'Jonathan Hale <j.hale@…>',
    msgs: [
      { who: 'Jonathan', t: '1 Nov', text: 'Hi, my lute (order MZK-10482) shipped on the 29th but tracking hasn’t moved. Can you check?' },
      { who: 'Jonathan', t: '3 Nov', text: 'Any news on my lute? Still showing the same status.' },
      { who: 'Jonathan', t: '5 Nov', text: 'Third email now. I paid €1,199.99 and have had no reply. Very disappointed.' },
    ],
    draft: `Hi Jonathan,\n\nI'm really sorry for the silence. You should have heard from us days ago.\n\nYour Renaissance Lute 8 Course Deluxe is safe, but US customs in Cincinnati are holding it because they need a more detailed commercial invoice. We've prepared the corrected invoice today and our dispatch manager Tomasz is uploading it to DHL this afternoon. DHL normally releases within 1 to 2 working days after that, so you should have it early next week.\n\nI'll email you the moment it's released, and we've added a set of spare lute strings to your order as an apology.\n\nAoife\nMuzikkon Musical Instruments`,
    context: ['Order MZK-10482 · €1,199.99 · paid', 'DHL: held at US customs since 31 Oct', 'Commercial invoice regenerated 6 Nov', '2 star Trustpilot review 5 Nov', 'First order with Muzikkon'],
  },
  'TCK-2311': {
    from: 'Siobhán Ní Fhlatharta · WhatsApp',
    msgs: [{ who: 'Siobhán', t: '08:47', text: 'Hi, just checking when my harp will arrive? Ordered yesterday morning, it’s a Christmas present.' }],
    draft: `Hi Siobhán, thanks for your order! Your Trinity Cèilidh Harp 15 String in mahogany is being packed today and goes out with An Post this evening, so you'll have it tomorrow. I'll send your tracking link as soon as it's scanned. Aoife, Muzikkon`,
    context: ['Order MZK-10511 · €384.99', 'Not yet in ERP (31h)', 'Ireland 48h promise: today', 'Stock: 14 in ERP'],
  },
  'TCK-2314': {
    from: 'Liam Taylor <liam.t@…>',
    msgs: [{ who: 'Liam', t: 'Yesterday', text: 'Tracking for MZK-10490 hasn’t updated in 4 days. Is it lost?' }],
    draft: `Hi Liam, it's not lost. DHL shows your parcel cleared Australian customs in Sydney yesterday and it's now with the local carrier. New delivery estimate is 12 Nov. Here's your live link: [tracking]. Aoife, Muzikkon`,
    context: ['Order MZK-10490 · Melbourne', 'DHL: delayed, ETA 12 Nov', 'Worldwide promise 5 to 9 days'],
  },
  'TCK-2318': {
    from: 'Hannah Okafor <h.okafor@…>',
    msgs: [{ who: 'Hannah', t: 'Yesterday', text: 'Where is my bouzouki order? I haven’t had a shipping email.' }],
    draft: `Hi Hannah, sorry for the wait. Before we ship your Irish Bouzouki, can you confirm the delivery address? Your billing address is in Leeds and the delivery address is in Bradford. As soon as you confirm, it goes out with DPD and arrives in 3 to 4 working days. Aoife, Muzikkon`,
    context: ['Order MZK-10516 · €499.99', 'Sync exception: address mismatch', 'UK promise 3 to 4 days'],
  },
}

function Inbox() {
  const ids = Object.keys(threads)
  const [sel, setSel] = useState(ids[0])
  const th = threads[sel]
  const t = tickets.find(x => x.id === sel)!
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Drafts waiting" value={s.inbox.waiting} delta="Approve, edit or send" />
        <Kpi label="Sent this week" value={s.inbox.sent} tone="up" />
        <Kpi label="Approved without edits" value="84%" />
        <Kpi label="Time saved this week" value="11h" tone="up" />
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
        <Card title="AI inbox" sub="Drafts ready for approval">
          <div className="search" style={{ width: '100%', marginBottom: 8 }}><Search size={13} /> Search conversations</div>
          {ids.map(id => {
            const x = tickets.find(y => y.id === id)!
            return (
              <div key={id} className={'email' + (sel === id ? ' sel' : '')} onClick={() => setSel(id)}>
                <div className="between"><span className="b small">{x.customer}</span><Badge tone={priTone(x.pri)}>{x.pri}</Badge></div>
                <div className="small">{x.subject}</div>
                <div className="tiny muted row">{chIcon(x.ch)}{x.ch} · {x.id}</div>
              </div>
            )
          })}
          <div className="tiny muted mt">+ 10 more order status drafts</div>
        </Card>
        <Card title={t.subject} sub={th.from + ' · ' + t.id}>
          {th.msgs.map((m, i) => (
            <div key={i} className="chat-msg bot" style={{ marginBottom: 8, maxWidth: '100%' }}><div className="tiny muted">{m.who} · {m.t}</div>{m.text}</div>
          ))}
          <div className="card gold" style={{ padding: 12, marginTop: 10 }}>
            <div className="row b small"><Sparkles size={13} color="#b8995a" /> Support Agent draft</div>
            <div className="small" style={{ whiteSpace: 'pre-wrap', marginTop: 6, lineHeight: 1.55 }}>{th.draft}</div>
            <div className="row mt"><button className="btn primary"><Send size={13} /> Approve & send</button><button className="btn"><Pencil size={13} /> Edit</button><button className="btn">Assign</button></div>
          </div>
        </Card>
        <Card title="Context Pulse used">
          {th.context.map(c => <div className="list-row small" key={c}><CheckCircle2 size={13} color="#b8995a" />{c}</div>)}
          <div className="mt"><Status s={t.status} /> <Badge>{t.owner}</Badge></div>
          <div className="b small mt">Linked actions</div>
          {(sel === 'TCK-2291' ? ['Upload commercial invoice to DHL (Tomasz)', 'Add spare lute strings to order', 'Reply to Trustpilot review'] : ['Send tracking link on dispatch', 'Close ticket on delivery scan']).map(x => (
            <div className="list-row small" key={x}><Sparkles size={13} color="#b8995a" />{x}</div>
          ))}
        </Card>
      </div>
      <Card title="Recently sent by Support Agent" sub="Approved by Aoife Byrne today">
        <Table rows={[
          { c: 'Rachel Kim', o: 'MZK-10509', q: 'When will my harp arrive in Seattle?', a: 'In transit with DHL, delivery 11 Nov, live link sent', t: '12:15' },
          { c: 'Fiona McCarthy', o: 'MZK-10505', q: 'Has my bouzouki shipped?', a: 'Delivered 5 Nov, signed by F. McCarthy', t: '12:14' },
          { c: 'Henrik Olsen', o: 'MZK-10507', q: 'Tracking number please', a: 'DHL tracking sent, delivery 10 Nov', t: '12:13' },
          { c: 'Aoibhinn Daly', o: 'MZK-10508', q: 'Is my order on the way?', a: 'Delivered today 10:42 via An Post', t: '12:12' },
          { c: 'celticstrings', o: 'EB-55812', q: 'Did the Boru harp ship?', a: 'Delivered 5 Nov with DPD', t: '12:11' },
          { c: 'Liverpool Folk Instruments', o: 'TR-3312', q: 'ETA on our trade order?', a: 'In transit with DPD, delivery tomorrow', t: '12:10' },
        ]} cols={[
          { h: 'Customer', r: r => <b>{r.c}</b> }, { h: 'Order', r: r => r.o }, { h: 'Asked', r: r => <span className="small">{r.q}</span> },
          { h: 'AI answered', r: r => <span className="small">{r.a}</span> }, { h: 'Sent', r: r => r.t }, { h: 'Status', r: () => <Status s="Sent" /> },
        ]} />
      </Card>
    </div>
  )
}

function Escalations() {
  const esc = tickets.filter(t => t.pri === 'Urgent' || t.pri === 'High')
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Escalated" value={esc.length} tone="down" />
        <Kpi label="Damage claims" value="2" delta="An Post" />
        <Kpi label="SLA breaches" value="1" tone="down" />
        <Kpi label="Refunds pending approval" value="1" delta="€129.99" />
      </div>
      <div className="grid g2">
        {esc.map(t => (
          <Card key={t.id} title={`${t.id} · ${t.subject}`} sub={`${t.customer}${t.order ? ' · ' + t.order : ''} · ${t.ch}`} right={<Badge tone={priTone(t.pri)}>{t.pri}</Badge>}>
            <div className="between small"><span>Owner: <b>{t.owner}</b></span><Badge tone={/Breached/.test(t.sla) ? 'red' : 'amber'}>{t.sla}</Badge></div>
            <div className="mt"><Status s={t.status} /> <Badge tone="gold"><Sparkles size={10} />{t.ai}</Badge></div>
          </Card>
        ))}
      </div>
      <Card title="Escalation rules">
        <div className="grid g3">
          {['Damage, faults and complaints always go to Aoife', 'Refunds and orders over €500 need approval', '3rd email from the same customer becomes Urgent', 'Trade and school questions route to Niamh', 'Workshop and servicing route to Ciarán', 'Invoices and payment questions route to Sana'].map(r => (
            <div className="list-row small" key={r}><CheckCircle2 size={13} color="#b8995a" />{r}</div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function Portal() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Order status emails" value={s.inbox.wismo} delta="last 7 days" />
        <Kpi label="Expected deflection" value="~70%" delta="≈ 45 fewer emails a week" tone="up" />
        <Kpi label="Staff time back" value="7h / week" tone="up" />
        <Kpi label="Status" value="Ready to launch" delta="muzikkon.com/track" />
      </div>
      <div className="grid g12">
        <Card title="How it works">
          {['Customer enters order number and email on muzikkon.com/track', 'Pulse reads Shopify, the ERP and courier tracking', 'Shows packed, dispatched, in transit, customs and delivered', 'Customs holds and delays explained in plain English', 'Order confirmation and dispatch emails link straight to it', 'Questions go to the Support Agent with the order already attached'].map((x, i) => (
            <div className="list-row small" key={x}><Badge tone="dark">{i + 1}</Badge>{x}</div>
          ))}
        </Card>
        <Card title="Customer view preview" sub="muzikkon.com/track · in Muzikkon branding" className="gold">
          <div style={{ background: '#fff', borderRadius: 14, padding: 18, border: '1px solid rgba(0,0,0,.06)' }}>
            <div className="between"><div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 22 }}>Muzikkon</div><span className="small muted">Order MZK-10511</span></div>
            <div className="b" style={{ fontSize: 18, marginTop: 10 }}>Your harp is being packed</div>
            <div className="small muted">Trinity Cèilidh Harp 15 String, Mahogany · arriving tomorrow</div>
            <div className="row" style={{ margin: '18px 0 8px', gap: 0 }}>
              {['Ordered', 'Packed', 'Dispatched', 'Out for delivery', 'Delivered'].map((st, i) => (
                <div key={st} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: 6, background: i <= 1 ? '#b8995a' : 'rgba(0,0,0,.08)', borderRadius: 4, margin: '0 2px' }} />
                  <div className="tiny" style={{ marginTop: 6, color: i <= 1 ? '#1c1c1e' : '#8a8a92', fontWeight: i === 1 ? 700 : 500 }}>{st}</div>
                </div>
              ))}
            </div>
            <div className="grid g3 mt">
              <div className="row small"><Package size={14} color="#b8995a" />Padded case + spare strings</div>
              <div className="row small"><Truck size={14} color="#b8995a" />An Post · Ireland 48h</div>
              <div className="row small"><MessageCircle size={14} color="#b8995a" />Questions? Chat with us</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Reviews() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Trustpilot" value={n.trustpilot + ' ★'} />
        <Kpi label="New reviews, 7 days" value={reviews.length} />
        <Kpi label="Replied" value={reviews.filter(r => r.status === 'Replied').length + ' / ' + reviews.length} />
        <Kpi label="Review requests sent" value="41" delta="After delivery, by Support Agent" />
      </div>
      <div className="grid g21">
        <Card title="Latest reviews">
          {reviews.map(r => (
            <div className="list-row" key={r.who} style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}><div className="row"><b>{r.who}</b><span style={{ color: '#b8995a' }}>{'★'.repeat(r.stars)}<span style={{ color: '#ddd' }}>{'★'.repeat(5 - r.stars)}</span></span><span className="tiny muted">{r.date}</span></div><div className="small" style={{ marginTop: 3 }}>{r.text}</div></div>
              <Status s={r.status} />
            </div>
          ))}
        </Card>
        <div className="stack">
          <AI title="Draft reply · J. Hale">Hi Jonathan, you're right and we're sorry. Your lute was held by US customs and we should have told you straight away. It's being released now and we've added spare strings to your order. Aoife, Muzikkon.</AI>
          <Card title="Rating mix"><HBars items={[{ l: '5 stars', v: 81 }, { l: '4 stars', v: 11 }, { l: '3 stars', v: 4 }, { l: '2 stars', v: 2 }, { l: '1 star', v: 2 }]} fmt={v => v + '%'} /></Card>
        </div>
      </div>
    </div>
  )
}

export const supportTabs: Tab[] = [
  { key: 'overview', label: 'Overview', el: <Overview /> },
  { key: 'tickets', label: 'Tickets', el: <Tickets /> },
  { key: 'inbox', label: 'AI Inbox', el: <Inbox /> },
  { key: 'escalations', label: 'Escalations', el: <Escalations /> },
  { key: 'portal', label: 'Tracking Portal', el: <Portal /> },
  { key: 'reviews', label: 'Reviews', el: <Reviews /> },
]
