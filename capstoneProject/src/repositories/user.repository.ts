import { pool } from "../lib/db.js";
import {
  DbUserRow,
  DbUserWithPasswordRow,
  User,
  UserWithPassword,
} from "../types/user.js";
import { transformUser, transformUserWithPassword } from "../lib/utils.js";

export async function findByEmail(email: string): Promise<User | null> {
  const result = await pool.query<DbUserRow>(
    "SELECT id, email, role, created_at FROM users WHERE email = $1",
    [email],
  );

  return result.rows[0] ? transformUser(result.rows[0]) : null;
}

export async function create(email: string, password: string): Promise<User> {
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

export async function findByEmailWithPassword(
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

export async function findUserByGoogleId(
  googleId: string,
): Promise<User | null> {
  const result = await pool.query(
    `
      SELECT id, email, role, created_at
      FROM users
      WHERE google_id = $1
    `,
    [googleId],
  );

  return result.rows.length !== 0 ? transformUser(result.rows[0]) : null;
}

export async function linkGoogleIdToUser(
  userId: string,
  googleId: string,
): Promise<User> {
  const result = await pool.query(
    `
      UPDATE users
      SET google_id = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, email, role, created_at
    `,
    [googleId, userId],
  );

  return transformUser(result.rows[0]);
}

export async function createGoogleUser(
  email: string,
  googleId: string,
): Promise<User> {
  const result = await pool.query(
    `
      INSERT INTO users (email, google_id)
      VALUES ($1, $2)
      RETURNING id, email, role, created_at
    `,
    [email, googleId],
  );

  return transformUser(result.rows[0]);
}
