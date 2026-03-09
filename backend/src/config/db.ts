import dotenv from "dotenv";
import { createPool, type Pool, type PoolOptions } from "mysql2/promise";

dotenv.config()

const config : PoolOptions = {
    database: process.env.DB_NAME || "checkpoint-auth",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
}

const db : Pool = createPool(config);
export default db;