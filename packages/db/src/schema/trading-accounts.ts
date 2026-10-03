import {
    decimal,
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const tradingAccounts = pgTable("trading_accounts", {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
        .notNull()
        .references(() => users.id, {
            onDelete: "cascade",
        }),

    broker: varchar("broker", {
        length: 100,
    }).notNull(),

    platform: varchar("platform", {
        length: 30,
    })
        .notNull()
        .default("MT5"),

    accountNumber: varchar("account_number", {
        length: 100,
    }).notNull(),

    currency: varchar("currency", {
        length: 10,
    })
        .notNull()
        .default("USD"),

    balance: decimal("balance", {
        precision: 18,
        scale: 2,
    })
        .notNull()
        .default("0"),

    equity: decimal("equity", {
        precision: 18,
        scale: 2,
    })
        .notNull()
        .default("0"),

    margin: decimal("margin", {
        precision: 18,
        scale: 2,
    })
        .notNull()
        .default("0"),

    freeMargin: decimal("free_margin", {
        precision: 18,
        scale: 2,
    })
        .notNull()
        .default("0"),

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
