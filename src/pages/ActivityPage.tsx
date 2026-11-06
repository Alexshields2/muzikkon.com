import React, { useState } from 'react'
import { Card, Kpi, Bars, HBars } from '../components/ui'
import { activity } from '../data/muzikkon'

const kinds = [['all', 'Everything'], ['agent', 'Agents'], ['staff', 'Staff'], ['sys', 'Systems'], ['alert', 'Problems']] as const

export function ActivityPage() {
  const [k, setK] = useState<string>('all')
  const rows = activity.filter(a => k === 'all' || a.kind === k)
  const count = (x: string) => activity.filter(a => a.kind === x).length
  return (
    <div className="stack">
      <div className="grid g5">
        <Kpi hl label="Events today" value={activity.length} />
        <Kpi label="Agent actions" value={count('agent')} />
        <Kpi label="Staff actions" value={count('staff')} />
        <Kpi label="System events" value={count('sys')} />
        <Kpi label="Problems detected" value={count('alert')} tone="down" />
      </div>
      <div className="grid g21">
        <Card title="Company activity" sub="Friday 6 November" right={
          <div className="row">{kinds.map(([key, l]) => <button key={key} className="chip" style={k === key ? { borderColor: '#b8995a', color: '#1c1c1e', fontWeight: 600 } : {}} onClick={() => setK(key)}>{l}</button>)}</div>
        }>
          {rows.map(a => (
            <div className="feed-item" key={a.t + a.who}>
              <div className={'feed-ic ' + a.kind}>{a.who.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
              <div style={{ flex: 1 }}><div className="small"><b>{a.who}</b> {a.text}</div></div>
              <div className="tiny muted">{a.t}</div>
            </div>
          ))}
        </Card>
        <div className="stack">
          <Card title="Events by hour"><Bars data={[[1, 4, 4, 5, 6]]} labels={['08:00', '09:00', '10:00', '11:00', '12:00']} h={150} /></Card>
          <Card title="Most active sources">
            <HBars items={[{ l: 'Support Agent', v: 156 }, { l: 'Shopify', v: 117 }, { l: 'Order Sync Agent', v: 48 }, { l: 'Dispatch Agent', v: 34 }, { l: 'Muzikkon ERP', v: 31 }, { l: 'Aoife Byrne', v: 38 }]} />
          </Card>
        </div>
      </div>
    </div>
  )
}
