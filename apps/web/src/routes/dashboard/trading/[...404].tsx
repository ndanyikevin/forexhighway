
import { ArrowLeft, LayoutDashboard, SearchX } from "lucide-solid";

import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { Button } from "~/components/ui/button";

export default function DashboardNotFound() {
    return (
        <>
            <Title>Page Not Found | ForexHighway</Title>

            <main class="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-6">
                <div class="w-full max-w-lg text-center">
                    <div class="mx-auto flex size-16 items-center justify-center rounded-2xl border border-border bg-muted/40">
                        <SearchX class="size-8 text-primary" />
                    </div>

                    <p class="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
                        404
                    </p>

                    <h1 class="mt-2 text-3xl font-bold tracking-tight">
                        Page not found
                    </h1>

                    <p class="mx-auto mt-3 max-w-md text-muted-foreground">
                        The dashboard page you're looking for doesn't
                        exist or may have been moved.
                    </p>

                    <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            as={A}
                            href="/dashboard"
                        >
                            <LayoutDashboard class="mr-2 size-4" />
                            Dashboard
                        </Button>

                        <Button
                            as={A}
                            href="/dashboard/trading"
                            variant="outline"
                        >
                            <ArrowLeft class="mr-2 size-4" />
                            Trading Overview
                        </Button>
                    </div>

                    <div class="mt-10 border-t border-border pt-6">
                        <p class="text-xs text-muted-foreground">
                            ForexHighway Workspace
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

