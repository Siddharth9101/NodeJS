-- INSERT INTO products
--     (name, category, price, stock, is_active, sku, description)
-- VALUES
--     ('Temp Name to be deleted', 'Temporary', 3499.00, 25, true, 'Temp',
--      'Temp description')
-- RETURNING id, name, price, stock, sku;

-- UPDATE products
-- SET stock = stock + 10
-- WHERE sku = 'Temp'
-- RETURNING id, name, price, stock, sku; 

DELETE FROM products
WHERE sku = 'Temp'
RETURNING id, name;

SELECT * FROM products WHERE sku = 'Temp';