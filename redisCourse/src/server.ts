import dotenv from "dotenv";
import app from "./app";
import { testConnection } from "./db/pool";
import { connectRedis, disconnectRedis } from "./redis/client";

dotenv.config();

const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await testConnection();

    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await disconnectRedis();
  process.exit(0);
});

startServer();
