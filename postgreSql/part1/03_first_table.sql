DROP TABLE IF EXISTS basics.students;


-- creating table
CREATE TABLE basics.students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER CHECK (age BETWEEN 18 AND 100),
    created_at TIMESTAMP DEFAULT NOW()
); 

-- inserting values
INSERT INTO basics.students (name, email, age)
VALUES
    ('Siddharth', 'sidd@gmail.com', 24),
    ('John', 'john@gmail.com', 30);