
import type { Context } from "hono";

import { AppError } from "../lib/app-error.js";

export function errorHandler(
    error: Error,
    c: Context,
) {
    console.error(error);

    if (error instanceof AppError) {
        return c.json(
            {
                ok: false,
                error: {
                    message: error.message,
                },
            },
            error.statusCode as 400 | 401 | 403 | 404 | 409 | 422 | 500,
        );
    }

    return c.json(
        {
            ok: false,
            error: {
                message: "Internal server error.",
            },
        },
        500,
    );
}

