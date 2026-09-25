-- calculates one result from many rows
-- COUNT() - number of rows
-- SUM() - total value
-- AVG() - average value
-- MIN() - min value
-- MAX() - max value

-- count all the posts
SELECT
    COUNT(*) AS total_posts,
    COUNT(*) FILTER (WHERE status = 'published') AS published_posts,
    SUM(views) AS total_views,
    AVG(views) AS avg_views,
    MIN(views) AS min_views,
    MAX(views) AS max_views
FROM posts;