import {
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const sessions = pgTable("sessions", {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
        .notNull()
        .references(() => users.id, {
            onDelete: "cascade",
        }),

    token: varchar("token", {
        length: 255,
    }).notNull().unique(),

    expiresAt: timestamp(
        "expires_at",
        {
            withTimezone: true,
        },
    ).notNull(),

    createdAt: timestamp(
        "created_at",
        {
            withTimezone: true,
        },
    ).notNull().defaultNow(),
});