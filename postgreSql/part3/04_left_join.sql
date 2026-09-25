-- left join keeps all the rows from left table and include the matching rows from the right table, if there is no matching rows in right table it returns null.

-- returns all the posts with there comments (a post may or may not have comments)
SELECT posts.title AS post_title, posts.status, posts.views, comments.body AS comment
FROM posts
LEFT JOIN comments
ON posts.id = comments.post_id
ORDER BY posts.views DESC;
