-- IN - value must match one item in the given list
-- NOT IN - value must not match any item in the given list
-- BETWEEN - value must be inside a range

-- products where category is Electronics or Clothing
-- SELECT name, price, stock
-- FROM products
-- WHERE category IN ('Electronics', 'Clothing');

-- products where price is between 500 to 1000
SELECT name, price, stock
FROM products
WHERE price BETWEEN 500 AND 1000;