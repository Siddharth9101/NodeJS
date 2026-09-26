import {
  DbUserRow,
  DbUserWithPasswordRow,
  User,
  UserWithPassword,
} from "../types/user.js";

export function transformUser(user: DbUserRow): User {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.created_at,
  };
}

export function transformUserWithPassword(
  user: DbUserWithPasswordRow,
): UserWithPassword {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.created_at,
    passwordHash: user?.password_hash ? user.password_hash : null,
  };
}
