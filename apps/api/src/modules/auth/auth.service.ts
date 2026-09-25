import { createUser } from '@forexhighway/db'
import { hashPassword } from './password.js'

export async function registerUser(
    username: string,
    email: string,
    password: string,
) {
    const passwordHash = await hashPassword(password)

    const user = await createUser(
        username,
        email,
        passwordHash,
    )

    return user
}