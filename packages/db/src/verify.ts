
import "dotenv/config";

import { eq } from "drizzle-orm";

import { db } from "./index";
import {
    positions,
    tradingAccounts,
    users,
} from "./schema";

async function verify() {
    console.log("🔎 Verifying database...\n");

    // --------------------------------------------------
    // User
    // --------------------------------------------------

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, "demo@forexhighway.local"))
        .limit(1);

    if (!user) {
        throw new Error("Demo user was not found.");
    }

    console.log("👤 User");
    console.log({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
    });

    // --------------------------------------------------
    // Trading accounts
    // --------------------------------------------------

    const accounts = await db
        .select()
        .from(tradingAccounts)
        .where(eq(tradingAccounts.userId, user.id));

    console.log(`\n💳 Trading accounts: ${ accounts.length } `);

    for (const account of accounts) {
        console.log({
            id: account.id,
            broker: account.broker,
            accountNumber: account.accountNumber,
            balance: account.balance,
            equity: account.equity,
            margin: account.margin,
            freeMargin: account.freeMargin,
        });
    }

    // --------------------------------------------------
    // Positions
    // --------------------------------------------------

    const accountIds = accounts.map((account) => account.id);

    const allPositions = [];

    for (const accountId of accountIds) {
        const accountPositions = await db
            .select()
            .from(positions)
            .where(eq(positions.accountId, accountId));

        allPositions.push(...accountPositions);
    }

    console.log(`\n📈 Positions: ${ allPositions.length } `);

    for (const position of allPositions) {
        console.log({
            id: position.id,
            accountId: position.accountId,
            symbol: position.symbol,
            direction: position.direction,
            volume: position.volume,
            entry: position.entry,
            currentPrice: position.currentPrice,
            profitLoss: position.profitLoss,
            openedAt: position.openedAt,
        });
    }

    // --------------------------------------------------
    // Summary
    // --------------------------------------------------

    console.log("\n──────────────────────────────────");

    console.log(`User:     ${ user ? "✓" : "✗" } `);
    console.log(
        `Accounts: ${ accounts.length === 4 ? "✓" : `✗ (${accounts.length})` } `,
    );
    console.log(
        `Positions: ${
    allPositions.length === 9
        ? "✓"
        : `✗ (${allPositions.length})`
} `,
    );

    console.log("──────────────────────────────────");
    console.log("\n✅ Database verification completed.");
}

verify().catch((error) => {
    console.error("\n❌ Database verification failed:");
    console.error(error);
    process.exitCode = 1;
});
