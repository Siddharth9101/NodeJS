-- fetch all the posts along with there authors and comments

SELECT
    p.title AS post_title,
    p.status, p.views,
    u.name AS author,
    c.body AS comment
FROM posts p
INNER JOIN users u
ON p.user_id = u.id
LEFT JOIN comments c
ON p.id = c.post_id
ORDER BY p.views DESC;