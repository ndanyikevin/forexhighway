
import {
    ArrowUpRight,
    BookOpen,
    ChartNoAxesCombined,
    CircleDollarSign,
    TrendingDown,
    TrendingUp,
} from "lucide-solid";

import { A } from "@solidjs/router";

import { Button } from "~/components/ui/button";

const openPositions = [
    {
        symbol: "EURUSD",
        direction: "Buy",
        entry: "1.0842",
        current: "1.0868",
        pnl: 84.5,
    },
    {
        symbol: "XAUUSD",
        direction: "Sell",
        entry: "2648.40",
        current: "2643.20",
        pnl: 112.3,
    },
    {
        symbol: "NAS100",
        direction: "Buy",
        entry: "19,482",
        current: "19,520",
        pnl: 43.7,
    },
];

const recentActivity = [
    {
        symbol: "EURUSD",
        description: "Buy trade closed",
        result: "+2R",
        pnl: 84.5,
        time: "2 hours ago",
    },
    {
        symbol: "XAUUSD",
        description: "Sell trade closed",
        result: "-1R",
        pnl: -42.25,
        time: "Yesterday",
    },
    {
        symbol: "NAS100",
        description: "Buy trade closed",
        result: "+2R",
        pnl: 126.75,
        time: "Yesterday",
    },
];

function formatMoney(value: number) {
    return `${ value >= 0 ? "+" : "-" }$${ Math.abs(value).toFixed(2) } `;
}

function getResultClass(value: number) {
    if (value > 0) {
        return "text-emerald-500";
    }

    if (value < 0) {
        return "text-destructive";
    }

    return "text-muted-foreground";
}

export default function DashboardHome() {
    return (
        <main class="p-6">
            <div class="mx-auto max-w-7xl space-y-6">

                {/* Header */}
                <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 class="text-2xl font-bold tracking-tight">
                            Dashboard
                        </h1>

                        <p class="mt-1 text-muted-foreground">
                            Welcome back. Here's what's happening with your trading.
                        </p>
                    </div>

                    <div class="flex gap-2">
                        <Button
                            as={A}
                            href="/dashboard/journal/new-trade"
                        >
                            Record Trade
                        </Button>

                        <Button
                            as={A}
                            href="/dashboard/trading"
                            variant="outline"
                        >
                            Trading
                            <ArrowUpRight class="size-4" />
                        </Button>
                    </div>
                </div>

                {/* Account Snapshot */}
                <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Balance */}
                    <div class="rounded-xl border border-border bg-card p-5">
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-muted-foreground">
                                Balance
                            </p>

                            <CircleDollarSign class="size-4 text-muted-foreground" />
                        </div>

                        <p class="mt-3 text-2xl font-bold">
                            $10,000.00
                        </p>

                        <p class="mt-1 text-xs text-muted-foreground">
                            Trading account
                        </p>
                    </div>

                    {/* Today's P&L */}
                    <div class="rounded-xl border border-border bg-card p-5">
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-muted-foreground">
                                Today's P&L
                            </p>

                            <TrendingUp class="size-4 text-emerald-500" />
                        </div>

                        <p class="mt-3 text-2xl font-bold text-emerald-500">
                            +$240.50
                        </p>

                        <p class="mt-1 text-xs text-muted-foreground">
                            +2.41% today
                        </p>
                    </div>

                    {/* Equity */}
                    <div class="rounded-xl border border-border bg-card p-5">
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-muted-foreground">
                                Equity
                            </p>

                            <TrendingUp class="size-4 text-muted-foreground" />
                        </div>

                        <p class="mt-3 text-2xl font-bold">
                            $10,240.50
                        </p>

                        <p class="mt-1 text-xs text-muted-foreground">
                            Including open positions
                        </p>
                    </div>

                    {/* Open Positions */}
                    <div class="rounded-xl border border-border bg-card p-5">
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-muted-foreground">
                                Open Positions
                            </p>

                            <ChartNoAxesCombined class="size-4 text-muted-foreground" />
                        </div>

                        <p class="mt-3 text-2xl font-bold">
                            3
                        </p>

                        <p class="mt-1 text-xs text-muted-foreground">
                            Currently active
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section class="grid gap-6 lg:grid-cols-3">

                    {/* Open Positions */}
                    <div class="rounded-xl border border-border bg-card lg:col-span-2">
                        <div class="flex items-center justify-between border-b border-border px-6 py-4">
                            <div>
                                <h2 class="font-semibold">
                                    Open Positions
                                </h2>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Your currently active trades.
                                </p>
                            </div>

                            <Button
                                as={A}
                                href="/dashboard/trading"
                                variant="ghost"
                                size="sm"
                            >
                                View Trading
                                <ArrowUpRight class="size-4" />
                            </Button>
                        </div>

                        <div class="divide-y divide-border">
                            {openPositions.map((position) => (
                                <div class="flex items-center justify-between gap-4 px-6 py-4">
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-2">
                                            <span class="font-medium">
                                                {position.symbol}
                                            </span>

                                            <span class="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                {position.direction}
                                            </span>
                                        </div>

                                        <p class="mt-1 text-xs text-muted-foreground">
                                            Entry {position.entry}
                                            <span class="mx-1">·</span>
                                            Current {position.current}
                                        </p>
                                    </div>

                                    <div class="text-right">
                                        <p
                                            class={`font - semibold ${
    getResultClass(
        position.pnl,
    )
} `}
                                        >
                                            {formatMoney(position.pnl)}
                                        </p>

                                        <p class="mt-1 text-xs text-muted-foreground">
                                            Open P&L
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Journal Snapshot */}
                    <div class="rounded-xl border border-border bg-card">
                        <div class="border-b border-border px-6 py-4">
                            <div class="flex items-center gap-2">
                                <BookOpen class="size-4 text-muted-foreground" />

                                <h2 class="font-semibold">
                                    Journal
                                </h2>
                            </div>

                            <p class="mt-1 text-sm text-muted-foreground">
                                Your recent trading performance.
                            </p>
                        </div>

                        <div class="space-y-5 p-6">

                            <div>
                                <p class="text-sm text-muted-foreground">
                                    Net Result
                                </p>

                                <p class="mt-1 text-2xl font-bold text-emerald-500">
                                    +3.00R
                                </p>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-xs text-muted-foreground">
                                        Win Rate
                                    </p>

                                    <p class="mt-1 font-semibold">
                                        66.7%
                                    </p>
                                </div>

                                <div>
                                    <p class="text-xs text-muted-foreground">
                                        Trades
                                    </p>

                                    <p class="mt-1 font-semibold">
                                        4
                                    </p>
                                </div>
                            </div>

                            <div class="border-t border-border pt-5">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-medium">
                                            Journal P&L
                                        </p>

                                        <p class="mt-1 text-xs text-muted-foreground">
                                            Closed trades
                                        </p>
                                    </div>

                                    <span class="font-semibold text-emerald-500">
                                        +$169.00
                                    </span>
                                </div>
                            </div>

                            <Button
                                as={A}
                                href="/dashboard/journal"
                                variant="outline"
                                class="w-full"
                            >
                                Open Journal
                                <ArrowUpRight class="size-4" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Recent Activity */}
                <section class="rounded-xl border border-border bg-card">
                    <div class="flex items-center justify-between border-b border-border px-6 py-4">
                        <div>
                            <h2 class="font-semibold">
                                Recent Activity
                            </h2>

                            <p class="mt-1 text-sm text-muted-foreground">
                                Your latest trading activity.
                            </p>
                        </div>

                        <Button
                            as={A}
                            href="/dashboard/journal/trades"
                            variant="ghost"
                            size="sm"
                        >
                            View Trades
                            <ArrowUpRight class="size-4" />
                        </Button>
                    </div>

                    <div class="divide-y divide-border">
                        {recentActivity.map((activity) => (
                            <div class="flex items-center justify-between gap-4 px-6 py-4">
                                <div class="flex min-w-0 items-center gap-3">
                                    <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                        {activity.pnl >= 0 ? (
                                            <TrendingUp class="size-4 text-emerald-500" />
                                        ) : (
                                            <TrendingDown class="size-4 text-destructive" />
                                        )}
                                    </div>

                                    <div class="min-w-0">
                                        <p class="font-medium">
                                            {activity.symbol}
                                        </p>

                                        <p class="mt-1 text-xs text-muted-foreground">
                                            {activity.description}
                                            <span class="mx-1">·</span>
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>

                                <div class="text-right">
                                    <p
                                        class={`font - medium ${
    getResultClass(
        activity.pnl,
    )
} `}
                                    >
                                        {activity.result}
                                    </p>

                                    <p
                                        class={`mt - 1 text - xs ${
    getResultClass(
        activity.pnl,
    )
} `}
                                    >
                                        {formatMoney(activity.pnl)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}

