-- one parent row can have many child rows
-- one user can have many posts
-- one post can have only one user

-- get all the posts along with the author names
SELECT users.name AS author_name, posts.title AS post_title, posts.status
FROM users
INNER JOIN posts
ON users.id = posts.user_id
ORDER BY users.name, posts.title;