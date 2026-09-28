import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { pool } from "./pool";

dotenv.config();

async function migrate() {
  const migrationPath = path.join(
    __dirname,
    "../migrations/001_create_products_table.sql"
  );

  const sql = fs.readFileSync(migrationPath, "utf-8");

  try {
    await pool.query(sql);
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
