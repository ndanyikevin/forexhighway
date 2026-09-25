import { createUser } from './users.js'
import { db } from './client.js'

try {
    await db.connect()

    const user = await createUser(
        'kevin',
        'kevin@example.com',
        'temporary-password-hash',
    )

    console.log('Created user:')
    console.log(user)
} catch (error) {
    console.error('Failed to create user:')
    console.error(error)
} finally {
    await db.end()
}