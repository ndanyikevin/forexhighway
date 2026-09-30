import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import {
    ArrowUpRight,
    BookOpen,
    CircleDollarSign,
    Clock3,
    Plus,
    Target,
    TrendingDown,
    TrendingUp,
} from "lucide-solid";

import { Button } from "~/components/ui/button";

import {
    getJournalTrades,
} from "~/data/journal/trades";

export default function JournalPage() {
    const trades = getJournalTrades();

    const closedTrades = trades.filter(
        (trade) => trade.status === "Closed",
    );

    const openTrades = trades.filter(
        (trade) => trade.status === "Open",
    );

    const winningTrades = closedTrades.filter(
        (trade) => trade.outcome === "Win",
    );

    const winRate =
        closedTrades.length > 0
            ? (
                (winningTrades.length /
                    closedTrades.length) *
                100
            ).toFixed(1)
            : "0.0";

    const netR = closedTrades.reduce(
        (total, trade) =>
            total + (trade.resultR ?? 0),
        0,
    );

    const totalProfitLoss =
        closedTrades.reduce(
            (total, trade) =>
                total + (trade.profitLoss ?? 0),
            0,
        );

    const recentTrades = [...trades]
        .sort(
            (a, b) =>
                new Date(b.openedAt).getTime() -
                new Date(a.openedAt).getTime(),
        )
        .slice(0, 5);

    return (
        <>
            <Title>
                Journal | Dashboard | ForexHighway
            </Title>

            <main class="p-6">
                <div class="mx-auto max-w-7xl space-y-8">
                    {/* Header */}
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">
                                Trading Journal
                            </h1>

                            <p class="mt-1 text-muted-foreground">
                                Review your trades, decisions and
                                performance.
                            </p>
                        </div>

                        <Button
                            as={A}
                            href="/dashboard/journal/new-trade"
                        >
                            <Plus class="mr-2 size-4" />
                            Record Trade
                        </Button>
                    </div>

                    {/* Stats */}
                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div class="rounded-xl border border-border bg-card p-5">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-muted-foreground">
                                    Total Trades
                                </p>

                                <BookOpen class="size-4 text-muted-foreground" />
                            </div>

                            <p class="mt-3 text-2xl font-bold">
                                {trades.length}
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                {closedTrades.length} closed ·{" "}
                                {openTrades.length} open
                            </p>
                        </div>

                        <div class="rounded-xl border border-border bg-card p-5">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-muted-foreground">
                                    Win Rate
                                </p>

                                <Target class="size-4 text-muted-foreground" />
                            </div>

                            <p class="mt-3 text-2xl font-bold">
                                {winRate}%
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                Based on closed trades
                            </p>
                        </div>

                        <div class="rounded-xl border border-border bg-card p-5">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-muted-foreground">
                                    Net R
                                </p>

                                {netR >= 0 ? (
                                    <TrendingUp class="size-4 text-primary" />
                                ) : (
                                    <TrendingDown class="size-4 text-destructive" />
                                )}
                            </div>

                            <p class="mt-3 text-2xl font-bold">
                                {netR >= 0 ? "+" : ""}
                                {netR.toFixed(2)}R
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                Closed trade performance
                            </p>
                        </div>

                        <div class="rounded-xl border border-border bg-card p-5">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-muted-foreground">
                                    Profit / Loss
                                </p>

                                <CircleDollarSign class="size-4 text-muted-foreground" />
                            </div>

                            <p class="mt-3 text-2xl font-bold">
                                {totalProfitLoss >= 0
                                    ? "+"
                                    : ""}
                                {totalProfitLoss.toFixed(
                                    2,
                                )}
                            </p>

                            <p class="mt-1 text-xs text-muted-foreground">
                                Closed trades
                            </p>
                        </div>
                    </div>

                    {/* Recent Trades */}
                    <section class="rounded-xl border border-border bg-card">
                        <div class="flex items-center justify-between border-b border-border px-5 py-4">
                            <div>
                                <h2 class="font-semibold">
                                    Recent Trades
                                </h2>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Your latest journal activity.
                                </p>
                            </div>

                            <Button
                                as={A}
                                href="/dashboard/journal/trades"
                                variant="ghost"
                                size="sm"
                            >
                                View all
                                <ArrowUpRight class="ml-2 size-4" />
                            </Button>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b border-border text-left text-muted-foreground">
                                        <th class="px-5 py-3 font-medium">
                                            Symbol
                                        </th>

                                        <th class="px-5 py-3 font-medium">
                                            Direction
                                        </th>

                                        <th class="px-5 py-3 font-medium">
                                            Setup
                                        </th>

                                        <th class="px-5 py-3 font-medium">
                                            Outcome
                                        </th>

                                        <th class="px-5 py-3 text-right font-medium">
                                            Result
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentTrades.map(
                                        (trade) => (
                                            <tr class="border-b border-border last:border-0">
                                                <td class="px-5 py-4">
                                                    <span class="font-medium">
                                                        {trade.symbol}
                                                    </span>

                                                    <span class="ml-2 text-xs text-muted-foreground">
                                                        {
                                                            trade.timeframe
                                                        }
                                                    </span>
                                                </td>

                                                <td class="px-5 py-4">
                                                    <span
                                                        class={
                                                            trade.direction ===
                                                            "Buy"
                                                                ? "text-primary"
                                                                : "text-destructive"
                                                        }
                                                    >
                                                        {
                                                            trade.direction
                                                        }
                                                    </span>
                                                </td>

                                                <td class="px-5 py-4 text-muted-foreground">
                                                    {
                                                        trade.setup
                                                    }
                                                </td>

                                                <td class="px-5 py-4">
                                                    <span class="rounded-full border border-border px-2.5 py-1 text-xs font-medium">
                                                        {
                                                            trade.outcome
                                                        }
                                                    </span>
                                                </td>

                                                <td class="px-5 py-4 text-right font-medium">
                                                    {trade.resultR !==
                                                    undefined
                                                        ? `${
    trade.resultR >=
        0
        ? "+"
        : ""
}${ trade.resultR } R`
                                                        : "—"}
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Open Trades */}
                    <section class="rounded-xl border border-border bg-card">
                        <div class="flex items-center justify-between border-b border-border px-5 py-4">
                            <div>
                                <h2 class="font-semibold">
                                    Open Trades
                                </h2>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Trades that are currently open.
                                </p>
                            </div>

                            <Clock3 class="size-4 text-muted-foreground" />
                        </div>

                        {openTrades.length > 0 ? (
                            <div class="divide-y divide-border">
                                {openTrades.map(
                                    (trade) => (
                                        <div class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div class="flex items-center gap-4">
                                                <div>
                                                    <p class="font-medium">
                                                        {
                                                            trade.symbol
                                                        }
                                                    </p>

                                                    <p class="mt-1 text-sm text-muted-foreground">
                                                        {
                                                            trade.setup
                                                        }{" "}
                                                        ·{" "}
                                                        {
                                                            trade.timeframe
                                                        }
                                                    </p>
                                                </div>

                                                <span
                                                    class={
                                                        trade.direction ===
                                                        "Buy"
                                                            ? "rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                                                            : "rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive"
                                                    }
                                                >
                                                    {
                                                        trade.direction
                                                    }
                                                </span>
                                            </div>

                                            <div class="text-sm text-muted-foreground">
                                                Opened{" "}
                                                {new Date(
                                                    trade.openedAt,
                                                ).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : (
                            <div class="px-5 py-10 text-center">
                                <p class="font-medium">
                                    No open trades
                                </p>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Your open positions will appear here.
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}





