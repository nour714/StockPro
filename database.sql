-- =============================================
-- DATABASE RE-INITIALIZATION
-- =============================================
-- WARNING: THIS WILL DELETE ALL EXISTING DATA
-- =============================================

CREATE DATABASE IF NOT EXISTS warehouse_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE warehouse_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS sale_items;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS stock_movements;
DROP TABLE IF EXISTS product_warehouse;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS warehouses;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================
-- 1. CATEGORIES
-- =============================================
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 2. SUPPLIERS
-- =============================================
CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. WAREHOUSES
-- =============================================
CREATE TABLE warehouses (
    warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    location VARCHAR(255),
    manager VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 4. PRODUCTS
-- =============================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    category_id INT,
    supplier_id INT,
    unit VARCHAR(50) DEFAULT 'قطعة',
    min_qty INT DEFAULT 10,
    buy_price DECIMAL(10,2) DEFAULT 0,
    sell_price DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE SET NULL
);

-- =============================================
-- 5. PRODUCT WAREHOUSE
-- =============================================
CREATE TABLE product_warehouse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    warehouse_id INT,
    quantity INT DEFAULT 0,

    UNIQUE(product_id, warehouse_id),

    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(warehouse_id) ON DELETE CASCADE
);

-- =============================================
-- 6. STOCK MOVEMENTS
-- =============================================
CREATE TABLE stock_movements (
    movement_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT,
    type ENUM('in','out','transfer') NOT NULL,
    quantity INT NOT NULL,
    notes VARCHAR(255),
    movement_date DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(warehouse_id) ON DELETE SET NULL
);

-- =============================================
-- 7. CUSTOMERS
-- =============================================
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 8. SALES
-- =============================================
CREATE TABLE sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('مدفوع', 'آجل', 'ملغى') DEFAULT 'مدفوع',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL
);

-- =============================================
-- 9. SALE ITEMS
-- =============================================
CREATE TABLE sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),

    FOREIGN KEY (sale_id) REFERENCES sales(sale_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE SET NULL
);

-- =============================================
-- 10. USERS
-- =============================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','manager','viewer') DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SAMPLE DATA
-- =============================================

-- CATEGORIES
INSERT INTO categories (name, description) VALUES
('إلكترونيات', 'أجهزة إلكترونية وكمبيوتر'),
('أدوات مكتبية', 'مستلزمات المكتب والقرطاسية'),
('مواد بناء', 'مواد التشييد والبناء'),
('أجهزة منزلية', 'أجهزة المنزل والمطبخ');

-- SUPPLIERS
INSERT INTO suppliers (name, phone, email, address) VALUES
('شركة ديل مصر', '01012345678', 'dell@egypt.com', 'القاهرة، مدينة نصر'),
('HP مصر', '01234567890', 'hp@egypt.com', 'القاهرة، المعادي'),
('مكتبة الأمل', '01111111111', 'alamal@mail.com', 'الجيزة، المهندسين'),
('سامسونج مصر', '01555555555', 'samsung@egypt.com', 'القاهرة، هليوبوليس');

-- WAREHOUSES
INSERT INTO warehouses (name, location, manager) VALUES
('المخزن الرئيسي', 'القاهرة، المعادي', 'أحمد محمود'),
('مخزن الفرع الأول', 'الإسكندرية، سموحة', 'محمد علي');

-- PRODUCTS
INSERT INTO products (name, sku, category_id, supplier_id, unit, min_qty, buy_price, sell_price, notes) VALUES
('لابتوب ديل XPS 13', 'DELL-XPS-001', 1, 1, 'قطعة', 5, 55000, 62000, 'الجيل الـ 13 - رمادي'),
('طابعة HP LaserJet Pro', 'HP-LJ-002', 1, 2, 'قطعة', 8, 12500, 14800, 'ليزر ألوان'),
('ورق A4 Double A', 'PPR-A4-003', 2, 3, 'علبة', 50, 850, 980, '5 رزم في العلبة'),
('شاشة سامسونج 27" منحنية', 'SAM-MON-005', 1, 4, 'قطعة', 10, 8200, 9500, '144Hz Gaming'),
('حبر طابعة HP 85A', 'INK-BLK-006', 2, 2, 'علبة', 15, 1100, 1450, 'أصلي'),
('مكيف شارب 1.5 طن بلازما', 'ARC-SRP-007', 4, 1, 'قطعة', 3, 24500, 28000, 'بارد/ساخن');

-- PRODUCT WAREHOUSE
INSERT INTO product_warehouse (product_id, warehouse_id, quantity) VALUES
(1,1,45),
(2,1,8),
(3,1,3),
(4,1,22),
(5,2,4),
(6,1,12);

-- STOCK MOVEMENTS
INSERT INTO stock_movements (product_id, warehouse_id, type, quantity, notes, movement_date) VALUES
(1,1,'in',20,'استلام دفعة جديدة','2025-04-15'),
(2,1,'out',3,'بيع للعميل أحمد','2025-04-16'),
(4,1,'in',10,'تسليم من المورد','2025-04-18'),
(3,1,'out',17,'صرف للقسم الإداري','2025-04-19'),
(5,2,'in',5,'تحويل من المخزن الرئيسي','2025-04-20');

-- CUSTOMERS
INSERT INTO customers (name, phone) VALUES
('أحمد علي','01012345678');

-- SALES
INSERT INTO sales (customer_id, total_amount, status) VALUES
(1,4100, 'مدفوع');

-- SALE ITEMS
INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES
(1,2,1,4100);

-- USERS
INSERT INTO users (full_name, email, password_hash, role) VALUES
('أحمد محمود','admin@warehouse.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','admin');
