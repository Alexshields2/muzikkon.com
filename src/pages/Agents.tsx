import React, { useState } from 'react'
import { Bot, CheckCircle2, Clock, ShieldCheck } from 'lucide-react'
import { Card, Kpi, Badge, AI, Status, Alert, Bars } from '../components/ui'
import { agents, approvals, activity } from '../data/muzikkon'

const detail: Record<string, { brief: React.ReactNode; actions: string[]; log: string[]; guard: string[] }> = {
  briefing: {
    brief: <>Good morning Umer. <b>23 Shopify and eBay orders are still not in the ERP</b>, oldest 31 hours, €6,184 at risk. The <b>29 String Trinity Harp Rosewood has 2 left</b>, stock-out 9 Nov, PO-2026-0218 waiting on Salahuddin. <b>Ballymore School of Music is 41 days overdue on €3,860</b>. Boston lute MZK-10482 still in US customs. Support: 64 of 156 emails this week were order status. Google Shopping ROAS 5.4, Meta 1.9.</>,
    actions: ['No actions, Briefing only reports'],
    log: ['09:02 Morning brief sent to Umer and Salahuddin', '18:00 yesterday Evening wrap sent: 13 orders, €3,412 Shopify payout', '09:01 yesterday Morning brief sent'],
    guard: ['Read only across every system', 'Sends to directors only'],
  },
  watchdog: {
    brief: <>Watching <b>48 delivery promises</b> due in the next 72 hours. 1 at risk (MZK-10511, Galway, 31h, not in ERP). 3 workshop jobs past promised date. 1 shipment held at customs. 1 stock mismatch: Trinity 29 shows 3 on Shopify, 2 in the ERP.</>,
    actions: ['Raise alert on MZK-10511', 'Flag Trinity 29 oversell risk to Tomasz', 'Notify Ciarán about WS-118, WS-119, WS-121'],
    log: ['12:30 Alert: MZK-10511 48h promise at risk', '11:40 Oversell risk on HRP-TRN-29-RSW', '10:15 3 workshop jobs overdue'],
    guard: ['Alerts only, never changes records'],
  },
  sync: {
    brief: <><b>23 orders waiting</b> (€6,184). 21 mapped cleanly to ERP customers and SKUs and are ready to sync. 2 need a human: MZK-10516 billing and delivery address differ, MZK-10518 SKU "BODH-PET-18-TUN" not found in ERP (closest match BOD-PET-14). Switching this on saves about <b>6.5 staff hours a week</b>.</>,
    actions: ['Sync 21 orders to Muzikkon ERP (€5,464.02)', 'Send 2 exceptions to Tomasz'],
    log: ['12:38 Mapped 23 orders, 21 clean', '12:38 Exception MZK-10518 unknown SKU', '12:37 Exception MZK-10516 address mismatch'],
    guard: ['Needs approval until switched to automatic', 'Never edits invoices already issued'],
  },
  support: {
    brief: <><b>156 emails in 7 days</b>, 64 "where is my order". 52 replies drafted with live tracking, 38 approved and sent, 14 waiting. Average first reply <b>9h → 14 min</b>. Escalated: harp lever damage (TCK-2306) and the Boston lute customs case (TCK-2291).</>,
    actions: ['14 replies waiting for approval', 'Escalate TCK-2306 damage claim to Aoife'],
    log: ['12:22 Drafted customs update for Jonathan Hale', '10:40 Resolved 4 web chats automatically', '09:58 Drafted reply to J. Hale Trustpilot review'],
    guard: ['Refunds and anything over €500 need approval', 'Damage and complaints always go to a human'],
  },
  dispatch: {
    brief: <><b>14 parcels today</b>: 6 An Post, 4 DPD, 4 DHL Express labels created (incl. customs docs). Harp boxes over 1.2m routed to DPD. MZK-10482 commercial invoice regenerated for US customs.</>,
    actions: ['Upload commercial invoice for MZK-10482', 'Book DPD pallet for TR-3317'],
    log: ['10:12 4 DHL Express labels and customs docs', '09:30 DPD pallet booked for TR-3317', '08:55 Courier selection for 14 parcels'],
    guard: ['Courier spend over €120 per parcel needs approval'],
  },
  inventory: {
    brief: <>Stock-out forecast: <b>Trinity 29 Rosewood on 9 Nov</b> (2 left, 7 sold in 14 days, 38 day lead time). Drafted <b>PO-2026-0218</b> for 12 units (€5,760). Also low: Premium Easy Tune Bodhrán 14", Tin Whistle D, Kalimba Mabira.</>,
    actions: ['PO-2026-0218 awaiting Salahuddin', 'Draft PO-2026-0216 bodhráns', 'Align Shopify stock for Trinity 29 to 2'],
    log: ['11:48 Stock-out forecast HRP-TRN-29-RSW', '11:47 Drafted PO-2026-0218', '07:00 Nightly stock sync ERP to Shopify and eBay'],
    guard: ['POs always need director approval'],
  },
  finance: {
    brief: <><b>€21,740 outstanding</b>, €9,315 overdue on 5 invoices. Ballymore School of Music €3,860 at 41 days, reminder 2 sent. Recommend credit hold on their new €1,240 order. 3 payouts unmatched (€1,912.40).</>,
    actions: ['Credit hold on TR-3318', 'Match 3 payouts', 'Reminder 1 to Ennis Music Academy'],
    log: ['11:31 Reminder 2 to Ballymore School of Music', '09:40 4 Shopify payouts matched', '07:15 Debtor ageing refreshed'],
    guard: ['Reminders 1 and 2 automatic, reminder 3 and holds need approval'],
  },
}

export function Agents() {
  const [sel, setSel] = useState('briefing')
  const a = agents.find(x => x.key === sel)!
  const d = detail[sel]
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Agents active" value="7" delta="1 ready to switch on" />
        <Kpi label="Runs today" value={agents.reduce((s, x) => s + x.runs, 0)} delta="Across orders, support, stock, cash" />
        <Kpi label="Waiting for approval" value={approvals.length} delta="Approve in Work" tone="down" />
        <Kpi label="Staff hours saved this week" value="21.5h" delta="Support 11h · Sync 6.5h · Finance 4h" tone="up" />
      </div>
      <div className="grid g12">
        <Card title="Your agents" sub="Each one has one job">
          {agents.map(x => (
            <div key={x.key} className={'email' + (x.key === sel ? ' sel' : '')} onClick={() => setSel(x.key)}>
              <div className="row">
                <div className="avatar sm agent"><Bot size={12} /></div>
                <span className="b">{x.name}</span>
                <span style={{ marginLeft: 'auto' }}><Status s={x.status} /></span>
              </div>
              <div className="tiny muted" style={{ marginTop: 4 }}>{x.job}</div>
            </div>
          ))}
        </Card>
        <div className="stack">
          <Card title={a.name} sub={a.job} right={<Status s={a.status} />}>
            <div className="grid g3" style={{ marginBottom: 12 }}>
              <div className="card" style={{ padding: 12 }}><div className="tiny muted">Runs today</div><div className="b" style={{ fontSize: 20 }}>{a.runs}</div></div>
              <div className="card" style={{ padding: 12 }}><div className="tiny muted">Awaiting approval</div><div className="b" style={{ fontSize: 20 }}>{a.actions}</div></div>
              <div className="card" style={{ padding: 12 }}><div className="tiny muted">Accepted without edits</div><div className="b" style={{ fontSize: 20 }}>{a.success}</div></div>
            </div>
            <AI title={a.name + ' · latest'}>{d.brief}</AI>
          </Card>
          <div className="grid g3">
            <Card title="Proposed actions">
              {d.actions.map(x => <div className="list-row small" key={x}><Clock size={14} color="#c98a1b" />{x}</div>)}
            </Card>
            <Card title="Run log">
              {d.log.map(x => <div className="list-row small" key={x}><CheckCircle2 size={14} color="#2f8f5b" />{x}</div>)}
            </Card>
            <Card title="Guardrails">
              {d.guard.map(x => <div className="list-row small" key={x}><ShieldCheck size={14} color="#b8995a" />{x}</div>)}
            </Card>
          </div>
        </div>
      </div>
      <div className="grid g2">
        <Card title="Agent runs this week">
          <Bars data={[[22, 31, 28, 35, 41, 38, 42], [8, 10, 9, 12, 14, 13, 18]]} labels={['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']} series={['Support', 'Other agents']} h={160} />
        </Card>
        <Card title="Recent agent actions">
          {activity.filter(x => x.kind === 'agent').slice(0, 6).map(x => (
            <div className="feed-item" key={x.t}><div className="feed-ic agent">AI</div><div className="small"><b>{x.who}</b> {x.text}<div className="tiny muted">{x.t}</div></div></div>
          ))}
        </Card>
      </div>
    </div>
  )
}
