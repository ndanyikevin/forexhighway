import { Hono } from "hono";

import {
    loginUser,
    registerUser,
} from "./auth.service.js";
import {
    createUserSession,
} from "./session.service.js";
import { validateLoginInput } from "./login.validation.js";
import { validateRegisterInput } from "./auth.validation.js";

const authRoutes = new Hono();

authRoutes.post("/register", async (c) => {
    const body = await c.req.json();

    const input = validateRegisterInput(body);

    const user = await registerUser(
        input.name,
        input.email,
        input.password,
    );

    return c.json(
        {
            ok: true,
            user,
        },
        201,
    );
});

authRoutes.post("/login", async (c) => {
    const body = await c.req.json();

    const input = validateLoginInput(body);

    const user = await loginUser(
        input.email,
        input.password,
    );

    const session = await createUserSession(
        user.id,
    );

    c.header(
        "Set-Cookie",
        `session=${session.token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
    );

    return c.json({
        ok: true,
        user,
    });
});

export default authRoutes;