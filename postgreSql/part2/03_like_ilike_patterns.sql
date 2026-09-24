-- like - case sensitive matching
-- ilike - case insensitive matching
-- % - pattern matching
-- _ exactly one character

-- select product where name starts with wireless   
-- SELECT name, price
-- FROM products
-- WHERE name LIKE 'Wireless%';

-- select product where name contains laptop (case insensitive)   
-- SELECT name, price
-- FROM products
-- WHERE name ILIKE '%laptop%';

-- select product where name or descriptions contains laptop (case insensitive)   
-- SELECT name, price
-- FROM products
-- WHERE name ILIKE '%laptop%' OR description ILIKE '%laptop%';