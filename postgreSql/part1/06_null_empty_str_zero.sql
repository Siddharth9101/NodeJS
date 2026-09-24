-- null - unknown/missing value
-- empty string - know string but has no chars
-- zero - numeric zero value

DROP TABLE IF EXISTS basics.value_examples;

CREATE TABLE basics.value_examples(
    id SERIAL PRIMARY KEY,
    nickname TEXT,
    bio TEXT,
    score INTEGER
);

INSERT INTO basics.value_examples(nickname, bio, score)
VALUES
    (null, 'learning postgres', 10),
    ('', 'empty nickname', 20),
    ('sidd', '', 0),
    ('sidd', null, null);

-- SELECT * FROM basics.value_examples;

-- fetching rows where nickname is null
SELECT * FROM basics.value_examples WHERE nickname IS NULL;

-- fetching rows where nickname is not null
SELECT * FROM basics.value_examples WHERE nickname IS NOT NULL;

-- fetching rows where nickname is ''
SELECT * FROM basics.value_examples WHERE nickname = '';

-- fetching rows where score is 0
SELECT * FROM basics.value_examples WHERE score = 0;