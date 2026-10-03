import {
    boolean,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    name: varchar("name", {
        length: 150,
    }).notNull(),

    email: varchar("email", {
        length: 255,
    }).notNull().unique(),

    passwordHash: varchar("password_hash", {
        length: 255,
    }).notNull(),

    role: varchar("role", {
        length: 30,
    })
        .notNull()
        .default("trader"),

    isActive: boolean("is_active")
        .notNull()
        .default(true),

    createdAt: timestamp("created_at", {
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at", {
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),
});
