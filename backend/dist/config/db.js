import dotenv from "dotenv";
import { createPool } from "mysql2";
dotenv.config();
const config = {
    database: process.env.DB_NAME || "checkpoint-auth",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
};
const db = createPool(config);
export default db;
//# sourceMappingURL=db.js.map