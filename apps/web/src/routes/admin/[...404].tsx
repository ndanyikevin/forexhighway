import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { ArrowLeft, LayoutDashboard } from "lucide-solid";

import { Button } from "~/components/ui/button";

export default function AdminNotFound() {
    return (
        <>
            <Title>Page Not Found | Admin | ForexHighway</Title>

            <HttpStatusCode code={404} />

            <main class="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 py-16">
                <div class="mx-auto max-w-lg text-center">
                    <div class="text-8xl font-bold tracking-tighter text-primary/20 sm:text-9xl">
                        404
                    </div>

                    <p class="mt-4 text-sm font-medium uppercase tracking-wider text-primary">
                        Admin Panel
                    </p>

                    <h1 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Page not found
                    </h1>

                    <p class="mx-auto mt-4 max-w-md text-muted-foreground">
                        The administration page you're looking for doesn't
                        exist or may have been moved.
                    </p>

                    <div class="mt-8 flex flex-wrap justify-center gap-3">
                        <Button as={A} href="/admin">
                            <LayoutDashboard class="mr-2 size-4" />
                            Admin Dashboard
                        </Button>

                        <Button
                            as={A}
                            href="/dashboard"
                            variant="outline"
                        >
                            <ArrowLeft class="mr-2 size-4" />
                            Trader Dashboard
                        </Button>
                    </div>

                    <p class="mt-10 text-xs text-muted-foreground">
                        Error code: 404
                    </p>
                </div>
            </main>
        </>
    );
}