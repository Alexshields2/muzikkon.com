import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Card, Kpi, Table, Status, Badge, AI, Avatar } from '../components/ui'
import { tasks, approvals, staff } from '../data/muzikkon'
import type { Tab } from '../App'

const priTone = (p: string) => (p === 'Urgent' ? 'red' : p === 'High' ? 'amber' : p === 'Medium' ? 'blue' : '') as any

function Tasks() {
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Open tasks" value={tasks.length} />
        <Kpi label="Due today" value={tasks.filter(t => t.due === 'Today').length} tone="down" />
        <Kpi label="Urgent" value={tasks.filter(t => t.pri === 'Urgent').length} tone="down" />
        <Kpi label="Awaiting approval" value={tasks.filter(t => t.status === 'Awaiting approval').length} />
        <Kpi label="Created by agents" value="9" delta="From story threads" />
      </div>
      <Card title="Tasks" sub="Every task has an owner, a date and a linked record">
        <Table rows={tasks} hl={t => t.pri === 'Urgent'} cols={[
          { h: 'Task', r: t => <b className="small">{t.t}</b> },
          { h: 'Owner', r: t => <span className="row small"><Avatar sm name={t.owner} />{t.owner}</span> },
          { h: 'Due', r: t => <Badge tone={t.due === 'Today' ? 'red' : ''}>{t.due}</Badge> },
          { h: 'Priority', r: t => <Badge tone={priTone(t.pri)}>{t.pri}</Badge> },
          { h: 'Department', r: t => <span className="small">{t.dept}</span> },
          { h: 'Status', r: t => <Status s={t.status} /> },
          { h: 'Related', r: t => <Badge tone="gold">{t.rel}</Badge> },
        ]} />
      </Card>
    </div>
  )
}

function Approvals() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Waiting for approval" value={approvals.length} />
        <Kpi label="For Salahuddin" value={approvals.filter(a => a.who === 'Salahuddin Tarif').length} />
        <Kpi label="For Umer" value={approvals.filter(a => a.who === 'Umer Farooq').length} />
        <Kpi label="For Aoife" value={approvals.filter(a => a.who === 'Aoife Byrne').length} />
      </div>
      <div className="grid g2">
        {approvals.map(a => (
          <Card key={a.what} title={a.what} sub={<span className="row"><Sparkles size={11} color="#b8995a" />Raised by {a.by}</span>} right={<Badge tone="gold">{a.value}</Badge>}>
            <div className="small">{a.why}</div>
            <div className="between mt"><span className="small muted">Approver: <b>{a.who}</b></span><div className="row"><button className="btn primary">Approve</button><button className="btn">Decline</button></div></div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Workflows() {
  const flows = [
    { n: 'Web order to customer update', steps: ['Shopify / eBay order', 'Sync to ERP', 'Pick & QC', 'Label + customs', 'Dispatch', 'Customer tracking update'], runs: 117, status: 'Live' },
    { n: 'Where is my order', steps: ['Email / WhatsApp', 'Match order', 'Read courier tracking', 'Draft reply', 'Approve', 'Send'], runs: 64, status: 'Live' },
    { n: 'Low stock to purchase order', steps: ['Sales velocity', 'Days of cover', 'Lead time check', 'Draft PO', 'Director approval', 'Send to supplier'], runs: 6, status: 'Live' },
    { n: 'Overdue trade invoice', steps: ['Due date passed', 'Reminder 1', 'Reminder 2', 'Credit hold check', 'Call task for Niamh'], runs: 5, status: 'Live' },
    { n: 'Harp service', steps: ['Booking', 'Assess', 'Quote approval', 'Repair', 'QC', 'Collection / ship'], runs: 9, status: 'Live' },
    { n: 'Customs hold', steps: ['Courier exception', 'Regenerate invoice', 'Upload to courier', 'Proactive customer email'], runs: 1, status: 'Ready to switch on' },
  ]
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Workflows live" value="5" />
        <Kpi label="Runs this week" value={flows.reduce((a, f) => a + f.runs, 0)} />
        <Kpi label="Steps automated" value="71%" tone="up" />
        <Kpi label="Ready to switch on" value="1" delta="Customs hold" />
      </div>
      <div className="grid g2">
        {flows.map(f => (
          <Card key={f.n} title={f.n} sub={f.runs + ' runs this week'} right={<Status s={f.status} />}>
            <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
              {f.steps.map((st, i) => (
                <React.Fragment key={st}><Badge tone={i === 0 ? 'dark' : 'gold'}>{st}</Badge>{i < f.steps.length - 1 && <ArrowRight size={12} color="#8a8a92" />}</React.Fragment>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Schedule() {
  const days = ['Fri 6', 'Mon 9', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13']
  const ev: Record<string, [string, string][]> = {
    'Fri 6': [['16:30', 'Courier collection: 14 parcels'], ['17:00', 'Pulse review with Consulting.ie'], ['Today', 'Approve PO-2026-0218']],
    'Mon 9': [['09:30', 'Niamh calls Ballymore School of Music'], ['11:00', 'PO-2026-0211 harps confirm ETA'], ['14:00', 'Trinity 29 stock-out day']],
    'Tue 10': [['10:00', 'WS-118, WS-119, WS-121 back to customers'], ['15:00', 'Weekly ops review']],
    'Wed 11': [['11:00', 'Reseller applications review'], ['16:00', 'Christmas ads check']],
    'Thu 12': [['09:00', 'Gift Guide 2026 live'], ['14:00', 'Showroom Christmas display']],
    'Fri 13': [['12:00', 'Set Christmas last order dates'], ['16:30', 'Courier collection']],
  }
  return (
    <div className="stack">
      <div className="grid g6">
        {days.map(d => (
          <Card key={d} title={d} className={d === 'Fri 6' ? 'gold' : ''}>
            {ev[d].map(([t, x]) => <div className="list-row small" key={x} style={{ alignItems: 'flex-start' }}><span className="b" style={{ width: 44, flexShrink: 0 }}>{t}</span>{x}</div>)}
          </Card>
        ))}
      </div>
      <Card title="Team this week">
        <div className="grid g3">
          {staff.map(p => (
            <div className="list-row" key={p.name}><Avatar name={p.name} /><div style={{ flex: 1 }}><div className="b small">{p.name}</div><div className="tiny muted">{p.role}</div></div><Badge>{tasks.filter(t => t.owner === p.name).length} tasks</Badge></div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export const workTabs: Tab[] = [
  { key: 'tasks', label: 'Tasks', el: <Tasks /> },
  { key: 'approvals', label: 'Approvals', el: <Approvals /> },
  { key: 'workflows', label: 'Workflows', el: <Workflows /> },
  { key: 'schedule', label: 'Schedule', el: <Schedule /> },
]
