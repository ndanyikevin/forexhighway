
export type TradingDirection =
    | "Buy"
    | "Sell";

export type TradingOrderType =
    | "Market"
    | "Buy Limit"
    | "Sell Limit"
    | "Buy Stop"
    | "Sell Stop";

export type TradingOrderStatus =
    | "Pending"
    | "Filled"
    | "Cancelled";

export type TradingActivityStatus =
    | "Opened"
    | "Closed"
    | "Pending"
    | "Cancelled";

export type TradingBroker =
    | "IC Markets"
    | "Exness"
    | "Deriv"
    | "Pepperstone";

export interface TradingAccount {
    id: number;

    name: string;

    broker: TradingBroker;

    platform: "MT5";

    accountNumber: string;

    currency: string;

    balance: number;

    equity: number;

    margin: number;

    freeMargin: number;
}

export interface TradingPosition {
    id: number;

    accountId: number;

    symbol: string;

    direction: TradingDirection;

    volume: number;

    entry: number;

    currentPrice: number;

    stopLoss?: number;

    takeProfit?: number;

    profitLoss: number;

    openedAt: string;
}

export interface TradingOrder {
    id: number;

    accountId: number;

    symbol: string;

    direction: TradingDirection;

    type: TradingOrderType;

    status: TradingOrderStatus;

    volume: number;

    price: number;

    createdAt: string;
}

export interface TradingActivity {
    id: number;

    accountId: number;

    symbol: string;

    direction: TradingDirection;

    description: string;

    status: TradingActivityStatus;

    profitLoss: number;

    time: string;
}


/*
|--------------------------------------------------------------------------
| Mock Trading Accounts
|--------------------------------------------------------------------------
*/

export const tradingAccounts: TradingAccount[] = [
    {
        id: 1,

        name: "ForexHighway Trading Account",

        broker: "IC Markets",

        platform: "MT5",

        accountNumber: "ICM-482915",

        currency: "USD",

        balance: 10000,

        equity: 10240.5,

        margin: 640,

        freeMargin: 9600.5,
    },

    {
        id: 2,

        name: "Exness Trading Account",

        broker: "Exness",

        platform: "MT5",

        accountNumber: "EXN-731204",

        currency: "USD",

        balance: 5000,

        equity: 5178.25,

        margin: 420,

        freeMargin: 4758.25,
    },

    {
        id: 3,

        name: "Deriv Trading Account",

        broker: "Deriv",

        platform: "MT5",

        accountNumber: "DRV-619842",

        currency: "USD",

        balance: 2500,

        equity: 2442.8,

        margin: 315,

        freeMargin: 2127.8,
    },

    {
        id: 4,

        name: "Pepperstone Trading Account",

        broker: "Pepperstone",

        platform: "MT5",

        accountNumber: "PPR-904517",

        currency: "USD",

        balance: 15000,

        equity: 15386.4,

        margin: 875,

        freeMargin: 14511.4,
    },
];


/*
|--------------------------------------------------------------------------
| Mock Open Positions
|--------------------------------------------------------------------------
*/

export const tradingPositions: TradingPosition[] = [
    /*
    |--------------------------------------------------------------------------
    | IC Markets
    |--------------------------------------------------------------------------
    */

    {
        id: 1,

        accountId: 1,

        symbol: "EURUSD",

        direction: "Buy",

        volume: 0.5,

        entry: 1.0842,

        currentPrice: 1.0868,

        stopLoss: 1.0828,

        takeProfit: 1.087,

        profitLoss: 84.5,

        openedAt:
            "2026-09-30T08:15:00Z",
    },

    {
        id: 2,

        accountId: 1,

        symbol: "XAUUSD",

        direction: "Sell",

        volume: 0.2,

        entry: 2648.4,

        currentPrice: 2643.2,

        stopLoss: 2653.2,

        takeProfit: 2638.8,

        profitLoss: 112.3,

        openedAt:
            "2026-09-30T09:20:00Z",
    },

    {
        id: 3,

        accountId: 1,

        symbol: "NAS100",

        direction: "Buy",

        volume: 0.1,

        entry: 19482,

        currentPrice: 19520,

        stopLoss: 19420,

        takeProfit: 19607,

        profitLoss: 43.7,

        openedAt:
            "2026-09-30T10:05:00Z",
    },

    /*
    |--------------------------------------------------------------------------
    | Exness
    |--------------------------------------------------------------------------
    */

    {
        id: 4,

        accountId: 2,

        symbol: "GBPUSD",

        direction: "Sell",

        volume: 0.3,

        entry: 1.2748,

        currentPrice: 1.2729,

        stopLoss: 1.277,

        takeProfit: 1.2695,

        profitLoss: 57.2,

        openedAt:
            "2026-09-30T08:45:00Z",
    },

    {
        id: 5,

        accountId: 2,

        symbol: "XAUUSD",

        direction: "Buy",

        volume: 0.1,

        entry: 2641.8,

        currentPrice: 2644.6,

        stopLoss: 2636.5,

        takeProfit: 2652,

        profitLoss: 121.05,

        openedAt:
            "2026-09-30T09:35:00Z",
    },

    /*
    |--------------------------------------------------------------------------
    | Deriv
    |--------------------------------------------------------------------------
    */

    {
        id: 6,

        accountId: 3,

        symbol: "USDJPY",

        direction: "Buy",

        volume: 0.2,

        entry: 147.42,

        currentPrice: 147.68,

        stopLoss: 147.1,

        takeProfit: 148.05,

        profitLoss: 34.6,

        openedAt:
            "2026-09-30T07:55:00Z",
    },

    {
        id: 7,

        accountId: 3,

        symbol: "EURUSD",

        direction: "Sell",

        volume: 0.15,

        entry: 1.0858,

        currentPrice: 1.0869,

        stopLoss: 1.088,

        takeProfit: 1.0835,

        profitLoss: -16.4,

        openedAt:
            "2026-09-30T09:10:00Z",
    },

    /*
    |--------------------------------------------------------------------------
    | Pepperstone
    |--------------------------------------------------------------------------
    */

    {
        id: 8,

        accountId: 4,

        symbol: "GBPJPY",

        direction: "Buy",

        volume: 0.25,

        entry: 191.42,

        currentPrice: 191.86,

        stopLoss: 190.95,

        takeProfit: 192.25,

        profitLoss: 96.75,

        openedAt:
            "2026-09-30T08:25:00Z",
    },

    {
        id: 9,

        accountId: 4,

        symbol: "USOIL",

        direction: "Sell",

        volume: 0.3,

        entry: 71.84,

        currentPrice: 71.42,

        stopLoss: 72.25,

        takeProfit: 70.95,

        profitLoss: 126.2,

        openedAt:
            "2026-09-30T10:15:00Z",
    },
];


/*
|--------------------------------------------------------------------------
| Mock Pending Orders
|--------------------------------------------------------------------------
*/

export const tradingOrders: TradingOrder[] = [
    /*
    |--------------------------------------------------------------------------
    | IC Markets
    |--------------------------------------------------------------------------
    */

    {
        id: 1,

        accountId: 1,

        symbol: "EURUSD",

        direction: "Buy",

        type: "Buy Limit",

        status: "Pending",

        volume: 0.5,

        price: 1.0815,

        createdAt:
            "2026-09-30T10:20:00Z",
    },

    {
        id: 2,

        accountId: 1,

        symbol: "XAUUSD",

        direction: "Sell",

        type: "Sell Stop",

        status: "Pending",

        volume: 0.1,

        price: 2638.5,

        createdAt:
            "2026-09-30T10:45:00Z",
    },

    /*
    |--------------------------------------------------------------------------
    | Exness
    |--------------------------------------------------------------------------
    */

    {
        id: 3,

        accountId: 2,

        symbol: "GBPUSD",

        direction: "Buy",

        type: "Buy Limit",

        status: "Pending",

        volume: 0.2,

        price: 1.2695,

        createdAt:
            "2026-09-30T10:05:00Z",
    },

    /*
    |--------------------------------------------------------------------------
    | Deriv
    |--------------------------------------------------------------------------
    */

    {
        id: 4,

        accountId: 3,

        symbol: "USDJPY",

        direction: "Sell",

        type: "Sell Stop",

        status: "Pending",

        volume: 0.15,

        price: 147.05,

        createdAt:
            "2026-09-30T09:55:00Z",
    },

    /*
    |--------------------------------------------------------------------------
    | Pepperstone
    |--------------------------------------------------------------------------
    */

    {
        id: 5,

        accountId: 4,

        symbol: "GBPJPY",

        direction: "Buy",

        type: "Buy Stop",

        status: "Pending",

        volume: 0.2,

        price: 192.05,

        createdAt:
            "2026-09-30T10:30:00Z",
    },
];


/*
|--------------------------------------------------------------------------
| Recent Trading Activity
|--------------------------------------------------------------------------
*/

export const tradingActivity: TradingActivity[] = [
    /*
    |--------------------------------------------------------------------------
    | IC Markets
    |--------------------------------------------------------------------------
    */

    {
        id: 1,

        accountId: 1,

        symbol: "EURUSD",

        direction: "Buy",

        description:
            "Buy position opened",

        status: "Opened",

        profitLoss: 0,

        time: "2 hours ago",
    },

    {
        id: 2,

        accountId: 1,

        symbol: "XAUUSD",

        direction: "Sell",

        description:
            "Sell position opened",

        status: "Opened",

        profitLoss: 0,

        time: "1 hour ago",
    },

    {
        id: 3,

        accountId: 1,

        symbol: "NAS100",

        direction: "Buy",

        description:
            "Buy position opened",

        status: "Opened",

        profitLoss: 0,

        time: "45 minutes ago",
    },

    {
        id: 4,

        accountId: 1,

        symbol: "EURUSD",

        direction: "Buy",

        description:
            "Buy position closed",

        status: "Closed",

        profitLoss: 84.5,

        time: "Yesterday",
    },

    {
        id: 5,

        accountId: 1,

        symbol: "XAUUSD",

        direction: "Sell",

        description:
            "Sell position closed",

        status: "Closed",

        profitLoss: -42.25,

        time: "Yesterday",
    },

    /*
    |--------------------------------------------------------------------------
    | Exness
    |--------------------------------------------------------------------------
    */

    {
        id: 6,

        accountId: 2,

        symbol: "GBPUSD",

        direction: "Sell",

        description:
            "Sell position opened",

        status: "Opened",

        profitLoss: 0,

        time: "1 hour ago",
    },

    {
        id: 7,

        accountId: 2,

        symbol: "XAUUSD",

        direction: "Buy",

        description:
            "Buy position opened",

        status: "Opened",

        profitLoss: 0,

        time: "35 minutes ago",
    },

    {
        id: 8,

        accountId: 2,

        symbol: "EURUSD",

        direction: "Sell",

        description:
            "Sell position closed",

        status: "Closed",

        profitLoss: 72.4,

        time: "Yesterday",
    },

    /*
    |--------------------------------------------------------------------------
    | Deriv
    |--------------------------------------------------------------------------
    */

    {
        id: 9,

        accountId: 3,

        symbol: "USDJPY",

        direction: "Buy",

        description:
            "Buy position opened",

        status: "Opened",

        profitLoss: 0,

        time: "2 hours ago",
    },

    {
        id: 10,

        accountId: 3,

        symbol: "EURUSD",

        direction: "Sell",

        description:
            "Sell position opened",

        status: "Opened",

        profitLoss: 0,

        time: "1 hour ago",
    },

    {
        id: 11,

        accountId: 3,

        symbol: "XAUUSD",

        direction: "Buy",

        description:
            "Buy position closed",

        status: "Closed",

        profitLoss: -31.2,

        time: "Yesterday",
    },

    /*
    |--------------------------------------------------------------------------
    | Pepperstone
    |--------------------------------------------------------------------------
    */

    {
        id: 12,

        accountId: 4,

        symbol: "GBPJPY",

        direction: "Buy",

        description:
            "Buy position opened",

        status: "Opened",

        profitLoss: 0,

        time: "1 hour ago",
    },

    {
        id: 13,

        accountId: 4,

        symbol: "USOIL",

        direction: "Sell",

        description:
            "Sell position opened",

        status: "Opened",

        profitLoss: 0,

        time: "30 minutes ago",
    },

    {
        id: 14,

        accountId: 4,

        symbol: "EURUSD",

        direction: "Buy",

        description:
            "Buy position closed",

        status: "Closed",

        profitLoss: 148.6,

        time: "Yesterday",
    },
];


/*
|--------------------------------------------------------------------------
| Repository Functions
|--------------------------------------------------------------------------
*/

export function getTradingAccounts() {
    return tradingAccounts;
}


export function getTradingAccount(
    id: number,
) {
    return tradingAccounts.find(
        (account) =>
            account.id === id,
    );
}


export function getOpenPositions(
    accountId: number,
) {
    return tradingPositions.filter(
        (position) =>
            position.accountId ===
            accountId,
    );
}


export function getPendingOrders(
    accountId: number,
) {
    return tradingOrders.filter(
        (order) =>
            order.accountId ===
                accountId &&
            order.status ===
                "Pending",
    );
}


export function getTradingOrders(
    accountId: number,
) {
    return tradingOrders.filter(
        (order) =>
            order.accountId ===
            accountId,
    );
}


export function getRecentTradingActivity(
    accountId: number,
) {
    return tradingActivity.filter(
        (activity) =>
            activity.accountId ===
            accountId,
    );
}

