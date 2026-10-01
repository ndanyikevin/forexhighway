
import {
    ArrowLeft,
    CircleDollarSign,
    Clock3,
    List,
    XCircle,
} from "lucide-solid";

import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { createMemo, createSignal } from "solid-js";

import { Button } from "~/components/ui/button";
import TradingAccountSelector from "~/components/trading/trading-account-selector";

import {
    getTradingAccount,
    getTradingAccounts,
    getTradingOrders,
} from "~/data/trading/trading";

const accounts = getTradingAccounts();

export default function TradingOrdersPage() {
    const [selectedAccountId, setSelectedAccountId] = createSignal(
        accounts[0]?.id ?? 0,
    );

    const selectedAccount = createMemo(() =>
        getTradingAccount(selectedAccountId()),
    );

    const orders = createMemo(() =>
        getTradingOrders(selectedAccountId()),
    );

    const pendingOrders = createMemo(() =>
        orders().filter((order) => order.status === "Pending"),
    );

    const filledOrders = createMemo(() =>
        orders().filter((order) => order.status === "Filled"),
    );

    const cancelledOrders = createMemo(() =>
        orders().filter((order) => order.status === "Cancelled"),
    );

    return (
        <>
            <Title>Orders | ForexHighway</Title>

            <div class="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex items-start gap-3">
                        <Button
                            as={A}
                            href="/dashboard/trading"
                            variant="ghost"
                            size="icon"
                            class="mt-1 shrink-0"
                        >
                            <ArrowLeft class="size-4" />
                            <span class="sr-only">
                                Back to Trading
                            </span>
                        </Button>

                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">
                                Orders
                            </h1>

                            <p class="mt-1 text-sm text-muted-foreground">
                                View pending and historical orders for
                                your trading account.
                            </p>
                        </div>
                    </div>

                    <TradingAccountSelector
                        accounts={accounts}
                        value={selectedAccountId()}
                        onChange={setSelectedAccountId}
                    />
                </div>

                {/* Account identity */}
                {selectedAccount() && (
                    <div class="flex flex-col gap-1 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p class="text-sm font-medium">
                                {selectedAccount()!.broker}
                            </p>

                            <p class="text-xs text-muted-foreground">
                                {selectedAccount()!.accountNumber} ·{" "}
                                {selectedAccount()!.platform}
                            </p>
                        </div>

                        <div class="flex items-center gap-2 text-sm text-muted-foreground">
                            <CircleDollarSign class="size-4 text-primary" />
                            <span>
                                {selectedAccount()!.currency}
                            </span>
                        </div>
                    </div>
                )}

                {/* Order summary */}
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="rounded-xl border border-border bg-card p-5">
                        <div class="flex items-center gap-2 text-sm text-muted-foreground">
                            <List class="size-4" />
                            Total Orders
                        </div>

                        <p class="mt-3 text-2xl font-bold">
                            {orders().length}
                        </p>
                    </div>

                    <div class="rounded-xl border border-border bg-card p-5">
                        <div class="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock3 class="size-4" />
                            Pending
                        </div>

                        <p class="mt-3 text-2xl font-bold">
                            {pendingOrders().length}
                        </p>
                    </div>

                    <div class="rounded-xl border border-border bg-card p-5">
                        <div class="flex items-center gap-2 text-sm text-muted-foreground">
                            <CircleDollarSign class="size-4" />
                            Filled
                        </div>

                        <p class="mt-3 text-2xl font-bold">
                            {filledOrders().length}
                        </p>
                    </div>

                    <div class="rounded-xl border border-border bg-card p-5">
                        <div class="flex items-center gap-2 text-sm text-muted-foreground">
                            <XCircle class="size-4" />
                            Cancelled
                        </div>

                        <p class="mt-3 text-2xl font-bold">
                            {cancelledOrders().length}
                        </p>
                    </div>
                </div>

                {/* Orders table */}
                <section class="rounded-xl border border-border bg-card">
                    <div class="border-b border-border p-5">
                        <h2 class="font-semibold">
                            Trading Orders
                        </h2>

                        <p class="mt-1 text-sm text-muted-foreground">
                            Orders associated with the selected account.
                        </p>
                    </div>

                    {orders().length > 0 ? (
                        <div class="overflow-x-auto">
                            <table class="w-full min-w-[900px] text-sm">
                                <thead>
                                    <tr class="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                                        <th class="px-5 py-3 font-medium">
                                            Symbol
                                        </th>
                                        <th class="px-5 py-3 font-medium">
                                            Direction
                                        </th>
                                        <th class="px-5 py-3 font-medium">
                                            Type
                                        </th>
                                        <th class="px-5 py-3 font-medium">
                                            Volume
                                        </th>
                                        <th class="px-5 py-3 font-medium">
                                            Price
                                        </th>
                                        <th class="px-5 py-3 font-medium">
                                            Status
                                        </th>
                                        <th class="px-5 py-3 font-medium">
                                            Created
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders().map((order) => (
                                        <tr class="border-b border-border last:border-0 hover:bg-muted/30">
                                            <td class="px-5 py-4">
                                                <span class="font-medium">
                                                    {order.symbol}
                                                </span>
                                            </td>

                                            <td class="px-5 py-4">
                                                <span
                                                    class={
                                                        order.direction ===
                                                        "Buy"
                                                            ? "font-medium text-emerald-500"
                                                            : "font-medium text-red-500"
                                                    }
                                                >
                                                    {order.direction}
                                                </span>
                                            </td>

                                            <td class="px-5 py-4 text-muted-foreground">
                                                {order.type}
                                            </td>

                                            <td class="px-5 py-4">
                                                {order.volume}
                                            </td>

                                            <td class="px-5 py-4 font-mono text-xs">
                                                {order.price.toFixed(5)}
                                            </td>

                                            <td class="px-5 py-4">
                                                <span
                                                    class={
                                                        order.status ===
                                                        "Pending"
                                                            ? "inline-flex rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-500"
                                                            : order.status ===
                                                                "Filled"
                                                              ? "inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500"
                                                              : "inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                                                    }
                                                >
                                                    {order.status}
                                                </span>
                                            </td>

                                            <td class="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                                {new Date(
                                                    order.createdAt,
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div class="flex flex-col items-center justify-center px-6 py-16 text-center">
                            <div class="flex size-12 items-center justify-center rounded-full bg-muted">
                                <List class="size-6 text-muted-foreground" />
                            </div>

                            <h3 class="mt-4 font-semibold">
                                No orders
                            </h3>

                            <p class="mt-1 max-w-sm text-sm text-muted-foreground">
                                There are no trading orders associated
                                with this account yet.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

