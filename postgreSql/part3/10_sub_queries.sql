-- nested queries
-- postgres runs the inner query first and then outer

-- find all the posts which are performing better than avg views

SELECT
    title,
    status,
    views
FROM posts
WHERE views > (
    SELECT AVG(views)
    FROM posts
)
ORDER BY views DESC;