import React from 'react'
import { Card, Kpi, Table, Status, Badge, eur, AI, Bars, Donut, Alert, HBars } from '../components/ui'
import { tradeAccounts, resellerApps, numbers as n, stories as s, revenue12 } from '../data/muzikkon'
import type { Tab } from '../App'

function Overview() {
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Active accounts" value={n.tradeAccounts} delta={`${n.shops} shops · ${n.schools} schools`} />
        <Kpi label="Trade revenue MTD" value={eur(n.revenueByChannelMTD['Trade & Education'])} tone="up" />
        <Kpi label="Outstanding" value={eur(n.outstanding)} delta={n.invoiceCount + ' invoices'} />
        <Kpi label="Overdue" value={eur(n.overdue)} delta={n.overdueCount + ' accounts'} tone="down" />
        <Kpi label="Reseller applications" value={resellerApps.length} delta="2 strong fits" />
      </div>
      <div className="grid g21">
        <Card title="Trade revenue by month" sub="Schools buy in Sept and before Christmas">
          <Bars data={[[...revenue12.trade.slice(1), n.revenueByChannelMTD['Trade & Education']]]} labels={[...revenue12.labels.slice(1), 'Nov MTD']} fmt={v => '€' + Math.round(v / 1000) + 'k'} h={210} />
        </Card>
        <Card title="Account mix"><Donut items={[{ l: 'Music shops', v: n.shops }, { l: 'Schools and music schools', v: n.schools }]} center={String(n.tradeAccounts)} sub="accounts" /></Card>
      </div>
      <div className="grid g3">
        <AI title="Finance Agent">Ballymore School of Music owes <b>€3,860 on INV-2026-0412, 41 days overdue</b>, and placed TR-3318 for €1,240 yesterday. Two reminders sent. Niamh is calling Monday. Hold recommended.</AI>
        <Card title="Top accounts YTD"><HBars items={tradeAccounts.slice(0, 5).map(a => ({ l: a.name, v: a.ytd })).sort((a, b) => b.v - a.v)} fmt={v => eur(v)} /></Card>
        <Card title="This week">
          <Alert tone="green" title="Tralee Trad Music Shop">€2,310 pre-Christmas order packed.</Alert>
          <Alert tone="amber" title="Kilkenny Strings & Things">€2,140 at 25 days overdue.</Alert>
          <Alert tone="gold" title="Boston Celtic Supply applied">First US reseller, est. €30k a year.</Alert>
        </Card>
      </div>
    </div>
  )
}

function Accounts() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Accounts" value={n.tradeAccounts} />
        <Kpi label="Ordered this term" value="38" />
        <Kpi label="On credit hold" value="1" tone="down" />
        <Kpi label="Not ordered in 90 days" value="9" delta="Win-back list ready" tone="down" />
      </div>
      <Card title="Trade accounts" sub={`Showing 12 of ${n.tradeAccounts} · owner Niamh Kelly`}>
        <Table rows={tradeAccounts} hl={a => a.name === s.ballymore.name} cols={[
          { h: 'Account', r: a => <b>{a.name}</b> }, { h: 'Type', r: a => a.type }, { h: 'County', r: a => a.county },
          { h: 'YTD', r: a => eur(a.ytd), right: true }, { h: 'Balance', r: a => eur(a.balance), right: true },
          { h: 'Overdue', r: a => a.overdue ? <span style={{ color: '#c4483e', fontWeight: 700 }}>{eur(a.overdue)}</span> : '·', right: true },
          { h: 'Terms', r: a => a.terms }, { h: 'Status', r: a => <Status s={a.status} /> },
        ]} />
      </Card>
    </div>
  )
}

function Schools() {
  const schools = tradeAccounts.filter(a => /school|Academy|Coláiste|Comhaltas/i.test(a.name + a.type))
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Schools and music schools" value={n.schools} />
        <Kpi label="Instruments supplied 2026" value="1,186" delta="Mostly whistles and bodhráns" />
        <Kpi label="Christmas concert orders" value="7" delta="Due before 11 Dec" />
        <Kpi label="Overdue school invoices" value="4" tone="down" />
      </div>
      <div className="grid g21">
        <Card title="School accounts">
          <Table rows={schools} hl={a => a.name === s.ballymore.name} cols={[
            { h: 'School', r: a => <b>{a.name}</b> }, { h: 'Type', r: a => a.type }, { h: 'County', r: a => a.county },
            { h: 'YTD', r: a => eur(a.ytd), right: true }, { h: 'Overdue', r: a => a.overdue ? eur(a.overdue) : '·', right: true }, { h: 'Status', r: a => <Status s={a.status} /> },
          ]} />
        </Card>
        <Card title="School buying calendar">
          {[['Aug to Sep', 'Back to school: whistles, bodhráns, starter harps', 'green'], ['Nov to Dec', 'Christmas concerts: top-up orders', 'gold'], ['Feb to Mar', 'Feis and Fleadh prep', 'blue'], ['May to Jun', 'Year end budget spend', 'amber']].map(([p, d, t]) => (
            <div className="list-row" key={p}><Badge tone={t as any}>{p}</Badge><span className="small">{d}</span></div>
          ))}
        </Card>
      </div>
    </div>
  )
}

function Resellers() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Applications" value={resellerApps.length} />
        <Kpi label="Est. annual value" value="€74k" tone="up" />
        <Kpi label="Strong fit" value="2" />
        <Kpi label="Avg decision time" value="11 days" delta="Target 3 days" tone="down" />
      </div>
      <Card title='"Become a Reseller" applications'>
        <Table rows={resellerApps} cols={[
          { h: 'Business', r: r => <b>{r.name}</b> }, { h: 'Country', r: r => r.country }, { h: 'Est. value', r: r => r.est },
          { h: 'Fit', r: r => <Badge tone={r.fit === 'Strong' ? 'green' : r.fit === 'Medium' ? 'amber' : ''}>{r.fit}</Badge> }, { h: 'Status', r: r => <Status s={r.status} /> },
        ]} />
      </Card>
      <AI>Boston Celtic Supply sells harps and bodhráns to US schools. With DHL averaging 7.8 days to the US, Pulse suggests a quarterly consolidated shipment to cut per-unit shipping by about 60%.</AI>
    </div>
  )
}

function Prices() {
  const rows = [
    ['Tunable Bodhrán 18"', 129.99, 84.5], ['Premium Easy Tune Bodhrán 14"', 219.99, 143], ['Irish Tin Whistle D, Brass (set)', 19.99, 11], ['Trinity Cèilidh Harp 15 String', 384.99, 250],
    ['Boru Harp 22 String Walnut', 620, 403], ['Irish Bouzouki 8 String', 499.99, 325], ['A Style Mandolin', 249, 162], ['Kalimba Mabira Red Cedar', 59.99, 36],
  ] as const
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Trade discount" value="35%" delta="Shops, standard" />
        <Kpi label="School discount" value="30%" delta="+ free delivery over €500" />
        <Kpi label="Price list version" value="2026.2" delta="2027 list requested" />
        <Kpi label="Min order" value="€250" />
      </div>
      <Card title="Trade price list 2026" sub="RRP vs trade, ex VAT">
        <Table rows={rows as any} cols={[
          { h: 'Product', r: (r: any) => <b>{r[0]}</b> }, { h: 'RRP', r: (r: any) => eur(r[1], 2), right: true },
          { h: 'Trade', r: (r: any) => eur(r[2], 2), right: true }, { h: 'Margin to shop', r: (r: any) => Math.round((1 - r[2] / r[1]) * 100) + '%', right: true },
        ]} />
      </Card>
    </div>
  )
}

export const tradeTabs: Tab[] = [
  { key: 'overview', label: 'Overview', el: <Overview /> },
  { key: 'accounts', label: 'Accounts', el: <Accounts /> },
  { key: 'schools', label: 'Schools', el: <Schools /> },
  { key: 'resellers', label: 'Reseller Applications', el: <Resellers /> },
  { key: 'prices', label: 'Price Lists', el: <Prices /> },
]
