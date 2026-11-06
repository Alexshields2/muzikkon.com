import React from 'react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import {
  Home as HomeIc, Bot, LayoutDashboard, ShoppingBag, Truck, Boxes, LifeBuoy, GraduationCap, Wrench,
  Landmark, Megaphone, ListChecks, Database, Activity as ActIc, Settings as SetIc, Search, Bell, Sparkles,
} from 'lucide-react'
import { openTickets, syncQueue, tasks, workshopJobs, stories } from './data/muzikkon'
import Home from './pages/Home'
import { Agents } from './pages/Agents'
import { dashboardTabs } from './pages/Dashboard'
import { ordersTabs } from './pages/Orders'
import { fulfilmentTabs } from './pages/Fulfilment'
import { inventoryTabs } from './pages/Inventory'
import { supportTabs } from './pages/Support'
import { tradeTabs } from './pages/Trade'
import { workshopTabs } from './pages/Workshop'
import { financeTabs } from './pages/Finance'
import { marketingTabs } from './pages/Marketing'
import { workTabs } from './pages/Work'
import { recordsTabs } from './pages/Records'
import { ActivityPage } from './pages/ActivityPage'
import { settingsTabs } from './pages/Settings'

export type Tab = { key: string; label: string; el: React.ReactNode }
type Mod = { key: string; label: string; icon: any; group: string; tabs?: Tab[]; el?: React.ReactNode; badge?: number | string; red?: boolean; crumb: string }

const openWork = tasks.filter(t => t.status !== 'Done').length
const mods: Mod[] = [
  { key: 'home', label: 'Home', icon: HomeIc, group: 'Overview', el: <Home />, crumb: 'Today across Muzikkon' },
  { key: 'agents', label: 'Agents', icon: Bot, group: 'Overview', el: <Agents />, crumb: '7 agents working across the business' },
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Overview', tabs: dashboardTabs, crumb: 'Management dashboards' },
  { key: 'orders', label: 'Orders', icon: ShoppingBag, group: 'Operations', tabs: ordersTabs, badge: syncQueue.length, red: true, crumb: 'Shopify, eBay, showroom and trade in one feed' },
  { key: 'fulfilment', label: 'Fulfilment', icon: Truck, group: 'Operations', tabs: fulfilmentTabs, badge: 14, crumb: 'Pick, pack, dispatch and track' },
  { key: 'inventory', label: 'Inventory', icon: Boxes, group: 'Operations', tabs: inventoryTabs, badge: '!', red: true, crumb: '612 SKUs across ERP, Shopify and eBay' },
  { key: 'workshop', label: 'Workshop', icon: Wrench, group: 'Operations', tabs: workshopTabs, badge: workshopJobs.length, crumb: 'Luthier servicing, repairs and trade-ins' },
  { key: 'support', label: 'Support', icon: LifeBuoy, group: 'Customers', tabs: supportTabs, badge: openTickets.length, red: true, crumb: 'AI support, tickets and customer tracking' },
  { key: 'trade', label: 'Trade & Education', icon: GraduationCap, group: 'Customers', tabs: tradeTabs, crumb: '41 music shops and 23 schools' },
  { key: 'finance', label: 'Finance', icon: Landmark, group: 'Business', tabs: financeTabs, crumb: 'Cash, debtors, payouts and VAT' },
  { key: 'marketing', label: 'Marketing', icon: Megaphone, group: 'Business', tabs: marketingTabs, crumb: 'Ads, SEO and the Christmas plan' },
  { key: 'work', label: 'Work', icon: ListChecks, group: 'System', tabs: workTabs, badge: openWork, crumb: 'Tasks, approvals and workflows' },
  { key: 'records', label: 'Records', icon: Database, group: 'System', tabs: recordsTabs, crumb: "Muzikkon's operating memory" },
  { key: 'activity', label: 'Activity', icon: ActIc, group: 'System', el: <ActivityPage />, crumb: 'Everything happening across the company' },
  { key: 'settings', label: 'Settings', icon: SetIc, group: 'System', tabs: settingsTabs, crumb: 'Organisation, systems and AI controls' },
]

function Sidebar() {
  const groups = Array.from(new Set(mods.map(m => m.group)))
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">M</div>
        <div><div className="brand-name">Muzikkon</div><div className="brand-sub">Musical Instruments</div></div>
      </div>
      {groups.map(g => (
        <div key={g}>
          <div className="nav-group">{g}</div>
          {mods.filter(m => m.group === g).map(m => (
            <NavLink key={m.key} to={'/' + m.key} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
              <m.icon size={16} />{m.label}
              {m.badge !== undefined && <span className={'nav-badge' + (m.red ? ' red' : '')}>{m.badge}</span>}
            </NavLink>
          ))}
        </div>
      ))}
      <div className="sidebar-foot">
        <div className="avatar">UF</div>
        <div className="small"><div className="b">Umer Farooq</div><div style={{ opacity: .55 }}>Director, Operations</div></div>
      </div>
    </aside>
  )
}

function ModulePage({ m }: { m: Mod }) {
  const loc = useLocation()
  const sub = loc.pathname.split('/')[2]
  const tab = m.tabs ? (m.tabs.find(t => t.key === sub) || m.tabs[0]) : undefined
  return (
    <>
      <div className="topbar">
        <div>
          <h1>{m.label}</h1>
          <div className="crumb">{m.crumb}</div>
        </div>
        <div className="search"><Search size={15} /> Search orders, customers, SKUs…<span className="badge" style={{ marginLeft: 'auto' }}>⌘K</span></div>
        <button className="icon-btn" title="Ask Pulse"><Sparkles size={16} color="#b8995a" /></button>
        <button className="icon-btn" title="Alerts"><Bell size={16} /><span className="dot" /></button>
      </div>
      {m.tabs && (
        <div className="tabs">
          {m.tabs.map(t => (
            <NavLink key={t.key} to={`/${m.key}/${t.key}`} className={() => 'tab' + (tab && tab.key === t.key ? ' active' : '')}>{t.label}</NavLink>
          ))}
        </div>
      )}
      {tab ? <React.Fragment key={tab.key}>{tab.el}</React.Fragment> : m.el}
    </>
  )
}

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          {mods.map(m => <Route key={m.key} path={`/${m.key}/*`} element={<ModulePage m={m} />} />)}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export { stories }
