## CMDs to use psql

- to log into psql and run a file: psql -U postgres -d postgres -f 01_first_database.sql (-U: user, -d: databaseServer, -f: file)

- to enter into psql terminal: psql -U postgres -d postgres, we can export password env into the terminal session so we dont have to enter it again and again like this- (for mac/linux)export PGPASSWORD="password", (for windows)$env:PGPASSWORD="your_password"

## inside psql

- to check current database: SELECT current_database();
- to check current user: SELECT current_user;
- to check current postgres version: SELECT version();
- to check all the databases: \l
- to check all the tables: \dt
- to exit cli: exit or \q
- to check tables inside and schema: \dt schema_name.\*(ignore the backslash before star)
