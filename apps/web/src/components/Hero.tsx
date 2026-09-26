import type { Component } from "solid-js";

import { A } from "@solidjs/router";
import { ArrowRight, BookOpen, ChartNoAxesCombined, NotebookPen } from "lucide-solid";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export const Hero: Component = () => {
    return (
        <section class="relative overflow-hidden">
            {/* Subtle background */}
            <div class="pointer-events-none absolute inset-0 -z-10">
                <div class="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
            </div>

            <div class="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
                {/* Badge */}
                <Badge
                    variant="outline"
                    class="rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary"
                >
                    <span class="mr-2 size-1.5 rounded-full bg-primary" />
                    Built for traders
                </Badge>

                {/* Headline */}
                <h1 class="mt-7 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Master the markets.
                    <br />
                    <span class="text-primary">
                        Build your edge.
                    </span>
                </h1>

                {/* Description */}
                <p class="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    ForexHighway brings education, trading practice, and
                    professional tools together to help you develop a clear,
                    disciplined approach to the markets.
                </p>

                {/* Actions */}
                <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                        as={A}
                        href="/education"
                        size="lg"
                        class="h-11 px-7 font-medium"
                    >
                        Start Learning
                        <ArrowRight class="ml-2 size-4" />
                    </Button>

                    <Button
                        as={A}
                        href="/about"
                        size="lg"
                        variant="outline"
                        class="h-11 px-7 font-medium"
                    >
                        About ForexHighway
                    </Button>
                </div>

                {/* Product preview */}
                <div class="relative mt-16 w-full max-w-4xl">
                    <div class="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/5 blur-3xl" />

                    <Card class="overflow-hidden rounded-2xl border-border/70 bg-card/80 text-left shadow-xl backdrop-blur">
                        {/* Header */}
                        <div class="flex items-center justify-between border-b border-border/60 px-5 py-4">
                            <div class="flex items-center gap-3">
                                <div class="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                                    F
                                </div>

                                <div>
                                    <p class="text-sm font-semibold">
                                        ForexHighway
                                    </p>

                                    <p class="text-xs text-muted-foreground">
                                        Your trading workspace
                                    </p>
                                </div>
                            </div>

                            <div class="hidden text-xs text-muted-foreground sm:block">
                                Learn. Practice. Trade. Grow.
                            </div>
                        </div>

                        <CardContent class="p-5 sm:p-6">
                            <div class="grid gap-4 sm:grid-cols-3">
                                <div class="rounded-xl border border-border/60 bg-background/50 p-5">
                                    <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <BookOpen class="size-4" />
                                    </div>

                                    <h3 class="mt-4 font-semibold">
                                        Education
                                    </h3>

                                    <p class="mt-1 text-sm leading-5 text-muted-foreground">
                                        Learn the foundations and develop your
                                        market knowledge.
                                    </p>
                                </div>

                                <div class="rounded-xl border border-border/60 bg-background/50 p-5">
                                    <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <NotebookPen class="size-4" />
                                    </div>

                                    <h3 class="mt-4 font-semibold">
                                        Journal
                                    </h3>

                                    <p class="mt-1 text-sm leading-5 text-muted-foreground">
                                        Document your trades and understand
                                        your decisions.
                                    </p>
                                </div>

                                <div class="rounded-xl border border-border/60 bg-background/50 p-5">
                                    <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <ChartNoAxesCombined class="size-4" />
                                    </div>

                                    <h3 class="mt-4 font-semibold">
                                        Trading
                                    </h3>

                                    <p class="mt-1 text-sm leading-5 text-muted-foreground">
                                        Build a disciplined process around your
                                        trading.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <p class="mt-7 text-xs text-muted-foreground">
                    A focused environment for the complete trading journey.
                </p>
            </div>
        </section>
    );
};