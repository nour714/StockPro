require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '/')));

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'warehouse_db',
    port: process.env.DB_PORT || 3306,
    ssl: process.env.DB_HOST ? { 
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2' 
    } : undefined, // Flexible SSL for Aiven
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Helper for queries
async function query(sql, params) {
    const [results, ] = await pool.execute(sql, params);
    return results;
}

// ---------------------------------------------------------
// Login API Endpoint
// ---------------------------------------------------------
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.json({ success: false, message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
    }
    
    try {
        const users = await query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 1) {
            const user = users[0];
            const match = await bcrypt.compare(password, user.password_hash);
            
            if (match) {
                res.json({
                    success: true,
                    user: {
                        id: user.user_id,
                        name: user.full_name,
                        role: user.role
                    }
                });
            } else {
                res.json({ success: false, message: 'كلمة المرور غير صحيحة' });
            }
        } else {
            res.json({ success: false, message: 'الحساب غير موجود' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'خطأ في الخادم: ' + err.message });
    }
});

// ---------------------------------------------------------
// Main API Endpoints
// ---------------------------------------------------------

app.get('/api/getAll', async (req, res) => {
    try {
        const productsRaw = await query(`
            SELECT p.*, c.name as category, s.name as supplier, 
                   COALESCE(SUM(pw.quantity), 0) as total_qty
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.category_id 
            LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
            LEFT JOIN product_warehouse pw ON p.product_id = pw.product_id
            GROUP BY p.product_id
        `);
        
        const productsArr = productsRaw.map(p => ({
            id: p.product_id,
            name: p.name,
            sku: p.sku,
            category: p.category || 'أخرى',
            unit: p.unit,
            qty: parseInt(p.total_qty),
            minQty: p.min_qty,
            buyPrice: parseFloat(p.buy_price),
            sellPrice: parseFloat(p.sell_price),
            supplier: p.supplier || '',
            notes: p.notes
        }));

        const movementsRaw = await query(`
            SELECT m.*, p.name as product_name, w.name as warehouse_name 
            FROM stock_movements m
            JOIN products p ON m.product_id = p.product_id
            LEFT JOIN warehouses w ON m.warehouse_id = w.warehouse_id
            ORDER BY m.created_at DESC
        `);
        
        const movementsArr = movementsRaw.map(m => ({
            id: m.movement_id,
            productId: m.product_id,
            productName: m.product_name,
            warehouseName: m.warehouse_name,
            type: m.type,
            qty: m.quantity,
            date: m.movement_date ? new Date(m.movement_date).toISOString().split('T')[0] : null,
            notes: m.notes
        }));

        const suppliersRaw = await query('SELECT * FROM suppliers');
        const suppliersArr = suppliersRaw.map(s => ({
            id: s.supplier_id,
            name: s.name,
            phone: s.phone,
            email: s.email,
            address: s.address
        }));

        const categoriesRaw = await query('SELECT * FROM categories');
        const categoriesArr = categoriesRaw.map(c => c.name);

        const warehousesRaw = await query('SELECT * FROM warehouses');
        const warehousesArr = warehousesRaw.map(w => ({
            id: w.warehouse_id,
            name: w.name,
            location: w.location,
            manager: w.manager
        }));

        const customersRaw = await query('SELECT * FROM customers');
        const customersArr = customersRaw.map(c => ({
            id: c.customer_id,
            name: c.name,
            phone: c.phone,
            email: c.email,
            address: c.address
        }));

        const salesRaw = await query(`
            SELECT s.*, c.name as customer_name 
            FROM sales s 
            LEFT JOIN customers c ON s.customer_id = c.customer_id 
            ORDER BY s.created_at DESC
        `);
        const salesArr = salesRaw.map(s => ({
            id: s.sale_id,
            type: 'sale',
            entityName: s.customer_name || 'عميل خارجي',
            date: s.created_at ? new Date(s.created_at).toISOString().split('T')[0] : null,
            total: parseFloat(s.total_amount),
            status: s.status
        }));

        res.json({
            products: productsArr,
            movements: movementsArr,
            suppliers: suppliersArr,
            categories: categoriesArr,
            warehouses: warehousesArr,
            customers: customersArr,
            invoices: salesArr
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/saveProduct', async (req, res) => {
    try {
        const { id, name, sku, category, supplier, unit, minQty, buyPrice, sellPrice, notes } = req.body;
        
        const catRes = await query("SELECT category_id FROM categories WHERE name = ?", [category || '']);
        const catId = catRes.length > 0 ? catRes[0].category_id : null;

        const supRes = await query("SELECT supplier_id FROM suppliers WHERE name = ?", [supplier || '']);
        const supId = supRes.length > 0 ? supRes[0].supplier_id : null;

        if (id > 0) {
            await query(
                "UPDATE products SET name=?, sku=?, category_id=?, supplier_id=?, unit=?, min_qty=?, buy_price=?, sell_price=?, notes=? WHERE product_id=?",
                [name, sku, catId, supId, unit || 'قطعة', minQty || 10, buyPrice || 0, sellPrice || 0, notes || '', id]
            );
        } else {
            await query(
                "INSERT INTO products (name, sku, category_id, supplier_id, unit, min_qty, buy_price, sell_price, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, sku, catId, supId, unit || 'قطعة', minQty || 10, buyPrice || 0, sellPrice || 0, notes || '']
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        let msg = 'خطأ في قاعدة البيانات';
        if (err.code === 'ER_DUP_ENTRY') msg = 'عذراً، كود المنتج (SKU) مكرر وموجود مسبقاً';
        res.json({ success: false, message: msg });
    }
});

app.post('/api/deleteProduct', async (req, res) => {
    try {
        await query("DELETE FROM products WHERE product_id=?", [req.body.id]);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/saveMovement', async (req, res) => {
    try {
        const { productId, type, qty, date, notes } = req.body;
        let warehouseId = req.body.warehouseId || 0;

        if (warehouseId === 0) {
            const wRes = await query("SELECT warehouse_id FROM warehouses LIMIT 1");
            if (wRes.length > 0) {
                warehouseId = wRes[0].warehouse_id;
            } else {
                return res.json({ success: false, message: 'لا يوجد مخازن مسجلة' });
            }
        }

        const check = await query("SELECT * FROM product_warehouse WHERE product_id=? AND warehouse_id=?", [productId, warehouseId]);
        
        if (check.length > 0) {
            const currentQty = check[0].quantity;
            
            if (type === 'out' && qty > currentQty) {
                return res.json({ success: false, message: 'الكمية أكبر من المخزون المتاح في هذا المخزن!' });
            }

            if (type === 'in') {
                await query("UPDATE product_warehouse SET quantity = quantity + ? WHERE product_id=? AND warehouse_id=?", [qty, productId, warehouseId]);
            } else {
                await query("UPDATE product_warehouse SET quantity = quantity - ? WHERE product_id=? AND warehouse_id=?", [qty, productId, warehouseId]);
            }
        } else {
            if (type === 'out') {
                return res.json({ success: false, message: 'هذا المنتج غير موجود في هذا المخزن!' });
            }
            await query("INSERT INTO product_warehouse (product_id, warehouse_id, quantity) VALUES (?, ?, ?)", [productId, warehouseId, qty]);
        }

        await query(
            "INSERT INTO stock_movements (product_id, warehouse_id, type, quantity, movement_date, notes) VALUES (?, ?, ?, ?, ?, ?)",
            [productId, warehouseId, type, qty, date, notes]
        );
        
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/saveSupplier', async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        await query("INSERT INTO suppliers (name, phone, email, address) VALUES (?, ?, ?, ?)", [name, phone, email, address]);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/deleteSupplier', async (req, res) => {
    try {
        await query("DELETE FROM suppliers WHERE supplier_id=?", [req.body.id]);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/saveCategory', async (req, res) => {
    try {
        await query("INSERT INTO categories (name) VALUES (?)", [req.body.name || '']);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/deleteCategory', async (req, res) => {
    try {
        await query("DELETE FROM categories WHERE name=?", [req.body.name || '']);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/saveWarehouse', async (req, res) => {
    try {
        const { name, location, manager } = req.body;
        await query("INSERT INTO warehouses (name, location, manager) VALUES (?, ?, ?)", [name || '', location || '', manager || '']);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/deleteWarehouse', async (req, res) => {
    try {
        await query("DELETE FROM warehouses WHERE warehouse_id=?", [req.body.id]);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/saveCustomer', async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        await query("INSERT INTO customers (name, phone, email, address) VALUES (?, ?, ?, ?)", [name || '', phone || '', email || '', address || '']);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/deleteCustomer', async (req, res) => {
    try {
        await query("DELETE FROM customers WHERE customer_id=?", [req.body.id]);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/saveInvoice', async (req, res) => {
    try {
        const { entityName, total, status } = req.body;
        
        const custRes = await query("SELECT customer_id FROM customers WHERE name = ?", [entityName || '']);
        const custId = custRes.length > 0 ? custRes[0].customer_id : null;

        await query("INSERT INTO sales (customer_id, total_amount, status) VALUES (?, ?, ?)", [custId, total || 0, status || 'مدفوع']);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post('/api/deleteInvoice', async (req, res) => {
    try {
        await query("DELETE FROM sales WHERE sale_id=?", [req.body.id]);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// For any other action, handle undefined API endpoints
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Unknown action' });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
