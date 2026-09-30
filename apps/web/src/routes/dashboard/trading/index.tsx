
import {
    ArrowUpRight,
    CircleDollarSign,
    Clock3,
    TrendingDown,
    TrendingUp,
} from "lucide-solid";

import { A } from "@solidjs/router";
import { createMemo, createSignal, For } from "solid-js";
import { Title } from "@solidjs/meta";

import { Button } from "~/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

import {
    getTradingAccounts,
    getTradingAccount,
    getOpenPositions,
    getPendingOrders,
    getRecentTradingActivity,
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

export default function TradingOverviewPage() {
    const accounts = getTradingAccounts();

    const [selectedAccountId, setSelectedAccountId] =
        createSignal(
            accounts[0]?.id?.toString() ?? "",
        );

    const selectedAccount = createMemo(() => {
        const id = Number(
            selectedAccountId(),
        );

        return getTradingAccount(id);
    });

    const openPositions = createMemo(() => {
        const account = selectedAccount();

        if (!account) {
            return [];
        }

        return getOpenPositions(account.id);
    });

    const pendingOrders = createMemo(() => {
        const account = selectedAccount();

        if (!account) {
            return [];
        }

        return getPendingOrders(account.id);
    });

    const recentActivity = createMemo(() => {
        const account = selectedAccount();

        if (!account) {
            return [];
        }

        return getRecentTradingActivity(
            account.id,
        );
    });

    const openPnl = createMemo(() => {
        return openPositions().reduce(
            (total, position) =>
                total + position.profitLoss,
            0,
        );
    });

    return (
        <>
            <Title>
                Trading | Dashboard | ForexHighway
            </Title>

            <main class="p-6">
                <div class="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">
                                Trading
                            </h1>

                            <p class="mt-1 text-muted-foreground">
                                Monitor your trading account, positions and orders.
                            </p>
                        </div>

                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">

                            {/* Account Selector */}
                            <Select<string>
                                value={selectedAccountId()}
                                onChange={(value) => {
                                    if (value) {
                                        setSelectedAccountId(
                                            value,
                                        );
                                    }
                                }}
                                options={accounts.map(
                                    (account) =>
                                        account.id.toString(),
                                )}
                                itemComponent={(itemProps) => {
                                    const account =
                                        getTradingAccount(
                                            Number(
                                                itemProps.item.rawValue,
                                            ),
                                        );

                                    return (
                                        <SelectItem
                                            item={itemProps.item}
                                        >
                                            {account
                                                ? `${ account.broker } — ${ account.name } `
                                                : itemProps.item.rawValue}
                                        </SelectItem>
                                    );
                                }}
                            >
                                <SelectTrigger class="w-full sm:w-[280px]">
                                    <SelectValue<string>>
                                        {(state) => {
                                            const account =
                                                selectedAccount();

                                            return account
                                                ? (
                                                    <div class="flex min-w-0 items-center gap-2">
                                                        <span class="truncate font-medium">
                                                            {account.broker}
                                                        </span>

                                                        <span class="text-muted-foreground">
                                                            ·
                                                        </span>

                                                        <span class="truncate text-muted-foreground">
                                                            {account.accountNumber}
                                                        </span>
                                                    </div>
                                                )
                                                : (
                                                    "Select account"
                                                );
                                        }}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent />
                            </Select>

                            <div class="flex gap-2">
                                <Button
                                    as={A}
                                    href="/dashboard/trading/positions"
                                    variant="outline"
                                >
                                    Positions
                                    <ArrowUpRight class="size-4" />
                                </Button>

                                <Button
                                    as={A}
                                    href="/dashboard/trading/orders"
                                >
                                    Orders
                                    <ArrowUpRight class="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Selected Account */}
                    {selectedAccount() ? (
                        <>
                            {/* Account Identity */}
                            <div class="flex flex-col gap-1">
                                <div class="flex flex-wrap items-center gap-2">
                                    <h2 class="text-lg font-semibold">
                                        {selectedAccount()!.name}
                                    </h2>

                                    <span class="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                        {selectedAccount()!.broker}
                                    </span>

                                    <span class="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                        {selectedAccount()!.platform}
                                    </span>
                                </div>

                                <p class="text-sm text-muted-foreground">
                                    Account{" "}
                                    {selectedAccount()!.accountNumber}
                                    {" · "}
                                    {selectedAccount()!.currency}
                                </p>
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
                                        {formatBalance(
                                            selectedAccount()!.balance,
                                        )}
                                    </p>

                                    <p class="mt-1 text-xs text-muted-foreground">
                                        Account balance
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
                                        {formatBalance(
                                            selectedAccount()!.equity,
                                        )}
                                    </p>

                                    <p class="mt-1 text-xs text-muted-foreground">
                                        Current account equity
                                    </p>
                                </div>

                                {/* Open P&L */}
                                <div class="rounded-xl border border-border bg-card p-5">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm text-muted-foreground">
                                            Open P&L
                                        </p>

                                        {openPnl() >= 0 ? (
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

                                    <p class="mt-1 text-xs text-muted-foreground">
                                        Across{" "}
                                        {openPositions().length}{" "}
                                        open positions
                                    </p>
                                </div>

                                {/* Free Margin */}
                                <div class="rounded-xl border border-border bg-card p-5">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm text-muted-foreground">
                                            Free Margin
                                        </p>

                                        <CircleDollarSign class="size-4 text-muted-foreground" />
                                    </div>

                                    <p class="mt-3 text-2xl font-bold">
                                        {formatBalance(
                                            selectedAccount()!.freeMargin,
                                        )}
                                    </p>

                                    <p class="mt-1 text-xs text-muted-foreground">
                                        Available for trading
                                    </p>
                                </div>
                            </section>

                            {/* Main Trading Area */}
                            <section class="grid gap-6 lg:grid-cols-3">

                                {/* Open Positions */}
                                <div class="rounded-xl border border-border bg-card lg:col-span-2">
                                    <div class="flex items-center justify-between border-b border-border px-6 py-4">
                                        <div>
                                            <h2 class="font-semibold">
                                                Open Positions
                                            </h2>

                                            <p class="mt-1 text-sm text-muted-foreground">
                                                Currently active market positions.
                                            </p>
                                        </div>

                                        <Button
                                            as={A}
                                            href="/dashboard/trading/positions"
                                            variant="ghost"
                                            size="sm"
                                        >
                                            View all
                                            <ArrowUpRight class="size-4" />
                                        </Button>
                                    </div>

                                    <div class="divide-y divide-border">
                                        <For
                                            each={openPositions()}
                                            fallback={
                                                <div class="px-6 py-12 text-center text-sm text-muted-foreground">
                                                    No open positions.
                                                </div>
                                            }
                                        >
                                            {(position) => (
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
                                                            Entry{" "}
                                                            {position.entry}

                                                            <span class="mx-1">
                                                                ·
                                                            </span>

                                                            Current{" "}
                                                            {
                                                                position.currentPrice
                                                            }
                                                        </p>
                                                    </div>

                                                    <div class="text-right">
                                                        <p
                                                            class={`font - semibold ${
    getResultClass(
        position.profitLoss,
    )
} `}
                                                        >
                                                            {formatMoney(
                                                                position.profitLoss,
                                                            )}
                                                        </p>

                                                        <p class="mt-1 text-xs text-muted-foreground">
                                                            {position.volume}{" "}
                                                            lots
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </For>
                                    </div>
                                </div>

                                {/* Pending Orders */}
                                <div class="rounded-xl border border-border bg-card">
                                    <div class="flex items-center justify-between border-b border-border px-6 py-4">
                                        <div>
                                            <h2 class="font-semibold">
                                                Pending Orders
                                            </h2>

                                            <p class="mt-1 text-sm text-muted-foreground">
                                                Orders waiting for execution.
                                            </p>
                                        </div>

                                        <Clock3 class="size-4 text-muted-foreground" />
                                    </div>

                                    <div class="divide-y divide-border">
                                        <For
                                            each={pendingOrders()}
                                            fallback={
                                                <div class="px-6 py-12 text-center text-sm text-muted-foreground">
                                                    No pending orders.
                                                </div>
                                            }
                                        >
                                            {(order) => (
                                                <div class="px-6 py-4">
                                                    <div class="flex items-center justify-between gap-3">
                                                        <div>
                                                            <p class="font-medium">
                                                                {order.symbol}
                                                            </p>

                                                            <p class="mt-1 text-xs text-muted-foreground">
                                                                {order.type}
                                                            </p>
                                                        </div>

                                                        <span class="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                                            {order.status}
                                                        </span>
                                                    </div>

                                                    <div class="mt-3 flex items-center justify-between text-xs">
                                                        <span class="text-muted-foreground">
                                                            Entry
                                                        </span>

                                                        <span class="font-mono">
                                                            {order.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </For>
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
                                            Recent orders and trading activity.
                                        </p>
                                    </div>

                                    <Button
                                        as={A}
                                        href="/dashboard/trading/orders"
                                        variant="ghost"
                                        size="sm"
                                    >
                                        View orders
                                        <ArrowUpRight class="size-4" />
                                    </Button>
                                </div>

                                <div class="divide-y divide-border">
                                    <For
                                        each={recentActivity()}
                                        fallback={
                                            <div class="px-6 py-12 text-center text-sm text-muted-foreground">
                                                No recent activity.
                                            </div>
                                        }
                                    >
                                        {(activity) => (
                                            <div class="flex items-center justify-between gap-4 px-6 py-4">
                                                <div class="flex min-w-0 items-center gap-3">
                                                    <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                        {activity.profitLoss >=
                                                        0 ? (
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
                                                            {
                                                                activity.description
                                                            }

                                                            <span class="mx-1">
                                                                ·
                                                            </span>

                                                            {activity.time}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="text-right">
                                                    <p
                                                        class={`font - medium ${
    getResultClass(
        activity.profitLoss,
    )
} `}
                                                    >
                                                        {formatMoney(
                                                            activity.profitLoss,
                                                        )}
                                                    </p>

                                                    <p class="mt-1 text-xs text-muted-foreground">
                                                        {activity.status}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </For>
                                </div>
                            </section>
                        </>
                    ) : (
                        /* No Account */
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

