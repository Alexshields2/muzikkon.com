import React from 'react'
import { AlertTriangle, CheckCircle2, Info, Sparkles, TrendingUp } from 'lucide-react'

export const eur = (n: number, dp = 0) =>
  '€' + n.toLocaleString('en-IE', { minimumFractionDigits: dp, maximumFractionDigits: dp })

export function Card({ title, sub, right, children, className = '', style }: {
  title?: React.ReactNode; sub?: React.ReactNode; right?: React.ReactNode; children?: React.ReactNode; className?: string; style?: React.CSSProperties
}) {
  return (
    <div className={'card ' + className} style={style}>
      {(title || right) && (
        <div className="card-h">
          <div>
            <h3>{title}</h3>
            {sub && <div className="sub">{sub}</div>}
          </div>
          {right && <div className="right">{right}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export function Kpi({ label, value, delta, tone, hl, icon }: {
  label: string; value: React.ReactNode; delta?: React.ReactNode; tone?: 'up' | 'down' | 'muted'; hl?: boolean; icon?: React.ReactNode
}) {
  return (
    <div className={'card kpi' + (hl ? ' hl' : '')}>
      <div className="label">{icon}{label}</div>
      <div className="value">{value}</div>
      {delta && <div className={'delta ' + (tone || 'muted')}>{delta}</div>}
    </div>
  )
}

export type Tone = 'green' | 'red' | 'amber' | 'blue' | 'gold' | 'dark' | ''
export const Badge = ({ tone = '', children }: { tone?: Tone; children: React.ReactNode }) => (
  <span className={'badge ' + tone}>{children}</span>
)

export const statusTone = (s: string): Tone => {
  const k = s.toLowerCase()
  if (/(overdue|exception|late|urgent|breach|held|stock-out|critical|failed|unmatched|oversell|damaged|declined)/.test(k)) return 'red'
  if (/(pending|waiting|at risk|due|review|low|in repair|draft|awaiting|high|open|assessed|processing|reorder|warning)/.test(k)) return 'amber'
  if (/(synced|paid|delivered|sent|done|complete|resolved|healthy|connected|ready|active|approved|in stock|ok|collected|passed|on track|live|matched)/.test(k)) return 'green'
  if (/(shipped|in transit|transit|new|medium|picking|packed|received|scheduled)/.test(k)) return 'blue'
  return ''
}
export const Status = ({ s }: { s: string }) => <Badge tone={statusTone(s)}>{s}</Badge>

export function Table<T>({ cols, rows, hl }: {
  cols: { h: string; r: (row: T) => React.ReactNode; right?: boolean }[]; rows: T[]; hl?: (row: T) => boolean
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{cols.map(c => <th key={c.h} className={c.right ? 'right-t' : ''}>{c.h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={hl && hl(row) ? 'hl' : ''}>
              {cols.map(c => <td key={c.h} className={c.right ? 'right-t' : ''}>{c.r(row)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Alert({ tone = 'gold', title, children, icon }: { tone?: string; title: React.ReactNode; children?: React.ReactNode; icon?: React.ReactNode }) {
  const ic = icon || (tone === 'red' ? <AlertTriangle size={15} /> : tone === 'green' ? <CheckCircle2 size={15} /> : tone === 'gold' ? <Sparkles size={15} /> : tone === 'blue' ? <Info size={15} /> : <TrendingUp size={15} />)
  return (
    <div className={'alert ' + tone}>
      <div className="ic">{ic}</div>
      <div><div className="t">{title}</div>{children && <div className="d">{children}</div>}</div>
    </div>
  )
}

export const Progress = ({ v, tone = '' }: { v: number; tone?: string }) => (
  <div className={'progress ' + tone}><div style={{ width: Math.min(100, v) + '%' }} /></div>
)

export const AI = ({ title = 'Pulse AI', children }: { title?: string; children: React.ReactNode }) => (
  <div className="ai-box"><div className="ai-tag"><Sparkles size={13} />{title}</div><div>{children}</div></div>
)

export const initials = (n: string) => n.split(' ').map(p => p[0]).slice(0, 2).join('')
export const Avatar = ({ name, sm, agent }: { name: string; sm?: boolean; agent?: boolean }) => (
  <div className={'avatar' + (sm ? ' sm' : '') + (agent ? ' agent' : '')} title={name}>{initials(name)}</div>
)

/* ---------- Charts (pure SVG) ---------- */
const GOLD = '#b8995a', BRASS = '#d4b677', INK = '#1c1c1e', GREY = '#c9c4b8'
export const palette = [GOLD, INK, '#8c7a55', BRASS, '#6b7a99', GREY]

export function Bars({ data, labels, series, h = 190, colors = palette, stacked = false, fmt = (v: number) => String(v) }: {
  data: number[][]; labels: string[]; series?: string[]; h?: number; colors?: string[]; stacked?: boolean; fmt?: (v: number) => string
}) {
  const W = 600, H = h, pad = { l: 36, r: 6, t: 10, b: 24 }
  const max = Math.max(...labels.map((_, i) => stacked ? data.reduce((s, d) => s + d[i], 0) : Math.max(...data.map(d => d[i])))) * 1.12
  const cw = (W - pad.l - pad.r) / labels.length
  const ih = H - pad.t - pad.b
  const groups = stacked ? 1 : data.length
  const bw = Math.min(26, (cw * 0.7) / groups)
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" style={{ display: 'block' }}>
        {[0, .25, .5, .75, 1].map(t => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={pad.t + ih * (1 - t)} y2={pad.t + ih * (1 - t)} stroke="rgba(0,0,0,.06)" />
            <text x={pad.l - 6} y={pad.t + ih * (1 - t) + 3} fontSize="9" textAnchor="end" fill="#8a8a92">{fmt(Math.round(max * t))}</text>
          </g>
        ))}
        {labels.map((l, i) => {
          const x0 = pad.l + cw * i + (cw - bw * groups) / 2
          let acc = 0
          return (
            <g key={l + i}>
              {data.map((d, si) => {
                const bh = (d[i] / max) * ih
                const x = stacked ? x0 : x0 + si * bw
                const y = stacked ? pad.t + ih - acc - bh : pad.t + ih - bh
                acc += stacked ? bh : 0
                return <rect key={si} x={x} y={y} width={bw - (stacked ? 0 : 2)} height={Math.max(0, bh)} rx={stacked ? 2 : 4} fill={colors[si % colors.length]} />
              })}
              <text x={pad.l + cw * i + cw / 2} y={H - 8} fontSize="9.5" textAnchor="middle" fill="#8a8a92">{l}</text>
            </g>
          )
        })}
      </svg>
      {series && <div className="legend" style={{ marginTop: 6 }}>{series.map((s, i) => <span key={s} style={{ ['--c' as any]: colors[i % colors.length] }}>{s}</span>)}</div>}
    </div>
  )
}

export function Line({ data, labels, series, h = 190, colors = [GOLD, INK, GREY], fmt = (v: number) => String(v), area = true }: {
  data: number[][]; labels: string[]; series?: string[]; h?: number; colors?: string[]; fmt?: (v: number) => string; area?: boolean
}) {
  const W = 600, H = h, pad = { l: 40, r: 8, t: 10, b: 24 }
  const max = Math.max(...data.flat()) * 1.12
  const ih = H - pad.t - pad.b, iw = W - pad.l - pad.r
  const xs = (i: number) => pad.l + (iw * i) / (labels.length - 1)
  const ys = (v: number) => pad.t + ih - (v / max) * ih
  const every = Math.ceil(labels.length / 10)
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          {colors.map((c, i) => (
            <linearGradient key={i} id={'lg' + i + c.slice(1)} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={c} stopOpacity=".28" /><stop offset="1" stopColor={c} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {[0, .25, .5, .75, 1].map(t => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={pad.t + ih * (1 - t)} y2={pad.t + ih * (1 - t)} stroke="rgba(0,0,0,.06)" />
            <text x={pad.l - 6} y={pad.t + ih * (1 - t) + 3} fontSize="9" textAnchor="end" fill="#8a8a92">{fmt(Math.round(max * t))}</text>
          </g>
        ))}
        {data.map((d, si) => {
          const p = d.map((v, i) => `${xs(i)},${ys(v)}`).join(' ')
          return (
            <g key={si}>
              {area && si === 0 && <polygon points={`${xs(0)},${pad.t + ih} ${p} ${xs(d.length - 1)},${pad.t + ih}`} fill={`url(#lg${si}${colors[si].slice(1)})`} />}
              <polyline points={p} fill="none" stroke={colors[si]} strokeWidth={si === 0 ? 2.4 : 1.8} strokeDasharray={si === 2 ? '4 4' : undefined} />
            </g>
          )
        })}
        {labels.map((l, i) => i % every === 0 && <text key={i} x={xs(i)} y={H - 8} fontSize="9.5" textAnchor="middle" fill="#8a8a92">{l}</text>)}
      </svg>
      {series && <div className="legend" style={{ marginTop: 6 }}>{series.map((s, i) => <span key={s} style={{ ['--c' as any]: colors[i] }}>{s}</span>)}</div>}
    </div>
  )
}

export function Donut({ items, size = 150, center, sub }: { items: { l: string; v: number; c?: string }[]; size?: number; center?: string; sub?: string }) {
  const total = items.reduce((s, i) => s + i.v, 0)
  const r = 54, C = 2 * Math.PI * r
  let off = 0
  return (
    <div className="row" style={{ gap: 18, alignItems: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(0,0,0,.06)" strokeWidth="16" />
        {items.map((it, i) => {
          const len = (it.v / total) * C
          const el = <circle key={i} cx="70" cy="70" r={r} fill="none" stroke={it.c || palette[i % palette.length]} strokeWidth="16"
            strokeDasharray={`${len - 2} ${C - len + 2}`} strokeDashoffset={-off} transform="rotate(-90 70 70)" />
          off += len
          return el
        })}
        {center && <text x="70" y="70" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>{center}</text>}
        {sub && <text x="70" y="86" textAnchor="middle" fontSize="9.5" fill="#8a8a92">{sub}</text>}
      </svg>
      <div style={{ flex: 1 }}>
        {items.map((it, i) => (
          <div key={it.l} className="between small" style={{ padding: '4px 0' }}>
            <span className="row"><span style={{ width: 9, height: 9, borderRadius: 3, background: it.c || palette[i % palette.length] }} />{it.l}</span>
            <span className="b">{Math.round((it.v / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HBars({ items, fmt = (v: number) => String(v), tone }: { items: { l: string; v: number; note?: string }[]; fmt?: (v: number) => string; tone?: string }) {
  const max = Math.max(...items.map(i => i.v))
  return (
    <div>
      {items.map(it => (
        <div key={it.l} style={{ padding: '6px 0' }}>
          <div className="between small" style={{ marginBottom: 4 }}><span>{it.l}</span><span className="b">{fmt(it.v)}{it.note && <span className="muted"> · {it.note}</span>}</span></div>
          <Progress v={(it.v / max) * 100} tone={tone} />
        </div>
      ))}
    </div>
  )
}

export function Spark({ d, color = GOLD, w = 90, h = 28 }: { d: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...d), min = Math.min(...d)
  const p = d.map((v, i) => `${(i / (d.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`).join(' ')
  return <svg width={w} height={h}><polyline points={p} fill="none" stroke={color} strokeWidth="1.8" /></svg>
}

export function Kanban<T>({ cols, render }: { cols: { h: string; items: T[]; tone?: Tone }[]; render: (t: T) => React.ReactNode }) {
  return (
    <div className="kanban" style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
      {cols.map(c => (
        <div className="kcol" key={c.h}>
          <div className="kcol-h"><span>{c.h}</span><Badge tone={c.tone}>{c.items.length}</Badge></div>
          {c.items.map((it, i) => <React.Fragment key={i}>{render(it)}</React.Fragment>)}
        </div>
      ))}
    </div>
  )
}
