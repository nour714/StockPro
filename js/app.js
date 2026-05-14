// ============================================================
// AUTH CHECK
// ============================================================
if (!localStorage.getItem('stockpro_user')) {
    window.location.href = 'login.html';
}

const currentUser = JSON.parse(localStorage.getItem('stockpro_user'));

function logout() {
    localStorage.removeItem('stockpro_user');
    window.location.href = 'login.html';
}

function updateUserInfo() {
    if (currentUser) {
        document.getElementById('displayUserName').textContent = currentUser.name;
        document.getElementById('displayUserRole').textContent = currentUser.role === 'admin' ? 'مدير النظام' : 'موظف';
    }
}

// STORAGE HELPERS
// ============================================================
const storage = {
  save: (key, data) => localStorage.setItem('stockpro_' + key, JSON.stringify(data)),
  get: (key) => JSON.parse(localStorage.getItem('stockpro_' + key))
};

// ============================================================
// DATA
// ============================================================
let products = storage.get('products') || [
  { id: 1, name: 'لابتوب ديل XPS 13', sku: 'DELL-XPS-001', category: 'إلكترونيات', unit: 'قطعة', qty: 45, minQty: 5, buyPrice: 55000, sellPrice: 62000, supplier: 'شركة ديل مصر', location: 'رف A-1', notes: '' },
  { id: 2, name: 'طابعة HP LaserJet Pro', sku: 'HP-LJ-002', category: 'إلكترونيات', unit: 'قطعة', qty: 8, minQty: 8, buyPrice: 12500, sellPrice: 14800, supplier: 'HP مصر', location: 'رف A-2', notes: '' },
  { id: 3, name: 'ورق A4 Double A', sku: 'PPR-A4-003', category: 'أدوات', unit: 'علبة', qty: 3, minQty: 50, buyPrice: 850, sellPrice: 980, supplier: 'مكتبة الأمل', location: 'رف B-1', notes: 'مخزون منخفض' },
  { id: 4, name: 'كيبورد لاسلكي لوجيتك', sku: 'KBD-WLS-004', category: 'إلكترونيات', unit: 'قطعة', qty: 0, minQty: 5, buyPrice: 2200, sellPrice: 2800, supplier: 'Logitech', location: 'رف A-3', notes: '' },
  { id: 5, name: 'شاشة سامسونج 27" منحنية', sku: 'SAM-MON-005', category: 'إلكترونيات', unit: 'قطعة', qty: 22, minQty: 10, buyPrice: 8200, sellPrice: 9500, supplier: 'سامسونج مصر', location: 'رف A-4', notes: '' },
  { id: 6, name: 'حبر طابعة HP 85A', sku: 'INK-BLK-006', category: 'أدوات', unit: 'علبة', qty: 4, minQty: 15, buyPrice: 1100, sellPrice: 1450, supplier: 'HP مصر', location: 'رف B-2', notes: '' },
  { id: 7, name: 'مكيف شارب 1.5 طن بلازما', sku: 'ARC-SRP-007', category: 'إلكترونيات', unit: 'قطعة', qty: 12, minQty: 3, buyPrice: 24500, sellPrice: 28000, supplier: 'شارب مصر', location: 'رف C-1', notes: '' },
  { id: 8, name: 'كراسي مكتبية هيدروليك', sku: 'CHR-OFF-008', category: 'أخرى', unit: 'قطعة', qty: 30, minQty: 5, buyPrice: 4500, sellPrice: 5800, supplier: 'موبيليا النيل', location: 'رف D-1', notes: '' },
];

let movements = storage.get('movements') || [
  { id: 1, productId: 1, type: 'in',  qty: 20, date: '2025-04-15', notes: '\u0627\u0633\u062a\u0644\u0627\u0645 \u062f\u0641\u0639\u0629 \u062c\u062f\u064a\u062f\u0629' },
  { id: 2, productId: 2, type: 'out', qty: 3,  date: '2025-04-16', notes: '\u0628\u064a\u0639 \u0644\u0644\u0639\u0645\u064a\u0644 \u0623\u062d\u0645\u062f' },
  { id: 3, productId: 5, type: 'in',  qty: 10, date: '2025-04-18', notes: '\u062a\u0633\u0644\u064a\u0645 \u0645\u0646 \u0627\u0644\u0645\u0648\u0631\u062f' },
  { id: 4, productId: 3, type: 'out', qty: 17, date: '2025-04-19', notes: '\u0635\u0631\u0641 \u0644\u0644\u0642\u0633\u0645 \u0627\u0644\u0625\u062f\u0627\u0631\u064a' },
  { id: 5, productId: 7, type: 'in',  qty: 5,  date: '2025-04-20', notes: '\u062f\u0641\u0639\u0629 \u0645\u0648\u0633\u0645 \u0635\u064a\u0641' },
];

let suppliers = storage.get('suppliers') || [
  { id: 1, name: '\u0634\u0631\u0643\u0629 \u062f\u064a\u0644 \u0645\u0635\u0631',   phone: '01012345678', email: 'dell@egypt.com',    category: '\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a', address: '\u0627\u0644\u0642\u0627\u0647\u0631\u0629\u060c \u0645\u062f\u064a\u0646\u0629 \u0646\u0635\u0631' },
  { id: 2, name: 'HP \u0645\u0635\u0631',          phone: '01234567890', email: 'hp@egypt.com',      category: '\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a', address: '\u0627\u0644\u0642\u0627\u0647\u0631\u0629\u060c \u0627\u0644\u0645\u0639\u0627\u062f\u064a'   },
  { id: 3, name: '\u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0623\u0645\u0644',    phone: '01111111111', email: 'alamal@mail.com',   category: '\u0623\u062e\u0631\u0649',        address: '\u0627\u0644\u062c\u064a\u0632\u0629\u060c \u0627\u0644\u0645\u0647\u0646\u062f\u0633\u064a\u0646' },
  { id: 4, name: '\u0633\u0627\u0645\u0633\u0648\u0646\u062c \u0645\u0635\u0631',   phone: '01555555555', email: 'samsung@egypt.com', category: '\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a', address: '\u0627\u0644\u0642\u0627\u0647\u0631\u0629\u060c \u0647\u0644\u064a\u0648\u0628\u0648\u0644\u064a\u0633' },
];

let customers = [];
let warehouses = [];

let categories = storage.get('categories') || ['\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a', '\u0645\u0644\u0627\u0628\u0633', '\u0623\u063a\u0630\u064a\u0629', '\u0623\u062f\u0648\u0627\u062a', '\u0645\u0648\u0627\u062f \u0628\u0646\u0627\u0621', '\u0623\u062e\u0631\u0649'];

let invoices = storage.get('invoices') || [
  { id: 1, type: 'sale',     entityId: 1, date: '2025-04-16', total: 4100,  status: '\u0645\u062f\u0641\u0648\u0639' },
  { id: 2, type: 'purchase', entityId: 1, date: '2025-04-18', total: 75000, status: '\u0622\u062c\u0644'   },
];
let settings = storage.get('settings') || { storeName: 'StockPro', managerName: 'أحمد محمود', currency: 'جنيه' };

let currentFilter = 'all';

let nextProductId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
let nextMovementId = movements.length ? Math.max(...movements.map(m => m.id)) + 1 : 1;
let nextSupplierId = suppliers.length ? Math.max(...suppliers.map(s => s.id)) + 1 : 1;
let nextCustomerId = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1;
let nextInvoiceId = invoices.length ? Math.max(...invoices.map(i => i.id)) + 1 : 1;

function saveData() {
  storage.save('products', products);
  storage.save('movements', movements);
  storage.save('suppliers', suppliers);
  storage.save('customers', customers);
  storage.save('categories', categories);
  storage.save('invoices', invoices);
  storage.save('settings', settings);
  updateDynamicBadges();
}

function updateDynamicBadges() {
  const low = products.filter(p => p.qty <= p.minQty).length;
  
  // Inventory badge
  const lowStockBadge = document.getElementById('lowStockBadge');
  if (lowStockBadge) {
    lowStockBadge.textContent = low;
    lowStockBadge.style.display = low > 0 ? 'flex' : 'none';
  }

  // Alerts badge
  const alertsBadge = document.getElementById('alertsBadge');
  if (alertsBadge) {
    alertsBadge.textContent = low;
    alertsBadge.style.display = low > 0 ? 'flex' : 'none';
  }
}

// ============================================================
// NAVIGATION
// ============================================================
function navigate(page, el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  const titlePair = (typeof getPageTitles === 'function')
    ? getPageTitles(page)
    : [page, ''];

  // Wrap last word in accent span
  const parts = titlePair[0].split(' ');
  const last  = parts.pop();
  document.getElementById('pageTitle').innerHTML = parts.join(' ') + (parts.length ? ' ' : '') + '<span>' + last + '</span>';
  document.getElementById('pageSubtitle').textContent = titlePair[1];

  renderPage(page);
  document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ============================================================
// RENDER
// ============================================================
function renderPage(page) {
  if (page === 'dashboard') renderDashboard();
  if (page === 'inventory') renderInventory(currentFilter);
  if (page === 'movements') renderMovements();
  if (page === 'suppliers') renderSuppliers();
  if (page === 'customers') renderCustomers();
  if (page === 'invoices') renderInvoices();
  if (page === 'categories') renderCategories();
  if (page === 'warehouses') renderWarehouses();
  if (page === 'barcodes') renderBarcodesPage();
  if (page === 'reports') renderReports();
  if (page === 'alerts') renderAlerts();
}

const catEmojis = {
  'إلكترونيات': '💻', 'ملابس': '👕', 'أغذية': '🍎', 'أدوات': '🔧',
  'مواد بناء': '🧱', 'أخرى': '📋'
};

function getStockBadge(p) {
  if (p.qty === 0) return '<span class="badge badge-danger">نفذ</span>';
  if (p.qty <= p.minQty) return '<span class="badge badge-warning">منخفض</span>';
  return '<span class="badge badge-success">متاح</span>';
}

function getStockColor(p) {
  if (p.qty === 0) return 'var(--danger)';
  if (p.qty <= p.minQty) return 'var(--warning)';
  return 'var(--accent3)';
}

function getStockPct(p) {
  // Use a stable max value (e.g. 5 times the minQty) so the bar visually decreases when stock drops
  const max = Math.max(p.minQty * 5, 10);
  return Math.max(0, Math.min(100, Math.round((p.qty / max) * 100)));
}

function productRowHTML(p, actions = true) {
  const pct = getStockPct(p);
  const actionsHTML = actions ? `
    <div class="action-btns">
      <button class="btn btn-ghost btn-sm" onclick="editProduct(${p.id})">✏️</button>
      <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">🗑️</button>
    </div>` : '';
  return `<tr>
    <td>
      <div class="product-cell">
        <div class="product-thumb" style="background:var(--accent-glow)">${catEmojis[p.category] || '📦'}</div>
        <div>
          <div class="product-name">${p.name}</div>
          <div class="product-sku">${p.sku}</div>
        </div>
      </div>
    </td>
    <td><span class="badge badge-info">${p.category}</span></td>
    <td>
      <div class="stock-bar-wrap">
        <div class="stock-bar"><div class="stock-fill" style="width:${pct}%;background:${getStockColor(p)}"></div></div>
        <span class="stock-num">${p.qty}</span>
      </div>
    </td>
    <td>${getStockBadge(p)}</td>
    <td style="font-family:'JetBrains Mono',monospace;font-size:12px">${p.sellPrice.toLocaleString()} ${settings.currency}</td>
    <td>${p.notes || '-'}</td>
    ${actionsHTML ? '<td>' + actionsHTML + '</td>' : ''}
  </tr>`;
}

function tableHeader(extraCol = true) {
  return `<table><thead><tr>
    <th>المنتج</th><th>الفئة</th><th>الكمية</th><th>الحالة</th><th>سعر البيع</th><th>ملاحظات</th>
    ${extraCol ? '<th>إجراءات</th>' : ''}
  </tr></thead><tbody>`;
}

function renderDashboard() {
  const low = products.filter(p => p.qty <= p.minQty).length;
  const inStock = products.filter(p => p.qty > p.minQty).length;
  const totalVal = products.reduce((s, p) => s + p.qty * p.buyPrice, 0);

  document.getElementById('totalProducts').textContent = products.length;
  document.getElementById('inStockCount').textContent = inStock;
  document.getElementById('lowStockCount').textContent = low;
  document.getElementById('totalValue').textContent = (totalVal / 1000).toFixed(0) + 'K';
  updateDynamicBadges();

  const recent = [...products].slice(-5).reverse();
  document.getElementById('dashboardTable').innerHTML =
    '<div class="table-container">' + tableHeader() + recent.map(p => productRowHTML(p)).join('') + '</tbody></table></div>';
}

function renderInventory(filter = 'all') {
  currentFilter = filter;
  let list = [...products];
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (q) {
    list = list.filter(p => 
      (p.name || '').toLowerCase().includes(q) || 
      (p.sku || '').toLowerCase().includes(q)
    );
  }
  if (filter === 'instock') list = list.filter(p => p.qty > p.minQty);
  if (filter === 'low') list = list.filter(p => p.qty > 0 && p.qty <= p.minQty);
  if (filter === 'out') list = list.filter(p => p.qty === 0);

  document.getElementById('inventoryCount').textContent = `${list.length} منتج`;
  document.getElementById('inventoryTable').innerHTML =
    '<div class="table-container">' + tableHeader() + list.map(p => productRowHTML(p)).join('') + '</tbody></table></div>';
}

function renderMovements() {
  const rows = [...movements].reverse().map(m => {
    const p = products.find(x => x.id === m.productId);
    return `<tr>
      <td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted)">#${m.id.toString().padStart(4,'0')}</td>
      <td>${m.productName || 'محذوف'}</td>
      <td><span class="badge ${m.type === 'in' ? 'badge-success' : 'badge-danger'}">${m.type === 'in' ? '📥 وارد' : '📤 صادر'}</span></td>
      <td style="font-family:'JetBrains Mono',monospace">${m.qty}</td>
      <td>${m.warehouseName || '-'}</td>
      <td>${m.date}</td>
      <td>${m.notes || '-'}</td>
    </tr>`;
  }).join('');

  document.getElementById('movementsTable').innerHTML = `<div class="table-container"><table><thead><tr>
    <th>#</th><th>المنتج</th><th>النوع</th><th>الكمية</th><th>المخزن</th><th>التاريخ</th><th>ملاحظات</th>
  </tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderSuppliers() {
  const rows = suppliers.map(s => `<tr>
    <td><strong>${s.name}</strong></td>
    <td>${s.phone || '-'}</td>
    <td>${s.email || '-'}</td>
    <td><span class="badge badge-info">${s.category}</span></td>
    <td>${s.address || '-'}</td>
    <td>
      <div class="action-btns">
        <button class="btn btn-danger btn-sm" onclick="deleteSupplier(${s.id})">🗑️</button>
      </div>
    </td>
  </tr>`).join('');

  document.getElementById('suppliersTable').innerHTML = `<div class="table-container"><table><thead><tr>
    <th>الاسم</th><th>التليفون</th><th>البريد</th><th>الفئة</th><th>العنوان</th><th>إجراءات</th>
  </tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderReports() {
  const totalIn = movements.filter(m => m.type === 'in').reduce((s, m) => s + m.qty, 0);
  const totalOut = movements.filter(m => m.type === 'out').reduce((s, m) => s + m.qty, 0);
  const cats = [...new Set(products.map(p => p.category))].length;

  const topProduct = products.reduce((a, b) => {
    const aM = movements.filter(m => m.productId === a.id).reduce((s, m) => s + m.qty, 0);
    const bM = movements.filter(m => m.productId === b.id).reduce((s, m) => s + m.qty, 0);
    return bM > aM ? b : a;
  }, products[0]);

  document.getElementById('rTotalIn').textContent = totalIn;
  document.getElementById('rTotalOut').textContent = totalOut;
  document.getElementById('rCategories').textContent = cats;
  document.getElementById('rTopProduct').textContent = topProduct ? topProduct.name.split(' ')[0] : '-';

  const rows = products.map(p => {
    const val = (p.qty * p.buyPrice).toLocaleString();
    return `<tr>
      <td><div class="product-cell"><div class="product-thumb" style="background:var(--accent-glow)">${catEmojis[p.category] || '📦'}</div><div><div class="product-name">${p.name}</div><div class="product-sku">${p.sku}</div></div></div></td>
      <td>${p.qty} ${p.unit}</td>
      <td style="font-family:'JetBrains Mono',monospace">${p.buyPrice.toLocaleString()} ${settings.currency}</td>
      <td style="font-family:'JetBrains Mono',monospace">${p.sellPrice.toLocaleString()} ${settings.currency}</td>
      <td style="font-family:'JetBrains Mono',monospace;color:var(--accent3)">${val} ${settings.currency}</td>
      <td>${getStockBadge(p)}</td>
    </tr>`;
  }).join('');

  document.getElementById('reportTable').innerHTML = `<table><thead><tr>
    <th>المنتج</th><th>الكمية</th><th>سعر الشراء</th><th>سعر البيع</th><th>القيمة الإجمالية</th><th>الحالة</th>
  </tr></thead><tbody>${rows}</tbody></table>`;
}

function renderAlerts() {
  const lowProducts = products.filter(p => p.qty <= p.minQty);
  const html = lowProducts.length === 0
    ? '<div style="padding:30px;text-align:center;color:var(--text-muted)">✅ لا توجد تنبيهات حالياً</div>'
    : lowProducts.map(p => `
      <div class="alert-item ${p.qty === 0 ? 'danger' : 'warning'}">
        <span class="alert-icon">${p.qty === 0 ? '🔴' : '🟡'}</span>
        <div style="flex:1">
          <div style="font-weight:600">${p.name} — ${p.qty === 0 ? 'نفذ المخزون' : 'مخزون منخفض'}</div>
          <div style="font-size:12px;color:var(--text-muted)">الكمية الحالية: ${p.qty} | الحد الأدنى: ${p.minQty}</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="openMovementModal('in');document.getElementById('mProduct').value='${p.id}'">طلب توريد</button>
      </div>`).join('');

  document.getElementById('alertsList').innerHTML = html;
}

function openModal(id = null) {
  editingId = id;
  document.getElementById('modalTitle').textContent = id ? '✏️ تعديل المنتج' : '➕ إضافة منتج جديد';

  // Populate suppliers datalist
  const supList = document.getElementById('suppliersList');
  if (supList) {
    supList.innerHTML = suppliers.map(s => `<option value="${s.name}">`).join('');
  }

  if (id) {
    const p = products.find(x => x.id === id);
    document.getElementById('pName').value = p.name;
    document.getElementById('pSku').value = p.sku;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pUnit').value = p.unit;
    document.getElementById('pQty').value = p.qty;
    document.getElementById('pMinQty').value = p.minQty;
    document.getElementById('pBuyPrice').value = p.buyPrice;
    document.getElementById('pSellPrice').value = p.sellPrice;
    document.getElementById('pSupplier').value = p.supplier || '';
    document.getElementById('pNotes').value = p.notes;
  } else {
    ['pName','pSku','pQty','pMinQty','pBuyPrice','pSellPrice','pSupplier','pNotes','pCategory','pUnit'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('pMinQty').value = 10;
  }

  document.getElementById('addModal').classList.add('active');
}

function closeModal() { document.getElementById('addModal').classList.remove('active'); }

async function saveProduct() {
  const name = document.getElementById('pName').value.trim();
  const sku = document.getElementById('pSku').value.trim();
  const qty = parseInt(document.getElementById('pQty').value) || 0;

  if (!name || !sku) { showToast('يرجى ملء الحقول المطلوبة', 'error'); return; }

  const data = {
    id: editingId || 0,
    name, sku,
    category: document.getElementById('pCategory').value,
    unit: document.getElementById('pUnit').value,
    qty,
    minQty: parseInt(document.getElementById('pMinQty').value) || 10,
    buyPrice: parseFloat(document.getElementById('pBuyPrice').value) || 0,
    sellPrice: parseFloat(document.getElementById('pSellPrice').value) || 0,
    supplier: document.getElementById('pSupplier').value,
    notes: document.getElementById('pNotes').value,
  };

  try {
    const res = await fetch('/api/saveProduct', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    
    if (result.success) {
      showToast(editingId ? 'تم تعديل المنتج بنجاح ✅' : 'تم إضافة المنتج بنجاح ✅', 'success');
      closeModal();
      await loadDataFromAPI();
      renderPage('inventory');
    } else {
      showToast(result.message || 'فشل حفظ المنتج ❌', 'error');
    }
  } catch (e) {
    showToast('حدث خطأ في الاتصال بالخادم', 'error');
  }
}

function editProduct(id) { navigate('inventory', document.querySelectorAll('.nav-item')[1]); openModal(id); }

async function deleteProduct(id) {
  if (!confirm('هل تريد حذف هذا المنتج؟')) return;
  try {
    await fetch('/api/deleteProduct', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    });
    showToast('تم حذف المنتج', 'error');
    await loadDataFromAPI();
    renderInventory(currentFilter);
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

function openMovementModal(type) {
  movementType = type;
  document.getElementById('movementTitle').textContent = type === 'in' ? '📥 إضافة وارد' : '📤 إضافة صادر';
  document.getElementById('movementSaveBtn').textContent = type === 'in' ? '💾 حفظ الوارد' : '💾 حفظ الصادر';
  document.getElementById('mDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('mQty').value = '';
  document.getElementById('mNotes').value = '';

  const sel = document.getElementById('mProduct');
  sel.innerHTML = products.map(p => `<option value="${p.id}">${p.name} (${p.qty} ${p.unit})</option>`).join('');

  const wSel = document.getElementById('mWarehouse');
  if (wSel) {
    wSel.innerHTML = warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('');
  }

  document.getElementById('movementModal').classList.add('active');
}

async function saveMovement() {
  const productId = parseInt(document.getElementById('mProduct').value);
  const qty = parseInt(document.getElementById('mQty').value);

  if (!qty || qty <= 0) { showToast('يرجى إدخال كمية صحيحة', 'error'); return; }

  const p = products.find(x => x.id === productId);
  if (movementType === 'out' && qty > p.qty) { showToast('الكمية أكبر من المخزون المتاح!', 'error'); return; }

  const data = {
    productId,
    warehouseId: parseInt(document.getElementById('mWarehouse').value),
    type: movementType,
    qty,
    date: document.getElementById('mDate').value,
    notes: document.getElementById('mNotes').value,
  };

  try {
    await fetch('/api/saveMovement', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    document.getElementById('movementModal').classList.remove('active');
    showToast(`تم تسجيل ${movementType === 'in' ? 'الوارد' : 'الصادر'} بنجاح ✅`, 'success');
    await loadDataFromAPI();
    renderMovements();
    renderInventory(currentFilter);
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

function openSupplierModal() {
  ['sName','sPhone','sEmail','sAddress','sCategory'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('supplierModal').classList.add('active');
}

async function saveSupplier() {
  const name = document.getElementById('sName').value.trim();
  if (!name) { showToast('يرجى إدخال اسم المورد', 'error'); return; }

  const data = {
    name,
    phone: document.getElementById('sPhone').value,
    email: document.getElementById('sEmail').value,
    address: document.getElementById('sAddress').value,
    category: document.getElementById('sCategory').value,
  };

  try {
    await fetch('/api/saveSupplier', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    document.getElementById('supplierModal').classList.remove('active');
    showToast('تم إضافة المورد بنجاح ✅', 'success');
    await loadDataFromAPI();
    renderSuppliers();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

async function deleteSupplier(id) {
  if (!confirm('هل تريد حذف هذا المورد؟')) return;
  try {
    await fetch('/api/deleteSupplier', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    });
    showToast('تم حذف المورد', 'error');
    await loadDataFromAPI();
    renderSuppliers();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

// ============================================================
// TABS & SEARCH
// ============================================================
function filterTab(filter, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderInventory(filter);
}

function searchProducts() {
  const q = document.getElementById('searchInput').value.trim();
  if (q && !document.getElementById('page-inventory').classList.contains('active')) {
    // Navigate to inventory page if not already there
    navigate('inventory', document.querySelectorAll('.nav-item')[1]);
  }
  renderInventory(currentFilter);
}

// ============================================================
// EXPORT
// ============================================================
function exportCSV() {
  const headers = ['الاسم', 'SKU', 'الفئة', 'الوحدة', 'الكمية', 'الحد الأدنى', 'سعر الشراء', 'سعر البيع', 'المورد', 'ملاحظات'];
  const rows = products.map(p => [p.name, p.sku, p.category, p.unit, p.qty, p.minQty, p.buyPrice, p.sellPrice, p.supplier, p.notes]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'inventory_export.csv';
  a.click();
  showToast('تم تصدير البيانات بنجاح ✅', 'success');
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${msg}`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function renderCustomers() {
  const rows = customers.map(c => `<tr>
    <td><strong>${c.name}</strong></td>
    <td>${c.phone || '-'}</td>
    <td>${c.email || '-'}</td>
    <td>${c.address || '-'}</td>
    <td>
      <div class="action-btns">
        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${c.id})">🗑️</button>
      </div>
    </td>
  </tr>`).join('');

  document.getElementById('customersTable').innerHTML = `<table><thead><tr>
    <th>الاسم</th><th>التليفون</th><th>البريد</th><th>العنوان</th><th>إجراءات</th>
  </tr></thead><tbody>${rows}</tbody></table>`;
}

function openCustomerModal() {
  ['cName','cPhone','cEmail','cAddress'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('customerModal').classList.add('active');
}

async function saveCustomer() {
  const name = document.getElementById('cName').value.trim();
  if (!name) { showToast('يرجى إدخال اسم العميل', 'error'); return; }

  const data = {
    name,
    phone: document.getElementById('cPhone').value,
    email: document.getElementById('cEmail').value,
    address: document.getElementById('cAddress').value,
  };

  try {
    await fetch('/api/saveCustomer', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    document.getElementById('customerModal').classList.remove('active');
    showToast('تم إضافة العميل بنجاح ✅', 'success');
    await loadDataFromAPI();
    renderCustomers();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

async function deleteCustomer(id) {
  if(!confirm('حذف العميل؟')) return;
  try {
    await fetch('/api/deleteCustomer', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    });
    showToast('تم حذف العميل', 'error');
    await loadDataFromAPI();
    renderCustomers();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

function populateCategories() {
  // Not needed since we switched to input fields
}

function renderCategories() {
  const rows = categories.map((c, i) => {
    const count = products.filter(p => p.category === c).length;
    return `<tr>
      <td><strong>${c}</strong></td>
      <td>${count} منتج</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteCategory(${i})">🗑️</button>
      </td>
    </tr>`;
  }).join('');
  document.getElementById('categoriesTable').innerHTML = `<table><thead><tr><th>اسم الفئة</th><th>عدد المنتجات</th><th>إجراءات</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderWarehouses() {
  const rows = warehouses.map(w => `<tr>
    <td><strong>${w.name}</strong></td>
    <td>${w.location || '-'}</td>
    <td>${w.manager || '-'}</td>
    <td>
      <div class="action-btns">
        <button class="btn btn-danger btn-sm" onclick="deleteWarehouse(${w.id})">🗑️</button>
      </div>
    </td>
  </tr>`).join('');

  document.getElementById('warehousesTable').innerHTML = `<table><thead><tr>
    <th>الاسم</th><th>الموقع</th><th>المدير</th><th>إجراءات</th>
  </tr></thead><tbody>${rows}</tbody></table>`;
}

function openWarehouseModal() {
  ['wName','wLocation','wManager'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('warehouseModal').classList.add('active');
}

async function saveWarehouse() {
  const name = document.getElementById('wName').value.trim();
  if (!name) { showToast('يرجى إدخال اسم المخزن', 'error'); return; }

  const data = {
    name,
    location: document.getElementById('wLocation').value,
    manager: document.getElementById('wManager').value,
  };

  try {
    await fetch('/api/saveWarehouse', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    document.getElementById('warehouseModal').classList.remove('active');
    showToast('تم إضافة المخزن بنجاح ✅', 'success');
    await loadDataFromAPI();
    renderWarehouses();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

async function deleteWarehouse(id) {
  if(!confirm('حذف المخزن؟')) return;
  try {
    await fetch('/api/deleteWarehouse', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    });
    showToast('تم حذف المخزن', 'error');
    await loadDataFromAPI();
    renderWarehouses();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

function openCategoryModal() {
  document.getElementById('catName').value = '';
  document.getElementById('categoryModal').classList.add('active');
}

async function saveCategory() {
  const name = document.getElementById('catName').value.trim();
  if (!name) return showToast('أدخل اسم الفئة', 'error');
  if (categories.includes(name)) return showToast('الفئة موجودة مسبقاً', 'error');
  try {
    await fetch('/api/saveCategory', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name})
    });
    document.getElementById('categoryModal').classList.remove('active');
    showToast('تمت الإضافة بنجاح', 'success');
    await loadDataFromAPI();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

async function deleteCategory(index) {
  if(!confirm('حذف الفئة؟')) return;
  const name = categories[index];
  try {
    await fetch('/api/deleteCategory', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name})
    });
    showToast('تم الحذف', 'error');
    await loadDataFromAPI();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

function renderInvoices() {
  const rows = invoices.map(inv => {
    const isSale = inv.type === 'sale';
    const entityList = isSale ? customers : suppliers;
    const entity = entityList.find(e => e.id === inv.entityId);
    const entityName = inv.entityName || (entity ? entity.name : '-');
    const p = products.find(x => x.id === inv.productId);
    const productName = inv.productName || (p ? p.name : '-');
    return `<tr>
      <td style="font-family:'JetBrains Mono',monospace">#${inv.id.toString().padStart(4,'0')}</td>
      <td><span class="badge ${isSale ? 'badge-info' : 'badge-warning'}">${isSale ? 'بيع' : 'شراء'}</span></td>
      <td>${entityName}</td>
      <td>${productName}</td>
      <td style="font-family:'JetBrains Mono',monospace">${inv.total.toLocaleString()} ${settings.currency}</td>
      <td>${inv.date}</td>
      <td><span class="badge ${inv.status === 'مدفوع' ? 'badge-success' : (inv.status === 'ملغى' ? 'badge-danger' : 'badge-warning')}">${inv.status}</span></td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteInvoice(${inv.id})">🗑️</button></td>
    </tr>`;
  }).join('');
  document.getElementById('invoicesTable').innerHTML = `<table><thead><tr><th>رقم</th><th>النوع</th><th>الجهة</th><th>المنتج</th><th>الإجمالي</th><th>التاريخ</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function toggleInvoiceEntity() {
  const type = document.getElementById('invType').value;
  const list = document.getElementById('entitiesList');
  if (!list) return;
  
  if (type === 'sale') {
    list.innerHTML = customers.map(c => `<option value="${c.name}">`).join('');
  } else {
    list.innerHTML = suppliers.map(s => `<option value="${s.name}">`).join('');
  }
}

function openInvoiceModal() {
  document.getElementById('invDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('invTotal').value = '';
  document.getElementById('invStatus').value = 'مدفوع';
  document.getElementById('invType').value = 'sale';
  document.getElementById('invProduct').value = '';
  
  toggleInvoiceEntity(); // Populate the entity dropdown based on initial type (sale)

  // Populate products datalist in invoice
  const prodList = document.getElementById('productsList');
  if (prodList) {
    prodList.innerHTML = products.map(p => `<option value="${p.name}">`).join('');
  }
  
  document.getElementById('invoiceModal').classList.add('active');
}

async function saveInvoice() {
  const total = parseFloat(document.getElementById('invTotal').value);
  if (!total) return showToast('أدخل الإجمالي', 'error');
  
  const data = {
    type: document.getElementById('invType').value,
    entityName: document.getElementById('invEntity').value,
    productName: document.getElementById('invProduct').value,
    date: document.getElementById('invDate').value,
    total: total,
    status: document.getElementById('invStatus').value
  };

  try {
    await fetch('/api/saveInvoice', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    document.getElementById('invoiceModal').classList.remove('active');
    showToast('تم حفظ الفاتورة بنجاح ✅', 'success');
    await loadDataFromAPI();
    renderInvoices();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

async function deleteInvoice(id) {
  if(!confirm('حذف الفاتورة؟')) return;
  try {
    await fetch('/api/deleteInvoice', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    });
    showToast('تم الحذف', 'error');
    await loadDataFromAPI();
    renderInvoices();
  } catch (e) {
    showToast('حدث خطأ', 'error');
  }
}

function renderBarcodesPage() {
  document.getElementById('barcodeProduct').innerHTML = products.map(p => `<option value="${p.sku}">${p.name} (${p.sku})</option>`).join('');
  document.getElementById('barcodePreviewCard').style.display = 'none';
}

function generateBarcodes() {
  const sku = document.getElementById('barcodeProduct').value;
  const qty = parseInt(document.getElementById('barcodeQty').value);
  const p = products.find(x => x.sku === sku);
  
  if(!sku || !qty || qty < 1) return showToast('تأكد من البيانات', 'error');
  
  const grid = document.getElementById('barcodeGrid');
  grid.innerHTML = '';
  
  for(let i = 0; i < qty; i++) {
    const item = document.createElement('div');
    item.className = 'barcode-item';
    item.innerHTML = `
      <div style="font-size:12px;font-weight:bold;margin-bottom:5px;">${settings.storeName}</div>
      <div style="font-size:11px;margin-bottom:5px;">${p.name}</div>
      <div style="font-size:11px;margin-bottom:5px;">${p.sellPrice} ${settings.currency}</div>
      <svg class="barcode-svg" jsbarcode-value="${sku}" jsbarcode-width="1.5" jsbarcode-height="40" jsbarcode-displayvalue="true"></svg>
    `;
    grid.appendChild(item);
  }
  
  document.getElementById('barcodePreviewCard').style.display = 'block';
  if(window.JsBarcode) {
    JsBarcode(".barcode-svg").init();
  } else {
    setTimeout(() => { if(window.JsBarcode) JsBarcode(".barcode-svg").init(); }, 500);
  }
}

function saveSettings() {
  const oldCurrency = settings.currency || 'جنيه';
  const newCurrency = document.getElementById('setCurrency').value;

  settings.storeName = document.getElementById('setStoreName').value;
  settings.managerName = document.getElementById('setManagerName').value;
  settings.currency = newCurrency;

  // Currency Conversion Logic
  if (oldCurrency !== newCurrency) {
    const rates = {
      'جنيه': 1,      // Base: EGP
      'ريال': 13.3,   // 1 SAR = ~13.3 EGP
      'درهم': 13.6,   // 1 AED = ~13.6 EGP
      '$': 50         // 1 USD = ~50 EGP
    };
    
    // Calculate conversion rate from old to new currency
    const rate = rates[oldCurrency] / rates[newCurrency];
    
    // Convert all product prices
    products.forEach(p => {
      p.buyPrice = parseFloat((p.buyPrice * rate).toFixed(2));
      p.sellPrice = parseFloat((p.sellPrice * rate).toFixed(2));
    });

    // Convert all invoice totals
    invoices.forEach(inv => {
      inv.total = parseFloat((inv.total * rate).toFixed(2));
    });
  }

  applySettings();
  saveData();
  showToast(currentLang === 'ar' ? 'تم حفظ الإعدادات وتحويل العملة' : 'Settings & currency saved', 'success');
  
  // Re-render pages to show new prices
  renderDashboard();
  renderInventory(currentFilter);
  renderInvoices();
}

function applySettings() {
  document.querySelector('.logo-text').textContent = settings.storeName;
  document.querySelector('.user-name').textContent = settings.managerName;
  document.querySelector('.stat-card.purple .stat-label').textContent = `قيمة المخزون (${settings.currency})`;
  
  // Update settings page inputs
  if(document.getElementById('setStoreName')) {
    document.getElementById('setStoreName').value = settings.storeName;
    document.getElementById('setManagerName').value = settings.managerName;
    document.getElementById('setCurrency').value = settings.currency;
  }
}

function resetAllData() {
  if (!confirm(currentLang === 'ar'
    ? 'هل تريد مسح جميع البيانات والعودة للبيانات الافتراضية؟ لا يمكن التراجع!'
    : 'Reset all data to defaults? This cannot be undone!')) return;
  ['products','movements','suppliers','customers','categories','invoices','settings'].forEach(k => {
    localStorage.removeItem('stockpro_' + k);
  });
  location.reload();
}

// ============================================================
// INIT
// ============================================================
async function loadDataFromAPI() {
    try {
        const res = await fetch('/api/getAll');
        const data = await res.json();
        if(data.products) products = data.products;
        if(data.movements) movements = data.movements;
        if(data.suppliers) suppliers = data.suppliers;
        if(data.categories) categories = data.categories;
        if(data.warehouses) warehouses = data.warehouses;
        if(data.customers) customers = data.customers;
        if(data.invoices) invoices = data.invoices;
        
        applySettings();
        populateCategories();
        if (typeof applyLanguage === 'function') applyLanguage();
        renderDashboard();
        updateUserInfo();
    } catch (e) {
        console.error("API Load Error", e);
        applySettings();
        populateCategories();
        if (typeof applyLanguage === 'function') applyLanguage();
        renderDashboard();
        updateUserInfo();
    } finally {
        // Hide Loader with delay for premium feel
        setTimeout(() => {
            const loader = document.getElementById('appLoader');
            if(loader) loader.classList.add('fade-out');
        }, 800);
    }
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if(!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${msg}`;
  container.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

loadDataFromAPI();
