-- group by creates groups of rows
-- WHERE filters normal rows without grouping
-- HAVING filters after grouping

-- find the authors who have written at least 2 posts

SELECT 
    u.name AS author_name,
    COUNT(p.id) AS total_posts,
    SUM(p.views) AS total_views
FROM users AS u
LEFT JOIN posts AS p
ON u.id = p.user_id
GROUP BY u.id, u.name -- create a group for all user rows
HAVING COUNT(p.id) >= 2 -- keep only those group which have 2 or more posts
ORDER BY total_posts DESC;
