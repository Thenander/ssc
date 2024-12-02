import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

let pool;

try {
  pool = mysql
    .createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
    })
    .promise();

  console.log("Database connection pool created successfully.");
} catch (error) {
  console.error("Error creating database connection pool:", error);
  process.exit(1);
}

export default pool;
