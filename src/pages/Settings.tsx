import React from 'react'
import { Card, Kpi, Table, Status, Badge, AI, Avatar } from '../components/ui'
import { org, staff, integrations, agents } from '../data/muzikkon'
import type { Tab } from '../App'

function Organisation() {
  return (
    <div className="stack">
      <div className="grid g2">
        <Card title="Organisation">
          {[['Legal name', org.legal], ['Trading as', org.trading], ['Website', org.site], ['Address', org.address], ['Phone', org.phone], ['Email', org.email], ['Founded', String(org.founded)], ['Currency', 'EUR (USD and GBP storefronts)'], ['Time zone', 'Europe/Dublin']].map(([l, v]) => (
            <div className="list-row small" key={l}><span className="muted" style={{ width: 120 }}>{l}</span><b>{v}</b></div>
          ))}
        </Card>
        <div className="stack">
          <Card title="Brand">
            <div className="row" style={{ gap: 16 }}>
              <img src="/muzikkon-logo.png" alt="Muzikkon logo" style={{ height: 70, background: '#fff', borderRadius: 12, padding: 8 }} />
              <div className="row">{[['#1C1C1E', 'Charcoal'], ['#B8995A', 'Antique Gold'], ['#D4B677', 'Brass'], ['#F3ECDD', 'Ivory']].map(([c, l]) => (
                <div key={c} style={{ textAlign: 'center' }}><div style={{ width: 40, height: 40, borderRadius: 10, background: c, border: '1px solid rgba(0,0,0,.08)' }} /><div className="tiny muted">{l}</div></div>
              ))}</div>
            </div>
          </Card>
          <Card title="Business">
            {[['Showroom', 'Dublin 22, try before you buy'], ['Workshop', 'In-house luthiers, harp servicing'], ['Shipping', 'Ireland 48h · UK 3 to 4 days · EU 5 to 6 · Worldwide 5 to 9'], ['Speciality', 'Harps, bodhráns, banjos, flutes, early music']].map(([l, v]) => (
              <div className="list-row small" key={l}><span className="muted" style={{ width: 100 }}>{l}</span>{v}</div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}

function Teams() {
  const depts = Array.from(new Set(staff.map(s => s.dept)))
  return (
    <div className="grid g4">
      {depts.map(d => (
        <Card key={d} title={d} sub={staff.filter(s => s.dept === d).length + ' people'}>
          {staff.filter(s => s.dept === d).map(p => (
            <div className="list-row" key={p.name}><Avatar sm name={p.name} /><div><div className="small b">{p.name}</div><div className="tiny muted">{p.role}</div></div></div>
          ))}
        </Card>
      ))}
    </div>
  )
}

function Permissions() {
  const areas = ['Orders', 'Fulfilment', 'Inventory', 'Support', 'Trade', 'Finance', 'Marketing', 'Settings']
  const can = (acc: string, a: string) => acc === 'Owner' || (acc === 'Manager' && a !== 'Settings' && a !== 'Finance') || (acc === 'Finance' && ['Finance', 'Orders', 'Trade'].includes(a)) || (acc === 'Staff' && ['Orders', 'Support', 'Marketing'].includes(a))
  return (
    <Card title="Permissions" sub="Who can see and act on what">
      <Table rows={staff} cols={[
        { h: 'Person', r: p => <b>{p.name}</b> }, { h: 'Access', r: p => <Badge tone={p.access === 'Owner' ? 'dark' : 'gold'}>{p.access}</Badge> },
        ...areas.map(a => ({ h: a, r: (p: typeof staff[0]) => can(p.access, a) ? <Badge tone="green">Edit</Badge> : <Badge>View</Badge> })),
      ]} />
    </Card>
  )
}

function Systems() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Connected systems" value={integrations.length} />
        <Kpi label="Healthy" value={integrations.filter(i => i.status !== 'Warning').length} tone="up" />
        <Kpi label="Warnings" value={integrations.filter(i => i.status === 'Warning').length} tone="down" />
        <Kpi label="Records synced today" value="1,284" />
      </div>
      <div className="grid g21">
        <Card title="Systems and integrations" sub="Pulse sits above the tools Muzikkon already uses">
          <Table rows={integrations} cols={[
            { h: 'System', r: i => <b>{i.name}</b> }, { h: 'What it does', r: i => <span className="small">{i.what}</span> },
            { h: 'Status', r: i => <Status s={i.status} /> }, { h: 'Last sync', r: i => i.last }, { h: 'Today', r: i => i.today },
          ]} />
        </Card>
        <div className="stack">
          <Card title="Muzikkon ERP" className="gold" right={<Badge tone="amber">Upgrade planned</Badge>}>
            <div className="small">Custom-built. Invoicing, stock, order management and trade customers. Connected via its API.</div>
            <div className="mt">{['Customers ↔ Records', 'Stock ↔ Inventory', 'Orders ↔ Orders', 'Invoices ↔ Finance', 'Trade accounts ↔ Trade & Education'].map(x => <div className="list-row small" key={x}>{x}<span style={{ marginLeft: 'auto' }}><Badge tone="green">Mapped</Badge></span></div>)}</div>
          </Card>
          <AI>When the ERP is upgraded, Pulse keeps the same data model, so the team's screens and agents don't change.</AI>
        </div>
      </div>
    </div>
  )
}

function Governance() {
  return (
    <div className="grid g2">
      <Card title="Data and audit">
        {[['Audit log', 'Every agent and staff action recorded'], ['Data residency', 'EU (Ireland)'], ['GDPR', 'Customer data export and delete on request'], ['Retention', 'Orders and invoices 7 years'], ['Backups', 'Hourly, 30 days']].map(([l, v]) => <div className="list-row small" key={l}><span className="muted" style={{ width: 120 }}>{l}</span>{v}</div>)}
      </Card>
      <Card title="Approval limits">
        {[['Purchase orders', 'Any value · Directors'], ['Refunds', 'Over €100 · Aoife or Directors'], ['Credit holds', 'Salahuddin'], ['Ad budget changes', 'Over €250 · Umer'], ['Support replies', 'Orders over €500 need approval']].map(([l, v]) => <div className="list-row small" key={l}><span className="muted" style={{ width: 140 }}>{l}</span>{v}</div>)}
      </Card>
    </div>
  )
}

function AIControls() {
  const ctrls = [
    ['Support Agent auto-sends order status replies', false], ['Support Agent answers web chat product and shipping questions', true], ['Support Agent handles refunds', false], ['Order Sync Agent syncs clean orders automatically', false],
    ['Finance Agent sends reminders 1 and 2', true], ['Finance Agent places credit holds', false], ['Inventory Agent sends POs to suppliers', false],
    ['Dispatch Agent books couriers under €120', true], ['Pause ads when stock under 3', true],
  ] as const
  return (
    <div className="grid g21">
      <Card title="AI controls" sub="What agents can do on their own">
        {ctrls.map(([l, on]) => <div className="list-row small" key={l}><span style={{ flex: 1 }}>{l}</span><div className={'toggle' + (on ? '' : ' off')} /></div>)}
      </Card>
      <Card title="Agents">
        {agents.map(a => <div className="list-row small" key={a.key}><b style={{ flex: 1 }}>{a.name}</b><Status s={a.status} /></div>)}
      </Card>
    </div>
  )
}

function Experience() {
  return (
    <div className="grid g2">
      <Card title="Experience">
        {[['Theme', 'Pulse Glass · Muzikkon gold'], ['Home greeting', 'By time of day'], ['Morning brief', '09:00 to Umer and Salahuddin'], ['Evening wrap', '18:00'], ['Language', 'English (Ireland)'], ['Currency format', '€1,234.56']].map(([l, v]) => <div className="list-row small" key={l}><span className="muted" style={{ width: 130 }}>{l}</span>{v}</div>)}
      </Card>
      <Card title="Notifications">
        {[['Delivery promise at risk', true], ['Stock-out forecast', true], ['SLA breach', true], ['Invoice 30+ days overdue', true], ['Every new order', false]].map(([l, on]) => <div className="list-row small" key={l as string}><span style={{ flex: 1 }}>{l}</span><div className={'toggle' + (on ? '' : ' off')} /></div>)}
      </Card>
    </div>
  )
}

export const settingsTabs: Tab[] = [
  { key: 'organisation', label: 'Organisation', el: <Organisation /> },
  { key: 'teams', label: 'Teams', el: <Teams /> },
  { key: 'permissions', label: 'Permissions', el: <Permissions /> },
  { key: 'systems', label: 'Systems & Integrations', el: <Systems /> },
  { key: 'governance', label: 'Governance', el: <Governance /> },
  { key: 'ai', label: 'AI Controls', el: <AIControls /> },
  { key: 'experience', label: 'Experience', el: <Experience /> },
]
