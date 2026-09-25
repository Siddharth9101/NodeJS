-- one post can have multiple tags and one tag can have many posts associated with it

-- post_tags is our jusction table

SELECT posts.title AS post_title, tags.name AS tag
FROM posts
INNER JOIN post_tags
ON posts.id = post_tags.post_id
INNER JOIN tags
ON post_tags.tag_id = tags.id
ORDER BY posts.views DESC;
