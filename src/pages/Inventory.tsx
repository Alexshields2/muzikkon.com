import React from 'react'
import { Card, Kpi, Table, Status, Badge, eur, AI, Bars, Donut, Alert, Progress, HBars } from '../components/ui'
import { products, suppliers, purchaseOrders, numbers as n, stories as s, categories } from '../data/muzikkon'
import type { Tab } from '../App'

const daysLeft = (p: typeof products[0]) => (p.sold30 ? Math.round(p.erp / (p.sold30 / 30)) : 99)

function Overview() {
  const low = products.filter(p => /Reorder|Stock-out|Out of/.test(p.status))
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Stock value" value={eur(n.stockValue)} delta="At cost" />
        <Kpi label="Units on hand" value={n.unitsOnHand.toLocaleString()} delta={n.skus + ' SKUs'} />
        <Kpi label="Below reorder point" value={low.length} tone="down" delta="Ahead of Christmas" />
        <Kpi label="Channel mismatches" value="3" tone="down" delta="ERP vs Shopify vs eBay" />
        <Kpi label="Open POs" value={purchaseOrders.filter(p => p.status !== 'Received').length} delta={eur(purchaseOrders.filter(p => p.status !== 'Received').reduce((a, b) => a + b.value, 0))} />
      </div>
      <div className="grid g21">
        <AI title="Inventory Agent">The <b>29 String Trinity Harp Rosewood</b> is the problem this week: <b>2 left</b>, 7 sold in 14 days (5 Shopify, 2 eBay), and Sialkot Heritage Instruments needs <b>38 days</b>. At this pace it sells out on <b>9 Nov</b> and you lose about <b>6 sales, €5,070</b>, before new stock lands. PO-2026-0218 for 12 units is drafted and waiting on Salahuddin. Shopify still shows 3, so you can oversell today.</AI>
        <Card title="Stock value by category"><Donut items={[{ l: 'Harps', v: 142 }, { l: 'Strings', v: 58 }, { l: 'Early Music', v: 37 }, { l: 'Bodhráns & Drums', v: 26 }, { l: 'Wind', v: 12 }, { l: 'Other', v: 11.4 }]} center="€286k" sub="at cost" /></Card>
      </div>
      <Card title="Needs attention" sub="Low or out of stock">
        <Table rows={low} hl={p => p.sku === s.harp.sku} cols={[
          { h: 'SKU', r: p => <span className="small b">{p.sku}</span> }, { h: 'Product', r: p => p.name }, { h: 'In ERP', r: p => p.erp, right: true },
          { h: 'Sold 30d', r: p => p.sold30, right: true }, { h: 'Days left', r: p => <Badge tone={daysLeft(p) < 7 ? 'red' : 'amber'}>{p.erp === 0 ? 'Out' : daysLeft(p) + ' days'}</Badge> },
          { h: 'Lead time', r: p => p.lead + ' days' }, { h: 'Status', r: p => <Status s={p.status} /> },
        ]} />
      </Card>
    </div>
  )
}

function Stock() {
  return (
    <div className="stack">
      <div className="grid g4">
        {[['Harps', ['Harps']], ['Bodhráns & Drums', ['Bodhráns & Drums']], ['Strings & Early Music', ['Strings', 'Early Music']], ['Wind, Percussion & Accessories', ['Wind', 'Percussion', 'Accessories']]].map(([l, cats]) => (
          <Kpi key={l as string} label={l as string} value={products.filter(p => (cats as string[]).includes(p.cat)).reduce((a, p) => a + p.erp, 0)} delta="units in core lines" />
        ))}
      </div>
      <Card title="Stock list" sub={`Core lines · ${n.skus} SKUs in ERP`}>
        <Table rows={products} hl={p => p.sku === s.harp.sku} cols={[
          { h: 'SKU', r: p => <span className="small b">{p.sku}</span> }, { h: 'Product', r: p => p.name }, { h: 'Category', r: p => p.cat },
          { h: 'Price', r: p => eur(p.price, 2), right: true }, { h: 'On hand', r: p => p.erp, right: true }, { h: 'Sold 30d', r: p => p.sold30, right: true },
          { h: 'Cover', r: p => <div style={{ width: 80 }}><Progress v={Math.min(100, daysLeft(p) * 2)} tone={daysLeft(p) < 14 ? 'red' : daysLeft(p) < 30 ? 'amber' : 'green'} /></div> },
          { h: 'Supplier', r: p => <span className="small">{p.supplier}</span> }, { h: 'Status', r: p => <Status s={p.status} /> },
        ]} />
      </Card>
    </div>
  )
}

function Reorder() {
  const h = s.harp
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Trinity 29 Rosewood" value={h.stock + ' left'} delta={'Stock-out ' + h.stockout} tone="down" />
        <Kpi label="Sold last 14 days" value={h.sold14} delta="5 Shopify · 2 eBay" />
        <Kpi label="Supplier lead time" value={h.lead + ' days'} delta="Sialkot Heritage Instruments" />
        <Kpi label="Sales at risk" value={eur(h.lost)} delta={h.lostUnits + ' harps'} tone="down" />
        <Kpi label="Drafted PO" value={h.po} delta={h.poUnits + ' units · €5,760'} />
      </div>
      <div className="grid g21">
        <Card title="Trinity 29 Rosewood: stock forecast" sub="Units on hand, with and without PO-2026-0218">
          <Bars data={[[2, 1, 0, 0, 0, 0, 0, 12, 10, 8], [2, 1, 0, 0, 0, 0, 0, 0, 0, 0]]} labels={['6 Nov', '8', '9', '16', '23', '30', '7 Dec', '14', '17', '21']} series={['With PO approved today', 'Without PO']} h={210} />
        </Card>
        <Card title="Approve purchase order" className="gold">
          <div className="small"><b>PO-2026-0218</b> · Sialkot Heritage Instruments</div>
          <div className="small muted">12 x 29 String Trinity Harp, Celtic Lever, Rosewood @ €480</div>
          <div style={{ fontSize: 26, fontWeight: 700, margin: '10px 0' }}>€5,760</div>
          <div className="small">ETA 14 Dec, in time for the last Irish Christmas orders (21 Dec).</div>
          <div className="row mt"><button className="btn primary">Approve PO</button><button className="btn">Change quantity</button></div>
          <div className="tiny muted mt">Needs Salahuddin Tarif</div>
        </Card>
      </div>
      <Card title="Reorder suggestions">
        <Table rows={products.filter(p => /Reorder|Stock-out|Out of/.test(p.status))} hl={p => p.sku === h.sku} cols={[
          { h: 'Product', r: p => <b>{p.name}</b> }, { h: 'On hand', r: p => p.erp, right: true }, { h: 'Sold 30d', r: p => p.sold30, right: true },
          { h: 'Lead time', r: p => p.lead + ' days' }, { h: 'Suggested qty', r: p => Math.max(6, Math.round(p.sold30 * 1.5)), right: true },
          { h: 'Supplier', r: p => p.supplier }, { h: 'Status', r: p => <Status s={p.sku === h.sku ? 'Awaiting approval' : p.sku === 'BOD-PET-14' ? 'Draft' : 'Suggested'} /> },
        ]} />
      </Card>
    </div>
  )
}

function Suppliers() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Active suppliers" value={suppliers.length} />
        <Kpi label="Spend YTD" value={eur(suppliers.reduce((a, b) => a + b.spendYTD, 0))} />
        <Kpi label="Avg lead time" value="28 days" />
        <Kpi label="On-time delivery" value="92%" />
      </div>
      <div className="grid g21">
        <Card title="Suppliers">
          <Table rows={suppliers} cols={[
            { h: 'Supplier', r: x => <b>{x.name}</b> }, { h: 'Country', r: x => x.country }, { h: 'Supplies', r: x => <span className="small">{x.cat}</span> },
            { h: 'Lead time', r: x => x.lead + ' days' }, { h: 'On time', r: x => <Badge tone={x.onTime > 90 ? 'green' : 'amber'}>{x.onTime}%</Badge> },
            { h: 'Open POs', r: x => x.openPO, right: true }, { h: 'Spend YTD', r: x => eur(x.spendYTD), right: true }, { h: 'Contact', r: x => x.contact },
          ]} />
        </Card>
        <Card title="Spend by supplier"><HBars items={suppliers.map(x => ({ l: x.name, v: x.spendYTD }))} fmt={v => eur(v)} /></Card>
      </div>
    </div>
  )
}

function POs() {
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="Awaiting approval" value="1" delta="PO-2026-0218 €5,760" tone="down" />
        <Kpi label="Drafts" value="1" />
        <Kpi label="In transit" value="2" delta="€14,290" />
        <Kpi label="Received this month" value="1" />
      </div>
      <Card title="Purchase orders">
        <Table rows={purchaseOrders} hl={p => p.po === s.harp.po} cols={[
          { h: 'PO', r: p => <b>{p.po}</b> }, { h: 'Supplier', r: p => p.supplier }, { h: 'Items', r: p => <span className="small">{p.items}</span> },
          { h: 'Value', r: p => eur(p.value), right: true }, { h: 'ETA', r: p => p.eta }, { h: 'Status', r: p => <Status s={p.status} /> },
        ]} />
      </Card>
      <div className="grid g3">
        <Alert tone="amber" title="PO-2026-0211 arriving 28 Nov">10 Boru 22 and 8 Cèilidh 15 harps. Restock before Black Friday at risk by 1 day.</Alert>
        <Alert tone="green" title="PO-2026-0203 received 2 Nov">200 Tin Whistle D sets checked in. ERP updated.</Alert>
        <Alert tone="gold" title="Inventory Agent">Suggests bundling PO-2026-0216 bodhráns with skins order to save €60 delivery.</Alert>
      </div>
    </div>
  )
}

function ChannelSync() {
  const rows = products.slice(0, 12)
  return (
    <div className="stack">
      <div className="grid g4">
        <Kpi hl label="SKUs checked" value={n.skus} />
        <Kpi label="Mismatches" value="3" tone="down" />
        <Kpi label="Oversell risk" value="1" delta="Trinity 29 Rosewood" tone="down" />
        <Kpi label="Last sync" value="07:00" delta="Nightly, Pulse makes it live" />
      </div>
      <Card title="Stock by channel" sub="ERP is the source of truth">
        <Table rows={rows} hl={p => p.erp !== p.shopify} cols={[
          { h: 'Product', r: p => <b>{p.name}</b> }, { h: 'ERP', r: p => p.erp, right: true },
          { h: 'Shopify', r: p => <span style={p.shopify !== p.erp ? { color: '#c4483e', fontWeight: 700 } : {}}>{p.shopify}</span>, right: true },
          { h: 'eBay listed', r: p => p.ebay, right: true },
          { h: 'Status', r: p => <Status s={p.shopify > p.erp ? (p.erp <= 2 ? 'Oversell risk' : 'Mismatch') : 'Matched'} /> },
        ]} />
      </Card>
    </div>
  )
}

export const inventoryTabs: Tab[] = [
  { key: 'overview', label: 'Overview', el: <Overview /> },
  { key: 'stock', label: 'Stock', el: <Stock /> },
  { key: 'reorder', label: 'Reorder', el: <Reorder /> },
  { key: 'suppliers', label: 'Suppliers', el: <Suppliers /> },
  { key: 'pos', label: 'Purchase Orders', el: <POs /> },
  { key: 'channels', label: 'Channel Sync', el: <ChannelSync /> },
]
