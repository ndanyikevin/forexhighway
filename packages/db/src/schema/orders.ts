import {
    decimal,
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

import { tradingAccounts } from "./trading-accounts";

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),

    accountId: integer("account_id")
        .notNull()
        .references(() => tradingAccounts.id, {
            onDelete: "cascade",
        }),

    symbol: varchar("symbol", {
        length: 30,
    }).notNull(),

    direction: varchar("direction", {
        length: 10,
    }).notNull(),

    type: varchar("type", {
        length: 30,
    }).notNull(),

    status: varchar("status", {
        length: 30,
    }).notNull(),

    volume: decimal("volume", {
        precision: 12,
        scale: 4,
    }).notNull(),

    price: decimal("price", {
        precision: 18,
        scale: 8,
    }).notNull(),

    createdAt: timestamp("created_at", {
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),
});
