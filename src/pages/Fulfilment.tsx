import React from 'react'
import { Package, CheckCircle2 } from 'lucide-react'
import { Card, Kpi, Table, Status, Badge, eur, AI, Bars, Alert, Kanban, Progress, HBars } from '../components/ui'
import { dispatchToday, shipments, couriers, stories as s, numbers as n } from '../data/muzikkon'
import type { Tab } from '../App'

function Today() {
  const by = (st: string) => dispatchToday.filter(d => d.status === st)
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Parcels today" value={dispatchToday.length} />
        <Kpi label="Packed" value={by('Packed').length} tone="up" delta="Ready for collection" />
        <Kpi label="In QC" value={by('QC').length} delta="Harps and lutes checked" />
        <Kpi label="Picking" value={by('Picking').length} />
        <Kpi label="Courier cut-off" value="16:30" delta="DPD and DHL collection" />
      </div>
      <Kanban cols={[
        { h: 'Picking', items: by('Picking'), tone: 'blue' }, { h: 'QC', items: by('QC'), tone: 'amber' }, { h: 'Packed', items: by('Packed'), tone: 'green' },
      ]} render={d => (
        <div className="kcard">
          <div className="between"><b>{d.order}</b><Badge tone={d.dest === 'IE' ? 'green' : 'blue'}>{d.dest}</Badge></div>
          <div className="small" style={{ margin: '4px 0' }}>{d.item}</div>
          <div className="between tiny muted"><span>{d.courier}</span><span><Package size={11} /> {d.box}</span></div>
        </div>
      )} />
      <div className="grid g2">
        <AI title="Dispatch Agent">Routed <b>4 parcels to DPD</b> (harp boxes over 1.2m and the TR-3317 pallet), <b>4 to DHL Express</b> with customs paperwork for UK, EU and US, and <b>6 to An Post</b> for Ireland. MZK-10520 lute is in QC, then goes in the hard lute case with spare strings.</AI>
        <Card title="Pick list summary">
          <HBars items={[{ l: 'Harps', v: 3 }, { l: 'Bodhráns', v: 3 }, { l: 'Strings (bouzouki, mandolin, banjo)', v: 3 }, { l: 'Wind', v: 2 }, { l: 'Other', v: 3 }]} />
        </Card>
      </div>
    </div>
  )
}

function Shipments() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="In transit" value={shipments.filter(x => x.status === 'In transit').length} />
        <Kpi label="Delivered this week" value="58" tone="up" />
        <Kpi label="Exceptions" value="4" tone="down" />
        <Kpi label="On-time delivery" value="94%" delta="Last 30 days" />
      </div>
      <Card title="Shipments" sub="Live tracking from An Post, DPD and DHL Express">
        <Table rows={shipments} hl={x => x.order === s.lute.order} cols={[
          { h: 'Order', r: x => <b>{x.order}</b> }, { h: 'Customer', r: x => x.customer }, { h: 'Destination', r: x => x.dest },
          { h: 'Courier', r: x => x.courier }, { h: 'Shipped', r: x => x.shipped }, { h: 'Status', r: x => <Status s={x.status} /> }, { h: 'ETA', r: x => x.eta },
        ]} />
      </Card>
    </div>
  )
}

function Exceptions() {
  const ex = shipments.filter(x => !/Delivered|In transit/.test(x.status))
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Open exceptions" value={ex.length} tone="down" />
        <Kpi label="Value affected" value={eur(1199.99 + 384.99 + 620 + 499.99, 2)} />
        <Kpi label="Customers updated by AI" value="3 of 4" tone="up" />
        <Kpi label="Avg time to resolve" value="2.4 days" />
      </div>
      <div className="grid g21">
        <Card title="MZK-10482 · The Boston lute" sub="Renaissance Lute 8 Course Deluxe · €1,199.99 · Jonathan Hale, Boston MA" right={<Badge tone="red">Held 6 days</Badge>}>
          {[
            ['29 Oct', 'Shipped DHL Express from Dublin 22', true],
            ['31 Oct', 'Arrived Cincinnati hub', true],
            ['31 Oct', 'Held by US customs: commercial invoice missing value breakdown', true],
            ['3 Nov', 'Customer email 2: "Any news on my lute?"', true],
            ['5 Nov', 'Customer email 3 + 2 star Trustpilot review', true],
            ['6 Nov', 'Dispatch Agent regenerated commercial invoice', true],
            ['Today', 'Upload invoice to DHL (Tomasz) and send customer update (Aoife)', false],
          ].map(([d, t, done]) => (
            <div className="list-row" key={t as string}>{done ? <CheckCircle2 size={14} color="#2f8f5b" /> : <Package size={14} color="#c4483e" />}<span className="small muted" style={{ width: 56 }}>{d}</span><span className="small">{t}</span></div>
          ))}
        </Card>
        <AI title="What Pulse would have done">On 31 Oct the DHL hold would have triggered an alert, the Dispatch Agent would have regenerated the invoice the same day, and Jonathan would have had a proactive update before he ever emailed. <b>3 emails and a 2 star review avoided.</b></AI>
      </div>
      <div className="grid g3">
        {ex.filter(x => x.order !== s.lute.order).map(x => (
          <Alert key={x.order} tone={/Damaged/.test(x.status) ? 'red' : 'amber'} title={`${x.order} · ${x.status}`}>{x.customer}, {x.dest} via {x.courier}. ETA {x.eta}.</Alert>
        ))}
      </div>
    </div>
  )
}

function Couriers() {
  return (
    <div className="stack">
      <div className="grid g3">
        {couriers.map((c, i) => (
          <Card key={c.name} className={i === 0 ? 'gold' : ''} title={c.name} sub={c.regions}>
            <div className="grid g3">
              <div><div className="tiny muted">Parcels MTD</div><div className="b" style={{ fontSize: 20 }}>{c.parcels}</div></div>
              <div><div className="tiny muted">Avg cost</div><div className="b" style={{ fontSize: 20 }}>{eur(c.cost, 2)}</div></div>
              <div><div className="tiny muted">On time</div><div className="b" style={{ fontSize: 20 }}>{c.onTime}%</div></div>
            </div>
            <div className="mt"><Progress v={c.onTime} tone={c.onTime < 90 ? 'amber' : 'green'} /></div>
          </Card>
        ))}
      </div>
      <div className="grid g2">
        <Card title="Shipping cost per parcel by region"><Bars data={[[8.4, 14.9, 24.6, 58.2]]} labels={['Ireland', 'UK & NI', 'Europe', 'Worldwide']} fmt={v => '€' + v} h={190} /></Card>
        <Card title="Delivery promises vs actual">
          {[['Ireland', '48 hours', '1.6 days', 96], ['UK & NI', '3 to 4 days', '3.2 days', 93], ['Europe', '5 to 6 days', '5.1 days', 90], ['Worldwide', '5 to 9 days', '7.8 days', 84]].map(([r, p, a, v]) => (
            <div key={r as string} style={{ padding: '7px 0' }}><div className="between small"><span><b>{r}</b> · promise {p}</span><span>actual {a} · <b>{v}%</b></span></div><Progress v={v as number} tone={(v as number) < 90 ? 'amber' : ''} /></div>
          ))}
        </Card>
      </div>
    </div>
  )
}

function Packing() {
  const lists = [
    { t: 'Harps', items: ['Tune to pitch and regulate levers', 'Padded gig bag + tuning key', 'Spare string set', 'Double box, corners foamed', 'Fragile + insured over €500'] },
    { t: 'Lutes and bouzoukis', items: ['Humidity check', 'Hard case, strings slackened 1 tone', 'Spare strings', 'Commercial invoice for non-EU'] },
    { t: 'Bodhráns', items: ['Skin check under light', 'Tipper + padded bag', 'Double-walled box over 16"'] },
  ]
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="QC pass rate" value="98.6%" />
        <Kpi label="Transit damage" value="0.9%" delta="2 claims this month" tone="down" />
        <Kpi label="Avg pack time, harp" value="22 min" />
        <Kpi label="Insured parcels MTD" value="19" delta={'Over €500 · ' + n.countries + ' countries this year'} />
      </div>
      <div className="grid g3">
        {lists.map(l => (
          <Card key={l.t} title={l.t + ' packing checklist'}>
            {l.items.map(i => <div className="list-row small" key={i}><CheckCircle2 size={14} color="#b8995a" />{i}</div>)}
          </Card>
        ))}
      </div>
      <Card title="Packaging stock">
        <div className="grid g4">
          {[['Harp XL boxes', 6, 'red'], ['Harp L boxes', 18, ''], ['Drum M boxes', 41, ''], ['Lute hard cases', 9, 'amber']].map(([l, v, t]) => (
            <div key={l as string}><div className="between small"><span>{l}</span><b>{v}</b></div><Progress v={(v as number) * 2} tone={t as string} /></div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export const fulfilmentTabs: Tab[] = [
  { key: 'today', label: "Today's Dispatch", el: <Today /> },
  { key: 'shipments', label: 'Shipments', el: <Shipments /> },
  { key: 'exceptions', label: 'Exceptions', el: <Exceptions /> },
  { key: 'couriers', label: 'Couriers', el: <Couriers /> },
  { key: 'packing', label: 'Packing & QC', el: <Packing /> },
]
