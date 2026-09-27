import { pool } from "../lib/db.js";
import { transformTask, transformTasks } from "../lib/utils.js";
import { DbTaskRow, Task } from "../types/task.js";

export async function createTaskRepo(
  userId: string,
  title: string,
): Promise<Task> {
  const result = await pool.query<DbTaskRow>(
    `
        INSERT INTO tasks (title, user_id)
        VALUES ($1, $2)
        RETURNING id, title, status, user_id, created_at, updated_at
        `,
    [title, userId],
  );

  return transformTask(result.rows[0]);
}

export async function findTasksByUserId(userId: string): Promise<Task[]> {
  const result = await pool.query(
    `
    SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC
    `,
    [userId],
  );

  return result.rows.length > 0 ? transformTasks(result.rows) : [];
}

export async function findTaskByIdAndUserId(
  taskId: string,
  userId: string,
): Promise<Task | null> {
  const result = await pool.query<DbTaskRow>(
    `
      SELECT * from tasks WHERE id = $1 AND user_id = $2
    `,
    [taskId, userId],
  );

  return result.rows[0] ? transformTask(result.rows[0]) : null;
}

export async function updateTaskByIdAndUserIdRepo(
  taskId: string,
  userId: string,
  title: string,
): Promise<Task | null> {
  const result = await pool.query<DbTaskRow>(
    `
      UPDATE tasks
      SET title = $1, updated_at = NOW()
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `,
    [title, taskId, userId],
  );

  return result.rows[0] ? transformTask(result.rows[0]) : null;
}

export async function deleteTaskByIdRepo(
  taskId: string,
  userId: string,
): Promise<void> {
  await pool.query(
    ` 
    DELETE FROM tasks WHERE id = $1 AND user_id = $2
    `,
    [taskId, userId],
  );
}
