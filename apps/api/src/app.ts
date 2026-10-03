import { Hono } from "hono";
import { cors } from "hono/cors";

import { errorHandler } from "./middleware/error-handler.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = new Hono();

app.onError(errorHandler);

const allowedOrigins = [
    "http://localhost:3000",
    "https://forexhighway.vercel.app",
];

app.use(
    "*",
    cors({
        origin: (origin) => {
            if (allowedOrigins.includes(origin)) {
                return origin;
            }

            return undefined;
        },
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