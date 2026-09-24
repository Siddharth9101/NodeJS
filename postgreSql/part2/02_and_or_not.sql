-- products where category is electronics and price > 1000
-- SELECT name, price, stock
-- FROM products
-- WHERE category = 'Electronics' AND price > 1000;

-- products where category is Electronics or Clothing
-- SELECT name, price, stock
-- FROM products
-- WHERE category = 'Electronics' OR category = 'Clothing';

-- products where category is not Electronics
SELECT name, price, stock
FROM products
WHERE NOT category = 'Electronics';