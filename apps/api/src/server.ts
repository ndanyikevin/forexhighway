import { serve } from "@hono/node-server";

import app from "./app.js";

serve(
    {
        fetch: app.fetch,
        port: 4000,
    },
    (info) => {
        console.log(
            `ForexHighway API listening on port ${info.port}`,
        );
    },
);