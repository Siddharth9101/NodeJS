DROP TABLE IF EXISTS basics.products_basic;

CREATE TABLE basics.products_basic (
    if SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    -- integer whole numbers
    stock INTEGER DEFAULT 1,
    -- bigint for numbers bigger than integer
    total_views BIGINT DEFAULT 0,
    -- numeric for foating point numbers, 10 total digitds, 2 after decimal
    price NUMERIC(10, 0),
    is_active BOOLEAN DEFAULT true
);

-- queries
INSERT INTO basics.products_basic (name, description, stock, total_views, price, is_active)
VALUES
    ('product 1', 'product 1 description', 100, 1200, 2999.99, true);

SELECT * FROM basics.products_basic;

SELECT * FROM basics.products_basic WHERE is_active;