import { A } from "@solidjs/router";
import { ArrowRight, BookOpen, Brain, ChartNoAxesCombined, ShieldCheck } from "lucide-solid";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

const topics = [
    {
        icon: BookOpen,
        title: "Forex Fundamentals",
        description:
            "Understand currencies, pairs, pips, spreads, sessions, leverage, and how the forex market works.",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Technical Analysis",
        description:
            "Learn how to read price action, market structure, liquidity, supply and demand, and trade setups.",
    },
    {
        icon: ShieldCheck,
        title: "Risk Management",
        description:
            "Build the discipline to protect your capital with position sizing, risk limits, and structured execution.",
    },
    {
        icon: Brain,
        title: "Trading Psychology",
        description:
            "Develop the mindset and habits required to follow your trading plan through wins and losses.",
    },
];

const paths = [
    {
        level: "01",
        title: "Beginner",
        description:
            "Start with the foundations and develop a clear understanding of how the forex market works.",
    },
    {
        level: "02",
        title: "Intermediate",
        description:
            "Go deeper into market structure, price action, liquidity, and building a repeatable trading process.",
    },
    {
        level: "03",
        title: "Advanced",
        description:
            "Refine your execution, risk management, analysis, and approach to professional trading.",
    },
];

export default function Education() {
    return (
        <div>
            {/* Hero */}
            <section class="relative overflow-hidden border-b border-border">
                <div class="absolute inset-0 -z-10">
                    <div class="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div class="mx-auto max-w-4xl py-20 text-center sm:py-24">
                    <span class="inline-flex rounded-full border border-border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
                        Forex Education
                    </span>

                    <h1 class="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Learn the market.
                        <br />
                        <span class="text-primary">
                            Build your process.
                        </span>
                    </h1>

                    <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                        Practical forex education designed to help you
                        understand the markets, develop a trading process, and
                        make more informed decisions.
                    </p>

                    <div class="mt-8 flex justify-center">
                        <Button as={A} href="/register">
                            Start Learning
                            <ArrowRight class="ml-2 size-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* What you'll learn */}
            <section class="py-16 sm:py-20">
                <div>
                    <div class="mx-auto max-w-2xl text-center">
                        <p class="text-sm font-medium uppercase tracking-wider text-primary">
                            What you'll learn
                        </p>

                        <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Build knowledge that translates into practice.
                        </h2>

                        <p class="mt-4 text-muted-foreground">
                            A structured approach to the areas that matter most
                            to a developing trader.
                        </p>
                    </div>

                    <div class="mt-10 grid gap-5 sm:grid-cols-2">
                        {topics.map((topic) => (
                            <Card class="border-border bg-background">
                                <CardContent class="p-6">
                                    <div class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <topic.icon class="size-5" />
                                    </div>

                                    <h3 class="mt-5 text-lg font-semibold">
                                        {topic.title}
                                    </h3>

                                    <p class="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                        {topic.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Learning paths */}
            <section class="border-y border-border bg-muted/20 py-16 sm:py-20">
                <div>
                    <div class="mx-auto max-w-2xl text-center">
                        <p class="text-sm font-medium uppercase tracking-wider text-primary">
                            Learning paths
                        </p>

                        <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Progress at your own level.
                        </h2>

                        <p class="mt-4 text-muted-foreground">
                            Start where you are and develop your knowledge
                            progressively.
                        </p>
                    </div>

                    <div class="mt-10 grid gap-5 lg:grid-cols-3">
                        {paths.map((path) => (
                            <Card class="border-border bg-background">
                                <CardContent class="p-6">
                                    <span class="text-sm font-semibold text-primary">
                                        {path.level}
                                    </span>

                                    <h3 class="mt-3 text-xl font-semibold">
                                        {path.title}
                                    </h3>

                                    <p class="mt-3 text-sm leading-6 text-muted-foreground">
                                        {path.description}
                                    </p>

                                    <A
                                        href="/register"
                                        class="mt-6 inline-flex items-center text-sm font-medium text-foreground transition-colors hover:text-primary"
                                    >
                                        Explore path
                                        <ArrowRight class="ml-2 size-4" />
                                    </A>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section class="py-16 text-center sm:py-20">
                <div class="mx-auto max-w-2xl">
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                        Build your trading edge.
                    </h2>

                    <p class="mt-4 text-muted-foreground">
                        The goal isn't to know everything. It's to understand
                        what you're doing and why you're doing it.
                    </p>

                    <div class="mt-8 flex justify-center">
                        <Button as={A} href="/register">
                            Start Learning
                            <ArrowRight class="ml-2 size-4" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}