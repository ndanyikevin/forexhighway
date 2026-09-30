import { db } from './client.js'

export async function createUser(
    username: string,
    email: string,
    passwordHash: string,
) {
    const result = await db.query(
        `
      INSERT INTO users (
        username,
        email,
        password_hash
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        username,
        email,
        created_at,
        updated_at
    `,
        [username, email, passwordHash],
    )

    return result.rows[0]
}