import { A } from "@solidjs/router";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
  LineChart,
  Wallet,
} from "lucide-solid";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

const pillars = [
  {
    icon: BookOpen,
    title: "Learn",
    description: "Master market fundamentals through practical, structured guidance.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Practice",
    description: "Build discipline by logging trades, reviewing performance, and refining data.",
  },
  {
    icon: LineChart,
    title: "Trade",
    description: "Execute with clarity in a workspace designed for focused trading.",
  },
  {
    icon: Wallet,
    title: "Grow",
    description: "Access professional account management and scale your capital.",
  },
];

export default function About() {
  return (
    <div class="space-y-16 py-12 lg:space-y-24">
      {/* Hero */}
      <section class="relative overflow-hidden text-center">
        <div class="absolute inset-0 -z-10">
          <div class="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div class="mx-auto max-w-3xl px-4">
          <span class="mb-4 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            About ForexHighway
          </span>

          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
            Built for traders who want to{" "}
            <span class="text-primary">understand the market.</span>
          </h1>

          <p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            A single ecosystem uniting practical education, disciplined practice, and professional execution.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div class="space-y-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-primary">
              Our Mission
            </p>

            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              Practical trading education, streamlined.
            </h2>

            <p class="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Markets are noisy. We strip away the fluff to give you the exact tools and structure needed to learn, test, and trade with consistency.
            </p>
          </div>

          <Card class="overflow-hidden border-border/50 bg-card/50">
            <CardContent class="p-6">
              <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                The Core Workflow
              </p>
              <p class="mt-1 text-xl font-semibold">Learn. Practice. Trade. Grow.</p>

              <div class="mt-6 grid grid-cols-4 gap-2">
                {pillars.map((pillar, index) => (
                  <div class="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-background/50 p-3 text-center">
                    <pillar.icon class="size-4 text-primary" />
                    <span class="mt-1.5 text-xs font-medium text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pillars */}
      <section class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <Card class="border-border/40 bg-background/60 transition-colors hover:bg-background">
              <CardContent class="p-5">
                <div class="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <pillar.icon class="size-4" />
                </div>

                <h3 class="mt-4 text-base font-semibold">{pillar.title}</h3>

                <p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section class="mx-auto max-w-3xl px-4 text-center">
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
          Start trading with clarity.
        </h2>

        <p class="mt-2 text-sm text-muted-foreground">
          Build your process and adopt a disciplined approach to the market.
        </p>

        <div class="mt-6 flex justify-center gap-3">
          <Button as={A} href="/education" size="sm">
            Start Learning
            <ArrowRight class="ml-2 size-4" />
          </Button>

          <Button as={A} href="/" variant="ghost" size="sm">
            Back Home
          </Button>
        </div>
      </section>
    </div>
  );
}