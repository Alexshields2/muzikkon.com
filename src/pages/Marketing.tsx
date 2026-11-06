import React from 'react'
import { Card, Kpi, Table, Status, eur, AI, Bars, Donut, Alert, HBars, Line, Badge } from '../components/ui'
import { adChannels, content, stories as s, products, numbers as n } from '../data/muzikkon'
import type { Tab } from '../App'

const paid = adChannels.filter(a => a.spend > 0)

function Overview() {
  const spend = paid.reduce((a, b) => a + b.spend, 0)
  const rev = paid.reduce((a, b) => a + b.rev, 0)
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Ad spend, 30 days" value={eur(spend)} />
        <Kpi label="Paid revenue" value={eur(rev)} delta={'ROAS ' + (rev / spend).toFixed(1)} tone="up" />
        <Kpi label="Organic revenue" value={eur(adChannels[3].rev)} delta="SEO + direct" tone="up" />
        <Kpi label="Cost per order (paid)" value={eur(Math.round(spend / paid.reduce((a, b) => a + b.orders, 0)))} />
        <Kpi label="Site sessions, 30 days" value="48,210" delta="▲ 22% vs Sept" tone="up" />
      </div>
      <div className="grid g21">
        <Card title="Revenue by channel" sub="Last 30 days"><Bars data={[adChannels.map(a => a.rev), adChannels.map(a => a.spend)]} labels={adChannels.map(a => a.ch)} series={['Revenue', 'Spend']} fmt={v => '€' + Math.round(v / 1000) + 'k'} h={210} /></Card>
        <Card title="Orders by source"><Donut items={adChannels.map(a => ({ l: a.ch, v: a.orders }))} center={String(adChannels.reduce((a, b) => a + b.orders, 0))} sub="orders" /></Card>
      </div>
      <AI title="Marketing review">Google Shopping returns <b>5.4</b> on {eur(s.ads.shopSpend)}; Meta returns <b>1.9</b> on {eur(s.ads.metaSpend)}. Moving <b>€800</b> from Meta into Shopping campaigns for Harps and Bodhráns before Black Friday is worth an estimated €2,800 in extra revenue at current rates.</AI>
    </div>
  )
}

function Channels() {
  return (
    <div className="stack">
      <div className="grid g3">
        <Kpi hl label="Google Shopping ROAS" value={s.ads.shopRoas} delta={eur(s.ads.shopSpend) + ' spend'} tone="up" />
        <Kpi label="Google Search ROAS" value="3.5" delta="€1,190 spend" />
        <Kpi label="Meta Ads ROAS" value={s.ads.metaRoas} delta={eur(s.ads.metaSpend) + ' spend'} tone="down" />
      </div>
      <div className="grid g21">
        <Card title="Channel performance" sub="Last 30 days">
          <Table rows={adChannels} hl={a => a.ch === 'Meta Ads'} cols={[
            { h: 'Channel', r: a => <b>{a.ch}</b> }, { h: 'Spend', r: a => a.spend ? eur(a.spend) : '·', right: true }, { h: 'Revenue', r: a => eur(a.rev), right: true },
            { h: 'ROAS', r: a => a.roas ? <Badge tone={a.roas > 4 ? 'green' : a.roas > 2.5 ? 'amber' : 'red'}>{a.roas}</Badge> : '·' },
            { h: 'Orders', r: a => a.orders, right: true }, { h: 'Cost per order', r: a => a.cpa ? eur(a.cpa) : '·', right: true },
          ]} />
        </Card>
        <Card title="Recommendation" className="gold">
          <div className="b">Shift €800 from Meta to Google Shopping</div>
          <div className="small muted" style={{ margin: '6px 0 10px' }}>Harps and Bodhráns campaigns, 9 Nov to 30 Nov</div>
          <HBars items={[{ l: 'Shopping: Harps', v: 5.8 }, { l: 'Shopping: Bodhráns', v: 5.1 }, { l: 'Meta: Prospecting', v: 1.6 }, { l: 'Meta: Retargeting', v: 2.7 }]} fmt={v => v + 'x'} />
          <div className="row mt"><button className="btn primary">Approve shift</button><button className="btn">Discuss</button></div>
        </Card>
      </div>
      <div className="grid g2">
        <Card title="ROAS by week" sub="Google Shopping vs Meta Ads"><Line data={[[4.6, 4.9, 5.1, 5.0, 5.6, 5.4], [2.3, 2.1, 1.8, 2.0, 1.7, 1.9]]} labels={['W40', 'W41', 'W42', 'W43', 'W44', 'W45']} series={['Google Shopping', 'Meta Ads']} h={190} /></Card>
        <Card title="Spend by channel, 30 days"><Donut items={paid.map(a => ({ l: a.ch, v: a.spend }))} center={eur(paid.reduce((x, y) => x + y.spend, 0))} sub="spend" /></Card>
      </div>
    </div>
  )
}

function Products() {
  const rows = [...products].sort((a, b) => b.sold30 * b.price - a.sold30 * a.price).slice(0, 8)
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Products in feed" value={n.skus} />
        <Kpi label="Disapproved in Merchant Center" value="4" tone="down" delta="Missing GTIN" />
        <Kpi label="Out of stock still advertised" value="2" tone="down" delta="Trinity 36, Georgian stand" />
        <Kpi label="Top category" value="Harps" delta="41% of revenue" />
      </div>
      <Card title="Best sellers to push this Christmas">
        <Table rows={rows} cols={[
          { h: 'Product', r: p => <b>{p.name}</b> }, { h: 'Price', r: p => eur(p.price, 2), right: true }, { h: 'Sold 30d', r: p => p.sold30, right: true },
          { h: 'Stock', r: p => p.erp, right: true }, { h: 'Ads', r: p => <Status s={p.erp <= 2 ? 'Pause: low stock' : 'Live'} /> },
        ]} />
      </Card>
      <Alert tone="red" title="Don't advertise what you can't ship">Trinity 29 Rosewood has 2 left and is still in Shopping ads. Pulse pauses ads automatically when stock drops below 3.</Alert>
    </div>
  )
}

function SEO() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Organic sessions" value="21,480" delta="▲ 18%" tone="up" />
        <Kpi label="Organic revenue" value={eur(adChannels[3].rev)} />
        <Kpi label="Ranking keywords" value="1,342" />
        <Kpi label="#1 for" value='"irish bodhran"' delta="and 37 others" />
      </div>
      <div className="grid g21">
        <Card title="Blog and content" sub="David Murphy">
          <Table rows={content} cols={[
            { h: 'Article', r: c => <b>{c.title}</b> }, { h: 'Views', r: c => c.views ? c.views.toLocaleString() : '·', right: true },
            { h: 'Orders', r: c => c.orders || '·', right: true }, { h: 'Status', r: c => <Status s={c.status} /> },
          ]} />
        </Card>
        <Card title="Organic traffic"><Line data={[[14200, 15100, 15800, 16900, 18200, 19700, 21480]]} labels={['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']} h={180} /></Card>
      </div>
    </div>
  )
}

function Calendar() {
  const items = [
    ['9 Nov', 'Shift €800 Meta to Shopping', 'Marketing', 'Awaiting approval'],
    ['12 Nov', 'Christmas Gift Guide 2026 goes live', 'Content', 'Scheduled'],
    ['16 Nov', 'Email: harp service reminders (46 customers)', 'Workshop', 'Draft'],
    ['20 Nov', 'Black Friday preview to past customers', 'Email', 'Draft'],
    ['27 Nov', 'Black Friday: 15% off bodhráns and whistles', 'All channels', 'Scheduled'],
    ['30 Nov', 'Cyber Monday: free delivery over €150', 'All channels', 'Scheduled'],
    ['11 Dec', 'Last day for worldwide Christmas delivery', 'Site banner', 'Scheduled'],
    ['16 Dec', 'Last day for UK and Europe', 'Site banner', 'Scheduled'],
    ['21 Dec', 'Last day for Ireland (48h)', 'Site banner', 'Scheduled'],
  ]
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Christmas budget" value="€9,500" delta="9 Nov to 21 Dec" />
        <Kpi label="Campaigns planned" value={items.length} />
        <Kpi label="Peak forecast" value="15 orders/day" delta="Black Friday to 18 Dec" />
        <Kpi label="Last Irish order" value="21 Dec" />
      </div>
      <Card title="Christmas campaign calendar">
        <Table rows={items} cols={[
          { h: 'Date', r: r => <b>{r[0]}</b> }, { h: 'Activity', r: r => r[1] }, { h: 'Channel', r: r => r[2] }, { h: 'Status', r: r => <Status s={r[3]} /> },
        ]} />
      </Card>
    </div>
  )
}

export const marketingTabs: Tab[] = [
  { key: 'overview', label: 'Overview', el: <Overview /> },
  { key: 'channels', label: 'Channels', el: <Channels /> },
  { key: 'products', label: 'Products', el: <Products /> },
  { key: 'seo', label: 'SEO & Content', el: <SEO /> },
  { key: 'calendar', label: 'Christmas Plan', el: <Calendar /> },
]
