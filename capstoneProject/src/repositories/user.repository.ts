import { pool } from "../lib/db.js";
import {
  DbUserRow,
  DbUserWithPasswordRow,
  User,
  UserWithPassword,
} from "../types/user.js";
import { transformUser, transformUserWithPassword } from "../lib/utils.js";

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<DbUserRow>(
    "SELECT id, email, role, created_at FROM users WHERE email = $1",
    [email],
  );

  return result.rows[0] ? transformUser(result.rows[0]) : null;
}

export async function createUser(
  email: string,
  password: string,
): Promise<User> {
  const result = await pool.query<DbUserRow>(
    `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, role, created_at
    `,
    [email, password],
  );

  return transformUser(result.rows[0]);
}

export async function findUserByEmailWithPassword(
  email: string,
): Promise<UserWithPassword | null> {
  const result = await pool.query<DbUserWithPasswordRow>(
    `
      SELECT id, email, password_hash, role, created_at
      FROM users
      WHERE email = $1    
    `,
    [email],
  );

  return result.rows[0] ? transformUserWithPassword(result.rows[0]) : null;
}
