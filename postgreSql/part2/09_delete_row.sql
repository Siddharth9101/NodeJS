INSERT INTO products
    (name, category, price, stock, is_active, sku, description)
VALUES
    ('Temp Name to be deleted', 'Temporary', 3499.00, 25, true, 'Temp',
     'Temp description');

SELECT name, price, category, sku
FROM products
WHERE sku = 'Temp';

DELETE FROM products
WHERE sku = 'Temp';

SELECT name, price, category, sku
FROM products
WHERE sku = 'Temp';