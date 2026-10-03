
// import "dotenv/config";
import dotenv from "dotenv";

import path from "node:path"; 
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

dotenv.config({ path: path.resolve(__dirname, "../../../.env",), });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error(
        "DATABASE_URL is not defined.",
    );
}

const sql = neon(connectionString);

export const db = drizzle({
    client: sql,
});

export {
    createUser,
    getUserByEmail,
    getUserById,
} from "./repositories/users.repository.js";

export {
    createSession,
    getSessionByToken,
    deleteSession,
} from "./repositories/sessions.repository.js";

export {
    users,
    tradingAccounts,
    positions,
    orders,
    sessions,
} from "./schema/index.js";
