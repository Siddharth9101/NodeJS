export type User = {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
};

export type DbUserRow = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
};

export type UserWithPassword = User & {
  passwordHash: string | null;
};

export type DbUserWithPasswordRow = DbUserRow & {
  password_hash: string | null;
};

export type TokenPayload = {
  id: string;
  email: string;
  role: string;
};
