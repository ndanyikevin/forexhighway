
import { Show } from "solid-js";
import { Title } from "@solidjs/meta";
import {
    A,
    useNavigate,
    useParams,
} from "@solidjs/router";

import {
    ArrowLeft,
    ExternalLink,
    Pencil,
    Trash2,
    TrendingDown,
    TrendingUp,
} from "lucide-solid";

import { Button } from "~/components/ui/button";

import {
    getJournalTrade,
    deleteJournalTrade,
} from "~/data/journal/trades";

export default function JournalTradeDetailsPage() {
    const params = useParams();
    const navigate = useNavigate();

    const tradeId = Number(params.tradeId);

    const trade =
        Number.isInteger(tradeId)
            ? getJournalTrade(tradeId)
            : undefined;

    function formatDate(
        value?: string,
    ) {
        if (!value) {
            return "—";
        }

        return new Date(
            value,
        ).toLocaleString(
            "en-KE",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            },
        );
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

    function handleDelete() {
        if (!trade) {
            return;
        }

        const confirmed =
            window.confirm(
                `Delete the ${ trade.symbol } trade ? This action cannot be undone.`,
            );

        if (!confirmed) {
            return;
        }

        deleteJournalTrade(
            trade.id,
        );

        navigate(
            "/dashboard/journal/trades",
        );
    }

    return (
        <>
            <Title>
                {trade
                    ? `${ trade.symbol } Trade`
                    : "Trade Not Found"}{" "}
                | Journal | ForexHighway
            </Title>

            <Show
                when={trade}
                fallback={
                    <main class="p-6">
                        <div class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
                            <div class="rounded-full border border-border bg-muted p-4">
                                <TrendingDown class="size-6 text-muted-foreground" />
                            </div>

                            <h1 class="mt-4 text-2xl font-bold">
                                Trade not found
                            </h1>

                            <p class="mt-2 text-muted-foreground">
                                The trade with ID "
                                {params.tradeId}"
                                could not be found.
                            </p>

                            <Button
                                as={A}
                                href="/dashboard/journal/trades"
                                variant="outline"
                                class="mt-6"
                            >
                                <ArrowLeft class="mr-2 size-4" />
                                Back to Trades
                            </Button>
                        </div>
                    </main>
                }
            >
                {(currentTrade) => (
                    <main class="p-6">
                        <div class="mx-auto max-w-7xl space-y-6">
                            {/* Header */}
                            <div>
                                <Button
                                    as={A}
                                    href="/dashboard/journal/trades"
                                    variant="ghost"
                                    size="sm"
                                    class="-ml-2"
                                >
                                    <ArrowLeft class="mr-2 size-4" />
                                    Trades
                                </Button>
                            </div>

                            <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                                <div>
                                    <div class="flex flex-wrap items-center gap-3">
                                        <h1 class="text-3xl font-bold tracking-tight">
                                            {currentTrade().symbol}
                                        </h1>

                                        <span
                                            class={`rounded - md px - 2.5 py - 1 text - xs font - medium ${
    currentTrade()
        .direction ===
        "Buy"
        ? "bg-primary/10 text-primary"
        : "bg-destructive/10 text-destructive"
} `}
                                        >
                                            {
                                                currentTrade()
                                                    .direction
                                            }
                                        </span>

                                        <span class="rounded-md border border-border px-2.5 py-1 text-xs font-medium">
                                            {
                                                currentTrade()
                                                    .timeframe
                                            }
                                        </span>

                                        <span class="rounded-md border border-border px-2.5 py-1 text-xs font-medium">
                                            {
                                                currentTrade()
                                                    .session
                                            }
                                        </span>
                                    </div>

                                    <p class="mt-2 text-muted-foreground">
                                        {
                                            currentTrade()
                                                .setup
                                        }
                                    </p>
                                </div>

                                <div class="flex gap-2">
                                    <Button
                                        as={A}
                                        href={`/dashboard/journal/${ currentTrade().id }/edit-trade`}
variant = "outline"
    >
    <Pencil class="mr-2 size-4" />
                                        Edit Trade
                                    </Button >

    <Button
        type="button"
        variant="destructive"
        onClick={handleDelete}
    >
        <Trash2 class="mr-2 size-4" />
        Delete
    </Button>
                                </div >
                            </div >

    {/* Performance */ }
    < section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" >
                                <div class="rounded-xl border border-border bg-card p-5">
                                    <p class="text-sm text-muted-foreground">
                                        Outcome
                                    </p>

                                    <p class="mt-2 text-xl font-bold">
                                        {
                                            currentTrade()
                                                .outcome
                                        }
                                    </p>
                                </div>

                                <div class="rounded-xl border border-border bg-card p-5">
                                    <p class="text-sm text-muted-foreground">
                                        Result
                                    </p>

                                    <div
                                        class={`mt-2 flex items-center gap-2 text-xl font-bold ${getResultClass(
                                            currentTrade()
                                                .resultR,
                                        )}`}
                                    >
                                        {(
                                            currentTrade()
                                                .resultR ??
                                            0
                                        ) >= 0 ? (
                                            <TrendingUp class="size-5" />
                                        ) : (
                                            <TrendingDown class="size-5" />
                                        )}

                                        {currentTrade().resultR !==
                                        undefined
                                            ? `${
                                                currentTrade()
                                                    .resultR! >=
                                                0
                                                    ? "+"
                                                    : ""
                                            }${
                                                currentTrade()
                                                    .resultR
                                            }R`
                                            : "—"}
                                    </div>
                                </div>

                                <div class="rounded-xl border border-border bg-card p-5">
                                    <p class="text-sm text-muted-foreground">
                                        Profit / Loss
                                    </p>

                                    <p
                                        class={`mt-2 text-xl font-bold ${getResultClass(
                                            currentTrade()
                                                .profitLoss,
                                        )}`}
                                    >
                                        {currentTrade().profitLoss !==
                                        undefined
                                            ? `${
                                                currentTrade()
                                                    .profitLoss! >=
                                                0
                                                    ? "+"
                                                    : ""
                                            }$${currentTrade()
                                                .profitLoss!.toFixed(
                                                    2,
                                                )}`
                                            : "—"}
                                    </p>
                                </div>

                                <div class="rounded-xl border border-border bg-card p-5">
                                    <p class="text-sm text-muted-foreground">
                                        Risk
                                    </p>

                                    <p class="mt-2 text-xl font-bold">
                                        {
                                            currentTrade()
                                                .riskPercent
                                        }
                                        %
                                    </p>
                                </div>
                            </section >

    {/* Execution */ }
    < section class="rounded-xl border border-border bg-card p-6" >
                                <div class="mb-6">
                                    <h2 class="font-semibold">
                                        Execution
                                    </h2>

                                    <p class="mt-1 text-sm text-muted-foreground">
                                        Price levels and execution details.
                                    </p>
                                </div>

                                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    <div>
                                        <p class="text-sm text-muted-foreground">
                                            Entry
                                        </p>

                                        <p class="mt-1 font-mono font-medium">
                                            {
                                                currentTrade()
                                                    .entry
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-sm text-muted-foreground">
                                            Stop Loss
                                        </p>

                                        <p class="mt-1 font-mono font-medium">
                                            {
                                                currentTrade()
                                                    .stopLoss
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-sm text-muted-foreground">
                                            Take Profit
                                        </p>

                                        <p class="mt-1 font-mono font-medium">
                                            {
                                                currentTrade()
                                                    .takeProfit
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-sm text-muted-foreground">
                                            Exit
                                        </p>

                                        <p class="mt-1 font-mono font-medium">
                                            {
                                                currentTrade()
                                                    .exit ??
                                                "—"
                                            }
                                        </p>
                                    </div>
                                </div>
                            </section >

    {/* Reasoning */ }
    < section class="rounded-xl border border-border bg-card p-6" >
                                <div class="mb-6">
                                    <h2 class="font-semibold">
                                        Trade Reasoning
                                    </h2>

                                    <p class="mt-1 text-sm text-muted-foreground">
                                        Why the trade was taken and how it developed.
                                    </p>
                                </div>

                                <div class="space-y-6">
                                    <div>
                                        <p class="text-sm font-medium">
                                            Entry Reason
                                        </p>

                                        <p class="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                            {
                                                currentTrade()
                                                    .entryReason
                                            }
                                        </p>
                                    </div>

                                    <Show
                                        when={
                                            currentTrade()
                                                .exitReason
                                        }
                                    >
                                        <div>
                                            <p class="text-sm font-medium">
                                                Exit Reason
                                            </p>

                                            <p class="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                                {
                                                    currentTrade()
                                                        .exitReason
                                                }
                                            </p>
                                        </div>
                                    </Show>

                                    <Show
                                        when={
                                            currentTrade()
                                                .notes
                                        }
                                    >
                                        <div>
                                            <p class="text-sm font-medium">
                                                Notes
                                            </p>

                                            <p class="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                                {
                                                    currentTrade()
                                                        .notes
                                                }
                                            </p>
                                        </div>
                                    </Show>
                                </div>
                            </section >

    {/* Chart Analysis */ }
    < section class="rounded-xl border border-border bg-card p-6" >
                                <div class="mb-6">
                                    <h2 class="font-semibold">
                                        Chart Analysis
                                    </h2>

                                    <p class="mt-1 text-sm text-muted-foreground">
                                        Review the charts used when analyzing this trade.
                                    </p>
                                </div>

                                <div class="flex flex-wrap gap-3">
                                    <Show
                                        when={
                                            currentTrade()
                                                .tradingViewUrl
                                        }
                                    >
                                        <Button
                                            as="a"
                                            href={
                                                currentTrade()
                                                    .tradingViewUrl
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="outline"
                                        >
                                            <ExternalLink class="mr-2 size-4" />
                                            TradingView
                                        </Button>
                                    </Show>

                                    <Show
                                        when={
                                            currentTrade()
                                                .metaTraderUrl
                                        }
                                    >
                                        <Button
                                            as="a"
                                            href={
                                                currentTrade()
                                                    .metaTraderUrl
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="outline"
                                        >
                                            <ExternalLink class="mr-2 size-4" />
                                            MetaTrader
                                        </Button>
                                    </Show>
                                </div>
                            </section >

    {/* Timing */ }
    < section class="rounded-xl border border-border bg-card p-6" >
                                <div class="mb-6">
                                    <h2 class="font-semibold">
                                        Trade Timing
                                    </h2>
                                </div>

                                <div class="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <p class="text-sm text-muted-foreground">
                                            Opened
                                        </p>

                                        <p class="mt-1 text-sm font-medium">
                                            {formatDate(
                                                currentTrade()
                                                    .openedAt,
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-sm text-muted-foreground">
                                            Closed
                                        </p>

                                        <p class="mt-1 text-sm font-medium">
                                            {formatDate(
                                                currentTrade()
                                                    .closedAt,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </section >
                        </div >
                    </main >
                )}
            </Show >
        </>
    );
}

