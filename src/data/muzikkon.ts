// Single source of truth for the Muzikkon Pulse demo. Every page reads from here.

export const org = {
  name: 'Muzikkon',
  legal: 'Muzikkon Ltd',
  trading: 'Muzikkon Musical Instruments',
  site: 'muzikkon.com',
  address: 'Unit 10, Robinhood Business Park, Robinhood Road, Dublin 22, D22 P7E5',
  phone: '+353 1 450 7855',
  email: 'info@muzikkon.com',
  founded: 2016,
  user: 'Umer',
}

export const staff = [
  { name: 'Umer Farooq', role: 'Director, Operations', dept: 'Management', email: 'umer@muzikkon.com', access: 'Owner' },
  { name: 'Salahuddin Tarif', role: 'Director, Commercial & Finance', dept: 'Management', email: 'salahuddin@muzikkon.com', access: 'Owner' },
  { name: 'Aoife Byrne', role: 'Support Lead', dept: 'Support', email: 'aoife@muzikkon.com', access: 'Manager' },
  { name: 'Tomasz Nowak', role: 'Warehouse & Dispatch Manager', dept: 'Fulfilment', email: 'tomasz@muzikkon.com', access: 'Manager' },
  { name: 'Ciarán Doyle', role: 'Head Luthier', dept: 'Workshop', email: 'ciaran@muzikkon.com', access: 'Manager' },
  { name: 'Sana Malik', role: 'Accounts Administrator', dept: 'Finance', email: 'sana@muzikkon.com', access: 'Finance' },
  { name: 'Niamh Kelly', role: 'Trade & Education Accounts Manager', dept: 'Trade & Education', email: 'niamh@muzikkon.com', access: 'Manager' },
  { name: 'David Murphy', role: 'Content & SEO', dept: 'Marketing', email: 'david@muzikkon.com', access: 'Staff' },
  { name: 'Rory Brennan', role: 'Showroom Sales', dept: 'Showroom', email: 'rory@muzikkon.com', access: 'Staff' },
]

/* ---------------- Business in numbers ---------------- */
export const numbers = {
  employees: 9,
  skus: 612,
  unitsOnHand: 3418,
  stockValue: 286400,
  ordersMTD: 65,
  channelsMTD: { Shopify: 42, eBay: 9, Showroom: 6, 'Trade & Education': 8 },
  ordersToday: 14,
  aov: 241,
  revenueMTD: 24340,
  revenueByChannelMTD: { Shopify: 10140, eBay: 2520, Showroom: 2090, 'Trade & Education': 9590 },
  novForecast: 118500,
  octActual: 71240,
  revenue12m: 842000,
  grossMargin: 46,
  tradeAccounts: 64,
  shops: 41,
  schools: 23,
  retailCustomers: 11280,
  countries: 38,
  shipSplit: { Ireland: 52, 'UK & NI': 17, Europe: 16, 'Rest of World': 15 },
  outstanding: 21740,
  overdue: 9315,
  overdueCount: 5,
  invoiceCount: 14,
  inbox7d: 156,
  wismo7d: 64,
  trustpilot: 4.7,
  workshopJobs: 9,
  workshopOverdue: 3,
  tradeIns: 4,
  adSpend: 6710,
  onTimeDispatch: 91,
}

/* ---------------- Story threads ---------------- */
export const stories = {
  sync: { pending: 23, value: 6184, oldestHrs: 31, oldest: 'MZK-10511', hoursWeek: 6.5, auto: 21, exceptions: 2 },
  harp: { sku: 'HRP-TRN-29-RSW', name: '29 String Trinity Harp, Celtic Lever, Rosewood', price: 845, stock: 2, sold14: 7, lead: 38, stockout: '9 Nov', lostUnits: 6, lost: 5070, po: 'PO-2026-0218', poUnits: 12 },
  ballymore: { name: 'Ballymore School of Music', inv: 'INV-2026-0412', amount: 3860, days: 41, newOrder: 1240, owner: 'Niamh Kelly' },
  lute: { order: 'MZK-10482', item: 'Renaissance Lute 8 Course Deluxe', value: 1199.99, customer: 'Jonathan Hale', city: 'Boston, MA', days: 6, emails: 3, ticket: 'TCK-2291' },
  inbox: { total: 156, wismo: 64, pct: 41, drafted: 52, sent: 38, waiting: 14, before: '9h', after: '14 min' },
  ads: { metaRoas: 1.9, metaSpend: 2140, shopRoas: 5.4, shopSpend: 3380, shift: 800 },
}

/* ---------------- Products ---------------- */
export type Product = { sku: string; name: string; cat: string; price: number; erp: number; shopify: number; ebay: number; sold30: number; lead: number; supplier: string; status: string }
export const products: Product[] = [
  { sku: 'HRP-TRN-29-RSW', name: '29 String Trinity Harp, Celtic Lever, Rosewood', cat: 'Harps', price: 845, erp: 2, shopify: 3, ebay: 2, sold30: 11, lead: 38, supplier: 'Sialkot Heritage Instruments', status: 'Stock-out 9 Nov' },
  { sku: 'HRP-CEI-15-MAH', name: 'Trinity Cèilidh Harp 15 String, Mahogany', cat: 'Harps', price: 384.99, erp: 14, shopify: 14, ebay: 6, sold30: 19, lead: 38, supplier: 'Sialkot Heritage Instruments', status: 'In stock' },
  { sku: 'HRP-BOR-22-WAL', name: 'Boru Harp 22 String, Walnut', cat: 'Harps', price: 620, erp: 6, shopify: 6, ebay: 3, sold30: 8, lead: 38, supplier: 'Sialkot Heritage Instruments', status: 'Reorder' },
  { sku: 'HRP-TRN-36-WAL', name: 'Trinity Harp 36 String', cat: 'Harps', price: 1749.99, erp: 0, shopify: 0, ebay: 0, sold30: 3, lead: 45, supplier: 'Sialkot Heritage Instruments', status: 'Out of stock' },
  { sku: 'HRP-MCH-27-RB', name: 'McHugh Harp 27 String Round Back', cat: 'Harps', price: 699, erp: 5, shopify: 5, ebay: 2, sold30: 4, lead: 38, supplier: 'Sialkot Heritage Instruments', status: 'In stock' },
  { sku: 'BOD-TUN-18', name: 'Tunable Bodhrán 18"', cat: 'Bodhráns & Drums', price: 129.99, erp: 46, shopify: 46, ebay: 12, sold30: 38, lead: 21, supplier: 'Dublin Skin & Drum Supplies', status: 'In stock' },
  { sku: 'BOD-PET-14', name: 'Premium Easy Tune Bodhrán 14"', cat: 'Bodhráns & Drums', price: 219.99, erp: 7, shopify: 9, ebay: 4, sold30: 16, lead: 21, supplier: 'Dublin Skin & Drum Supplies', status: 'Reorder' },
  { sku: 'BOU-IRI-8-MAH', name: 'Traditional Irish Bouzouki 8 String, Mahogany', cat: 'Strings', price: 499.99, erp: 9, shopify: 9, ebay: 3, sold30: 7, lead: 30, supplier: 'Hallmark Woodcraft', status: 'In stock' },
  { sku: 'LUT-REN-8-DLX', name: 'Renaissance Lute 8 Course Deluxe', cat: 'Early Music', price: 1199.99, erp: 3, shopify: 3, ebay: 1, sold30: 4, lead: 45, supplier: 'Hallmark Woodcraft', status: 'In stock' },
  { sku: 'LUT-REN-6', name: 'Renaissance Lute 6 Course', cat: 'Early Music', price: 899.99, erp: 4, shopify: 4, ebay: 1, sold30: 3, lead: 45, supplier: 'Hallmark Woodcraft', status: 'In stock' },
  { sku: 'BNJ-5-RES', name: '5 String Resonator Banjo', cat: 'Strings', price: 389, erp: 11, shopify: 11, ebay: 4, sold30: 6, lead: 30, supplier: 'Hallmark Woodcraft', status: 'In stock' },
  { sku: 'MND-A-STY', name: 'A Style Mandolin, Spruce', cat: 'Strings', price: 249, erp: 13, shopify: 13, ebay: 5, sold30: 9, lead: 30, supplier: 'Hallmark Woodcraft', status: 'In stock' },
  { sku: 'WHS-D-BRS', name: 'Irish Tin Whistle D, Brass (set)', cat: 'Wind', price: 19.99, erp: 38, shopify: 38, ebay: 20, sold30: 74, lead: 14, supplier: 'Clare Whistle Works', status: 'Reorder' },
  { sku: 'FLT-IRI-D-BLK', name: 'Irish Flute D, Blackwood', cat: 'Wind', price: 279, erp: 8, shopify: 8, ebay: 2, sold30: 5, lead: 30, supplier: 'Clare Whistle Works', status: 'In stock' },
  { sku: 'KAL-MAB-RC', name: 'Thumb Piano Kalimba, Mabira Red Cedar', cat: 'Percussion', price: 59.99, erp: 9, shopify: 11, ebay: 6, sold30: 31, lead: 21, supplier: 'Heartland Percussion', status: 'Reorder' },
  { sku: 'STD-GEO-1', name: 'Single Tray Georgian Music Stand', cat: 'Accessories', price: 174.99, erp: 0, shopify: 0, ebay: 0, sold30: 2, lead: 28, supplier: 'Hallmark Woodcraft', status: 'Out of stock' },
]

export const categories = [
  { l: 'Harps', v: 10020 }, { l: 'Bodhráns & Drums', v: 4480 }, { l: 'Strings', v: 3990 },
  { l: 'Early Music', v: 2820 }, { l: 'Wind', v: 1840 }, { l: 'Percussion & Accessories', v: 1190 },
] // sums to revenueMTD 24,340

export const suppliers = [
  { name: 'Sialkot Heritage Instruments', country: 'Pakistan', cat: 'Harps, Lyres', lead: 38, onTime: 84, openPO: 2, spendYTD: 118400, contact: 'Imran Qureshi' },
  { name: 'Hallmark Woodcraft', country: 'India', cat: 'Lutes, Bouzouki, Banjo, Stands', lead: 30, onTime: 88, openPO: 1, spendYTD: 74200, contact: 'Raj Mehta' },
  { name: 'Dublin Skin & Drum Supplies', country: 'Ireland', cat: 'Bodhráns, skins', lead: 21, onTime: 96, openPO: 1, spendYTD: 31800, contact: 'Pádraig Ó Sé' },
  { name: 'Clare Whistle Works', country: 'Ireland', cat: 'Whistles, flutes', lead: 14, onTime: 98, openPO: 0, spendYTD: 12650, contact: 'Maura Keane' },
  { name: 'Heartland Percussion', country: 'Indonesia', cat: 'Kalimbas, mbiras', lead: 21, onTime: 91, openPO: 1, spendYTD: 9800, contact: 'Budi Santoso' },
  { name: 'Camac Harps', country: 'France', cat: 'Concert & lever harps', lead: 45, onTime: 93, openPO: 0, spendYTD: 22100, contact: 'Claire Morvan' },
]

export const purchaseOrders = [
  { po: 'PO-2026-0218', supplier: 'Sialkot Heritage Instruments', items: '12 x 29 String Trinity Harp Rosewood', value: 5760, eta: '14 Dec', status: 'Awaiting approval' },
  { po: 'PO-2026-0216', supplier: 'Dublin Skin & Drum Supplies', items: '24 x Premium Easy Tune Bodhrán 14"', value: 2880, eta: '20 Nov', status: 'Draft' },
  { po: 'PO-2026-0214', supplier: 'Heartland Percussion', items: '60 x Kalimba Mabira Red Cedar', value: 1380, eta: '24 Nov', status: 'Sent' },
  { po: 'PO-2026-0211', supplier: 'Sialkot Heritage Instruments', items: '10 x Boru 22, 8 x Cèilidh 15', value: 7340, eta: '28 Nov', status: 'In transit' },
  { po: 'PO-2026-0207', supplier: 'Hallmark Woodcraft', items: '6 x Lute 8 Course, 10 x Bouzouki', value: 6950, eta: '19 Nov', status: 'In transit' },
  { po: 'PO-2026-0203', supplier: 'Clare Whistle Works', items: '200 x Tin Whistle D sets', value: 1600, eta: 'Received 2 Nov', status: 'Received' },
]

/* ---------------- Orders ---------------- */
export type Order = { id: string; ch: 'Shopify' | 'eBay' | 'Showroom' | 'Trade'; customer: string; country: string; items: string; value: number; erp: string; ful: string; promise: string; age?: string }
// The 23 Shopify/eBay orders waiting to be keyed into the ERP. Sum = €6,184.00
export const syncQueue: Order[] = [
  { id: 'MZK-10511', ch: 'Shopify', customer: 'Siobhán Ní Fhlatharta', country: 'Galway, IE', items: 'Trinity Cèilidh Harp 15 String Mahogany', value: 384.99, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Today', age: '31h' },
  { id: 'MZK-10514', ch: 'Shopify', customer: 'Mark Delaney', country: 'Cork, IE', items: 'Tunable Bodhrán 18" + Tipper', value: 144.98, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Today', age: '27h' },
  { id: 'MZK-10516', ch: 'Shopify', customer: 'Hannah Okafor', country: 'Leeds, UK', items: 'Irish Bouzouki 8 String Mahogany', value: 499.99, erp: 'Exception', ful: 'Address mismatch', promise: '10 Nov', age: '25h' },
  { id: 'EB-55817', ch: 'eBay', customer: 'k.lindqvist', country: 'Uppsala, SE', items: 'Kalimba Mabira Red Cedar x2', value: 119.98, erp: 'Pending', ful: 'Waiting for ERP', promise: '12 Nov', age: '24h' },
  { id: 'MZK-10518', ch: 'Shopify', customer: 'Patrick Moran', country: 'Limerick, IE', items: 'Premium Easy Tune Bodhrán 14"', value: 219.99, erp: 'Exception', ful: 'SKU not in ERP', promise: 'Today', age: '22h' },
  { id: 'MZK-10519', ch: 'Shopify', customer: 'Emily Carter', country: 'Austin, US', items: 'Boru Harp 22 String Walnut', value: 620.0, erp: 'Pending', ful: 'Waiting for ERP', promise: '13 Nov', age: '21h' },
  { id: 'MZK-10521', ch: 'Shopify', customer: 'Aisling Brady', country: 'Dublin 6, IE', items: 'Tin Whistle D set x3', value: 59.97, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Tomorrow', age: '19h' },
  { id: 'MZK-10522', ch: 'Shopify', customer: 'Luca Romano', country: 'Bologna, IT', items: 'Renaissance Lute 6 Course', value: 899.99, erp: 'Pending', ful: 'Waiting for ERP', promise: '12 Nov', age: '18h' },
  { id: 'EB-55819', ch: 'eBay', customer: 'folkfiddler_77', country: 'Bristol, UK', items: 'A Style Mandolin Spruce', value: 249.0, erp: 'Pending', ful: 'Waiting for ERP', promise: '10 Nov', age: '17h' },
  { id: 'MZK-10524', ch: 'Shopify', customer: 'Ciara Walsh', country: 'Kilkenny, IE', items: 'Tunable Bodhrán 18"', value: 129.99, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Tomorrow', age: '15h' },
  { id: 'MZK-10525', ch: 'Shopify', customer: 'Thomas Becker', country: 'Munich, DE', items: 'Irish Flute D Blackwood', value: 279.0, erp: 'Pending', ful: 'Waiting for ERP', promise: '12 Nov', age: '14h' },
  { id: 'MZK-10527', ch: 'Shopify', customer: 'Gráinne Kavanagh', country: 'Wexford, IE', items: 'Kalimba Mabira + Gift Voucher €50', value: 109.99, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Tomorrow', age: '12h' },
  { id: 'MZK-10528', ch: 'Shopify', customer: 'Sarah Mitchell', country: 'Toronto, CA', items: '5 String Resonator Banjo', value: 389.0, erp: 'Pending', ful: 'Waiting for ERP', promise: '16 Nov', age: '11h' },
  { id: 'EB-55821', ch: 'eBay', customer: 'harpist.jen', country: 'Edinburgh, UK', items: '29 String Trinity Harp Rosewood', value: 845.0, erp: 'Pending', ful: 'Waiting for ERP', promise: '10 Nov', age: '9h' },
  { id: 'MZK-10530', ch: 'Shopify', customer: 'Declan Hughes', country: 'Sligo, IE', items: 'Tin Whistle D set x2 + case', value: 52.98, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Tomorrow', age: '8h' },
  { id: 'MZK-10531', ch: 'Shopify', customer: 'Marie Dubois', country: 'Nantes, FR', items: 'Tunable Bodhrán 18" + Bag', value: 164.98, erp: 'Pending', ful: 'Waiting for ERP', promise: '13 Nov', age: '7h' },
  { id: 'MZK-10532', ch: 'Shopify', customer: 'Owen Fitzgerald', country: 'Waterford, IE', items: 'Kalimba Mabira Red Cedar', value: 59.99, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Tomorrow', age: '6h' },
  { id: 'EB-55823', ch: 'eBay', customer: 'mandoman_nz', country: 'Wellington, NZ', items: 'Bodhrán Tipper set x3', value: 44.97, erp: 'Pending', ful: 'Waiting for ERP', promise: '18 Nov', age: '5h' },
  { id: 'MZK-10533', ch: 'Shopify', customer: 'Róisín Gallagher', country: 'Donegal, IE', items: 'Tin Whistle D set', value: 19.99, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Tomorrow', age: '4h' },
  { id: 'MZK-10534', ch: 'Shopify', customer: 'James O’Neill', country: 'Belfast, NI', items: 'Tunable Bodhrán 18"', value: 129.99, erp: 'Pending', ful: 'Waiting for ERP', promise: '10 Nov', age: '3h' },
  { id: 'MZK-10535', ch: 'Shopify', customer: 'Olivia Brennan', country: 'Naas, IE', items: 'A Style Mandolin Spruce', value: 249.0, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Tomorrow', age: '2h' },
  { id: 'MZK-10536', ch: 'Shopify', customer: 'Peter Hansen', country: 'Copenhagen, DK', items: 'Kalimba Mabira Red Cedar', value: 59.99, erp: 'Pending', ful: 'Waiting for ERP', promise: '13 Nov', age: '1h' },
  { id: 'MZK-10537', ch: 'Shopify', customer: 'Conor Byrne', country: 'Athlone, IE', items: 'Bodhrán bundle: Tunable 18" + Easy Tune 14" + tippers', value: 450.24, erp: 'Pending', ful: 'Waiting for ERP', promise: 'Tomorrow', age: '40m' },
]

export const recentOrders: Order[] = [
  ...syncQueue.slice(0, 6),
  { id: 'MZK-10482', ch: 'Shopify', customer: 'Jonathan Hale', country: 'Boston, US', items: 'Renaissance Lute 8 Course Deluxe', value: 1199.99, erp: 'Synced', ful: 'Held at customs', promise: '5 Nov' },
  { id: 'TR-3318', ch: 'Trade', customer: 'Ballymore School of Music', country: 'Westmeath, IE', items: '20 x Tin Whistle D, 6 x Bodhrán 14"', value: 1240, erp: 'Synced', ful: 'On credit hold', promise: '12 Nov' },
  { id: 'TR-3317', ch: 'Trade', customer: 'Tralee Trad Music Shop', country: 'Kerry, IE', items: '4 x Cèilidh Harp, 10 x Bodhrán 18"', value: 2310, erp: 'Synced', ful: 'Packed', promise: '9 Nov' },
  { id: 'SR-0892', ch: 'Showroom', customer: 'Walk-in: Nora Healy', country: 'Dublin 22, IE', items: 'McHugh Harp 27 String', value: 699, erp: 'Synced', ful: 'Collected', promise: '6 Nov' },
  { id: 'MZK-10509', ch: 'Shopify', customer: 'Rachel Kim', country: 'Seattle, US', items: 'Trinity Cèilidh Harp 15 String', value: 384.99, erp: 'Synced', ful: 'In transit', promise: '11 Nov' },
  { id: 'EB-55812', ch: 'eBay', customer: 'celticstrings', country: 'Glasgow, UK', items: 'Boru Harp 22 String Walnut', value: 620, erp: 'Synced', ful: 'Delivered', promise: '5 Nov' },
  { id: 'MZK-10505', ch: 'Shopify', customer: 'Fiona McCarthy', country: 'Cork, IE', items: 'Irish Bouzouki 8 String', value: 499.99, erp: 'Synced', ful: 'Delivered', promise: '5 Nov' },
  { id: 'SR-0891', ch: 'Showroom', customer: 'Walk-in: Kevin Doran', country: 'Dublin 24, IE', items: 'Tunable Bodhrán 18" + Tipper', value: 144.98, erp: 'Synced', ful: 'Collected', promise: '5 Nov' },
]

export const dailyOrders = { labels: ['24 Oct', '25', '26', '27', '28', '29', '30', '31', '1 Nov', '2', '3', '4', '5', '6'], received: [6, 4, 3, 7, 8, 9, 8, 7, 9, 6, 11, 12, 13, 14], dispatched: [6, 3, 2, 7, 7, 8, 8, 6, 7, 5, 9, 9, 10, 8] }
export const syncBacklog = [4, 3, 3, 5, 6, 8, 7, 9, 11, 10, 14, 17, 20, 23]

export const returns = [
  { id: 'RMA-0147', order: 'MZK-10461', customer: 'Brian Lyons', item: 'Tunable Bodhrán 18"', reason: 'Skin cracked in transit', value: 129.99, status: 'Replacement sent' },
  { id: 'RMA-0148', order: 'MZK-10470', customer: 'Anna Kowalska', item: 'Violin 3/4 Outfit', reason: 'Wrong size, needs 1/2', value: 189, status: 'Awaiting return' },
  { id: 'RMA-0149', order: 'EB-55790', customer: 'banjo_bill', item: '5 String Resonator Banjo', reason: 'Changed mind', value: 389, status: 'Received' },
  { id: 'RMA-0150', order: 'MZK-10488', customer: 'Laura Finn', item: 'Kalimba Mabira', reason: 'Tine buzzing', value: 59.99, status: 'In repair' },
  { id: 'RMA-0151', order: 'MZK-10493', customer: 'Gareth Evans', item: 'Lyre Harp 16 String', reason: 'Damaged box, harp OK', value: 249, status: 'Review' },
  { id: 'RMA-0152', order: 'MZK-10497', customer: 'Isabel Torres', item: 'Irish Flute D', reason: 'Wrong key ordered', value: 279, status: 'Approved' },
]

/* ---------------- Fulfilment ---------------- */
export const dispatchToday = [
  { order: 'MZK-10509', item: 'Cèilidh Harp 15', dest: 'IE', courier: 'An Post', box: 'Harp L', status: 'Packed' },
  { order: 'TR-3317', item: '4 x Cèilidh Harp, 10 x Bodhrán', dest: 'IE', courier: 'DPD', box: 'Pallet', status: 'Packed' },
  { order: 'MZK-10512', item: 'Tunable Bodhrán 18"', dest: 'IE', courier: 'An Post', box: 'Drum M', status: 'Packed' },
  { order: 'MZK-10513', item: 'Boru Harp 22', dest: 'UK', courier: 'DPD', box: 'Harp XL', status: 'Picking' },
  { order: 'MZK-10515', item: 'Bouzouki 8 String', dest: 'DE', courier: 'DHL Express', box: 'Guitar case', status: 'Picking' },
  { order: 'EB-55818', item: 'Mandolin A Style', dest: 'FR', courier: 'DHL Express', box: 'Case S', status: 'Picking' },
  { order: 'MZK-10517', item: 'Tin Whistle set x4', dest: 'IE', courier: 'An Post', box: 'Jiffy', status: 'Packed' },
  { order: 'MZK-10520', item: 'Lute 6 Course', dest: 'US', courier: 'DHL Express', box: 'Lute case', status: 'QC' },
  { order: 'MZK-10523', item: 'Kalimba x2', dest: 'IE', courier: 'An Post', box: 'Small', status: 'Packed' },
  { order: 'MZK-10526', item: 'Irish Flute D', dest: 'NL', courier: 'DHL Express', box: 'Tube', status: 'Picking' },
  { order: 'EB-55820', item: 'Bodhrán 14" Premium', dest: 'UK', courier: 'DPD', box: 'Drum M', status: 'Packed' },
  { order: 'MZK-10529', item: 'Banjo 5 String', dest: 'IE', courier: 'DPD', box: 'Case L', status: 'QC' },
  { order: 'SR-0893', item: 'Music Stand Regency', dest: 'IE', courier: 'An Post', box: 'Flat', status: 'Picking' },
  { order: 'MZK-10529B', item: 'Spare strings set', dest: 'IE', courier: 'An Post', box: 'Jiffy', status: 'Packed' },
] // 14 parcels

export const shipments = [
  { order: 'MZK-10482', customer: 'Jonathan Hale', dest: 'Boston, US', courier: 'DHL Express', shipped: '29 Oct', status: 'Held at customs', eta: 'Unknown' },
  { order: 'MZK-10509', customer: 'Rachel Kim', dest: 'Seattle, US', courier: 'DHL Express', shipped: '4 Nov', status: 'In transit', eta: '11 Nov' },
  { order: 'MZK-10498', customer: 'Élodie Martin', dest: 'Lyon, FR', courier: 'DHL Express', shipped: '2 Nov', status: 'Exception: address', eta: 'On hold' },
  { order: 'MZK-10501', customer: 'Seán Coughlan', dest: 'Cork, IE', courier: 'An Post', shipped: '3 Nov', status: 'Damaged in transit', eta: 'Claim open' },
  { order: 'MZK-10490', customer: 'Liam Taylor', dest: 'Melbourne, AU', courier: 'DHL Express', shipped: '28 Oct', status: 'Delayed', eta: '12 Nov' },
  { order: 'EB-55812', customer: 'celticstrings', dest: 'Glasgow, UK', courier: 'DPD', shipped: '2 Nov', status: 'Delivered', eta: '5 Nov' },
  { order: 'MZK-10505', customer: 'Fiona McCarthy', dest: 'Cork, IE', courier: 'An Post', shipped: '4 Nov', status: 'Delivered', eta: '5 Nov' },
  { order: 'MZK-10507', customer: 'Henrik Olsen', dest: 'Oslo, NO', courier: 'DHL Express', shipped: '4 Nov', status: 'In transit', eta: '10 Nov' },
  { order: 'MZK-10508', customer: 'Aoibhinn Daly', dest: 'Ennis, IE', courier: 'An Post', shipped: '5 Nov', status: 'Delivered', eta: '6 Nov' },
  { order: 'TR-3312', customer: 'Liverpool Folk Instruments', dest: 'Liverpool, UK', courier: 'DPD', shipped: '3 Nov', status: 'In transit', eta: '7 Nov' },
]

export const couriers = [
  { name: 'An Post', regions: 'Ireland', parcels: 71, cost: 8.4, onTime: 96 },
  { name: 'DPD', regions: 'IE (large), UK & NI', parcels: 38, cost: 14.9, onTime: 93 },
  { name: 'DHL Express', regions: 'EU & Worldwide', parcels: 38, cost: 41.6, onTime: 87 },
]

/* ---------------- Support ---------------- */
export type Ticket = { id: string; subject: string; customer: string; ch: 'Email' | 'WhatsApp' | 'Web chat' | 'Phone'; type: string; pri: 'Urgent' | 'High' | 'Medium' | 'Low'; owner: string; sla: string; status: string; ai: string; order?: string }
export const tickets: Ticket[] = [
  { id: 'TCK-2291', subject: 'Where is my lute? 3rd email', customer: 'Jonathan Hale', ch: 'Email', type: 'Where is my order', pri: 'Urgent', owner: 'Aoife Byrne', sla: 'Breached 2h', status: 'Awaiting approval', ai: 'Draft ready', order: 'MZK-10482' },
  { id: 'TCK-2306', subject: 'Harp arrived with a broken lever', customer: 'Seán Coughlan', ch: 'Email', type: 'Damage', pri: 'High', owner: 'Aoife Byrne', sla: '1h 40m left', status: 'Open', ai: 'Escalated', order: 'MZK-10501' },
  { id: 'TCK-2308', subject: 'Delivery address wrong, can you change it?', customer: 'Élodie Martin', ch: 'Email', type: 'Delivery change', pri: 'High', owner: 'Tomasz Nowak', sla: '2h 10m left', status: 'Pending courier', ai: 'Draft ready', order: 'MZK-10498' },
  { id: 'TCK-2311', subject: 'Order status, Cèilidh harp to Galway', customer: 'Siobhán Ní Fhlatharta', ch: 'WhatsApp', type: 'Where is my order', pri: 'High', owner: 'Aoife Byrne', sla: '3h left', status: 'Awaiting approval', ai: 'Draft ready', order: 'MZK-10511' },
  { id: 'TCK-2312', subject: 'Which harp for a 9 year old beginner?', customer: 'Michelle Ryan', ch: 'Web chat', type: 'Product question', pri: 'Medium', owner: 'Support Agent', sla: '5h left', status: 'Resolved by AI', ai: 'Auto replied' },
  { id: 'TCK-2313', subject: 'Trade price list for 2027?', customer: 'Kilkenny Strings & Things', ch: 'Email', type: 'Trade', pri: 'Medium', owner: 'Niamh Kelly', sla: '6h left', status: 'Open', ai: 'Draft ready' },
  { id: 'TCK-2314', subject: 'Tracking not updating for 4 days', customer: 'Liam Taylor', ch: 'Email', type: 'Where is my order', pri: 'High', owner: 'Aoife Byrne', sla: '2h 50m left', status: 'Awaiting approval', ai: 'Draft ready', order: 'MZK-10490' },
  { id: 'TCK-2315', subject: 'Harp service booking, regulation and restring', customer: 'Galway Harp Society', ch: 'Phone', type: 'Workshop', pri: 'Medium', owner: 'Ciarán Doyle', sla: '1 day', status: 'Scheduled', ai: 'Booked slot' },
  { id: 'TCK-2316', subject: 'Can I return the 3/4 violin for a 1/2?', customer: 'Anna Kowalska', ch: 'Email', type: 'Return', pri: 'Medium', owner: 'Support Agent', sla: '7h left', status: 'Resolved by AI', ai: 'RMA issued' },
  { id: 'TCK-2317', subject: 'When will the 36 string Trinity be back?', customer: 'Deirdre Nolan', ch: 'Web chat', type: 'Stock question', pri: 'Low', owner: 'Support Agent', sla: '1 day', status: 'Resolved by AI', ai: 'Back-in-stock alert set' },
  { id: 'TCK-2318', subject: 'Where is my order? Bouzouki to Leeds', customer: 'Hannah Okafor', ch: 'Email', type: 'Where is my order', pri: 'Medium', owner: 'Aoife Byrne', sla: '4h left', status: 'Awaiting approval', ai: 'Draft ready', order: 'MZK-10516' },
  { id: 'TCK-2319', subject: 'Invoice copy for school accounts', customer: 'Ballymore School of Music', ch: 'Email', type: 'Finance', pri: 'Medium', owner: 'Sana Malik', sla: '6h left', status: 'Open', ai: 'Invoice attached' },
  { id: 'TCK-2320', subject: 'Do you ship to Japan?', customer: 'Yuki Tanaka', ch: 'Web chat', type: 'Shipping question', pri: 'Low', owner: 'Support Agent', sla: '1 day', status: 'Resolved by AI', ai: 'Auto replied' },
  { id: 'TCK-2321', subject: 'Kalimba tine buzzing', customer: 'Laura Finn', ch: 'Email', type: 'Faulty item', pri: 'Medium', owner: 'Ciarán Doyle', sla: '5h left', status: 'In repair', ai: 'RMA issued', order: 'MZK-10488' },
  { id: 'TCK-2322', subject: 'Gift voucher not received', customer: 'Gráinne Kavanagh', ch: 'Email', type: 'Gift voucher', pri: 'Medium', owner: 'Support Agent', sla: '6h left', status: 'Awaiting approval', ai: 'Draft ready', order: 'MZK-10527' },
  { id: 'TCK-2323', subject: 'Reseller application follow up', customer: 'Cardiff Folk Music', ch: 'Email', type: 'Trade', pri: 'Low', owner: 'Niamh Kelly', sla: '1 day', status: 'Open', ai: 'Summary ready' },
  { id: 'TCK-2324', subject: 'Order status, Boru harp to Austin', customer: 'Emily Carter', ch: 'Email', type: 'Where is my order', pri: 'Medium', owner: 'Support Agent', sla: '5h left', status: 'Awaiting approval', ai: 'Draft ready', order: 'MZK-10519' },
  { id: 'TCK-2325', subject: 'Lute string gauge question', customer: 'Luca Romano', ch: 'Email', type: 'Product question', pri: 'Low', owner: 'Support Agent', sla: '1 day', status: 'Resolved by AI', ai: 'Auto replied', order: 'MZK-10522' },
]
export const openTickets = tickets.filter(t => !/Resolved/.test(t.status))

export const inboxWeek = { labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'], wismo: [6, 5, 11, 10, 11, 12, 9], other: [9, 7, 16, 14, 15, 17, 14] } // 64 + 92 = 156

export const ticketTypes = [
  { l: 'Where is my order', v: 64 }, { l: 'Product questions', v: 31 }, { l: 'Delivery changes', v: 17 },
  { l: 'Returns & faults', v: 15 }, { l: 'Trade & schools', v: 16 }, { l: 'Workshop & servicing', v: 13 },
] // 156

export const reviews = [
  { who: 'Ellen M.', stars: 5, text: 'Cèilidh harp arrived beautifully packed and in tune within a day. Brilliant service.', date: '5 Nov', status: 'Replied' },
  { who: 'Robert K.', stars: 5, text: 'Tried three bodhráns in the Dublin showroom, staff were patient and knew their stuff.', date: '4 Nov', status: 'Replied' },
  { who: 'J. Hale', stars: 2, text: 'Lute stuck in customs for days and I had to chase three times for an update.', date: '5 Nov', status: 'Draft ready' },
  { who: 'Saoirse D.', stars: 5, text: 'Great value lyre harp, lovely tone. Delivery to Kerry in 48 hours.', date: '3 Nov', status: 'Replied' },
  { who: 'Michael P.', stars: 4, text: 'Mandolin is lovely, setup needed small tweak but support sorted it.', date: '2 Nov', status: 'Replied' },
  { who: 'Anja W.', stars: 5, text: 'Ordered a Renaissance lute to Germany, superb quality for the price.', date: '1 Nov', status: 'Replied' },
]

/* ---------------- Trade & Education ---------------- */
export const tradeAccounts = [
  { name: 'Ballymore School of Music', type: 'Music school', county: 'Westmeath', owner: 'Niamh Kelly', ytd: 14880, balance: 5100, overdue: 3860, terms: '30 days', status: 'Credit hold' },
  { name: 'Tralee Trad Music Shop', type: 'Music shop', county: 'Kerry', owner: 'Niamh Kelly', ytd: 28420, balance: 2480, overdue: 0, terms: '30 days', status: 'Active' },
  { name: 'Kilkenny Strings & Things', type: 'Music shop', county: 'Kilkenny', owner: 'Niamh Kelly', ytd: 19650, balance: 2140, overdue: 2140, terms: '30 days', status: 'Overdue' },
  { name: 'Athlone Folk Music Centre', type: 'Music shop', county: 'Westmeath', owner: 'Niamh Kelly', ytd: 16300, balance: 1960, overdue: 0, terms: '30 days', status: 'Active' },
  { name: 'Galway Harp Society', type: 'Society', county: 'Galway', owner: 'Niamh Kelly', ytd: 12740, balance: 2235, overdue: 0, terms: '30 days', status: 'Active' },
  { name: 'Northside Music School', type: 'Music school', county: 'Dublin', owner: 'Niamh Kelly', ytd: 11280, balance: 1485, overdue: 1485, terms: '30 days', status: 'Overdue' },
  { name: 'Belfast Bodhrán Co', type: 'Music shop', county: 'Antrim', owner: 'Niamh Kelly', ytd: 10950, balance: 1520, overdue: 0, terms: '30 days', status: 'Active' },
  { name: 'Liverpool Folk Instruments', type: 'Music shop (UK)', county: 'Merseyside', owner: 'Niamh Kelly', ytd: 9870, balance: 1310, overdue: 0, terms: '30 days', status: 'Active' },
  { name: 'Coláiste Cheoil Thír Chonaill', type: 'Secondary school', county: 'Donegal', owner: 'Niamh Kelly', ytd: 6420, balance: 1210, overdue: 1210, terms: '30 days', status: 'Overdue' },
  { name: 'Sligo Comhaltas Branch', type: 'Music school', county: 'Sligo', owner: 'Niamh Kelly', ytd: 5180, balance: 1180, overdue: 0, terms: '30 days', status: 'Active' },
  { name: 'Ennis Music Academy', type: 'Music school', county: 'Clare', owner: 'Niamh Kelly', ytd: 4960, balance: 1120, overdue: 620, terms: '30 days', status: 'Overdue' },
  { name: 'Cardiff Folk Music', type: 'Music shop (UK)', county: 'Wales', owner: 'Niamh Kelly', ytd: 0, balance: 0, overdue: 0, terms: 'Pending', status: 'Application' },
]

export const resellerApps = [
  { name: 'Cardiff Folk Music', country: 'Wales', est: '€18k/yr', fit: 'Strong', status: 'Review' },
  { name: 'Boston Celtic Supply', country: 'USA', est: '€30k/yr', fit: 'Strong', status: 'Review' },
  { name: 'Harpe & Co', country: 'France', est: '€12k/yr', fit: 'Medium', status: 'Awaiting docs' },
  { name: 'Mullingar Music Hub', country: 'Ireland', est: '€8k/yr', fit: 'Medium', status: 'Review' },
  { name: 'Dún Laoghaire Music', country: 'Ireland', est: '€6k/yr', fit: 'Low', status: 'Review' },
]

/* ---------------- Finance ---------------- */
// 14 invoices = €21,740. 5 overdue = €9,315.
export const invoices = [
  { id: 'INV-2026-0412', acct: 'Ballymore School of Music', issued: '27 Aug', due: '26 Sep', amount: 3860, days: 41, status: 'Overdue' },
  { id: 'INV-2026-0431', acct: 'Kilkenny Strings & Things', issued: '12 Sep', due: '12 Oct', amount: 2140, days: 25, status: 'Overdue' },
  { id: 'INV-2026-0438', acct: 'Northside Music School', issued: '19 Sep', due: '19 Oct', amount: 1485, days: 18, status: 'Overdue' },
  { id: 'INV-2026-0442', acct: 'Coláiste Cheoil Thír Chonaill', issued: '24 Sep', due: '24 Oct', amount: 1210, days: 13, status: 'Overdue' },
  { id: 'INV-2026-0447', acct: 'Ennis Music Academy', issued: '1 Oct', due: '31 Oct', amount: 620, days: 6, status: 'Overdue' },
  { id: 'INV-2026-0455', acct: 'Tralee Trad Music Shop', issued: '10 Oct', due: '9 Nov', amount: 2480, days: 0, status: 'Due in 3 days' },
  { id: 'INV-2026-0458', acct: 'Athlone Folk Music Centre', issued: '14 Oct', due: '13 Nov', amount: 1960, days: 0, status: 'Due' },
  { id: 'INV-2026-0461', acct: 'Galway Harp Society', issued: '17 Oct', due: '16 Nov', amount: 1745, days: 0, status: 'Due' },
  { id: 'INV-2026-0463', acct: 'Belfast Bodhrán Co', issued: '20 Oct', due: '19 Nov', amount: 1520, days: 0, status: 'Due' },
  { id: 'INV-2026-0466', acct: 'Liverpool Folk Instruments', issued: '23 Oct', due: '22 Nov', amount: 1310, days: 0, status: 'Due' },
  { id: 'INV-2026-0470', acct: 'Sligo Comhaltas Branch', issued: '28 Oct', due: '27 Nov', amount: 1180, days: 0, status: 'Due' },
  { id: 'INV-2026-0473', acct: 'Ballymore School of Music', issued: '5 Nov', due: '5 Dec', amount: 1240, days: 0, status: 'On hold' },
  { id: 'INV-2026-0474', acct: 'Ennis Music Academy', issued: '5 Nov', due: '5 Dec', amount: 500, days: 0, status: 'Due' },
  { id: 'INV-2026-0476', acct: 'Galway Harp Society', issued: '6 Nov', due: '6 Dec', amount: 490, days: 0, status: 'Due' },
]

export const payouts = [
  { src: 'Shopify Payments', ref: 'PO-SHP-11872', date: '5 Nov', amount: 3412.6, bank: 3412.6, status: 'Matched' },
  { src: 'Shopify Payments', ref: 'PO-SHP-11871', date: '4 Nov', amount: 2988.15, bank: 2988.15, status: 'Matched' },
  { src: 'eBay Managed Payments', ref: 'EBP-77314', date: '4 Nov', amount: 1146.2, bank: 0, status: 'Unmatched' },
  { src: 'Shopify Payments', ref: 'PO-SHP-11870', date: '3 Nov', amount: 2611.4, bank: 2611.4, status: 'Matched' },
  { src: 'Stripe (showroom)', ref: 'STR-90413', date: '3 Nov', amount: 521.2, bank: 0, status: 'Unmatched' },
  { src: 'Bank transfer', ref: 'Tralee Trad TR-3309', date: '2 Nov', amount: 1860, bank: 1860, status: 'Matched' },
  { src: 'PayPal', ref: 'PP-5521890', date: '2 Nov', amount: 245, bank: 0, status: 'Unmatched' },
] // unmatched 1146.20 + 521.20 + 245.00 = 1,912.40

export const revenue12 = {
  labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  online: [93270, 111720, 43680, 41060, 51070, 46860, 45270, 42660, 41180, 47550, 59490, 54100],
  trade: [17060, 14100, 10350, 10010, 12740, 10920, 8420, 5910, 6940, 22520, 27980, 17140],
} // Nov 2025 to Oct 2026 = €842,000; Oct = €71,240

export const costsMTD = [
  { l: 'Cost of goods', v: 13140 }, { l: 'Payroll', v: 4450 }, { l: 'Shipping & couriers', v: 1320 },
  { l: 'Advertising', v: 1340 }, { l: 'Platform & payment fees', v: 610 }, { l: 'Rent & utilities', v: 1360 },
]

/* ---------------- Marketing ---------------- */
export const adChannels = [
  { ch: 'Google Shopping', spend: 3380, rev: 18252, roas: 5.4, orders: 61, cpa: 55 },
  { ch: 'Google Search', spend: 1190, rev: 4165, roas: 3.5, orders: 17, cpa: 70 },
  { ch: 'Meta Ads', spend: 2140, rev: 4066, roas: 1.9, orders: 19, cpa: 113 },
  { ch: 'Organic & SEO', spend: 0, rev: 9410, roas: 0, orders: 38, cpa: 0 },
]
export const content = [
  { title: 'How to Choose Your First Celtic Lever Harp', author: 'David Murphy', views: 4120, orders: 9, status: 'Live' },
  { title: 'Tunable vs Non-Tunable Bodhrán: Which Is Right for You?', author: 'David Murphy', views: 3380, orders: 14, status: 'Live' },
  { title: 'Rare and Unique Instruments Available at Muzikkon', author: 'David Murphy', views: 1960, orders: 3, status: 'Live' },
  { title: 'Christmas Gift Guide 2026: Instruments Under €100', author: 'David Murphy', views: 0, orders: 0, status: 'Scheduled 12 Nov' },
  { title: 'Caring for Your Harp Through an Irish Winter', author: 'David Murphy', views: 0, orders: 0, status: 'Draft' },
]

/* ---------------- Workshop ---------------- */
export const workshopJobs = [
  { id: 'WS-118', item: 'Camac Hermine 34 lever harp', customer: 'Galway Harp Society', job: 'Full regulation + restring', stage: 'In repair', promised: '2 Nov', late: true },
  { id: 'WS-119', item: 'Trinity 29 Walnut', customer: 'Orla Byrne', job: 'Lever replacement x4', stage: 'In repair', promised: '4 Nov', late: true },
  { id: 'WS-121', item: 'McHugh 27 Round Back', customer: 'Ennis Music Academy', job: 'Soundboard crack repair', stage: 'Assessed', promised: '5 Nov', late: true },
  { id: 'WS-122', item: 'Boru 22 Walnut', customer: 'Fionnuala Shiels', job: 'Restring + tuning pins', stage: 'In repair', promised: '9 Nov', late: false },
  { id: 'WS-123', item: 'Cèilidh 15 Mahogany', customer: 'Northside Music School', job: 'Lever regulation', stage: 'Ready', promised: '7 Nov', late: false },
  { id: 'WS-124', item: 'Gothic Harp 19', customer: 'Peadar Lynch', job: 'Restring', stage: 'Ready', promised: '8 Nov', late: false },
  { id: 'WS-125', item: 'Lyre Harp 16', customer: 'Sophie Grant', job: 'Bridge reglue', stage: 'Received', promised: '12 Nov', late: false },
  { id: 'WS-126', item: 'Trinity 36 Rosewood', customer: 'Máire Ní Bhriain', job: 'Annual service', stage: 'Received', promised: '13 Nov', late: false },
  { id: 'WS-127', item: 'Mini Kinnor 10', customer: 'Ballymore School of Music', job: 'Strings + pins', stage: 'Assessed', promised: '11 Nov', late: false },
]
export const tradeIns = [
  { item: 'Camac Telenn 22', owner: 'Aine Corrigan', condition: 'Good', offer: 950, resale: 1590, toward: 'Trinity 36 String', status: 'Offer sent' },
  { item: 'Trinity 29 Walnut (2022)', owner: 'Kate Moynihan', condition: 'Very good', offer: 420, resale: 690, toward: 'Camac Hermine', status: 'Assessed' },
  { item: 'Lyre Harp 16', owner: 'Ben Ashe', condition: 'Fair', offer: 80, resale: 160, toward: 'Cèilidh 15', status: 'Awaiting harp' },
  { item: 'Boru 22 Mahogany', owner: 'Tara Quinn', condition: 'Good', offer: 300, resale: 495, toward: 'McHugh 27', status: 'Review' },
]

/* ---------------- Agents ---------------- */
export const agents = [
  { key: 'briefing', name: 'Briefing', job: 'Morning and evening brief for Umer and Salahuddin across orders, stock, cash and support.', runs: 2, actions: 0, success: '100%', status: 'Active' },
  { key: 'watchdog', name: 'Ops Watchdog', job: 'Watches sync gaps, delivery promises, late dispatches and overdue workshop jobs. Raises alerts before customers notice.', runs: 96, actions: 7, success: '98%', status: 'Active' },
  { key: 'sync', name: 'Order Sync Agent', job: 'Moves Shopify and eBay orders into the Muzikkon ERP, maps SKUs and flags exceptions for a human.', runs: 48, actions: 2, success: '91%', status: 'Ready to switch on' },
  { key: 'support', name: 'Support Agent', job: 'Reads info@muzikkon.com, WhatsApp and web chat. Answers order status with live tracking, drafts replies, escalates damage and complaints.', runs: 156, actions: 14, success: '94%', status: 'Active' },
  { key: 'dispatch', name: 'Dispatch Agent', job: 'Chooses courier by size and destination, generates labels and customs paperwork, monitors exceptions.', runs: 34, actions: 3, success: '97%', status: 'Active' },
  { key: 'inventory', name: 'Inventory Agent', job: 'Forecasts stock-outs from sales velocity, drafts purchase orders using supplier lead times, keeps channel stock aligned.', runs: 24, actions: 2, success: '95%', status: 'Active' },
  { key: 'finance', name: 'Finance Agent', job: 'Chases trade invoices, reconciles Shopify, eBay and Stripe payouts to the bank, flags credit holds, prepares VAT.', runs: 12, actions: 4, success: '96%', status: 'Active' },
]

/* ---------------- Work ---------------- */
export const tasks = [
  { t: 'Resolve 2 order sync exceptions (MZK-10516, MZK-10518)', owner: 'Tomasz Nowak', due: 'Today', pri: 'High', dept: 'Fulfilment', status: 'In progress', rel: 'Sync Queue' },
  { t: 'Approve PO-2026-0218, 12 x Trinity 29 Rosewood', owner: 'Salahuddin Tarif', due: 'Today', pri: 'High', dept: 'Inventory', status: 'Awaiting approval', rel: 'PO-2026-0218' },
  { t: 'Approve customs reply to Jonathan Hale', owner: 'Aoife Byrne', due: 'Today', pri: 'Urgent', dept: 'Support', status: 'Awaiting approval', rel: 'TCK-2291' },
  { t: 'Upload commercial invoice to DHL for MZK-10482', owner: 'Tomasz Nowak', due: 'Today', pri: 'Urgent', dept: 'Fulfilment', status: 'Open', rel: 'MZK-10482' },
  { t: 'Call Ballymore School of Music re €3,860', owner: 'Niamh Kelly', due: 'Mon 9 Nov', pri: 'High', dept: 'Trade & Education', status: 'Open', rel: 'INV-2026-0412' },
  { t: 'Decide credit hold on TR-3318 (€1,240)', owner: 'Salahuddin Tarif', due: 'Today', pri: 'High', dept: 'Finance', status: 'Awaiting approval', rel: 'TR-3318' },
  { t: 'Finish 3 overdue harp services', owner: 'Ciarán Doyle', due: 'Tue 10 Nov', pri: 'Medium', dept: 'Workshop', status: 'In progress', rel: 'WS-118, WS-119, WS-121' },
  { t: 'Shift €800 from Meta to Google Shopping', owner: 'David Murphy', due: 'Today', pri: 'Medium', dept: 'Marketing', status: 'Awaiting approval', rel: 'Christmas campaign' },
  { t: 'Match 3 unmatched payouts (€1,912.40)', owner: 'Sana Malik', due: 'Mon 9 Nov', pri: 'Medium', dept: 'Finance', status: 'Open', rel: 'Reconciliation' },
  { t: 'Fix stock mismatch Trinity 29 (Shopify shows 3)', owner: 'Tomasz Nowak', due: 'Today', pri: 'High', dept: 'Inventory', status: 'Open', rel: 'HRP-TRN-29-RSW' },
  { t: 'Publish Christmas Gift Guide 2026', owner: 'David Murphy', due: 'Thu 12 Nov', pri: 'Medium', dept: 'Marketing', status: 'In progress', rel: 'Blog' },
  { t: 'Review 2 reseller applications (Cardiff, Boston)', owner: 'Niamh Kelly', due: 'Wed 11 Nov', pri: 'Low', dept: 'Trade & Education', status: 'Open', rel: 'Reseller programme' },
  { t: 'Set Christmas last order dates on site', owner: 'Umer Farooq', due: 'Fri 13 Nov', pri: 'Medium', dept: 'Management', status: 'Open', rel: 'Shipping policy' },
  { t: 'Process damage claim with An Post (MZK-10501)', owner: 'Aoife Byrne', due: 'Mon 9 Nov', pri: 'High', dept: 'Support', status: 'In progress', rel: 'TCK-2306' },
]

export const approvals = [
  { what: 'PO-2026-0218: 12 x 29 String Trinity Harp Rosewood', value: '€5,760', by: 'Inventory Agent', who: 'Salahuddin Tarif', why: '2 in stock, stock-out 9 Nov, 38 day lead time, ~€5,070 at risk' },
  { what: 'Credit hold on TR-3318, Ballymore School of Music', value: '€1,240', by: 'Finance Agent', who: 'Salahuddin Tarif', why: 'INV-2026-0412 €3,860 is 41 days overdue' },
  { what: 'Customs reply to Jonathan Hale (TCK-2291)', value: 'MZK-10482', by: 'Support Agent', who: 'Aoife Byrne', why: '3rd email, SLA breached, commercial invoice ready' },
  { what: 'Sync 21 orders to Muzikkon ERP', value: '€5,464.02', by: 'Order Sync Agent', who: 'Umer Farooq', why: '23 waiting, oldest 31h, 2 need manual review' },
  { what: 'Move €800 from Meta Ads to Google Shopping', value: '€800', by: 'Marketing review', who: 'Umer Farooq', why: 'Meta ROAS 1.9 vs Shopping 5.4' },
  { what: 'Refund €129.99 to Brian Lyons (RMA-0147)', value: '€129.99', by: 'Support Agent', who: 'Aoife Byrne', why: 'Cracked skin, replacement already sent, customer asked for partial refund' },
]

/* ---------------- Activity ---------------- */
export type Act = { t: string; who: string; kind: 'agent' | 'sys' | 'staff' | 'alert'; text: string }
export const activity: Act[] = [
  { t: '12:41', who: 'Shopify', kind: 'sys', text: 'New order MZK-10537, Tunable Bodhrán 18" to Athlone. 14 orders today.' },
  { t: '12:38', who: 'Order Sync Agent', kind: 'agent', text: '21 of 23 waiting orders ready to sync to Muzikkon ERP. 2 need review.' },
  { t: '12:30', who: 'Ops Watchdog', kind: 'alert', text: 'MZK-10511 is 31h old and not in the ERP. Galway 48h promise at risk.' },
  { t: '12:22', who: 'Support Agent', kind: 'agent', text: 'Drafted customs update for Jonathan Hale (TCK-2291). Waiting on Aoife.' },
  { t: '12:15', who: 'Aoife Byrne', kind: 'staff', text: 'Approved and sent 6 AI replies on order status.' },
  { t: '12:02', who: 'DHL Express', kind: 'sys', text: 'MZK-10482 still held at US customs, Boston. Commercial invoice requested.' },
  { t: '11:48', who: 'Inventory Agent', kind: 'agent', text: 'Stock-out forecast 9 Nov for HRP-TRN-29-RSW. Drafted PO-2026-0218 (12 units).' },
  { t: '11:40', who: 'eBay', kind: 'sys', text: 'Trinity Harp 29 Rosewood sold (EB-55821). Shopify still shows 3 in stock.' },
  { t: '11:31', who: 'Finance Agent', kind: 'agent', text: 'Reminder 2 sent to Ballymore School of Music, €3,860, 41 days overdue.' },
  { t: '11:20', who: 'Tomasz Nowak', kind: 'staff', text: 'Packed 7 of 14 parcels for today. DPD pallet booked for TR-3317.' },
  { t: '11:05', who: 'Google Ads', kind: 'sys', text: 'Shopping campaign "Harps Christmas" spent €118 today, ROAS 5.8.' },
  { t: '10:52', who: 'Ciarán Doyle', kind: 'staff', text: 'WS-123 Cèilidh 15 moved to Ready. Northside Music School notified.' },
  { t: '10:40', who: 'Support Agent', kind: 'agent', text: 'Resolved 4 web chats automatically (shipping, stock and product questions).' },
  { t: '10:31', who: 'Muzikkon ERP', kind: 'sys', text: 'Trade order TR-3318 €1,240 created for Ballymore School of Music.' },
  { t: '10:12', who: 'Dispatch Agent', kind: 'agent', text: 'Generated 4 DHL Express labels and customs docs for EU and US parcels.' },
  { t: '09:55', who: 'Trustpilot', kind: 'sys', text: 'New 2 star review from J. Hale. Reply drafted.' },
  { t: '09:40', who: 'Sana Malik', kind: 'staff', text: 'Matched 4 Shopify payouts. 3 payouts still unmatched (€1,912.40).' },
  { t: '09:21', who: 'Meta Ads', kind: 'sys', text: 'Meta spend MTD €2,140, ROAS 1.9.' },
  { t: '09:02', who: 'Briefing', kind: 'agent', text: 'Morning brief sent to Umer and Salahuddin.' },
  { t: '08:47', who: 'WhatsApp Business', kind: 'sys', text: 'Siobhán Ní Fhlatharta asked for an update on MZK-10511.' },
]

export const integrations = [
  { name: 'Shopify', what: 'Storefront muzikkon.com', status: 'Connected', last: '1 min ago', today: '14 orders' },
  { name: 'Muzikkon ERP', what: 'Invoicing, stock, orders, trade customers (custom, API)', status: 'Connected via API', last: '3 min ago', today: '312 records' },
  { name: 'eBay', what: 'Marketplace listings and orders', status: 'Connected', last: '4 min ago', today: '3 orders' },
  { name: 'Shopify Payments', what: 'Card payouts', status: 'Connected', last: '1 h ago', today: '1 payout' },
  { name: 'Stripe', what: 'Showroom card terminal', status: 'Connected', last: '2 h ago', today: '2 payments' },
  { name: 'PayPal', what: 'Web checkout', status: 'Connected', last: '2 h ago', today: '3 payments' },
  { name: 'Support inbox', what: 'info@muzikkon.com', status: 'Connected', last: 'Live', today: '23 emails' },
  { name: 'WhatsApp Business', what: 'Customer messages', status: 'Connected', last: 'Live', today: '9 chats' },
  { name: 'An Post', what: 'Irish parcels and tracking', status: 'Connected', last: '10 min ago', today: '6 labels' },
  { name: 'DPD', what: 'Large parcels IE and UK', status: 'Connected', last: '12 min ago', today: '4 labels' },
  { name: 'DHL Express', what: 'EU and worldwide, customs', status: 'Connected', last: '6 min ago', today: '4 labels' },
  { name: 'Google Ads', what: 'Search and Shopping campaigns', status: 'Connected', last: '30 min ago', today: '€214 spend' },
  { name: 'Google Merchant Center', what: 'Product feed, 612 SKUs', status: 'Warning', last: '1 h ago', today: '4 disapproved' },
  { name: 'Meta Ads', what: 'Facebook and Instagram', status: 'Connected', last: '30 min ago', today: '€96 spend' },
  { name: 'Trustpilot', what: 'Reviews', status: 'Connected', last: '2 h ago', today: '1 review' },
]

export const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}
