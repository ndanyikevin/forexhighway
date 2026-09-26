
import type { Component } from "solid-js";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
} from "~/components/ui/card";

export const Hero: Component = () => {
    return (
        <section class="relative overflow-hidden bg-background">
            {/* Subtle background */}
            <div class="pointer-events-none absolute inset-0 -z-10">
                <div class="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

                <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div class="mx-auto flex max-w-7xl flex-col items-center px-4 pt-24 pb-16 text-center sm:px-6 md:pt-32 md:pb-24 lg:px-8">
                {/* Badge */}
                <Badge
                    variant="outline"
                    class="mb-7 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary"
                >
                    <span class="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    Built for serious traders
                </Badge>

                {/* Headline */}
                <h1 class="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                    Master the markets.
                    <br />
                    <span class="text-primary">Build your edge.</span>
                </h1>

                {/* Description */}
                <p class="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    ForexHighway brings together structured forex education,
                    disciplined trading practice, and professional tools to
                    help you trade with clarity and confidence.
                </p>

                {/* Actions */}
                <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a href="/register">
                        <Button
                            size="lg"
                            class="h-12 w-full px-8 text-base font-medium shadow-lg shadow-primary/20 sm:w-auto"
                        >
                            Start Learning
                        </Button>
                    </a>

                    <a href="/about">
                        <Button
                            size="lg"
                            variant="outline"
                            class="h-12 w-full px-8 text-base font-medium sm:w-auto"
                        >
                            About ForexHighway
                        </Button>
                    </a>
                </div>

                {/* Platform Preview */}
                <div class="relative mt-20 w-full max-w-5xl">
                    {/* Glow */}
                    <div class="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-3xl" />

                    <Card class="relative overflow-hidden rounded-2xl border-border/70 bg-card/90 text-left shadow-2xl backdrop-blur">
                        {/* Browser Header */}
                        <CardHeader class="flex flex-row items-center justify-between border-b border-border/60 px-5 py-4">
                            <div class="flex items-center gap-1.5">
                                <span class="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                                <span class="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                                <span class="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                            </div>

                            <div class="hidden rounded-md border border-border/60 bg-background/50 px-4 py-1.5 font-mono text-[11px] text-muted-foreground sm:block">
                                app.forexhighway.com
                            </div>

                            <div class="w-10" />
                        </CardHeader>

                        <CardContent class="p-4 sm:p-6">
                            <div class="grid gap-4 md:grid-cols-12">
                                {/* Sidebar */}
                                <div class="hidden rounded-xl border border-border/60 bg-background/50 p-4 md:col-span-3 md:block">
                                    <div class="mb-6 flex items-center gap-2">
                                        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                                            F
                                        </div>

                                        <span class="text-sm font-semibold">
                                            ForexHighway
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <div class="rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                                            Dashboard
                                        </div>

                                        <div class="px-3 py-2 text-xs text-muted-foreground">
                                            Education
                                        </div>

                                        <div class="px-3 py-2 text-xs text-muted-foreground">
                                            Trading Journal
                                        </div>

                                        <div class="px-3 py-2 text-xs text-muted-foreground">
                                            Analytics
                                        </div>
                                    </div>
                                </div>

                                {/* Main Dashboard */}
                                <div class="space-y-4 md:col-span-9">
                                    <div class="flex items-end justify-between">
                                        <div>
                                            <p class="text-xs text-muted-foreground">
                                                Trading workspace
                                            </p>

                                            <h2 class="mt-1 text-lg font-semibold">
                                                Your trading journey
                                            </h2>
                                        </div>

                                        <Badge
                                            variant="outline"
                                            class="border-primary/20 bg-primary/5 text-primary"
                                        >
                                            Live
                                        </Badge>
                                    </div>

                                    {/* Stats */}
                                    <div class="grid gap-3 sm:grid-cols-3">
                                        <div class="rounded-xl border border-border/60 bg-background/50 p-4">
                                            <p class="text-xs text-muted-foreground">
                                                Account Balance
                                            </p>

                                            <p class="mt-2 text-xl font-semibold">
                                                $24,580.00
                                            </p>

                                            <p class="mt-1 text-xs text-primary">
                                                +8.42%
                                            </p>
                                        </div>

                                        <div class="rounded-xl border border-border/60 bg-background/50 p-4">
                                            <p class="text-xs text-muted-foreground">
                                                Win Rate
                                            </p>

                                            <p class="mt-2 text-xl font-semibold">
                                                68.4%
                                            </p>

                                            <p class="mt-1 text-xs text-muted-foreground">
                                                Last 30 trades
                                            </p>
                                        </div>

                                        <div class="rounded-xl border border-border/60 bg-background/50 p-4">
                                            <p class="text-xs text-muted-foreground">
                                                Risk / Reward
                                            </p>

                                            <p class="mt-2 text-xl font-semibold">
                                                1 : 2.8
                                            </p>

                                            <p class="mt-1 text-xs text-muted-foreground">
                                                Average
                                            </p>
                                        </div>
                                    </div>

                                    {/* Chart */}
                                    <div class="relative h-56 overflow-hidden rounded-xl border border-border/60 bg-background/50 p-4">
                                        <div class="flex items-center justify-between">
                                            <p class="text-xs font-medium">
                                                Performance
                                            </p>

                                            <p class="text-xs text-muted-foreground">
                                                30 days
                                            </p>
                                        </div>

                                        <div class="absolute inset-x-6 bottom-6 top-14">
                                            {/* Grid */}
                                            <div class="absolute inset-0 flex flex-col justify-between">
                                                <span class="border-t border-border/40" />
                                                <span class="border-t border-border/40" />
                                                <span class="border-t border-border/40" />
                                                <span class="border-t border-border/40" />
                                            </div>

                                            {/* Abstract chart */}
                                            <svg
                                                class="absolute inset-0 h-full w-full"
                                                viewBox="0 0 800 220"
                                                preserveAspectRatio="none"
                                                fill="none"
                                            >
                                                <defs>
                                                    <linearGradient
                                                        id="hero-chart-fill"
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            class="text-primary"
                                                            stop-opacity=".20"
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            class="text-primary"
                                                            stop-opacity="0"
                                                        />
                                                    </linearGradient>
                                                </defs>

                                                <path
                                                    d="M0 180 C70 165 80 150 140 160 C200 170 220 120 280 135 C340 150 350 100 410 115 C470 130 500 90 550 105 C610 120 630 60 680 75 C730 90 750 40 800 48 L800 220 L0 220 Z"
                                                    fill="url(#hero-chart-fill)"
                                                    class="text-primary"
                                                />

                                                <path
                                                    d="M0 180 C70 165 80 150 140 160 C200 170 220 120 280 135 C340 150 350 100 410 115 C470 130 500 90 550 105 C610 120 630 60 680 75 C730 90 750 40 800 48"
                                                    stroke="currentColor"
                                                    stroke-width="3"
                                                    class="text-primary"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Small supporting statement */}
                <p class="mt-8 text-xs text-muted-foreground">
                    Learn. Practice. Trade. Grow.
                </p>
            </div>
        </section>
    );
};

