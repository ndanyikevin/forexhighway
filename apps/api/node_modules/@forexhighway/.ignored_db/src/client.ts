import 'dotenv/config'
import { Client } from 'pg'

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
}

export const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
})