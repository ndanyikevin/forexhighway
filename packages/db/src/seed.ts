
import "dotenv/config";

import { eq } from "drizzle-orm";

import { db } from "./index.js";
import {
    positions,
    tradingAccounts,
    users,
} from "./schema/index.js";

// --------------------------------------------------
// Seed data
// --------------------------------------------------

const DEMO_USER = {
    name: "Demo Trader",
    email: "demo@forexhighway.local",
    passwordHash: "DEMO_ONLY",
    role: "trader",
    isActive: true,
} as const;

const TRADING_ACCOUNTS = [
    {
        broker: "IC Markets",
        platform: "MT5",
        accountNumber: "ICM-482915",
        currency: "USD",
        balance: "10000",
        equity: "10240.50",
        margin: "640",
        freeMargin: "9600.50",
    },
    {
        broker: "Exness",
        platform: "MT5",
        accountNumber: "EXN-731204",
        currency: "USD",
        balance: "5000",
        equity: "5178.25",
        margin: "420",
        freeMargin: "4758.25",
    },
    {
        broker: "Deriv",
        platform: "MT5",
        accountNumber: "DRV-619842",
        currency: "USD",
        balance: "2500",
        equity: "2442.80",
        margin: "315",
        freeMargin: "2127.80",
    },
    {
        broker: "Pepperstone",
        platform: "MT5",
        accountNumber: "PPR-904517",
        currency: "USD",
        balance: "15000",
        equity: "15386.40",
        margin: "875",
        freeMargin: "14511.40",
    },
] as const;

// --------------------------------------------------
// Seed
// --------------------------------------------------

async function seed() {
    console.log("🌱 Starting database seed...\n");

    const user = await seedUser();

    console.log(`✓ User: ${ user.email } `);

    const accounts = await seedTradingAccounts(user.id);

    console.log(`✓ Created ${ accounts.length } trading accounts`);

    await seedPositions(accounts);

    console.log("✓ Created 9 trading positions");

    console.log("\n🌱 Database seed completed successfully.");
}

// --------------------------------------------------
// User
// --------------------------------------------------

async function seedUser() {
    await db
        .insert(users)
        .values(DEMO_USER)
        .onConflictDoNothing({
            target: users.email,
        });

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, DEMO_USER.email))
        .limit(1);

    if (!user) {
        throw new Error(
            `Failed to create or find user: ${ DEMO_USER.email } `,
        );
    }

    return user;
}

// --------------------------------------------------
// Trading accounts
// --------------------------------------------------

async function seedTradingAccounts(userId: number) {
    // Remove existing trading data for this user.
    await db
        .delete(tradingAccounts)
        .where(eq(tradingAccounts.userId, userId));

    console.log("✓ Cleared existing trading accounts");

    return db
        .insert(tradingAccounts)
        .values(
            TRADING_ACCOUNTS.map((account) => ({
                userId,
                ...account,
            })),
        )
        .returning();
}

// --------------------------------------------------
// Positions
// --------------------------------------------------

async function seedPositions(
    accounts: Awaited<ReturnType<typeof seedTradingAccounts>>,
) {
    const accountId = getAccountIds(accounts);

    await db.insert(positions).values([
        {
            accountId: accountId("IC Markets"),
            symbol: "EURUSD",
            direction: "Buy",
            volume: "0.5",
            entry: "1.08450",
            currentPrice: "1.08720",
            stopLoss: "1.08000",
            takeProfit: "1.09200",
            profitLoss: "135.00",
            openedAt: new Date("2026-09-29T08:15:00Z"),
        },
        {
            accountId: accountId("IC Markets"),
            symbol: "XAUUSD",
            direction: "Sell",
            volume: "0.2",
            entry: "2658.40",
            currentPrice: "2649.80",
            stopLoss: "2670.00",
            takeProfit: "2635.00",
            profitLoss: "172.00",
            openedAt: new Date("2026-09-29T09:40:00Z"),
        },
        {
            accountId: accountId("IC Markets"),
            symbol: "NAS100",
            direction: "Buy",
            volume: "0.1",
            entry: "19840.00",
            currentPrice: "19915.00",
            stopLoss: "19750.00",
            takeProfit: "20100.00",
            profitLoss: "75.00",
            openedAt: new Date("2026-09-29T10:20:00Z"),
        },
        {
            accountId: accountId("Exness"),
            symbol: "GBPUSD",
            direction: "Sell",
            volume: "0.3",
            entry: "1.30450",
            currentPrice: "1.30180",
            stopLoss: "1.30900",
            takeProfit: "1.29600",
            profitLoss: "81.00",
            openedAt: new Date("2026-09-29T08:50:00Z"),
        },
        {
            accountId: accountId("Exness"),
            symbol: "XAUUSD",
            direction: "Buy",
            volume: "0.1",
            entry: "2642.50",
            currentPrice: "2649.80",
            stopLoss: "2630.00",
            takeProfit: "2670.00",
            profitLoss: "73.00",
            openedAt: new Date("2026-09-29T11:05:00Z"),
        },
        {
            accountId: accountId("Deriv"),
            symbol: "USDJPY",
            direction: "Buy",
            volume: "0.2",
            entry: "147.250",
            currentPrice: "147.480",
            stopLoss: "146.900",
            takeProfit: "148.000",
            profitLoss: "31.20",
            openedAt: new Date("2026-09-29T07:45:00Z"),
        },
        {
            accountId: accountId("Deriv"),
            symbol: "EURUSD",
            direction: "Sell",
            volume: "0.15",
            entry: "1.08620",
            currentPrice: "1.08720",
            stopLoss: "1.09000",
            takeProfit: "1.08000",
            profitLoss: "-15.00",
            openedAt: new Date("2026-09-29T12:10:00Z"),
        },
        {
            accountId: accountId("Pepperstone"),
            symbol: "GBPJPY",
            direction: "Buy",
            volume: "0.25",
            entry: "196.420",
            currentPrice: "196.780",
            stopLoss: "195.800",
            takeProfit: "198.000",
            profitLoss: "58.50",
            openedAt: new Date("2026-09-29T08:30:00Z"),
        },
        {
            accountId: accountId("Pepperstone"),
            symbol: "USOIL",
            direction: "Sell",
            volume: "0.3",
            entry: "71.850",
            currentPrice: "71.420",
            stopLoss: "72.500",
            takeProfit: "70.500",
            profitLoss: "129.00",
            openedAt: new Date("2026-09-29T10:45:00Z"),
        },
    ]);
}

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function getAccountIds(
    accounts: Awaited<ReturnType<typeof seedTradingAccounts>>,
) {
    const accountsByBroker = new Map(
        accounts.map((account) => [
            account.broker,
            account.id,
        ]),
    );

    return (broker: string) => {
        const id = accountsByBroker.get(broker);

        if (!id) {
            throw new Error(
                `Trading account not found for broker: ${ broker } `,
            );
        }

        return id;
    };
}

// --------------------------------------------------
// Run
// --------------------------------------------------

seed().catch((error) => { console.error("\n❌ Database seed failed:"); console.error(error); process.exitCode = 1; });
