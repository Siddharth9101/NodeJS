-- db -> schema -> tables -> rows, creating first schema
CREATE SCHEMA IF NOT EXISTS basics;

-- creating schema for generation UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- querying all the schemas;
SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name;