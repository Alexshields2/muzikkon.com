import React, { useState } from 'react'
import { Card, Kpi, Table, Status, Badge, eur, AI, Avatar } from '../components/ui'
import { products, suppliers, staff, tradeAccounts, recentOrders, stories as s, numbers as n } from '../data/muzikkon'
import type { Tab } from '../App'

const entities = [
  { k: 'Customers', c: n.retailCustomers, x: 160, y: 70 }, { k: 'Trade Accounts', c: n.tradeAccounts, x: 160, y: 250 },
  { k: 'Orders', c: 2861, x: 380, y: 160 }, { k: 'Products', c: n.skus, x: 600, y: 70 }, { k: 'Suppliers', c: suppliers.length, x: 800, y: 70 },
  { k: 'Purchase Orders', c: 6, x: 800, y: 250 }, { k: 'Shipments', c: 2744, x: 600, y: 300 }, { k: 'Tickets', c: 1904, x: 380, y: 340 },
  { k: 'Invoices', c: 418, x: 160, y: 400 }, { k: 'Workshop Jobs', c: 212, x: 600, y: 420 }, { k: 'Staff', c: staff.length, x: 820, y: 420 },
]
const links: [string, string, string][] = [
  ['Customers', 'Orders', 'places'], ['Trade Accounts', 'Orders', 'places'], ['Orders', 'Products', 'contains'], ['Products', 'Suppliers', 'supplied by'],
  ['Suppliers', 'Purchase Orders', 'receives'], ['Orders', 'Shipments', 'ships as'], ['Orders', 'Tickets', 'raises'], ['Trade Accounts', 'Invoices', 'billed'],
  ['Customers', 'Workshop Jobs', 'books'], ['Workshop Jobs', 'Staff', 'assigned'], ['Tickets', 'Staff', 'owned by'], ['Purchase Orders', 'Products', 'restocks'],
]

function Ontology() {
  const pos = Object.fromEntries(entities.map(e => [e.k, e]))
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Entities" value={entities.length} />
        <Kpi label="Records" value="21,050" />
        <Kpi label="Relationships" value="64,300" />
        <Kpi label="Source systems" value="6" delta="Shopify, ERP, eBay, couriers, inbox, ads" />
        <Kpi label="Last updated" value="1 min ago" />
      </div>
      <Card title="Muzikkon ontology" sub="How every record connects">
        <svg viewBox="0 0 960 470" width="100%" style={{ display: 'block' }}>
          {links.map(([a, b, l]) => {
            const A = pos[a], B = pos[b]
            return (
              <g key={a + b}>
                <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="rgba(184,153,90,.55)" strokeWidth="1.5" />
                <text x={(A.x + B.x) / 2} y={(A.y + B.y) / 2 - 4} fontSize="10" fill="#8a8a92" textAnchor="middle">{l}</text>
              </g>
            )
          })}
          {entities.map(e => (
            <g key={e.k}>
              <rect x={e.x - 70} y={e.y - 22} width="140" height="44" rx="12" fill={e.k === 'Orders' ? '#1c1c1e' : 'rgba(255,255,255,.9)'} stroke={e.k === 'Orders' ? '#d4b677' : 'rgba(0,0,0,.08)'} />
              <text x={e.x} y={e.y - 2} textAnchor="middle" fontSize="12" fontWeight="600" fill={e.k === 'Orders' ? '#fff' : '#1c1c1e'}>{e.k}</text>
              <text x={e.x} y={e.y + 13} textAnchor="middle" fontSize="10" fill={e.k === 'Orders' ? '#d4b677' : '#8a8a92'}>{e.c.toLocaleString()} records</text>
            </g>
          ))}
        </svg>
      </Card>
    </div>
  )
}

function Customers() {
  const [sel, setSel] = useState<'hale' | 'ballymore'>('hale')
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Retail customers" value={n.retailCustomers.toLocaleString()} />
        <Kpi label="Trade accounts" value={n.tradeAccounts} />
        <Kpi label="Countries" value={n.countries} />
        <Kpi label="Repeat rate" value="27%" />
      </div>
      <div className="grid g12">
        <Card title="Customer records">
          {[['hale', 'Jonathan Hale', 'Retail · Boston, US'], ['ballymore', 'Ballymore School of Music', 'Trade · Westmeath']].map(([k, nm, d]) => (
            <div key={k} className={'email' + (sel === k ? ' sel' : '')} onClick={() => setSel(k as any)}><div className="row"><Avatar sm name={nm} /><b className="small">{nm}</b></div><div className="tiny muted">{d}</div></div>
          ))}
          {recentOrders.filter(o => o.ch !== 'Trade').slice(0, 6).map(o => (
            <div key={o.id} className="email"><div className="row"><Avatar sm name={o.customer.replace('Walk-in: ', '')} /><b className="small">{o.customer}</b></div><div className="tiny muted">{o.ch} · {o.country}</div></div>
          ))}
        </Card>
        {sel === 'hale' ? (
          <Card title="Jonathan Hale" sub="Retail customer · Boston, MA · first order" right={<Badge tone="red">At risk</Badge>}>
            <div className="grid g4" style={{ marginBottom: 12 }}>
              <div><div className="tiny muted">Lifetime value</div><b>{eur(s.lute.value, 2)}</b></div>
              <div><div className="tiny muted">Orders</div><b>1</b></div>
              <div><div className="tiny muted">Open ticket</div><b>{s.lute.ticket}</b></div>
              <div><div className="tiny muted">Review</div><b>2 ★</b></div>
            </div>
            <AI>Order {s.lute.order}, {s.lute.item}, held at US customs for {s.lute.days} days. {s.lute.emails} emails, no reply until today. Reply drafted, invoice regenerated. Offer spare strings as goodwill.</AI>
            <div className="mt">
              {[['28 Oct', 'Ordered Renaissance Lute 8 Course Deluxe, €1,199.99'], ['29 Oct', 'Shipped DHL Express'], ['31 Oct', 'Held by US customs'], ['1, 3, 5 Nov', '3 emails asking for update'], ['5 Nov', '2 star Trustpilot review'], ['6 Nov', 'Reply drafted, awaiting Aoife']].map(([d, t]) => <div className="list-row small" key={d}><span className="muted" style={{ width: 70 }}>{d}</span>{t}</div>)}
            </div>
          </Card>
        ) : (
          <Card title="Ballymore School of Music" sub="Music school · Westmeath · owner Niamh Kelly" right={<Badge tone="red">Credit hold</Badge>}>
            <div className="grid g4" style={{ marginBottom: 12 }}>
              <div><div className="tiny muted">YTD</div><b>€14,880</b></div>
              <div><div className="tiny muted">Balance</div><b>€5,100</b></div>
              <div><div className="tiny muted">Overdue</div><b style={{ color: '#c4483e' }}>{eur(s.ballymore.amount)}</b></div>
              <div><div className="tiny muted">Days</div><b>{s.ballymore.days}</b></div>
            </div>
            <AI>{s.ballymore.inv} for {eur(s.ballymore.amount)} is {s.ballymore.days} days overdue. New order TR-3318 ({eur(s.ballymore.newOrder)}) placed 5 Nov. Also has Mini Kinnor harp WS-127 in the workshop and an open ticket asking for invoice copies.</AI>
            <div className="mt">
              {[['27 Aug', 'INV-2026-0412: 22 Tunable Bodhráns + 15 Tin Whistle sets'], ['3 Oct', 'Reminder 1'], ['20 Oct', 'Reminder 2'], ['5 Nov', 'TR-3318 placed, €1,240'], ['6 Nov', 'TCK-2319 invoice copies requested'], ['9 Nov', 'Call booked with Niamh']].map(([d, t]) => <div className="list-row small" key={d}><span className="muted" style={{ width: 70 }}>{d}</span>{t}</div>)}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

function ProductsRec() {
  return (
    <div className="stack">
      <div className="grid g4"><Kpi hl label="SKUs" value={n.skus} /><Kpi label="Categories" value="7" /><Kpi label="Suppliers" value={suppliers.length} /><Kpi label="Avg price" value="€214" /></div>
      <Card title="Product records">
        <Table rows={products} cols={[
          { h: 'SKU', r: p => <span className="small b">{p.sku}</span> }, { h: 'Name', r: p => p.name }, { h: 'Category', r: p => p.cat },
          { h: 'Price', r: p => eur(p.price, 2), right: true }, { h: 'Supplier', r: p => p.supplier }, { h: 'Lead time', r: p => p.lead + ' days' },
        ]} />
      </Card>
    </div>
  )
}

function Companies() {
  return (
    <div className="stack">
      <div className="grid g3"><Kpi hl label="Trade accounts" value={n.tradeAccounts} /><Kpi label="Suppliers" value={suppliers.length} /><Kpi label="Couriers" value="3" /></div>
      <div className="grid g2">
        <Card title="Trade accounts"><Table rows={tradeAccounts.slice(0, 8)} cols={[{ h: 'Name', r: a => <b>{a.name}</b> }, { h: 'Type', r: a => a.type }, { h: 'Status', r: a => <Status s={a.status} /> }]} /></Card>
        <Card title="Suppliers"><Table rows={suppliers} cols={[{ h: 'Name', r: x => <b>{x.name}</b> }, { h: 'Country', r: x => x.country }, { h: 'Contact', r: x => x.contact }]} /></Card>
      </div>
    </div>
  )
}

function Staff() {
  return (
    <div className="stack">
      <div className="grid g4"><Kpi hl label="Team" value={staff.length} /><Kpi label="Departments" value="8" /><Kpi label="Location" value="Dublin 22" /><Kpi label="Pulse users" value={staff.length} /></div>
      <Card title="Staff">
        <Table rows={staff} cols={[
          { h: 'Name', r: p => <span className="row"><Avatar sm name={p.name} /><b>{p.name}</b></span> }, { h: 'Role', r: p => p.role },
          { h: 'Department', r: p => p.dept }, { h: 'Email', r: p => p.email }, { h: 'Access', r: p => <Badge tone={p.access === 'Owner' ? 'dark' : 'gold'}>{p.access}</Badge> },
        ]} />
      </Card>
    </div>
  )
}

export const recordsTabs: Tab[] = [
  { key: 'ontology', label: 'Ontology', el: <Ontology /> },
  { key: 'customers', label: 'Customers', el: <Customers /> },
  { key: 'products', label: 'Products', el: <ProductsRec /> },
  { key: 'companies', label: 'Companies', el: <Companies /> },
  { key: 'staff', label: 'Staff', el: <Staff /> },
]
