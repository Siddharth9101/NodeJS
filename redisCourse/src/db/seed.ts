import dotenv from "dotenv";
import { pool } from "./pool";

dotenv.config();

const demoProducts = [
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 89.99,
    category: "accessories",
    stock: 25,
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with long battery life",
    price: 39.99,
    category: "accessories",
    stock: 40,
  },
  {
    name: "Gaming Monitor",
    description: "27-inch 144Hz gaming monitor with IPS panel",
    price: 299.99,
    category: "monitors",
    stock: 15,
  },
  {
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI and SD card reader",
    price: 49.99,
    category: "accessories",
    stock: 30,
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better posture",
    price: 34.99,
    category: "accessories",
    stock: 20,
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Over-ear headphones with active noise cancellation",
    price: 199.99,
    category: "audio",
    stock: 18,
  },
];

async function seed() {
  try {
    const countResult = await pool.query("SELECT COUNT(*) FROM products");
    const count = Number(countResult.rows[0].count);

    if (count > 0) {
      console.log("Products table already has data. Skipping seed.");
      return;
    }

    for (const product of demoProducts) {
      await pool.query(
        `INSERT INTO products (name, description, price, category, stock)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          product.name,
          product.description,
          product.price,
          product.category,
          product.stock,
        ]
      );
    }

    console.log(`Seeded ${demoProducts.length} products successfully`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
