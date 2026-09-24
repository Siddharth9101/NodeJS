DROP TABLE IF EXISTS basics.accounts;

CREATE TABLE basics.accounts (
    if SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    age INTEGER CHECK (age BETWEEN 18 AND 100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- valid case
-- INSERT INTO basics.accounts (full_name, email, age)
-- VALUES ('siddharth saxena', 'sidd@gmail.com', 24);

-- violates full_name not null contraint
-- INSERT INTO basics.accounts (email, age)
-- VALUES ('sidd@gmail.com', 24);

-- violates age contraint
-- INSERT INTO basics.accounts (full_name, email, age)
-- VALUES ('siddharth saxena', 'sidd@gmail.com', 5);

-- violates email unique contraint
INSERT INTO basics.accounts (full_name, email, age)
VALUES ('siddharth saxena', 'sidd@gmail.com', 24), ('siddharth saxena', 'sidd@gmail.com', 22);

SELECT * FROM basics.accounts;