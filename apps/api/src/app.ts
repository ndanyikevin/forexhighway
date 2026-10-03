
import { Hono } from "hono";

import { errorHandler } from "./middleware/error-handler.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = new Hono();

app.onError(errorHandler);

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

