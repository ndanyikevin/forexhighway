import { eq } from "drizzle-orm";

import { db } from "../index.js";
import { sessions } from "../schema/sessions.js";

export async function createSession(
    userId: number,
    token: string,
    expiresAt: Date,
) {
    const [session] = await db
        .insert(sessions)
        .values({
            userId,
            token,
            expiresAt,
        })
        .returning();

    return session;
}

export async function getSessionByToken(
    token: string,
) {
    const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.token, token))
        .limit(1);

    return session;
}

export async function deleteSession(
    token: string,
) {
    await db
        .delete(sessions)
        .where(eq(sessions.token, token));
}