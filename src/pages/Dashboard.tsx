import React from 'react'
import { Card, Kpi, Bars, Line, Donut, HBars, Alert, Table, eur, Progress, Badge, AI } from '../components/ui'
import { numbers as n, revenue12, categories, dailyOrders, syncBacklog, products, inboxWeek, ticketTypes, invoices, costsMTD, adChannels, stories as s, reviews } from '../data/muzikkon'
import type { Tab } from '../App'

const k = (v: number) => '€' + Math.round(v / 1000) + 'k'

function Executive() {
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Revenue MTD" value={eur(n.revenueMTD)} delta="6 days into November" />
        <Kpi label="November forecast" value={eur(n.novForecast)} delta={`October ${eur(n.octActual)}`} tone="up" />
        <Kpi label="Last 12 months" value={eur(n.revenue12m)} delta="Online + trade" />
        <Kpi label="Gross margin" value={n.grossMargin + '%'} delta="▲ 1.2 pts" tone="up" />
        <Kpi label="Stock value" value={eur(n.stockValue)} delta={`${n.unitsOnHand.toLocaleString()} units · ${n.skus} SKUs`} />
      </div>
      <div className="grid g21">
        <Card title="Revenue, last 12 months" sub="Online vs Trade & Education">
          <Bars stacked data={[revenue12.online, revenue12.trade]} labels={revenue12.labels} series={['Online (Shopify, eBay, showroom)', 'Trade & Education']} fmt={k} h={220} />
        </Card>
        <Card title="Revenue by channel" sub="November to date">
          <Donut center={k(n.revenueMTD)} sub="MTD" items={Object.entries(n.revenueByChannelMTD).map(([l, v]) => ({ l, v }))} />
          <div className="mt"><AI>Trade & Education is 39% of November so far. Schools reorder bodhráns and whistles before Christmas concerts.</AI></div>
        </Card>
      </div>
      <div className="grid g3">
        <Card title="Top risks">
          <Alert tone="red" title="Sync backlog €6,184">23 orders, oldest 31h.</Alert>
          <Alert tone="red" title="Trinity 29 stock-out 9 Nov">~€5,070 lost sales.</Alert>
          <Alert tone="amber" title="€9,315 overdue">5 trade invoices.</Alert>
          <Alert tone="amber" title="Boston lute in customs">€1,199.99, 6 days.</Alert>
        </Card>
        <Card title="Revenue by category" sub="November to date">
          <HBars items={categories} fmt={v => eur(v)} />
        </Card>
        <Card title="Where customers are" sub="Shipping split MTD">
          <HBars items={Object.entries(n.shipSplit).map(([l, v]) => ({ l, v }))} fmt={v => v + '%'} />
          <div className="small muted mt">Shipped to {n.countries} countries in 2026.</div>
        </Card>
      </div>
    </div>
  )
}

function Sales() {
  const top = [...products].sort((a, b) => b.sold30 * b.price - a.sold30 * a.price).slice(0, 8)
  return (
    <div className="stack">
      <div className="grid g4">
        {Object.entries(n.channelsMTD).map(([c, v], i) => (
          <Kpi key={c} hl={i === 0} label={c + ' orders MTD'} value={v} delta={eur((n.revenueByChannelMTD as any)[c])} />
        ))}
      </div>
      <div className="grid g21">
        <Card title="Orders per day" sub="All channels, last 14 days">
          <Line data={[dailyOrders.received]} labels={dailyOrders.labels} h={210} />
        </Card>
        <Card title="Average order value">
          {[['Shopify', 241], ['eBay', 280], ['Showroom', 348], ['Trade & Education', 1199]].map(([c, v]) => (
            <div className="list-row" key={c as string}><span style={{ flex: 1 }}>{c}</span><span className="b">{eur(v as number)}</span></div>
          ))}
          <div className="small muted mt">Trade orders are 5x the online basket and land in Sept and Nov.</div>
        </Card>
      </div>
      <Card title="Top products by revenue" sub="Last 30 days">
        <Table rows={top} cols={[
          { h: 'Product', r: p => <span className="b">{p.name}</span> },
          { h: 'Category', r: p => p.cat },
          { h: 'Units', r: p => p.sold30, right: true },
          { h: 'Price', r: p => eur(p.price, 2), right: true },
          { h: 'Revenue', r: p => eur(p.sold30 * p.price), right: true },
          { h: 'Stock', r: p => <Badge tone={p.erp <= 2 ? 'red' : p.erp < 10 ? 'amber' : 'green'}>{p.erp} left</Badge> },
        ]} />
      </Card>
    </div>
  )
}

function Operations() {
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Orders today" value={n.ordersToday} />
        <Kpi label="Waiting for ERP" value={s.sync.pending} delta={'Oldest ' + s.sync.oldestHrs + 'h'} tone="down" />
        <Kpi label="On-time dispatch" value={n.onTimeDispatch + '%'} delta="Target 98%" tone="down" />
        <Kpi label="Shipment exceptions" value="4" delta="1 customs, 1 damage" tone="down" />
        <Kpi label="Workshop overdue" value={n.workshopOverdue} delta={`of ${n.workshopJobs} harps`} tone="down" />
      </div>
      <div className="grid g2">
        <Card title="Received vs dispatched" sub="The gap is the manual sync">
          <Bars data={[dailyOrders.received, dailyOrders.dispatched]} labels={dailyOrders.labels} series={['Received', 'Dispatched']} h={210} />
        </Card>
        <Card title="ERP sync backlog" sub="Orders not yet keyed into the ERP">
          <Line data={[syncBacklog]} labels={dailyOrders.labels} h={210} />
        </Card>
      </div>
      <div className="grid g3">
        <Card title="Manual work this week">
          <HBars items={[{ l: 'Re-keying orders into ERP', v: 6.5 }, { l: 'Answering order status emails', v: 11 }, { l: 'Chasing trade invoices', v: 3 }, { l: 'Matching payouts', v: 2.5 }]} fmt={v => v + 'h'} />
        </Card>
        <Card title="Delivery promises, next 72h">
          {[['Ireland 48h', 31, 1], ['UK & NI 3 to 4 days', 9, 0], ['Europe 5 to 6 days', 5, 0], ['Worldwide 5 to 9 days', 3, 1]].map(([l, t, r]) => (
            <div className="list-row" key={l as string}><span style={{ flex: 1 }} className="small">{l}</span><span className="small b">{t}</span>{(r as number) > 0 ? <Badge tone="red">{r} at risk</Badge> : <Badge tone="green">on track</Badge>}</div>
          ))}
        </Card>
        <Card title="Capacity">
          {[['Warehouse picking', 72], ['Packing bench', 64], ['Workshop', 90], ['Support team', 81]].map(([l, v]) => (
            <div key={l as string} style={{ padding: '7px 0' }}><div className="between small"><span>{l}</span><span className="b">{v}%</span></div><Progress v={v as number} tone={(v as number) > 85 ? 'red' : ''} /></div>
          ))}
        </Card>
      </div>
    </div>
  )
}

function Customer() {
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Trustpilot" value={n.trustpilot + ' ★'} delta="1 new 2 star (customs)" />
        <Kpi label="Emails, 7 days" value={n.inbox7d} />
        <Kpi label="Where is my order" value={n.wismo7d} delta="41% of inbox" tone="down" />
        <Kpi label="First reply" value="14 min" delta="was 9h" tone="up" />
        <Kpi label="Repeat customers" value="27%" delta={`${n.retailCustomers.toLocaleString()} retail customers`} />
      </div>
      <div className="grid g21">
        <Card title="Inbox volume" sub="Last 7 days">
          <Bars stacked data={[inboxWeek.wismo, inboxWeek.other]} labels={inboxWeek.labels} series={['Where is my order', 'Everything else']} h={200} />
        </Card>
        <Card title="What customers contact us about">
          <Donut items={ticketTypes} center="156" sub="emails" />
        </Card>
      </div>
      <Card title="Latest reviews">
        <div className="grid g3">
          {reviews.slice(0, 3).map(r => (
            <div key={r.who} className="card" style={{ padding: 12 }}>
              <div className="between"><b>{r.who}</b><span style={{ color: '#b8995a' }}>{'★'.repeat(r.stars)}</span></div>
              <div className="small" style={{ marginTop: 6 }}>{r.text}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function FinanceDash() {
  const totalCost = costsMTD.reduce((a, b) => a + b.v, 0)
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Revenue MTD" value={eur(n.revenueMTD)} />
        <Kpi label="Costs MTD" value={eur(totalCost)} />
        <Kpi label="Outstanding" value={eur(n.outstanding)} delta={`${n.invoiceCount} invoices`} />
        <Kpi label="Overdue" value={eur(n.overdue)} delta={`${n.overdueCount} invoices`} tone="down" />
        <Kpi label="Ad spend, 30 days" value={eur(n.adSpend)} delta="Paid ROAS 3.9" />
      </div>
      <div className="grid g2">
        <Card title="Costs this month"><Donut items={costsMTD} center={k(totalCost)} sub="MTD" /></Card>
        <Card title="Debtors by age">
          <Bars data={[[12425, 620, 2695, 2140, 3860]]} labels={['Not due', '1 to 7', '8 to 21', '22 to 35', '36+']} fmt={k} h={190} />
        </Card>
      </div>
      <Card title="Largest overdue invoices">
        <Table rows={invoices.filter(i => i.status === 'Overdue')} hl={i => i.id === s.ballymore.inv} cols={[
          { h: 'Invoice', r: i => <b>{i.id}</b> }, { h: 'Account', r: i => i.acct }, { h: 'Due', r: i => i.due },
          { h: 'Days overdue', r: i => i.days, right: true }, { h: 'Amount', r: i => eur(i.amount), right: true },
        ]} />
      </Card>
    </div>
  )
}

export const dashboardTabs: Tab[] = [
  { key: 'executive', label: 'Executive', el: <Executive /> },
  { key: 'sales', label: 'Sales', el: <Sales /> },
  { key: 'operations', label: 'Operations', el: <Operations /> },
  { key: 'customer', label: 'Customer', el: <Customer /> },
  { key: 'finance', label: 'Finance', el: <FinanceDash /> },
]
