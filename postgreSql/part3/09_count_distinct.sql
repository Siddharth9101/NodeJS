-- fetch all the tags along with the number of posts connected to them

SELECT
    t.name AS tag_name,
    COUNT(DISTINCT p.id) AS total_posts
FROM tags t
LEFT JOIN post_tags pt
    ON t.id = pt.tag_id
LEFT JOIN posts p
    ON pt.post_id = p.id
GROUP BY t.id, t.name
ORDER BY total_posts DESC;