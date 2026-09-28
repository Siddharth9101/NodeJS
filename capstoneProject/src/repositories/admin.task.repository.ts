import { pool } from "../lib/db.js";
import { transformTask, transformTasks } from "../lib/utils.js";
import { Task, TaskQuery, Tasks } from "../types/task.js";

export async function findAll(query: TaskQuery): Promise<Tasks> {
  const search = query.search ?? "";
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 10;
  const offset = (page - 1) * limit;

  const values = query.status
    ? [`%${search}%`, query.status, offset, limit]
    : [`%${search}%`, offset, limit];

  const countValues = query.status
    ? [`%${search}%`, query.status]
    : [`%${search}%`];

  const tasksQuery = query.status
    ? `
      SELECT * FROM tasks
        WHERE title ILIKE $1 AND status = $2
        ORDER BY created_at DESC
        OFFSET $3 LIMIT $4
    `
    : `
      SELECT * FROM tasks
        WHERE title ILIKE $1
        ORDER BY created_at DESC
        OFFSET $2 LIMIT $3
    `;

  const countQuery = query.status
    ? `
  SELECT COUNT(*) AS total_tasks
  FROM tasks
  WHERE title ILIKE $1
    AND status = $2
`
    : `
  SELECT COUNT(*) AS total_tasks
  FROM tasks
  WHERE title ILIKE $1
`;

  const [tasks, countResult] = await Promise.all([
    pool.query(tasksQuery, values),
    pool.query(countQuery, countValues),
  ]);

  const totalTasks = Number(countResult.rows[0].total_tasks);

  return {
    tasks: tasks.rows.length > 0 ? transformTasks(tasks.rows) : [],
    page,
    limit,
    totalTasks,
    totalPages: Math.ceil(totalTasks / limit),
  };
}

export async function updateById(
  status: string,
  taskId: string,
): Promise<Task | null> {
  const result = await pool.query(
    `
      UPDATE tasks
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `,
    [status, taskId],
  );

  return result.rows[0] ? transformTask(result.rows[0]) : null;
}
