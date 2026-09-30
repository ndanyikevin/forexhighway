import { createMemo, createSignal, For } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import {
    ArrowLeft,
    ExternalLink,
    Plus,
    Search,
} from "lucide-solid";

import { Button } from "~/components/ui/button";

import {
    TextField,
    TextFieldInput,
} from "~/components/ui/text-field";

import {
    getJournalTrades,
} from "~/data/journal/trades";

import type {
    TradeOutcome,
} from "~/data/journal/trades";

export default function JournalTradesPage() {
    const trades = getJournalTrades();

    const [query, setQuery] =
        createSignal("");

    const [outcome, setOutcome] =
        createSignal<
            TradeOutcome | "All"
        >("All");

    const filteredTrades = createMemo(() => {
        const normalizedQuery =
            query()
                .trim()
                .toLowerCase();

        return trades.filter(
            (trade) => {
                const matchesQuery =
                    !normalizedQuery ||
                    trade.symbol
                        .toLowerCase()
                        .includes(
                            normalizedQuery,
                        ) ||
                    trade.setup
                        .toLowerCase()
                        .includes(
                            normalizedQuery,
                        ) ||
                    trade.direction
                        .toLowerCase()
                        .includes(
                            normalizedQuery,
                        ) ||
                    trade.session
                        .toLowerCase()
                        .includes(
                            normalizedQuery,
                        );

                const matchesOutcome =
                    outcome() === "All" ||
                    trade.outcome ===
                    outcome();

                return (
                    matchesQuery &&
                    matchesOutcome
                );
            },
        );
    });

    function formatDate(
        date: string,
    ) {
        return new Date(
            date,
        ).toLocaleDateString(
            "en-KE",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            },
        );
    }

    function getOutcomeClass(
        value: TradeOutcome,
    ) {
        switch (value) {
            case "Win":
                return "bg-emerald-500/10 text-emerald-500";

            case "Loss":
                return "bg-destructive/10 text-destructive";

            case "Breakeven":
                return "bg-muted text-muted-foreground";

            default:
                return "bg-primary/10 text-primary";
        }
    }

    function getResultClass(
        value?: number,
    ) {
        if (value === undefined) {
            return "text-muted-foreground";
        }

        if (value > 0) {
            return "text-emerald-500";
        }

        if (value < 0) {
            return "text-destructive";
        }

        return "text-muted-foreground";
    }

    return (
        <>
            <Title>
                Trades | Trading Journal | ForexHighway
            </Title>

            <main class="p-6">
                <div class="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div class="mb-2">
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
                            </div>

                            <h1 class="text-2xl font-bold tracking-tight">
                                Trades
                            </h1>

                            <p class="mt-1 text-muted-foreground">
                                Review and manage your trading history.
                            </p>
                        </div>

                        <Button
                            as={A}
                            href="/dashboard/journal/new-trade"
                        >
                            <Plus class="size-4" />
                            New Trade
                        </Button>
                    </div>

                    {/* Filters */}
                    <div class="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
                        <TextField class="flex-1">
                            <div class="relative">
                                <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                <TextFieldInput
                                    value={query()}
                                    onInput={(event) =>
                                        setQuery(
                                            event.currentTarget.value,
                                        )
                                    }
                                    placeholder="Search symbol, setup, direction or session..."
                                    class="pl-9"
                                />
                            </div>
                        </TextField>

                        <select
                            value={outcome()}
                            onChange={(event) =>
                                setOutcome(
                                    event.currentTarget.value as
                                    | TradeOutcome
                                    | "All",
                                )
                            }
                            class="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="All">
                                All outcomes
                            </option>

                            <option value="Win">
                                Wins
                            </option>

                            <option value="Loss">
                                Losses
                            </option>

                            <option value="Breakeven">
                                Breakeven
                            </option>

                            <option value="Pending">
                                Pending
                            </option>
                        </select>
                    </div>

                    {/* Summary */}
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-muted-foreground">
                            Showing{" "}
                            <span class="font-medium text-foreground">
                                {filteredTrades().length}
                            </span>{" "}
                            of{" "}
                            <span class="font-medium text-foreground">
                                {trades.length}
                            </span>{" "}
                            trades
                        </p>
                    </div>

                    {/* Table */}
                    <div class="overflow-hidden rounded-xl border border-border bg-card">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b border-border bg-muted/30 text-left">
                                        <th class="px-6 py-3 font-medium text-muted-foreground">
                                            Trade
                                        </th>

                                        <th class="px-6 py-3 font-medium text-muted-foreground">
                                            Setup
                                        </th>

                                        <th class="px-6 py-3 font-medium text-muted-foreground">
                                            Session
                                        </th>

                                        <th class="px-6 py-3 font-medium text-muted-foreground">
                                            Entry
                                        </th>

                                        <th class="px-6 py-3 font-medium text-muted-foreground">
                                            Result
                                        </th>

                                        <th class="px-6 py-3 font-medium text-muted-foreground">
                                            P&L
                                        </th>

                                        <th class="px-6 py-3 font-medium text-muted-foreground">
                                            Analysis
                                        </th>

                                        <th class="px-6 py-3 text-right font-medium text-muted-foreground">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <For
                                        each={filteredTrades()}
                                        fallback={
                                            <tr>
                                                <td
                                                    colspan="8"
                                                    class="px-6 py-16 text-center"
                                                >
                                                    <div class="mx-auto max-w-sm">
                                                        <h3 class="font-semibold">
                                                            No trades found
                                                        </h3>

                                                        <p class="mt-1 text-sm text-muted-foreground">
                                                            Try changing your search or filter.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                    >
                                        {(trade) => (
                                            <tr class="relative border-b border-border last:border-0 hover:bg-muted/30 focus-within:bg-muted/30">

                                                {/* Trade */}
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center gap-2">
                                                        <span class="font-medium">
                                                            {trade.symbol}
                                                        </span>
                                                    </div>

                                                    <div class="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                        <span>
                                                            {trade.direction}
                                                        </span>

                                                        <span>
                                                            ·
                                                        </span>

                                                        <span>
                                                            {trade.timeframe}
                                                        </span>
                                                    </div>

                                                    {/*
                                                     * Stretched link: single real anchor that
                                                     * covers the whole row so clicking anywhere
                                                     * navigates to the trade detail page while
                                                     * keyboard / screen reader users still get
                                                     * a proper link.
                                                     */}
                                                    <A
                                                        href={`/dashboard/journal/${trade.id}`}
                                                        class="absolute inset-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                                        aria-label={`View trade ${trade.symbol} ${trade.direction} ${trade.timeframe}`}
                                                    />
                                                </td>

                                                {/* Setup */}
                                                <td class="px-6 py-4">
                                                    <span class="font-medium">
                                                        {trade.setup}
                                                    </span>
                                                </td>

                                                {/* Session */}
                                                <td class="px-6 py-4 text-muted-foreground">
                                                    {trade.session}
                                                </td>

                                                {/* Entry */}
                                                <td class="px-6 py-4 font-mono text-xs">
                                                    {trade.entry}
                                                </td>

                                                {/* Result */}
                                                <td class="px-6 py-4">
                                                    <div>
                                                        <span
                                                            class={`rounded-md px-2 py-1 text-xs font-medium ${getOutcomeClass(
                                                                trade.outcome,
                                                            )
                                                                }`}
                                                        >
                                                            {trade.outcome}
                                                        </span>

                                                        <div
                                                            class={`mt-1 text-xs font-medium ${getResultClass(
                                                                trade.resultR,
                                                            )
                                                                }`}
                                                        >
                                                            {trade.resultR !==
                                                                undefined
                                                                ? `${trade.resultR >=
                                                                    0
                                                                    ? "+"
                                                                    : ""
                                                                }${trade.resultR
                                                                } R`
                                                                : "—"}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* P&L */}
                                                <td
                                                    class={`px-6 py-4 font-medium ${getResultClass(
                                                        trade.profitLoss,
                                                    )
                                                        }`}
                                                >
                                                    {trade.profitLoss !==
                                                        undefined
                                                        ? `${trade.profitLoss >=
                                                            0
                                                            ? "+"
                                                            : ""
                                                        }$${trade.profitLoss.toFixed(
                                                            2,
                                                        )}`
                                                        : "—"}
                                                </td>

                                                {/* Analysis */}
                                                <td class="px-6 py-4">
                                                    <div class="relative z-10 flex items-center gap-2">
                                                        {trade.tradingViewUrl && (
                                                            <a
                                                                href={
                                                                    trade.tradingViewUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="TradingView analysis"
                                                                class="inline-flex size-8 items-center justify-center rounded-md border border-border hover:bg-muted"
                                                            >
                                                                <ExternalLink class="size-3.5" />
                                                            </a>
                                                        )}

                                                        {trade.metaTraderUrl && (
                                                            <a
                                                                href={
                                                                    trade.metaTraderUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="MetaTrader analysis"
                                                                class="inline-flex size-8 items-center justify-center rounded-md border border-border hover:bg-muted"
                                                            >
                                                                <ExternalLink class="size-3.5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Date */}
                                                <td class="px-6 py-4 text-right text-muted-foreground">
                                                    {formatDate(
                                                        trade.openedAt,
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </For>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}