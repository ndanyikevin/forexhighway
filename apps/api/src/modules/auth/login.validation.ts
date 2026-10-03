
import { AppError } from "../../lib/app-error.js";

export interface LoginInput {
    email: string;
    password: string;
}

export function validateLoginInput(
    input: unknown,
): LoginInput {
    if (!isRecord(input)) {
        throw new AppError(
            "Request body must be an object.",
            400,
        );
    }

    const email = validateEmail(input.email);
    const password = validatePassword(input.password);

    return {
        email,
        password,
    };
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

