export default function DashboardHome() {
    return (
        <div class="p-6">
            <div class="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 class="text-2xl font-bold tracking-tight">
                        Dashboard
                    </h1>

                    <p class="text-muted-foreground">
                        Welcome back. Here's what's happening with your trading.
                    </p>
                </div>

                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div class="rounded-xl border border-border bg-card p-5">
                        <p class="text-sm text-muted-foreground">
                            Balance
                        </p>

                        <p class="mt-2 text-2xl font-bold">
                            $10,000.00
                        </p>
                    </div>

                    <div class="rounded-xl border border-border bg-card p-5">
                        <p class="text-sm text-muted-foreground">
                            Today's P&L
                        </p>

                        <p class="mt-2 text-2xl font-bold">
                            +$240.50
                        </p>
                    </div>

                    <div class="rounded-xl border border-border bg-card p-5">
                        <p class="text-sm text-muted-foreground">
                            Win Rate
                        </p>

                        <p class="mt-2 text-2xl font-bold">
                            68%
                        </p>
                    </div>

                    <div class="rounded-xl border border-border bg-card p-5">
                        <p class="text-sm text-muted-foreground">
                            Open Trades
                        </p>

                        <p class="mt-2 text-2xl font-bold">
                            3
                        </p>
                    </div>
                </div>

                <div class="rounded-xl border border-border bg-card p-6">
                    <h2 class="font-semibold">
                        Recent Activity
                    </h2>

                    <p class="mt-2 text-sm text-muted-foreground">
                        Your trading activity will appear here.
                    </p>
                </div>
            </div>
        </div>
    );
}