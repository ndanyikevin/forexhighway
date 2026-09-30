export type TradeDirection =
    | "Buy"
    | "Sell";

export type TradeStatus =
    | "Open"
    | "Closed";

export type TradeSession =
    | "Asian"
    | "London"
    | "New York"
    | "Sydney";

export type TradeOutcome =
    | "Win"
    | "Loss"
    | "Breakeven"
    | "Pending";

export interface JournalTrade {
    id: number;

    // Market
    symbol: string;
    direction: TradeDirection;
    status: TradeStatus;
    outcome: TradeOutcome;
    timeframe: string;
    session: TradeSession;

    // Execution
    entry: number;
    stopLoss: number;
    takeProfit: number;
    exit?: number;

    // Risk & performance
    riskPercent: number;
    resultR?: number;
    profitLoss?: number;

    // Trader's reasoning
    setup: string;
    entryReason: string;
    exitReason?: string;
    notes?: string;

    // Chart analysis
    tradingViewUrl?: string;
    metaTraderUrl?: string;

    // Dates
    openedAt: string;
    closedAt?: string;
}

export interface CreateJournalTradeInput {
    symbol: string;
    direction: TradeDirection;
    status: TradeStatus;
    outcome: TradeOutcome;
    timeframe: string;
    session: TradeSession;

    entry: number;
    stopLoss: number;
    takeProfit: number;
    exit?: number;

    riskPercent: number;
    resultR?: number;
    profitLoss?: number;

    setup: string;
    entryReason: string;
    exitReason?: string;
    notes?: string;

    tradingViewUrl?: string;
    metaTraderUrl?: string;

    openedAt: string;
    closedAt?: string;
}

export interface UpdateJournalTradeInput {
    symbol?: string;
    direction?: TradeDirection;
    status?: TradeStatus;
    outcome?: TradeOutcome;
    timeframe?: string;
    session?: TradeSession;

    entry?: number;
    stopLoss?: number;
    takeProfit?: number;
    exit?: number;

    riskPercent?: number;
    resultR?: number;
    profitLoss?: number;

    setup?: string;
    entryReason?: string;
    exitReason?: string;
    notes?: string;

    tradingViewUrl?: string;
    metaTraderUrl?: string;

    openedAt?: string;
    closedAt?: string;
}

export const journalTrades: JournalTrade[] = [
    {
        id: 1,
        symbol: "EURUSD",
        direction: "Buy",
        status: "Closed",
        outcome: "Win",
        timeframe: "1M",
        session: "London",

        entry: 1.0842,
        stopLoss: 1.0828,
        takeProfit: 1.087,
        exit: 1.087,

        riskPercent: 2,
        resultR: 2,
        profitLoss: 84.5,

        setup: "Liquidity Sweep",
        entryReason:
            "Price swept the previous London low and showed bullish displacement.",
        exitReason:
            "Take profit reached at the opposing liquidity zone.",
        notes:
            "Clean reaction from the swept low. Entry aligned with the higher-timeframe structure.",

        tradingViewUrl:
            "https://www.tradingview.com/chart/EURUSD/g6rZt555-Potential-sell/",
        metaTraderUrl:
            "https://charts.mql5.com/44/149/eurusd-m1-raw-trading-ltd.png",

        openedAt: "2026-09-24T08:15:00Z",
        closedAt: "2026-09-24T10:42:00Z",
    },

    {
        id: 2,
        symbol: "XAUUSD",
        direction: "Sell",
        status: "Closed",
        outcome: "Loss",
        timeframe: "1M",
        session: "London",

        entry: 2648.4,
        stopLoss: 2653.2,
        takeProfit: 2638.8,
        exit: 2653.2,

        riskPercent: 2,
        resultR: -1,
        profitLoss: -42.25,

        setup: "Supply Rejection",
        entryReason:
            "Price rejected a previous supply zone after taking buy-side liquidity.",
        exitReason:
            "Stop loss was hit after price continued through the supply zone.",
        notes:
            "The liquidity sweep was valid, but there was insufficient bearish displacement before entry.",

        tradingViewUrl:
            "https://www.tradingview.com/chart/XAUUSD/",

        openedAt: "2026-09-23T08:30:00Z",
        closedAt: "2026-09-23T09:18:00Z",
    },

    {
        id: 3,
        symbol: "NASDAQ",
        direction: "Buy",
        status: "Closed",
        outcome: "Win",
        timeframe: "5M",
        session: "New York",

        entry: 19482.5,
        stopLoss: 19420,
        takeProfit: 19607.5,
        exit: 19607.5,

        riskPercent: 2,
        resultR: 2,
        profitLoss: 126.75,

        setup: "Market Structure Break",
        entryReason:
            "Price broke the previous intraday high and retested the structure level.",
        exitReason:
            "Target reached at the next major liquidity area.",
        notes:
            "Good confirmation before entry. Avoided chasing the initial breakout.",

        metaTraderUrl:
            "https://charts.mql5.com/44/149/eurusd-m1-raw-trading-ltd.png",

        openedAt: "2026-09-22T14:35:00Z",
        closedAt: "2026-09-22T16:02:00Z",
    },

    {
        id: 4,
        symbol: "EURUSD",
        direction: "Sell",
        status: "Open",
        outcome: "Pending",
        timeframe: "1M",
        session: "London",

        entry: 1.1764,
        stopLoss: 1.1782,
        takeProfit: 1.1728,

        riskPercent: 2,

        setup: "Double Top",
        entryReason:
            "Price formed a double top after sweeping the previous session high.",
        notes:
            "Waiting for bearish displacement and confirmation before considering the setup invalid or active.",

        tradingViewUrl:
            "https://www.tradingview.com/chart/EURUSD/g6rZt555-Potential-sell/",

        openedAt: "2026-09-25T08:10:00Z",
    },
];

function hasAnalysis(
    tradingViewUrl?: string,
    metaTraderUrl?: string,
) {
    return Boolean(
        tradingViewUrl?.trim() ||
        metaTraderUrl?.trim(),
    );
}

function normalizeUrl(
    url?: string,
) {
    return url?.trim() || undefined;
}

function validateAnalysis(
    tradingViewUrl?: string,
    metaTraderUrl?: string,
) {
    if (
        !hasAnalysis(
            tradingViewUrl,
            metaTraderUrl,
        )
    ) {
        throw new Error(
            "At least one analysis chart is required. Provide a TradingView or MetaTrader chart.",
        );
    }
}

export function getJournalTrades() {
    return journalTrades;
}

export function getJournalTrade(
    id: number,
) {
    return journalTrades.find(
        (trade) => trade.id === id,
    );
}

export function createJournalTrade(
    input: CreateJournalTradeInput,
): JournalTrade {
    validateAnalysis(
        input.tradingViewUrl,
        input.metaTraderUrl,
    );

    const nextId =
        journalTrades.length > 0
            ? Math.max(
                ...journalTrades.map(
                    (trade) => trade.id,
                ),
            ) + 1
            : 1;

    const trade: JournalTrade = {
        id: nextId,

        symbol: input.symbol.trim().toUpperCase(),
        direction: input.direction,
        status: input.status,
        outcome: input.outcome,
        timeframe: input.timeframe.trim(),
        session: input.session,

        entry: input.entry,
        stopLoss: input.stopLoss,
        takeProfit: input.takeProfit,
        exit: input.exit,

        riskPercent: input.riskPercent,
        resultR: input.resultR,
        profitLoss: input.profitLoss,

        setup: input.setup.trim(),
        entryReason: input.entryReason.trim(),
        exitReason:
            input.exitReason?.trim() || undefined,
        notes:
            input.notes?.trim() || undefined,

        tradingViewUrl: normalizeUrl(
            input.tradingViewUrl,
        ),
        metaTraderUrl: normalizeUrl(
            input.metaTraderUrl,
        ),

        openedAt: input.openedAt,
        closedAt: input.closedAt,
    };

    journalTrades.push(trade);

    return trade;
}

export function updateJournalTrade(
    id: number,
    input: UpdateJournalTradeInput,
) {
    const trade = getJournalTrade(id);

    if (!trade) {
        return undefined;
    }

    const tradingViewUrl =
        input.tradingViewUrl !== undefined
            ? normalizeUrl(
                input.tradingViewUrl,
            )
            : trade.tradingViewUrl;

    const metaTraderUrl =
        input.metaTraderUrl !== undefined
            ? normalizeUrl(
                input.metaTraderUrl,
            )
            : trade.metaTraderUrl;

    validateAnalysis(
        tradingViewUrl,
        metaTraderUrl,
    );

    if (input.symbol !== undefined) {
        trade.symbol =
            input.symbol.trim().toUpperCase();
    }

    if (input.direction !== undefined) {
        trade.direction = input.direction;
    }

    if (input.status !== undefined) {
        trade.status = input.status;
    }

    if (input.outcome !== undefined) {
        trade.outcome = input.outcome;
    }

    if (input.timeframe !== undefined) {
        trade.timeframe =
            input.timeframe.trim();
    }

    if (input.session !== undefined) {
        trade.session = input.session;
    }

    if (input.entry !== undefined) {
        trade.entry = input.entry;
    }

    if (input.stopLoss !== undefined) {
        trade.stopLoss = input.stopLoss;
    }

    if (input.takeProfit !== undefined) {
        trade.takeProfit = input.takeProfit;
    }

    if (input.exit !== undefined) {
        trade.exit = input.exit;
    }

    if (input.riskPercent !== undefined) {
        trade.riskPercent =
            input.riskPercent;
    }

    if (input.resultR !== undefined) {
        trade.resultR = input.resultR;
    }

    if (input.profitLoss !== undefined) {
        trade.profitLoss =
            input.profitLoss;
    }

    if (input.setup !== undefined) {
        trade.setup =
            input.setup.trim();
    }

    if (input.entryReason !== undefined) {
        trade.entryReason =
            input.entryReason.trim();
    }

    if (input.exitReason !== undefined) {
        trade.exitReason =
            input.exitReason.trim() || undefined;
    }

    if (input.notes !== undefined) {
        trade.notes =
            input.notes.trim() || undefined;
    }

    trade.tradingViewUrl =
        tradingViewUrl;

    trade.metaTraderUrl =
        metaTraderUrl;

    if (input.openedAt !== undefined) {
        trade.openedAt =
            input.openedAt;
    }

    if (input.closedAt !== undefined) {
        trade.closedAt =
            input.closedAt;
    }

    return trade;
}

export function deleteJournalTrade(
    id: number,
) {
    const index =
        journalTrades.findIndex(
            (trade) =>
                trade.id === id,
        );

    if (index === -1) {
        return false;
    }

    journalTrades.splice(index, 1);

    return true;
}