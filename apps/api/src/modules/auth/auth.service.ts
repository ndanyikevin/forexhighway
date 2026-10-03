import {
    createUser,
    getUserByEmail,
} from "@forexhighway/db";

import { AppError } from "../../lib/app-error.js";
import {
    hashPassword,
    verifyPassword,
} from "./password.js";

export async function registerUser(
    name: string,
    email: string,
    password: string,
) {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        throw new AppError(
            "Email is already registered.",
            409,
        );
    }

    const passwordHash = await hashPassword(password);

    const user = await createUser(
        name,
        email,
        passwordHash,
    );

    return user;
}

export async function loginUser(
    email: string,
    password: string,
) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new AppError(
            "Invalid email or password.",
            401,
        );
    }

    const passwordValid = await verifyPassword(
        password,
        user.passwordHash,
    );

    if (!passwordValid) {
        throw new AppError(
            "Invalid email or password.",
            401,
        );
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
    };
}