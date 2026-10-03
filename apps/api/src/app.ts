import { Hono } from "hono";
import { cors } from "hono/cors";

import { errorHandler } from "./middleware/error-handler.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = new Hono();

app.onError(errorHandler);

app.use(
    "*",
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

app.get("/", (c) => {
    return c.json({
        ok: true,
        message: "ForexHighway API",
    });
});

app.get("/health", (c) => {
    return c.json({
        ok: true,
    });
});

app.route("/auth", authRoutes);

export default app;