import { nanoid } from "nanoid";

import {
    createSession,
    deleteSession,
    getSessionByToken,
} from "@forexhighway/db";

const SESSION_DURATION_DAYS = 7;

function generateSessionToken(): string {
    return nanoid(32);
}

function getSessionExpiration(): Date {
    const expiresAt = new Date();

    expiresAt.setDate(
        expiresAt.getDate() + SESSION_DURATION_DAYS,
    );

    return expiresAt;
}

export async function createUserSession(
    userId: number,
) {
    const token = generateSessionToken();
    const expiresAt = getSessionExpiration();

    const session = await createSession(
        userId,
        token,
        expiresAt,
    );

    return session;
}

export async function getUserSession(
    token: string,
) {
    const session = await getSessionByToken(token);

    if (!session) {
        return null;
    }

    if (session.expiresAt <= new Date()) {
        await deleteSession(token);

        return null;
    }

    return session;
}

export async function destroyUserSession(
    token: string,
) {
    await deleteSession(token);
}