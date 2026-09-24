SELECT name, price, stock, sku
FROM products
WHERE sku = 'KB-MECH-001';

UPDATE products
SET price = 3000, stock = 20
WHERE sku = 'KB-MECH-001';

SELECT name, price, stock, sku
FROM products
WHERE sku = 'KB-MECH-001';