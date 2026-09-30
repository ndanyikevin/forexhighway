
import type {
    JournalTrade,
} from "~/data/journal/trades";

export interface JournalPerformance {
    totalTrades: number;
    closedTrades: number;
    openTrades: number;

    wins: number;
    losses: number;
    breakeven: number;

    winRate: number;

    netR: number;
    totalProfitLoss: number;
    averageR: number;

    bestTrade?: JournalTrade;
    worstTrade?: JournalTrade;
}

export interface EquityPoint {
    tradeId: number;
    label: string;
    profitLoss: number;
    cumulativeProfitLoss: number;
}

export function calculateJournalPerformance(
    trades: JournalTrade[],
): JournalPerformance {
    const closedTrades =
        trades.filter(
            (trade) =>
                trade.status === "Closed",
        );

    const openTrades =
        trades.filter(
            (trade) =>
                trade.status === "Open",
        );

    const wins =
        closedTrades.filter(
            (trade) =>
                trade.outcome === "Win",
        );

    const losses =
        closedTrades.filter(
            (trade) =>
                trade.outcome === "Loss",
        );

    const breakeven =
        closedTrades.filter(
            (trade) =>
                trade.outcome === "Breakeven",
        );

    const netR =
        closedTrades.reduce(
            (total, trade) =>
                total +
                (trade.resultR ?? 0),
            0,
        );

    const totalProfitLoss =
        closedTrades.reduce(
            (total, trade) =>
                total +
                (trade.profitLoss ?? 0),
            0,
        );

    const tradesWithResults =
        closedTrades.filter(
            (trade) =>
                trade.resultR !== undefined,
        );

    const averageR =
        tradesWithResults.length > 0
            ? netR /
              tradesWithResults.length
            : 0;

    const winRate =
        closedTrades.length > 0
            ? (wins.length /
                  closedTrades.length) *
              100
            : 0;

    const sortedByR =
        [...tradesWithResults].sort(
            (a, b) =>
                (b.resultR ?? 0) -
                (a.resultR ?? 0),
        );

    return {
        totalTrades: trades.length,
        closedTrades: closedTrades.length,
        openTrades: openTrades.length,

        wins: wins.length,
        losses: losses.length,
        breakeven: breakeven.length,

        winRate,
        netR,
        totalProfitLoss,
        averageR,

        bestTrade:
            sortedByR[0],

        worstTrade:
            sortedByR[
                sortedByR.length - 1
            ],
    };
}

export function calculateEquityCurve(
    trades: JournalTrade[],
): EquityPoint[] {
    const closedTrades =
        trades
            .filter(
                (trade) =>
                    trade.status === "Closed" &&
                    trade.profitLoss !== undefined,
            )
            .sort(
                (a, b) =>
                    new Date(
                        a.openedAt,
                    ).getTime() -
                    new Date(
                        b.openedAt,
                    ).getTime(),
            );

    let cumulativeProfitLoss = 0;

    return closedTrades.map(
        (trade, index) => {
            const profitLoss =
                trade.profitLoss ?? 0;

            cumulativeProfitLoss +=
                profitLoss;

            return {
                tradeId: trade.id,
                label: `Trade ${ index + 1 } `,
                profitLoss,
                cumulativeProfitLoss,
            };
        },
    );
}


export interface PerformanceBreakdown {
    name: string;
    trades: number;
    wins: number;
    losses: number;
    netR: number;
    profitLoss: number;
    winRate: number;
}

export function calculatePerformanceBySetup(
    trades: JournalTrade[],
): PerformanceBreakdown[] {
    return calculateBreakdown(
        trades,
        (trade) => trade.setup,
    );
}

export function calculatePerformanceBySession(
    trades: JournalTrade[],
): PerformanceBreakdown[] {
    return calculateBreakdown(
        trades,
        (trade) => trade.session,
    );
}

function calculateBreakdown(
    trades: JournalTrade[],
    getGroup: (trade: JournalTrade) => string,
): PerformanceBreakdown[] {
    const closedTrades =
        trades.filter(
            (trade) =>
                trade.status === "Closed",
        );

    const groups =
        new Map<
            string,
            JournalTrade[]
        >();

    for (const trade of closedTrades) {
        const name = getGroup(trade);

        const existing =
            groups.get(name) ?? [];

        existing.push(trade);

        groups.set(name, existing);
    }

    return Array.from(
        groups.entries(),
    )
        .map(
            ([name, group]) => {
                const wins =
                    group.filter(
                        (trade) =>
                            trade.outcome ===
                            "Win",
                    );

                const losses =
                    group.filter(
                        (trade) =>
                            trade.outcome ===
                            "Loss",
                    );

                const netR =
                    group.reduce(
                        (total, trade) =>
                            total +
                            (trade.resultR ??
                                0),
                        0,
                    );

                const profitLoss =
                    group.reduce(
                        (total, trade) =>
                            total +
                            (trade.profitLoss ??
                                0),
                        0,
                    );

                return {
                    name,
                    trades: group.length,
                    wins: wins.length,
                    losses: losses.length,
                    netR,
                    profitLoss,
                    winRate:
                        group.length > 0
                            ? (wins.length /
                                  group.length) *
                              100
                            : 0,
                };
            },
        )
        .sort(
            (a, b) =>
                b.netR - a.netR,
        );
}

export interface RPoint {
    tradeId: number;
    label: string;
    resultR: number;
    cumulativeR: number;
}

export function calculateRProgression(
    trades: JournalTrade[],
): RPoint[] {
    const closedTrades = trades
        .filter(
            (trade) =>
                trade.status === "Closed" &&
                trade.resultR !== undefined,
        )
        .sort(
            (a, b) =>
                new Date(a.openedAt).getTime() -
                new Date(b.openedAt).getTime(),
        );

    let cumulativeR = 0;

    return closedTrades.map((trade, index) => {
        const resultR = trade.resultR ?? 0;

        cumulativeR += resultR;

        return {
            tradeId: trade.id,
            label: `Trade ${index + 1}`,
            resultR,
            cumulativeR,
        };
    });
}