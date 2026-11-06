import React from 'react'
import { Card, Kpi, Table, Status, eur, AI, Bars, Donut, Alert, HBars, Line, Badge } from '../components/ui'
import { invoices, payouts, numbers as n, stories as s, revenue12, costsMTD, categories } from '../data/muzikkon'
import type { Tab } from '../App'

const k = (v: number) => '€' + Math.round(v / 1000) + 'k'

function Overview() {
  const cost = costsMTD.reduce((a, b) => a + b.v, 0)
  return (
    <div className="stack">
      <div className="grid g6">
        <Kpi hl label="Revenue MTD" value={eur(n.revenueMTD)} />
        <Kpi label="Costs MTD" value={eur(cost)} />
        <Kpi label="Gross margin" value={n.grossMargin + '%'} tone="up" delta="▲ 1.2 pts" />
        <Kpi label="Bank balance" value="€94,310" delta="Business current account" />
        <Kpi label="Outstanding" value={eur(n.outstanding)} />
        <Kpi label="Overdue" value={eur(n.overdue)} tone="down" />
      </div>
      <div className="grid g21">
        <Card title="Revenue, last 12 months"><Bars stacked data={[revenue12.online, revenue12.trade]} labels={revenue12.labels} series={['Online', 'Trade & Education']} fmt={k} h={220} /></Card>
        <Card title="Costs this month"><Donut items={costsMTD} center={k(cost)} sub="MTD" /></Card>
      </div>
      <div className="grid g3">
        <AI title="Finance Agent">€9,315 is overdue across 5 trade invoices. The biggest is <b>Ballymore School of Music, €3,860, 41 days</b>. 3 payouts (€1,912.40) aren't matched to the bank. VAT return for Sep to Oct is due 19 Nov and is 90% prepared.</AI>
        <Card title="Cash in, next 30 days">
          {[['Shopify Payments (forecast)', 61200], ['Trade invoices due', 12425], ['Overdue if collected', 9315], ['eBay payouts', 9800]].map(([l, v]) => <div className="list-row small" key={l as string}><span style={{ flex: 1 }}>{l}</span><b>{eur(v as number)}</b></div>)}
        </Card>
        <Card title="Cash out, next 30 days">
          {[['Supplier POs in transit', 14290], ['PO-2026-0218 if approved', 5760], ['Payroll', 22260], ['Ads (Christmas plan)', 9500], ['VAT Sep to Oct', 11840]].map(([l, v]) => <div className="list-row small" key={l as string}><span style={{ flex: 1 }}>{l}</span><b>{eur(v as number)}</b></div>)}
        </Card>
      </div>
    </div>
  )
}

function Revenue() {
  return (
    <div className="stack">
      <div className="grid g4">
        {Object.entries(n.revenueByChannelMTD).map(([c, v], i) => <Kpi key={c} hl={i === 0} label={c} value={eur(v)} delta="MTD" />)}
      </div>
      <div className="grid g2">
        <Card title="Revenue by category, MTD"><HBars items={categories} fmt={v => eur(v)} /></Card>
        <Card title="November: actual vs forecast" sub="Cumulative">
          <Line data={[[3100, 6900, 10200, 14800, 19300, 24340, 0, 0, 0, 0].slice(0, 6), [3400, 6800, 10500, 14200, 18100, 22400]]} labels={['1', '2', '3', '4', '5', '6']} series={['Actual', 'Forecast']} fmt={k} h={200} />
        </Card>
      </div>
      <Card title="Monthly revenue table">
        <Table rows={revenue12.labels.map((l, i) => ({ l, o: revenue12.online[i], t: revenue12.trade[i] }))} cols={[
          { h: 'Month', r: r => <b>{r.l}</b> }, { h: 'Online', r: r => eur(r.o), right: true }, { h: 'Trade & Education', r: r => eur(r.t), right: true }, { h: 'Total', r: r => <b>{eur(r.o + r.t)}</b>, right: true },
        ]} />
      </Card>
    </div>
  )
}

function Debtors() {
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Outstanding" value={eur(n.outstanding)} delta={invoices.length + ' invoices'} />
        <Kpi label="Overdue" value={eur(n.overdue)} delta={n.overdueCount + ' invoices'} tone="down" />
        <Kpi label="Oldest" value={s.ballymore.days + ' days'} delta={s.ballymore.name} tone="down" />
        <Kpi label="Avg days to pay" value="38" delta="Terms 30" tone="down" />
        <Kpi label="Reminders sent this week" value="4" delta="Finance Agent" />
      </div>
      <div className="grid g21">
        <Card title="Trade invoices" sub="From the Muzikkon ERP">
          <Table rows={invoices} hl={i => i.id === s.ballymore.inv} cols={[
            { h: 'Invoice', r: i => <b>{i.id}</b> }, { h: 'Account', r: i => i.acct }, { h: 'Issued', r: i => i.issued }, { h: 'Due', r: i => i.due },
            { h: 'Days over', r: i => i.days || '·', right: true }, { h: 'Amount', r: i => eur(i.amount), right: true }, { h: 'Status', r: i => <Status s={i.status} /> },
          ]} />
        </Card>
        <div className="stack">
          <Card title="Ballymore School of Music" className="gold" right={<Badge tone="red">41 days</Badge>}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>€3,860</div>
            <div className="small muted">INV-2026-0412 · 22 Tunable Bodhráns + 15 Tin Whistle sets</div>
            {[['27 Aug', 'Invoice issued'], ['26 Sep', 'Due date'], ['3 Oct', 'Reminder 1 (auto)'], ['20 Oct', 'Reminder 2 (auto)'], ['5 Nov', 'New order TR-3318 €1,240'], ['9 Nov', 'Niamh to call']].map(([d, t]) => (
              <div className="list-row small" key={t}><span className="muted" style={{ width: 52 }}>{d}</span>{t}</div>
            ))}
            <div className="row mt"><button className="btn primary">Hold TR-3318</button><button className="btn">Send statement</button></div>
          </Card>
          <Card title="Ageing"><Bars data={[[12425, 620, 2695, 2140, 3860]]} labels={['Not due', '1-7', '8-21', '22-35', '36+']} fmt={k} h={150} /></Card>
        </div>
      </div>
    </div>
  )
}

function Recon() {
  const un = payouts.filter(p => p.status === 'Unmatched')
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Payouts this week" value={payouts.length} />
        <Kpi label="Matched automatically" value={payouts.length - un.length} tone="up" />
        <Kpi label="Unmatched" value={un.length} delta={eur(un.reduce((a, p) => a + p.amount, 0), 2)} tone="down" />
        <Kpi label="Fees MTD" value="€610" delta="Shopify, eBay, Stripe, PayPal" />
      </div>
      <div className="grid g21">
        <Card title="Payouts vs bank" sub="Shopify Payments, eBay, Stripe, PayPal, bank transfers">
          <Table rows={payouts} hl={p => p.status === 'Unmatched'} cols={[
            { h: 'Source', r: p => <b>{p.src}</b> }, { h: 'Reference', r: p => p.ref }, { h: 'Date', r: p => p.date },
            { h: 'Payout', r: p => eur(p.amount, 2), right: true }, { h: 'In bank', r: p => p.bank ? eur(p.bank, 2) : '·', right: true }, { h: 'Status', r: p => <Status s={p.status} /> },
          ]} />
        </Card>
        <div className="stack">
          <AI title="Finance Agent">eBay payout EBP-77314 (€1,146.20) landed as two bank lines on 5 Nov. Stripe STR-90413 (€521.20) is net of a €9.80 fee. PayPal €245 not yet withdrawn. <b>All 3 can be matched with one click.</b></AI>
          <Alert tone="green" title="Was a manual job">Sana spent ~2.5h a week matching payouts. Pulse does it as they land.</Alert>
        </div>
      </div>
    </div>
  )
}

function Costs() {
  return (
    <div className="stack">
      <div className="grid g6">
        {costsMTD.map((c, i) => <Kpi key={c.l} hl={i === 0} label={c.l} value={eur(c.v)} delta="MTD" />)}
      </div>
      <div className="grid g2">
        <Card title="Cost breakdown"><HBars items={costsMTD} fmt={v => eur(v)} /></Card>
        <Card title="Margin by category" sub="Last 90 days">
          <HBars items={[{ l: 'Harps', v: 52 }, { l: 'Early Music', v: 49 }, { l: 'Strings', v: 44 }, { l: 'Bodhráns & Drums', v: 41 }, { l: 'Wind', v: 38 }, { l: 'Percussion & Accessories', v: 47 }]} fmt={v => v + '%'} />
        </Card>
      </div>
    </div>
  )
}

function VAT() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="VAT due Sep to Oct" value="€11,840" delta="Due 19 Nov" />
        <Kpi label="Prepared" value="90%" tone="up" />
        <Kpi label="EU OSS sales" value="€14,620" delta="Q4 to date" />
        <Kpi label="Non-EU exports" value="€21,380" delta="Zero rated" />
      </div>
      <Card title="VAT summary, Sep to Oct">
        <Table rows={[
          { l: 'Irish sales @ 23%', net: 61480, vat: 14140 }, { l: 'EU OSS sales (various rates)', net: 9820, vat: 2170 },
          { l: 'Exports, zero rated', net: 14260, vat: 0 }, { l: 'Purchases and imports (input VAT)', net: -19800, vat: -4470 },
        ]} cols={[{ h: 'Line', r: r => <b>{r.l}</b> }, { h: 'Net', r: r => eur(r.net), right: true }, { h: 'VAT', r: r => eur(r.vat), right: true }]} />
        <div className="between mt"><span className="b">Net VAT payable</span><span className="b" style={{ fontSize: 18 }}>€11,840</span></div>
      </Card>
    </div>
  )
}

export const financeTabs: Tab[] = [
  { key: 'overview', label: 'Overview', el: <Overview /> },
  { key: 'revenue', label: 'Revenue', el: <Revenue /> },
  { key: 'debtors', label: 'Debtors', el: <Debtors /> },
  { key: 'reconciliation', label: 'Reconciliation', el: <Recon /> },
  { key: 'costs', label: 'Costs', el: <Costs /> },
  { key: 'vat', label: 'VAT', el: <VAT /> },
]
