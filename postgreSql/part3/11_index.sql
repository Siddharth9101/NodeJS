-- indices helps postgres find rows faster.

-- creating index on posts status col
CREATE INDEX IF NOT EXISTS idx_posts_status
ON posts(status);

-- creating composite index on posts status with views in descending order
CREATE INDEX IF NOT EXISTS idx_posts_status_views
ON posts(status, views DESC);

-- creating index on user_id of posts

SELECT
    title,
    status,
    views,
FROM posts
WHERE user_id = (SELECT id FROM users WHERE name = 'Siddharth');

CREATE INDEX IF NOT EXISTS idx_posts_user_id
ON posts(user_id);