CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS products;

CREATE TABLE products(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK(price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    sku TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products
    (name, category, price, stock, is_active, sku, description)
VALUES
    ('Wireless Mechanical Keyboard', 'Electronics', 3499.00, 25, true, 'KB-MECH-001',
     'Compact mechanical keyboard with RGB backlighting and blue switches'),

    ('Logitech M331 Wireless Mouse', 'Electronics', 1299.00, 40, true, 'MS-WLS-002',
     'Silent wireless mouse with ergonomic design'),

    ('Acer Aspire Laptop Stand', 'Accessories', 899.00, 30, true, 'LS-ACER-003',
     'Adjustable aluminum laptop stand for better desk ergonomics'),

    ('Nike Revolution Running Shoes', 'Footwear', 2999.00, 18, true, 'NK-RUN-004',
     'Lightweight running shoes designed for everyday workouts'),

    ('Wildcraft Laptop Backpack', 'Bags', 1599.00, 22, true, 'WB-LAP-005',
     'Water-resistant backpack with a dedicated laptop compartment'),

    ('Samsung 25W USB-C Charger', 'Electronics', 1199.00, 50, true, 'CHG-SAM-006',
     'Fast USB-C charger compatible with supported Samsung devices'),

    ('Levi''s Regular Fit Jeans', 'Clothing', 2499.00, 15, true, 'LV-JNS-007',
     'Classic regular-fit denim jeans for everyday wear'),

    ('Milton Stainless Steel Bottle', 'Home & Kitchen', 699.00, 60, true, 'BT-MIL-008',
     'Stainless steel water bottle with leak-proof lid'),

    ('The Alchemist', 'Books', 399.00, 35, true, 'BK-ALC-009',
     'Popular fiction novel by Paulo Coelho'),

    ('Sony WH-CH520 Wireless Headphones', 'Electronics', 4499.00, 12, false, 'HP-SONY-010',
     'Wireless on-ear headphones with long battery life');

-- SELECT name, category, sku
-- FROM products
-- WHERE sku IN ('KB-MECH-001', 'LS-ACER-003');

-- alias
SELECT name AS product_name, price AS selling_price, stock AS available
FROM products;