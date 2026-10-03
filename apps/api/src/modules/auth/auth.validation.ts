
import { AppError } from "../../lib/app-error.js";

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export function validateRegisterInput(
    input: unknown,
): RegisterInput {
    if (!isRecord(input)) {
        throw new AppError(
            "Request body must be an object.",
            400,
        );
    }

    const name = validateName(input.name);
    const email = validateEmail(input.email);
    const password = validatePassword(input.password);

    return {
        name,
        email,
        password,
    };
}

function validateName(value: unknown): string {
    if (
        typeof value !== "string" ||
        value.trim().length < 2
    ) {
        throw new AppError(
            "Name must contain at least 2 characters.",
            400,
        );
    }

    return value.trim();
}

function validateEmail(value: unknown): string {
    if (
        typeof value !== "string" ||
        !isValidEmail(value)
    ) {
        throw new AppError(
            "A valid email address is required.",
            400,
        );
    }

    return value.trim().toLowerCase();
}

function validatePassword(value: unknown): string {
    if (
        typeof value !== "string" ||
        value.length < 8
    ) {
        throw new AppError(
            "Password must contain at least 8 characters.",
            400,
        );
    }

    return value;
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRecord(
    value: unknown,
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null
    );
}

