import { Banner, BannerRow } from "../types/banner.js";
import { DbTaskRow, Task } from "../types/task.js";
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

export function transformTask(task: DbTaskRow): Task {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    userId: task.user_id,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  };
}

export function transformTasks(tasks: DbTaskRow[]): Task[] {
  return tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      userId: task.user_id,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    };
  });
}

export function transformBanner(banner: BannerRow): Banner {
  return {
    id: banner.id,
    imageUrl: banner.image_url,
    cloudinaryPublicId: banner.cloudinary_public_id,
    updatedAt: banner.updated_at,
    createdAt: banner.created_at,
  };
}
