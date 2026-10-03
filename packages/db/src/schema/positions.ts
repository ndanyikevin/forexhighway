
import {
    decimal,
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

import { tradingAccounts } from "./trading-accounts";

export const positions = pgTable("positions", {
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

    volume: decimal("volume", {
        precision: 12,
        scale: 4,
    }).notNull(),

    entry: decimal("entry", {
        precision: 18,
        scale: 8,
    }).notNull(),

    currentPrice: decimal("current_price", {
        precision: 18,
        scale: 8,
    }).notNull(),

    stopLoss: decimal("stop_loss", {
        precision: 18,
        scale: 8,
    }),

    takeProfit: decimal("take_profit", {
        precision: 18,
        scale: 8,
    }),

    profitLoss: decimal("profit_loss", {
        precision: 18,
        scale: 2,
    })
        .notNull()
        .default("0"),

    openedAt: timestamp("opened_at", {
        withTimezone: true,
    }).notNull(),

    createdAt: timestamp("created_at", {
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),
});
