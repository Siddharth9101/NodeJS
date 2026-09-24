-- LIMIT - how many rows to return
-- OFFSET - how many rows to skip

-- 3 products with name is asc
SELECT name, price
FROM products
ORDER BY name ASC
LIMIT 3;

-- next 3 products
SELECT name, price
FROM products
ORDER BY name ASC
LIMIT 3 OFFSET 3;

-- offset = (page-1) * limit
-- page 1 = (1-1)*10 = 0
-- page 2 = (2-1)*10 = 10
-- page 3 = (3-1)*10 = 20
-- and so on