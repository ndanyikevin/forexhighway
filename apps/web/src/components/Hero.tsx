import type { Component } from "solid-js";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

export const Hero: Component = () => {
    return (
        <section class="relative overflow-hidden bg-background pt-12 pb-20 md:pt-20 md:pb-32">
            {/* Background Subtle Radial Gradient Grid */}
            <div class="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size:24px_24px">
                <div class="absolute left-1/2 top-0 -translate-x-1/2 h-125 w-200 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
            </div>

            <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Left Column: Copy & CTAs */}
                    <div class="lg:col-span-7 flex flex-col items-start text-left space-y-6">
                        {/* Announcement Badge */}
                        <Badge variant="outline" class="gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                            <span class="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                            <span>Q3 Institutional Mentorship Cohort Now Open</span>
                        </Badge>

                        {/* Main Headline */}
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                            Master the Markets & Automate Your{" "}
                            <span class="bg-linear-to-r from-primary via-primary/80 to-emerald-500 bg-clip-text text-transparent">
                                Trading Growth
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p class="text-lg sm:text-xl text-muted-foreground font-normal max-w-2xl leading-relaxed">
                            Forexhighway delivers institutional-grade account management, elite 1-on-1 mentorship, and structured education to scale your trading capital systematically.
                        </p>

                        {/* Primary Action Buttons */}
                        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
                            <a href="/register" class="w-full sm:w-auto">
                                <Button size="lg" class="w-full h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25">
                                    Start Free Trial
                                </Button>
                            </a>
                            <a href="/account-management" class="w-full sm:w-auto">
                                <Button size="lg" variant="outline" class="w-full h-12 px-8 text-base font-semibold">
                                    Explore Managed Accounts
                                </Button>
                            </a>
                        </div>

                        {/* Key Metrics / Social Proof */}
                        <div class="grid grid-cols-3 gap-6 pt-8 border-t border-border/60 w-full max-w-lg mt-4">
                            <div>
                                <p class="text-2xl sm:text-3xl font-bold text-foreground">$12M+</p>
                                <p class="text-xs sm:text-sm text-muted-foreground font-medium">Assets Managed</p>
                            </div>
                            <div>
                                <p class="text-2xl sm:text-3xl font-bold text-foreground">84.2%</p>
                                <p class="text-xs sm:text-sm text-muted-foreground font-medium">Avg. Win Rate</p>
                            </div>
                            <div>
                                <p class="text-2xl sm:text-3xl font-bold text-foreground">2,500+</p>
                                <p class="text-xs sm:text-sm text-muted-foreground font-medium">Active Students</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Platform Preview Card */}
                    <div class="lg:col-span-5 relative w-full">
                        {/* Decorative Glow Behind Card */}
                        <div class="absolute -inset-1 rounded-2xl bg-linear-to-r from-primary/30 to-emerald-500/30 blur-xl opacity-70" />

                        {/* Dashboard Mockup Container */}
                        <Card class="relative rounded-2xl shadow-2xl backdrop-blur-sm p-0 overflow-hidden border-border bg-card">
                            {/* Mockup Header */}
                            <CardHeader class="flex flex-row items-center justify-between space-y-0 p-6 pb-4 border-b border-border/60">
                                <div class="flex items-center gap-3">
                                    <div class="h-3 w-3 rounded-full bg-red-500/80" />
                                    <div class="h-3 w-3 rounded-full bg-yellow-500/80" />
                                    <div class="h-3 w-3 rounded-full bg-green-500/80" />
                                </div>
                                <span class="text-xs font-mono text-muted-foreground">EUR/USD • LIVE FEED</span>
                            </CardHeader>

                            <CardContent class="p-6 pt-5 space-y-4">
                                {/* Portfolio Value Summary Card */}
                                <div class="rounded-xl bg-accent/40 p-4 border border-border/40">
                                    <CardDescription class="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Automated Bridge Equity
                                    </CardDescription>
                                    <div class="flex items-baseline justify-between mt-1">
                                        <CardTitle class="text-3xl font-bold text-foreground">
                                            $148,920.50
                                        </CardTitle>
                                        <Badge variant="secondary" class="text-xs font-semibold text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/15 border-none">
                                            +18.4% This Month
                                        </Badge>
                                    </div>
                                </div>

                                {/* Live Signal / Trade Preview List */}
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/60">
                                        <div class="flex items-center gap-3">
                                            <Badge class="h-8 w-8 rounded-md bg-emerald-500/10 text-emerald-500 font-bold text-xs hover:bg-emerald-500/20 p-0 justify-center border-none">
                                                BUY
                                            </Badge>
                                            <div>
                                                <p class="text-sm font-semibold text-foreground">GBP/USD Supply Setup</p>
                                                <p class="text-xs text-muted-foreground">Smart Money Concept • H4</p>
                                            </div>
                                        </div>
                                        <span class="text-sm font-semibold text-emerald-500">+124 pips</span>
                                    </div>

                                    <div class="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/60">
                                        <div class="flex items-center gap-3">
                                            <Badge class="h-8 w-8 rounded-md bg-emerald-500/10 text-emerald-500 font-bold text-xs hover:bg-emerald-500/20 p-0 justify-center border-none">
                                                BUY
                                            </Badge>
                                            <div>
                                                <p class="text-sm font-semibold text-foreground">XAU/USD Liquidity Sweep</p>
                                                <p class="text-xs text-muted-foreground">Automated Risk Execution</p>
                                            </div>
                                        </div>
                                        <span class="text-sm font-semibold text-emerald-500">+210 pips</span>
                                    </div>
                                </div>
                            </CardContent>

                            {/* Feature Highlights Footer */}
                            <CardFooter class="px-6 py-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                                <span class="flex items-center gap-1">
                                    <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Sub-millisecond Bridge Execution
                                </span>
                                <span class="flex items-center gap-1">
                                    <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    24/7 Risk Controls
                                </span>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};