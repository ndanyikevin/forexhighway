
import { eq } from "drizzle-orm";

import { db } from "../index.js";
import { users } from "../schema/users.js";

export async function createUser(
    name: string,
    email: string,
    passwordHash: string,
) {
    const [user] = await db
        .insert(users)
        .values({
            name,
            email,
            passwordHash,
        })
        .returning({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            isActive: users.isActive,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
        });

    return user;
}

export async function getUserByEmail(email: string) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    return user;
}

export async function getUserById(id: number) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

    return user;
}

