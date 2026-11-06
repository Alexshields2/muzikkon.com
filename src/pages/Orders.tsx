import React, { useState } from 'react'
import { RefreshCw, AlertTriangle } from 'lucide-react'
import { Card, Kpi, Table, Status, Badge, eur, AI, Bars, Donut, Alert, Line } from '../components/ui'
import { syncQueue, recentOrders, returns, numbers as n, stories as s, dailyOrders, syncBacklog, tradeAccounts, Order } from '../data/muzikkon'
import type { Tab } from '../App'

const chTone = (c: string) => (c === 'Shopify' ? 'green' : c === 'eBay' ? 'blue' : c === 'Trade' ? 'gold' : 'dark') as any
const Ch = ({ c }: { c: string }) => <Badge tone={chTone(c)}>{c}</Badge>

const orderCols = [
  { h: 'Order', r: (o: Order) => <b>{o.id}</b> },
  { h: 'Channel', r: (o: Order) => <Ch c={o.ch} /> },
  { h: 'Customer', r: (o: Order) => o.customer },
  { h: 'Destination', r: (o: Order) => o.country },
  { h: 'Items', r: (o: Order) => <span className="small">{o.items}</span> },
  { h: 'Value', r: (o: Order) => eur(o.value, 2), right: true },
  { h: 'ERP', r: (o: Order) => <Status s={o.erp} /> },
  { h: 'Fulfilment', r: (o: Order) => <Status s={o.ful} /> },
  { h: 'Promise', r: (o: Order) => o.promise },
]

function Overview() {
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Orders MTD" value={n.ordersMTD} delta={eur(n.revenueMTD)} />
        <Kpi label="Orders today" value={n.ordersToday} delta="Peak run rate 10 to 15 a day" tone="up" />
        <Kpi label="Waiting for ERP" value={s.sync.pending} delta={eur(s.sync.value) + ' · oldest 31h'} tone="down" />
        <Kpi label="Average order" value={eur(n.aov)} delta="Online" />
        <Kpi label="Open returns" value={returns.length} />
      </div>
      <div className="grid g21">
        <Card title="Orders per day by status" sub="Received vs dispatched, last 14 days">
          <Bars data={[dailyOrders.received, dailyOrders.dispatched]} labels={dailyOrders.labels} series={['Received', 'Dispatched']} h={220} />
        </Card>
        <Card title="Channel mix" sub="Orders MTD">
          <Donut items={Object.entries(n.channelsMTD).map(([l, v]) => ({ l, v }))} center={String(n.ordersMTD)} sub="orders" />
          <div className="mt"><AI>Shopify and the ERP are not connected, so every web and eBay order is keyed in by hand. At peak that's <b>6.5 staff hours a week</b>.</AI></div>
        </Card>
      </div>
      <Card title="Latest orders" sub="Every channel in one feed">
        <Table rows={recentOrders.slice(0, 10)} cols={orderCols} hl={o => o.id === s.lute.order || o.id === s.sync.oldest} />
      </Card>
    </div>
  )
}

function All() {
  const [f, setF] = useState('All')
  const rows = recentOrders.filter(o => f === 'All' || o.ch === f)
  return (
    <div className="stack">
      <div className="grid g4">
        {Object.entries(n.channelsMTD).map(([c, v]) => <Kpi key={c} label={c} value={v} delta="orders this month" />)}
      </div>
      <Card title="All orders" sub="Shopify, eBay, showroom and trade" right={
        <div className="row">{['All', 'Shopify', 'eBay', 'Showroom', 'Trade'].map(c => <button key={c} className={'chip'} style={f === c ? { borderColor: '#b8995a', color: '#1c1c1e', fontWeight: 600 } : {}} onClick={() => setF(c)}>{c}</button>)}</div>
      }>
        <Table rows={rows} cols={orderCols} hl={o => o.id === s.lute.order} />
      </Card>
    </div>
  )
}

function Sync() {
  const ex = syncQueue.filter(o => o.erp === 'Exception')
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Waiting for ERP" value={syncQueue.length} delta={eur(s.sync.value, 2)} tone="down" />
        <Kpi label="Oldest" value={s.sync.oldestHrs + 'h'} delta={s.sync.oldest + ' · Galway'} tone="down" />
        <Kpi label="Ready to auto-sync" value={s.sync.auto} delta="Clean match on customer + SKU" tone="up" />
        <Kpi label="Need a human" value={ex.length} delta="Address, unknown SKU" tone="down" />
        <Kpi label="Manual keying" value="6.5h" delta="Staff hours a week" />
      </div>
      <div className="grid g21">
        <AI title="Order Sync Agent">
          23 Shopify and eBay orders worth <b>€6,184.00</b> are not in the Muzikkon ERP. I've matched 21 to existing ERP customers and SKUs and can push them through the ERP API now (€5,464.02). Two need Tomasz: <b>MZK-10516</b> (billing and delivery address differ) and <b>MZK-10518</b> (SKU "BODH-PET-18-TUN" not in ERP, closest is BOD-PET-14).
          <div className="row mt"><button className="btn gold"><RefreshCw size={13} /> Sync 21 orders</button><button className="btn">Send exceptions to Tomasz</button></div>
        </AI>
        <Card title="Backlog trend" sub="Last 14 days">
          <Line data={[syncBacklog]} labels={dailyOrders.labels} h={130} />
        </Card>
      </div>
      <div className="grid g2">
        {ex.map(o => (
          <Alert key={o.id} tone="red" icon={<AlertTriangle size={15} />} title={`${o.id} · ${o.ful}`}>
            {o.customer}, {o.country}. {o.items}, {eur(o.value, 2)}. {o.id === 'MZK-10516' ? 'Shopify billing is Leeds, delivery is Bradford. Confirm with customer.' : 'Map new Shopify SKU to ERP item or create it.'}
          </Alert>
        ))}
      </div>
      <Card title="Sync queue" sub="Oldest first">
        <Table rows={syncQueue} hl={o => o.erp === 'Exception' || o.id === s.sync.oldest} cols={[
          { h: 'Order', r: o => <b>{o.id}</b> }, { h: 'Channel', r: o => <Ch c={o.ch} /> }, { h: 'Waiting', r: o => <Badge tone={parseInt(o.age || '0') >= 24 ? 'red' : 'amber'}>{o.age}</Badge> },
          { h: 'Customer', r: o => o.customer }, { h: 'Destination', r: o => o.country }, { h: 'Items', r: o => <span className="small">{o.items}</span> },
          { h: 'Value', r: o => eur(o.value, 2), right: true }, { h: 'ERP', r: o => <Status s={o.erp === 'Exception' ? 'Exception' : 'Ready to sync'} /> }, { h: 'Promise', r: o => o.promise },
        ]} />
      </Card>
    </div>
  )
}

function Trade() {
  const tradeOrders = [
    { id: 'TR-3318', acct: 'Ballymore School of Music', items: '20 x Tin Whistle D, 6 x Bodhrán 14"', value: 1240, status: 'On credit hold', due: '12 Nov' },
    { id: 'TR-3317', acct: 'Tralee Trad Music Shop', items: '4 x Cèilidh Harp, 10 x Bodhrán 18"', value: 2310, status: 'Packed', due: '9 Nov' },
    { id: 'TR-3316', acct: 'Galway Harp Society', items: '2 x Boru 22 Walnut', value: 1240, status: 'Picking', due: '10 Nov' },
    { id: 'TR-3315', acct: 'Ennis Music Academy', items: '30 x Tin Whistle D', value: 500, status: 'Shipped', due: '6 Nov' },
    { id: 'TR-3314', acct: 'Sligo Comhaltas Branch', items: '8 x Bodhrán 14", tippers', value: 1180, status: 'Delivered', due: '4 Nov' },
    { id: 'TR-3313', acct: 'Belfast Bodhrán Co', items: '12 x Tunable Bodhrán 18"', value: 1520, status: 'Delivered', due: '3 Nov' },
    { id: 'TR-3312', acct: 'Liverpool Folk Instruments', items: '3 x Bouzouki, 4 x Mandolin', value: 1310, status: 'In transit', due: '7 Nov' },
    { id: 'TR-3311', acct: 'Athlone Folk Music Centre', items: '6 x Cèilidh Harp', value: 1960, status: 'Delivered', due: '1 Nov' },
  ]
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Trade orders MTD" value={n.channelsMTD['Trade & Education']} delta={eur(n.revenueByChannelMTD['Trade & Education'])} />
        <Kpi label="Active accounts" value={n.tradeAccounts} delta="41 shops · 23 schools" />
        <Kpi label="On credit hold" value="1" delta="Ballymore School of Music" tone="down" />
        <Kpi label="Average trade order" value="€1,199" />
      </div>
      <div className="grid g21">
        <Card title="Recent trade & school orders">
          <Table rows={tradeOrders} hl={o => o.id === 'TR-3318'} cols={[
            { h: 'Order', r: o => <b>{o.id}</b> }, { h: 'Account', r: o => o.acct }, { h: 'Items', r: o => <span className="small">{o.items}</span> },
            { h: 'Value', r: o => eur(o.value), right: true }, { h: 'Status', r: o => <Status s={o.status} /> }, { h: 'Due', r: o => o.due },
          ]} />
        </Card>
        <div className="stack">
          <AI title="Finance Agent">Ballymore School of Music placed <b>TR-3318 for €1,240</b> while <b>INV-2026-0412 (€3,860)</b> is 41 days overdue. Recommend holding dispatch until payment or a payment date is agreed.</AI>
          <Card title="Top trade accounts YTD">
            {tradeAccounts.slice(0, 6).map(a => <div className="list-row small" key={a.name}><span style={{ flex: 1 }}>{a.name}</span><b>{eur(a.ytd)}</b></div>)}
          </Card>
        </div>
      </div>
    </div>
  )
}

function Returns() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Open returns" value={returns.length} />
        <Kpi label="Return rate" value="2.1%" delta="Last 90 days" />
        <Kpi label="Value in returns" value={eur(returns.reduce((a, r) => a + r.value, 0), 2)} />
        <Kpi label="Damaged in transit" value="2" delta="Claims with An Post" tone="down" />
      </div>
      <div className="grid g21">
        <Card title="Returns and RMAs">
          <Table rows={returns} cols={[
            { h: 'RMA', r: r => <b>{r.id}</b> }, { h: 'Order', r: r => r.order }, { h: 'Customer', r: r => r.customer }, { h: 'Item', r: r => r.item },
            { h: 'Reason', r: r => <span className="small">{r.reason}</span> }, { h: 'Value', r: r => eur(r.value, 2), right: true }, { h: 'Status', r: r => <Status s={r.status} /> },
          ]} />
        </Card>
        <Card title="Return reasons">
          <Donut items={[{ l: 'Damaged in transit', v: 2 }, { l: 'Wrong size or key', v: 2 }, { l: 'Faulty', v: 1 }, { l: 'Changed mind', v: 1 }]} center="6" sub="open" />
          <div className="mt"><AI>Both transit damages were bodhráns in the medium drum box. Dispatch Agent suggests the double-walled box for drums over 16".</AI></div>
        </Card>
      </div>
    </div>
  )
}

export const ordersTabs: Tab[] = [
  { key: 'overview', label: 'Overview', el: <Overview /> },
  { key: 'all', label: 'All Orders', el: <All /> },
  { key: 'sync', label: 'Sync Queue', el: <Sync /> },
  { key: 'trade', label: 'Trade Orders', el: <Trade /> },
  { key: 'returns', label: 'Returns', el: <Returns /> },
]
