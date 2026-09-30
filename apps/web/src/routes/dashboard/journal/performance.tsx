
import { createMemo, Show, For } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import {
    ArrowLeft,
    ArrowUpRight,
    Target,
    TrendingUp,
} from "lucide-solid";

import { Button } from "~/components/ui/button";

import { LineChart } from "~/components/ui/charts";

import {
    getJournalTrades,
} from "~/data/journal/trades";

import {
    calculateEquityCurve,
    calculateJournalPerformance,
    calculatePerformanceBySession,
    calculatePerformanceBySetup,
} from "~/lib/journal/performance";

function getResultClass(
    value: number,
) {
    if (value > 0) {
        return "text-emerald-500";
    }

    if (value < 0) {
        return "text-destructive";
    }

    return "text-muted-foreground";
}

function formatMoney(
    value: number,
) {
    return `$${ value.toFixed(2) } `;
}

function formatR(
    value: number,
) {
    return `${ value >= 0 ? "+" : "" }${ value.toFixed(2) } R`;
}

export default function JournalPerformancePage() {
    const trades = getJournalTrades();

    const performance = createMemo(() =>
        calculateJournalPerformance(
            trades,
        ),
    );

    const equityCurve = createMemo(() =>
        calculateEquityCurve(
            trades,
        ),
    );

    const setupPerformance = createMemo(() =>
        calculatePerformanceBySetup(
            trades,
        ),
    );

    const sessionPerformance = createMemo(() =>
        calculatePerformanceBySession(
            trades,
        ),
    );

    return (
        <>
            <Title>
                Performance | Trading Journal | ForexHighway
            </Title>

            <main class="p-6">
                <div class="mx-auto max-w-7xl space-y-8">

                    {/* Header */}
                    <div>
                        <Button
                            as={A}
                            href="/dashboard/journal"
                            variant="ghost"
                            size="sm"
                            class="-ml-2"
                        >
                            <ArrowLeft class="mr-2 size-4" />
                            Journal
                        </Button>

                        <div class="mt-4">
                            <h1 class="text-2xl font-bold tracking-tight">
                                Performance
                            </h1>

                            <p class="mt-1 text-muted-foreground">
                                Review your trading performance and results.
                            </p>
                        </div>
                    </div>

                    {/* Primary Metrics */}
                    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Total Trades */}
                        <div class="rounded-xl border border-border bg-card p-5">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-muted-foreground">
                                    Total Trades
                                </p>

                                <Target class="size-4 text-muted-foreground" />
                            </div>

                            <p class="mt-3 text-2xl font-bold">
                                {performance().totalTrades}
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                {performance().closedTrades} closed ·{" "}
                                {performance().openTrades} open
                            </p>
                        </div>

                        {/* Win Rate */}
                        <div class="rounded-xl border border-border bg-card p-5">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-muted-foreground">
                                    Win Rate
                                </p>

                                <TrendingUp class="size-4 text-muted-foreground" />
                            </div>

                            <p class="mt-3 text-2xl font-bold">
                                {performance().winRate.toFixed(1)}%
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                {performance().wins} wins ·{" "}
                                {performance().losses} losses
                            </p>
                        </div>

                        {/* Net R */}
                        <div class="rounded-xl border border-border bg-card p-5">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-muted-foreground">
                                    Net R
                                </p>

                                <TrendingUp class="size-4 text-muted-foreground" />
                            </div>

                            <p
                                class={`mt - 3 text - 2xl font - bold ${
    getResultClass(
        performance().netR,
    )
} `}
                            >
                                {formatR(
                                    performance().netR,
                                )}
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                Average{" "}
                                {formatR(
                                    performance().averageR,
                                )}{" "}
                                per trade
                            </p>
                        </div>

                        {/* Total P&L */}
                        <div class="rounded-xl border border-border bg-card p-5">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-muted-foreground">
                                    Total P&L
                                </p>

                                <TrendingUp class="size-4 text-muted-foreground" />
                            </div>

                            <p
                                class={`mt - 3 text - 2xl font - bold ${
    getResultClass(
        performance().totalProfitLoss,
    )
} `}
                            >
                                {performance().totalProfitLoss >=
                                0
                                    ? "+"
                                    : ""}
                                {formatMoney(
                                    performance().totalProfitLoss,
                                )}
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                Closed trades
                            </p>
                        </div>
                    </section>

                    {/* Equity Curve */}
                    <section class="rounded-xl border border-border bg-card p-6">
                        <div class="mb-6">
                            <h2 class="font-semibold">
                                Equity Curve
                            </h2>

                            <p class="mt-1 text-sm text-muted-foreground">
                                Cumulative profit and loss across your closed trades.
                            </p>
                        </div>

                        <Show
                            when={equityCurve().length > 0}
                            fallback={
                                <div class="flex h-[320px] items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                                    No completed trade data available.
                                </div>
                            }
                        >
                            <div class="h-[320px]">
                                <LineChart
                                    data={{
                                        labels:
                                            equityCurve().map(
                                                (
                                                    point,
                                                ) =>
                                                    point.label,
                                            ),

                                        datasets: [
                                            {
                                                label: "Cumulative P&L",

                                                data:
                                                    equityCurve().map(
                                                        (
                                                            point,
                                                        ) =>
                                                            point.cumulativeProfitLoss,
                                                    ),

                                                tension: 0.35,
                                                fill: true,
                                                pointRadius: 4,
                                                pointHoverRadius: 6,
                                            },
                                        ],
                                    }}
                                    options={{
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },

                                            tooltip: {
                                                enabled: false,
                                            },
                                        },

                                        scales: {
                                            x: {
                                                border: {
                                                    display: false,
                                                },

                                                grid: {
                                                    display: false,
                                                },
                                            },

                                            y: {
                                                border: {
                                                    display: false,
                                                },

                                                grid: {
                                                    color:
                                                        "hsla(240, 3.8%, 46.1%, 0.4)",
                                                },

                                                ticks: {
                                                    callback:
                                                        (
                                                            value,
                                                        ) =>
                                                            `$${
    Number(
        value,
    ).toFixed(
        0,
    )
} `,
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </Show>
                    </section>

                    {/* Results */}
                    <section class="grid gap-6 lg:grid-cols-2">

                        {/* Outcome Breakdown */}
                        <div class="rounded-xl border border-border bg-card p-6">
                            <div class="mb-6">
                                <h2 class="font-semibold">
                                    Trade Results
                                </h2>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Breakdown of your closed trades.
                                </p>
                            </div>

                            <div class="space-y-5">

                                {/* Wins */}
                                <div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm">
                                            Wins
                                        </span>

                                        <span class="text-sm font-medium text-emerald-500">
                                            {performance().wins}
                                        </span>
                                    </div>

                                    <div class="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            class="h-full rounded-full bg-emerald-500"
                                            style={{
                                                width: `${
    performance()
        .closedTrades >
        0
        ? (performance()
            .wins /
            performance()
                .closedTrades) *
        100
        : 0
}% `,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Losses */}
                                <div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm">
                                            Losses
                                        </span>

                                        <span class="text-sm font-medium text-destructive">
                                            {performance().losses}
                                        </span>
                                    </div>

                                    <div class="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            class="h-full rounded-full bg-destructive"
                                            style={{
                                                width: `${
    performance()
        .closedTrades >
        0
        ? (performance()
            .losses /
            performance()
                .closedTrades) *
        100
        : 0
}% `,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Breakeven */}
                                <div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm">
                                            Breakeven
                                        </span>

                                        <span class="text-sm font-medium text-muted-foreground">
                                            {performance().breakeven}
                                        </span>
                                    </div>

                                    <div class="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            class="h-full rounded-full bg-muted-foreground"
                                            style={{
                                                width: `${
    performance()
        .closedTrades >
        0
        ? (performance()
            .breakeven /
            performance()
                .closedTrades) *
        100
        : 0
}% `,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Best / Worst */}
                        <div class="rounded-xl border border-border bg-card p-6">
                            <div class="mb-6">
                                <h2 class="font-semibold">
                                    Trade Highlights
                                </h2>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Your strongest and weakest recorded trades.
                                </p>
                            </div>

                            <div class="space-y-4">
                                <ShowTrade
                                    label="Best Trade"
                                    trade={
                                        performance()
                                            .bestTrade
                                    }
                                    positive
                                />

                                <ShowTrade
                                    label="Worst Trade"
                                    trade={
                                        performance()
                                            .worstTrade
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* Performance Breakdowns */}
                    <section class="grid gap-6 lg:grid-cols-2">

                        {/* By Setup */}
                        <div class="rounded-xl border border-border bg-card p-6">
                            <div class="mb-6">
                                <h2 class="font-semibold">
                                    Performance by Setup
                                </h2>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Results grouped by trading setup.
                                </p>
                            </div>

                            <div class="space-y-3">
                                <For
                                    each={
                                        setupPerformance()
                                    }
                                    fallback={
                                        <p class="text-sm text-muted-foreground">
                                            No setup data available.
                                        </p>
                                    }
                                >
                                    {(item) => (
                                        <div class="flex items-center justify-between rounded-lg border border-border p-4">
                                            <div>
                                                <p class="font-medium">
                                                    {item.name}
                                                </p>

                                                <p class="mt-1 text-xs text-muted-foreground">
                                                    {item.trades}{" "}
                                                    {item.trades ===
                                                    1
                                                        ? "trade"
                                                        : "trades"}{" "}
                                                    ·{" "}
                                                    {item.wins}{" "}
                                                    wins ·{" "}
                                                    {item.losses}{" "}
                                                    losses
                                                </p>
                                            </div>

                                            <div class="text-right">
                                                <p
                                                    class={`font - semibold ${
    getResultClass(
        item.netR,
    )
} `}
                                                >
                                                    {formatR(
                                                        item.netR,
                                                    )}
                                                </p>

                                                <p
                                                    class={`mt - 1 text - xs ${
    getResultClass(
        item.profitLoss,
    )
} `}
                                                >
                                                    {item.profitLoss >=
                                                    0
                                                        ? "+"
                                                        : ""}
                                                    {formatMoney(
                                                        item.profitLoss,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>

                        {/* By Session */}
                        <div class="rounded-xl border border-border bg-card p-6">
                            <div class="mb-6">
                                <h2 class="font-semibold">
                                    Performance by Session
                                </h2>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Results grouped by trading session.
                                </p>
                            </div>

                            <div class="space-y-3">
                                <For
                                    each={
                                        sessionPerformance()
                                    }
                                    fallback={
                                        <p class="text-sm text-muted-foreground">
                                            No session data available.
                                        </p>
                                    }
                                >
                                    {(item) => (
                                        <div class="flex items-center justify-between rounded-lg border border-border p-4">
                                            <div>
                                                <p class="font-medium">
                                                    {item.name}
                                                </p>

                                                <p class="mt-1 text-xs text-muted-foreground">
                                                    {item.trades}{" "}
                                                    {item.trades ===
                                                    1
                                                        ? "trade"
                                                        : "trades"}{" "}
                                                    ·{" "}
                                                    {item.wins}{" "}
                                                    wins ·{" "}
                                                    {item.losses}{" "}
                                                    losses
                                                </p>
                                            </div>

                                            <div class="text-right">
                                                <p
                                                    class={`font - semibold ${
    getResultClass(
        item.netR,
    )
} `}
                                                >
                                                    {formatR(
                                                        item.netR,
                                                    )}
                                                </p>

                                                <p
                                                    class={`mt - 1 text - xs ${
    getResultClass(
        item.profitLoss,
    )
} `}
                                                >
                                                    {item.profitLoss >=
                                                    0
                                                        ? "+"
                                                        : ""}
                                                    {formatMoney(
                                                        item.profitLoss,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>
                    </section>

                    {/* Navigation */}
                    <section class="flex flex-wrap gap-3">
                        <Button
                            as={A}
                            href="/dashboard/journal/trades"
                            variant="outline"
                        >
                            View All Trades
                            <ArrowUpRight class="size-4" />
                        </Button>

                        <Button
                            as={A}
                            href="/dashboard/journal/new-trade"
                        >
                            Record New Trade
                        </Button>
                    </section>
                </div>
            </main>
        </>
    );
}

interface ShowTradeProps {
    label: string;

    trade:
        | ReturnType<
            typeof getJournalTrades
        >[number]
        | undefined;

    positive?: boolean;
}

function ShowTrade(
    props: ShowTradeProps,
) {
    return (
        <Show
            when={props.trade}
            fallback={
                <div class="rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                    No completed trade data available.
                </div>
            }
        >
            {(trade) => (
                <A
                    href={`/ dashboard / journal / ${ trade().id } `}
                    class="block rounded-lg border border-border p-4 transition-colors hover:bg-muted/40"
                >
                    <div class="flex items-center justify-between gap-4">
                        <div>
                            <p class="text-sm text-muted-foreground">
                                {props.label}
                            </p>

                            <p class="mt-1 font-semibold">
                                {trade().symbol}
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                {trade().setup} ·{" "}
                                {trade().direction}
                            </p>
                        </div>

                        <div class="text-right">
                            <p
                                class={`font - semibold ${
    props.positive
        ? "text-emerald-500"
        : getResultClass(
            trade().resultR ??
            0,
        )
} `}
                            >
                                {trade().resultR !==
                                undefined
                                    ? `${
    trade()
        .resultR! >=
        0
        ? "+"
        : ""
}${
    trade()
        .resultR
} R`
                                    : "—"}
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                {trade().profitLoss !==
                                undefined
                                    ? `${
    trade()
        .profitLoss! >=
        0
        ? "+"
        : ""
}$${
    trade()
    .profitLoss!.toFixed(
        2,
    )
} `
                                    : "—"}
                            </p>
                        </div>
                    </div>
                </A>
            )}
        </Show>
    );
}

