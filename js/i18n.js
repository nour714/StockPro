// ============================================================
// THEME & LANGUAGE MODULE
// ============================================================

const translations = {
  ar: {
    // NAV
    mainMenu:        'القائمة الرئيسية',
    inventoryManagement: 'إدارة المستودع',
    commerce:        'التجارة والجهات',
    dashboard:       'لوحة التحكم',
    inventory:       'المخزون',
    movements:       'حركات المخزن',
    suppliers:       'الموردين',
    customers:       'العملاء',
    invoices:        'الفواتير',
    reports:         'التقارير والإحصائيات',
    alerts:          'التنبيهات',
    barcodes:        'طباعة الباركود',
    reportsTitle:    'التقارير',
    system:          'النظام',
    categories:      'الفئات',
    warehouses:      'المخازن',
    settings:        'الإعدادات',
    // USER
    systemAdmin:     'مدير النظام',
    warehouseManager:'مدير المخزن',
    // TOPBAR
    searchPlaceholder:'بحث في المخزون...',
    addProduct:      '➕ إضافة منتج',
    // DASHBOARD titles
    dashTitle:       'لوحة التحكم',
    dashSub:         'مرحباً! نظرة عامة على المخزن',
    inventoryTitle:  'إدارة المخزون',
    inventorySub:    'جميع المنتجات والكميات',
    movementsTitle:  'حركات المخزن',
    movementsSub:    'سجل الوارد والصادر',
    suppliersTitle:  'قائمة الموردين',
    suppliersSub:    'الموردين المعتمدين',
    customersTitle:  'إدارة العملاء',
    customersSub:    'العملاء المسجلين بالنظام',
    invoicesTitle:   'إدارة الفواتير',
    invoicesSub:     'سجل فواتير البيع والشراء',
    reportsPageTitle:'التقارير والإحصائيات',
    reportsSub:      'تحليل شامل للمخزون',
    alertsTitle:     'التنبيهات والإشعارات',
    alertsSub:       'تنبيهات المخزون المنخفض',
    barcodesTitle:   'طباعة الباركود',
    barcodesSub:     'إنشاء وطباعة الباركود للمنتجات',
    categoriesTitle: 'إدارة الفئات',
    categoriesSub:   'إدارة فئات النظام',
    settingsTitle:   'إعدادات النظام',
    settingsSub:     'تخصيص النظام',
    warehousesTitle: 'إدارة المخازن',
    warehousesSub:   'قائمة المخازن المسجلة',
    // STAT CARDS
    totalProducts:   'إجمالي المنتجات',
    inStock:         'منتجات متاحة',
    lowStock:        'مخزون منخفض',
    stockValue:      'قيمة المخزون',
    // SETTINGS PAGE
    storeNameLabel:  'اسم المخزن / الشركة',
    managerNameLabel:'اسم المستخدم',
    currencyLabel:   'العملة',
    appearance_lang_label: 'المظهر واللغة',
    saveSettings:    '💾 حفظ الإعدادات',
    // BUTTONS
    export:          '⬇️ تصدير',
    addNew:          '➕ إضافة',
    addIncoming:     '📥 إضافة وارد',
    addOutgoing:     '📤 إضافة صادر',
    addSupplier:     '➕ إضافة مورد',
    addCustomer:     '➕ إضافة عميل',
    addInvoice:      '➕ إضافة فاتورة',
    addCategory:     '➕ إضافة فئة',
    generateBarcode: '⚙️ إنشاء الباركود',
    printNow:        '🖨️ طباعة الآن',
    viewAll:         'عرض الكل',
    cancel:          'إلغاء',
    save:            '💾 حفظ',
    latestProducts:  'أحدث المنتجات',
    latestProductsSub:'آخر المنتجات المضافة للمخزن',
  },
  en: {
    // NAV
    mainMenu:        'Main Menu',
    inventoryManagement: 'Warehouse Management',
    commerce:        'Commerce & Entities',
    dashboard:       'Dashboard',
    inventory:       'Inventory',
    movements:       'Stock Movements',
    suppliers:       'Suppliers',
    customers:       'Customers',
    invoices:        'Invoices',
    reports:         'Reports & Analytics',
    alerts:          'Alerts',
    barcodes:        'Print Barcodes',
    reportsTitle:    'Reports',
    system:          'System',
    categories:      'Categories',
    warehouses:      'Warehouses',
    settings:        'Settings',
    // USER
    systemAdmin:     'System Admin',
    warehouseManager:'Warehouse Manager',
    // TOPBAR
    searchPlaceholder:'Search inventory...',
    addProduct:      '➕ Add Product',
    // PAGE titles
    dashTitle:       'Dashboard',
    dashSub:         'Welcome! Warehouse overview',
    inventoryTitle:  'Inventory Management',
    inventorySub:    'All products and quantities',
    movementsTitle:  'Stock Movements',
    movementsSub:    'Incoming & outgoing log',
    suppliersTitle:  'Suppliers List',
    suppliersSub:    'Approved suppliers',
    customersTitle:  'Customer Management',
    customersSub:    'Registered customers',
    invoicesTitle:   'Invoice Management',
    invoicesSub:     'Sales & purchase invoices',
    reportsPageTitle:'Reports & Analytics',
    reportsSub:      'Full inventory analysis',
    alertsTitle:     'Alerts & Notifications',
    alertsSub:       'Low stock alerts',
    barcodesTitle:   'Print Barcodes',
    barcodesSub:     'Generate & print product barcodes',
    categoriesTitle: 'Category Management',
    categoriesSub:   'Manage system categories',
    settingsTitle:   'System Settings',
    settingsSub:     'Customize the system',
    warehousesTitle: 'Warehouse Management',
    warehousesSub:   'List of registered warehouses',
    // STAT CARDS
    totalProducts:   'Total Products',
    inStock:         'In Stock',
    lowStock:        'Low Stock',
    stockValue:      'Stock Value',
    // SETTINGS PAGE
    storeNameLabel:  'Store / Company Name',
    managerNameLabel:'Manager Name',
    currencyLabel:   'Currency',
    appearance_lang_label: 'Appearance & Language',
    saveSettings:    '💾 Save Settings',
    // BUTTONS
    export:          '⬇️ Export',
    addNew:          '➕ Add',
    addIncoming:     '📥 Add Incoming',
    addOutgoing:     '📤 Add Outgoing',
    addSupplier:     '➕ Add Supplier',
    addCustomer:     '➕ Add Customer',
    addInvoice:      '➕ Add Invoice',
    addCategory:     '➕ Add Category',
    generateBarcode: '⚙️ Generate Barcode',
    printNow:        '🖨️ Print Now',
    viewAll:         'View All',
    cancel:          'Cancel',
    save:            '💾 Save',
    latestProducts:  'Latest Products',
    latestProductsSub:'Recently added products',
  }
};

// Current state
let currentLang  = localStorage.getItem('stockpro_lang')  || 'ar';
let currentTheme = localStorage.getItem('stockpro_theme') || 'dark';

// ── THEME ────────────────────────────────────────────────────
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('stockpro_theme', currentTheme);
  applyTheme();
}

function applyTheme() {
  const html = document.getElementById('htmlRoot');
  if (currentTheme === 'light') {
    html.classList.add('light-mode');
  } else {
    html.classList.remove('light-mode');
  }
  
  // Update all theme buttons
  const themeText = currentTheme === 'dark' ? '☀️' : '🌙';
  ['themeToggleBtn', 'setThemeBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.textContent = themeText;
  });
}

// ── LANGUAGE ─────────────────────────────────────────────────
function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('stockpro_lang', currentLang);
  applyLanguage();
  // Re-render current active page
  const activePage = document.querySelector('.page-section.active');
  if (activePage) {
    const pageId = activePage.id.replace('page-', '');
    if (typeof renderPage === 'function') renderPage(pageId);
  }
}

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

function applyLanguage() {
  const html = document.getElementById('htmlRoot');
  if (currentLang === 'en') {
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
    html.classList.add('ltr-mode');
  } else {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    html.classList.remove('ltr-mode');
  }

  // Update all lang toggle buttons
  const langText = currentLang === 'ar' ? '🌍 EN' : '🌍 عربي';
  ['langToggleBtn', 'setLangBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.textContent = langText;
  });

  // Translate all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });

  // Update stat card labels
  updateStatLabels();
}

function updateStatLabels() {
  const totalPEl = document.querySelector('.stat-card.blue .stat-label');
  const inStEl   = document.querySelector('.stat-card.green .stat-label');
  const lowEl    = document.querySelector('.stat-card.orange .stat-label');
  const valEl    = document.querySelector('.stat-card.purple .stat-label');
  if (totalPEl) totalPEl.textContent = t('totalProducts');
  if (inStEl)   inStEl.textContent   = t('inStock');
  if (lowEl)    lowEl.textContent    = t('lowStock');
  if (valEl)    valEl.textContent    = t('stockValue') + (typeof settings !== 'undefined' ? ` (${settings.currency})` : '');
}

// Page titles map (used by navigate() in app.js)
function getPageTitles(page) {
  const map = {
    dashboard:  [t('dashTitle'),        t('dashSub')],
    inventory:  [t('inventoryTitle'),   t('inventorySub')],
    movements:  [t('movementsTitle'),   t('movementsSub')],
    suppliers:  [t('suppliersTitle'),   t('suppliersSub')],
    customers:  [t('customersTitle'),   t('customersSub')],
    invoices:   [t('invoicesTitle'),    t('invoicesSub')],
    reports:    [t('reportsPageTitle'), t('reportsSub')],
    alerts:     [t('alertsTitle'),      t('alertsSub')],
    barcodes:   [t('barcodesTitle'),    t('barcodesSub')],
    categories: [t('categoriesTitle'),  t('categoriesSub')],
    warehouses: [t('warehousesTitle'),  t('warehousesSub')],
    settings:   [t('settingsTitle'),    t('settingsSub')],
  };
  return map[page] || [page, ''];
}

// ── INIT ─────────────────────────────────────────────────────
applyTheme();
