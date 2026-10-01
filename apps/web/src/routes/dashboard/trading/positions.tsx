
import {
    ArrowLeft,
    CircleDollarSign,
    TrendingDown,
    TrendingUp,
} from "lucide-solid";

import { A } from "@solidjs/router";
import { createMemo, createSignal, For } from "solid-js";
import { Title } from "@solidjs/meta";

import { Button } from "~/components/ui/button";
import TradingAccountSelector from "~/components/trading/trading-account-selector";

import {
    getTradingAccounts,
    getTradingAccount,
    getOpenPositions,
} from "~/data/trading/trading";

function formatMoney(value: number) {
    return `${ value >= 0 ? "+" : "-" }$${ Math.abs(value).toFixed(2) } `;
}

function formatBalance(value: number) {
    return `$${ value.toFixed(2) } `;
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

export default function TradingPositionsPage() {
    const accounts = getTradingAccounts();

    const [selectedAccountId, setSelectedAccountId] =
        createSignal(accounts[0]?.id ?? 0);

    const selectedAccount = createMemo(() => {
        return getTradingAccount(selectedAccountId());
    });

    const positions = createMemo(() => {
        const account = selectedAccount();

        if (!account) {
            return [];
        }

        return getOpenPositions(account.id);
    });

    const openPnl = createMemo(() => {
        return positions().reduce(
            (total, position) =>
                total + position.profitLoss,
            0,
        );
    });

    return (
        <>
            <Title>
                Positions | Trading | ForexHighway
            </Title>

            <main class="p-6">
                <div class="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div class="flex items-center gap-3">
                            <Button
                                as={A}
                                href="/dashboard/trading"
                                variant="ghost"
                                size="icon"
                            >
                                <ArrowLeft class="size-4" />
                            </Button>

                            <div>
                                <h1 class="text-2xl font-bold tracking-tight">
                                    Open Positions
                                </h1>

                                <p class="mt-1 text-muted-foreground">
                                    Monitor your active market positions.
                                </p>
                            </div>
                        </div>

                        <TradingAccountSelector
                            accounts={accounts}
                            value={selectedAccountId()}
                            onChange={setSelectedAccountId}
                        />
                    </div>

                    {selectedAccount() ? (
                        <>
                            {/* Account Identity */}
                            <div>
                                <div class="flex flex-wrap items-center gap-2">
                                    <h2 class="text-lg font-semibold">
                                        {
                                            selectedAccount()!
                                                .name
                                        }
                                    </h2>

                                    <span class="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                        {
                                            selectedAccount()!
                                                .broker
                                        }
                                    </span>

                                    <span class="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                        {
                                            selectedAccount()!
                                                .platform
                                        }
                                    </span>
                                </div>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Account{" "}
                                    {
                                        selectedAccount()!
                                            .accountNumber
                                    }
                                    {" · "}
                                    {
                                        selectedAccount()!
                                            .currency
                                    }
                                </p>
                            </div>

                            {/* Snapshot */}
                            <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div class="rounded-xl border border-border bg-card p-5">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm text-muted-foreground">
                                            Balance
                                        </p>

                                        <CircleDollarSign class="size-4 text-muted-foreground" />
                                    </div>

                                    <p class="mt-3 text-2xl font-bold">
                                        {formatBalance(
                                            selectedAccount()!
                                                .balance,
                                        )}
                                    </p>
                                </div>

                                <div class="rounded-xl border border-border bg-card p-5">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm text-muted-foreground">
                                            Equity
                                        </p>

                                        <TrendingUp class="size-4 text-muted-foreground" />
                                    </div>

                                    <p class="mt-3 text-2xl font-bold">
                                        {formatBalance(
                                            selectedAccount()!
                                                .equity,
                                        )}
                                    </p>
                                </div>

                                <div class="rounded-xl border border-border bg-card p-5">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm text-muted-foreground">
                                            Open P&L
                                        </p>

                                        {openPnl() >=
                                        0 ? (
                                            <TrendingUp class="size-4 text-emerald-500" />
                                        ) : (
                                            <TrendingDown class="size-4 text-destructive" />
                                        )}
                                    </div>

                                    <p
                                        class={`mt - 3 text - 2xl font - bold ${
    getResultClass(
        openPnl(),
    )
} `}
                                    >
                                        {formatMoney(
                                            openPnl(),
                                        )}
                                    </p>
                                </div>

                                <div class="rounded-xl border border-border bg-card p-5">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm text-muted-foreground">
                                            Positions
                                        </p>

                                        <CircleDollarSign class="size-4 text-muted-foreground" />
                                    </div>

                                    <p class="mt-3 text-2xl font-bold">
                                        {
                                            positions()
                                                .length
                                        }
                                    </p>
                                </div>
                            </section>

                            {/* Positions */}
                            <section class="overflow-hidden rounded-xl border border-border bg-card">
                                <div class="border-b border-border px-6 py-5">
                                    <h2 class="font-semibold">
                                        Open Positions
                                    </h2>

                                    <p class="mt-1 text-sm text-muted-foreground">
                                        Active positions for the selected trading account.
                                    </p>
                                </div>

                                <div class="overflow-x-auto">
                                    <table class="w-full text-sm">
                                        <thead>
                                            <tr class="border-b border-border bg-muted/30 text-left">
                                                <th class="px-6 py-3 font-medium text-muted-foreground">
                                                    Symbol
                                                </th>

                                                <th class="px-6 py-3 font-medium text-muted-foreground">
                                                    Direction
                                                </th>

                                                <th class="px-6 py-3 font-medium text-muted-foreground">
                                                    Volume
                                                </th>

                                                <th class="px-6 py-3 font-medium text-muted-foreground">
                                                    Entry
                                                </th>

                                                <th class="px-6 py-3 font-medium text-muted-foreground">
                                                    Current
                                                </th>

                                                <th class="px-6 py-3 font-medium text-muted-foreground">
                                                    Stop Loss
                                                </th>

                                                <th class="px-6 py-3 font-medium text-muted-foreground">
                                                    Take Profit
                                                </th>

                                                <th class="px-6 py-3 text-right font-medium text-muted-foreground">
                                                    P&L
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <For
                                                each={positions()}
                                                fallback={
                                                    <tr>
                                                        <td
                                                            colSpan={8}
                                                            class="px-6 py-16 text-center"
                                                        >
                                                            <div class="mx-auto max-w-sm">
                                                                <h3 class="font-semibold">
                                                                    No open positions
                                                                </h3>

                                                                <p class="mt-2 text-sm text-muted-foreground">
                                                                    This account currently has no active market positions.
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                            >
                                                {(position) => (
                                                    <tr class="border-b border-border last:border-0 hover:bg-muted/30">
                                                        <td class="px-6 py-4">
                                                            <div class="font-medium">
                                                                {
                                                                    position.symbol
                                                                }
                                                            </div>

                                                            <div class="mt-1 text-xs text-muted-foreground">
                                                                {
                                                                    position.id
                                                                }
                                                                {" · "}
                                                                MT5
                                                            </div>
                                                        </td>

                                                        <td class="px-6 py-4">
                                                            <span
                                                                class={`rounded - md px - 2 py - 1 text - xs font - medium ${
    position.direction ===
        "Buy"
        ? "bg-emerald-500/10 text-emerald-500"
        : "bg-destructive/10 text-destructive"
} `}
                                                            >
                                                                {
                                                                    position.direction
                                                                }
                                                            </span>
                                                        </td>

                                                        <td class="px-6 py-4 font-mono">
                                                            {
                                                                position.volume
                                                            }
                                                        </td>

                                                        <td class="px-6 py-4 font-mono">
                                                            {
                                                                position.entry
                                                            }
                                                        </td>

                                                        <td class="px-6 py-4 font-mono">
                                                            {
                                                                position.currentPrice
                                                            }
                                                        </td>

                                                        <td class="px-6 py-4 font-mono text-muted-foreground">
                                                            {position.stopLoss ??
                                                                "—"}
                                                        </td>

                                                        <td class="px-6 py-4 font-mono text-muted-foreground">
                                                            {position.takeProfit ??
                                                                "—"}
                                                        </td>

                                                        <td
                                                            class={`px - 6 py - 4 text - right font - semibold ${
    getResultClass(
        position.profitLoss,
    )
} `}
                                                        >
                                                            {formatMoney(
                                                                position.profitLoss,
                                                            )}
                                                        </td>
                                                    </tr>
                                                )}
                                            </For>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </>
                    ) : (
                        <div class="rounded-xl border border-border bg-card p-8 text-center">
                            <h2 class="text-xl font-semibold">
                                Trading account not found
                            </h2>

                            <p class="mt-2 text-sm text-muted-foreground">
                                No trading account is currently available.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

