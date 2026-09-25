-- multiple sql statements run as one safe unit
-- either run all or none at all

-- ex: user places order
-- placing an order
-- reducing the stock of the product
-- creating payment record
-- transfering money
-- creating order record

BEGIN;

UPDATE posts
SET status = 'published'
WHERE title = 'Indices for beginners' AND status = 'draft';

UPDATE posts
SET views = views + 50
WHERE title = 'Indices for beginners';

SELECT title, status, views
FROM posts
WHERE title = 'Indices for beginners';

COMMIT;