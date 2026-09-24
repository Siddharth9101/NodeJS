SELECT name, price, stock, sku
FROM products
WHERE category = 'Electronics';

-- increase all the electronic products price by 10%
UPDATE products
SET price = ROUND(price * 1.10, 2)
WHERE category = 'Electronics';

SELECT name, price, stock, sku
FROM products
WHERE category = 'Electronics';