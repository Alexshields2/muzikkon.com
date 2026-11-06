import React from 'react'
import { Card, Kpi, Table, Status, Badge, eur, AI, Kanban, Alert, HBars, Progress } from '../components/ui'
import { workshopJobs, tradeIns, numbers as n } from '../data/muzikkon'
import type { Tab } from '../App'

const stages = ['Received', 'Assessed', 'In repair', 'Ready']

function Board() {
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Harps in workshop" value={workshopJobs.length} />
        <Kpi label="Past promised date" value={workshopJobs.filter(j => j.late).length} tone="down" />
        <Kpi label="Ready for collection" value={workshopJobs.filter(j => j.stage === 'Ready').length} tone="up" />
        <Kpi label="Avg turnaround" value="8.5 days" delta="Promise 7 days" tone="down" />
        <Kpi label="Workshop revenue MTD" value="€1,140" />
      </div>
      <Kanban cols={stages.map(st => ({ h: st, items: workshopJobs.filter(j => j.stage === st), tone: (st === 'Ready' ? 'green' : st === 'In repair' ? 'amber' : 'blue') as any }))} render={j => (
        <div className={'kcard' + (j.late ? ' late' : '')}>
          <div className="between"><b className="small">{j.id}</b>{j.late ? <Badge tone="red">Late</Badge> : <span className="tiny muted">{j.promised}</span>}</div>
          <div className="small b" style={{ marginTop: 4 }}>{j.item}</div>
          <div className="tiny muted">{j.customer}</div>
          <div className="tiny" style={{ marginTop: 4 }}>{j.job}</div>
          <div className="tiny muted" style={{ marginTop: 4 }}>Promised {j.promised} · Ciarán Doyle</div>
        </div>
      )} />
      <AI title="Ops Watchdog">3 harps are past their promised date: <b>WS-118</b> Galway Harp Society (2 Nov), <b>WS-119</b> Orla Byrne (4 Nov), <b>WS-121</b> Ennis Music Academy (5 Nov). Ciarán is at 90% capacity. Suggest pushing WS-125 and WS-126 by 2 days and messaging the 3 customers with new dates.</AI>
    </div>
  )
}

function Servicing() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Service bookings, next 30 days" value="17" />
        <Kpi label="Annual service due" value="46" delta="Harps sold 2024 to 2025" />
        <Kpi label="Reminder emails ready" value="46" delta="Support Agent" tone="up" />
        <Kpi label="Avg service value" value="€95" />
      </div>
      <div className="grid g21">
        <Card title="Service jobs">
          <Table rows={workshopJobs} hl={j => j.late} cols={[
            { h: 'Job', r: j => <b>{j.id}</b> }, { h: 'Harp', r: j => j.item }, { h: 'Customer', r: j => j.customer }, { h: 'Work', r: j => <span className="small">{j.job}</span> },
            { h: 'Promised', r: j => j.promised }, { h: 'Stage', r: j => <Status s={j.late ? 'Overdue' : j.stage} /> },
          ]} />
        </Card>
        <Card title="Service menu">
          {[['Restring (lever harp)', '€60 + strings'], ['Lever regulation', '€85'], ['Full regulation + restring', '€180'], ['Annual service', '€95'], ['Soundboard crack repair', 'From €220']].map(([l, p]) => (
            <div className="list-row small" key={l}><span style={{ flex: 1 }}>{l}</span><b>{p}</b></div>
          ))}
          <div className="mt"><AI>46 customers bought a harp 12 to 24 months ago. A service reminder campaign at a 20% booking rate is about €870 of workshop revenue.</AI></div>
        </Card>
      </div>
    </div>
  )
}

function TradeIns() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Under evaluation" value={tradeIns.length} />
        <Kpi label="Offers out" value={eur(tradeIns.reduce((a, t) => a + t.offer, 0))} />
        <Kpi label="Expected resale" value={eur(tradeIns.reduce((a, t) => a + t.resale, 0))} tone="up" />
        <Kpi label="New harp sales linked" value="4" delta="Upgrade path" />
      </div>
      <Card title="Trade-ins" sub="Celtic lever harps">
        <Table rows={tradeIns} cols={[
          { h: 'Harp', r: t => <b>{t.item}</b> }, { h: 'Owner', r: t => t.owner }, { h: 'Condition', r: t => t.condition },
          { h: 'Offer', r: t => eur(t.offer), right: true }, { h: 'Resale', r: t => eur(t.resale), right: true },
          { h: 'Margin', r: t => Math.round((1 - t.offer / t.resale) * 100) + '%', right: true }, { h: 'Toward', r: t => t.toward }, { h: 'Status', r: t => <Status s={t.status} /> },
        ]} />
      </Card>
    </div>
  )
}

function QC() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="QC checks this week" value="31" />
        <Kpi label="Pass first time" value="94%" />
        <Kpi label="Issues found" value="2" delta="Lever buzz, loose pin" />
        <Kpi label="Returns for faults MTD" value="1" />
      </div>
      <div className="grid g2">
        <Card title="Pre-dispatch QC, harps and lutes">
          {[['Strings in tune and settled', 100], ['Levers regulated', 97], ['Tuning pins tight', 100], ['Finish and soundboard inspected', 100], ['Case and spare strings packed', 94]].map(([l, v]) => (
            <div key={l as string} style={{ padding: '7px 0' }}><div className="between small"><span>{l}</span><b>{v}%</b></div><Progress v={v as number} tone={(v as number) < 96 ? 'amber' : 'green'} /></div>
          ))}
        </Card>
        <Card title="QC issues">
          <Alert tone="amber" title="MZK-10520 Lute 6 Course">Course 4 buzz. Ciarán adjusting nut. Ships tomorrow.</Alert>
          <Alert tone="amber" title="MZK-10513 Boru 22">Loose tuning pin found. Fixed.</Alert>
          <Alert tone="green" title="12 harps passed today">No issues.</Alert>
        </Card>
      </div>
    </div>
  )
}

export const workshopTabs: Tab[] = [
  { key: 'board', label: 'Job Board', el: <Board /> },
  { key: 'servicing', label: 'Harp Servicing', el: <Servicing /> },
  { key: 'tradeins', label: 'Trade-ins', el: <TradeIns /> },
  { key: 'qc', label: 'Quality Checks', el: <QC /> },
]
