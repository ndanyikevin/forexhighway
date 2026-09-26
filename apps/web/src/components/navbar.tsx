
import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import ThemeToggle from "~/components/theme-toggle";

export default function Navbar() {
    return (
        <header class="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand */}
                <A
                    href="/"
                    class="flex items-center gap-2.5"
                    aria-label="ForexHighway home"
                >
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                        F
                    </div>

                    <span class="text-base font-semibold tracking-tight">
                        ForexHighway
                    </span>
                </A>

                {/* Desktop Navigation */}
                <nav class="hidden items-center gap-7 md:flex">
                    <A
                        href="/"
                        end
                        class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        activeClass="text-foreground"
                    >
                        Home
                    </A>

                    <A
                        href="/about"
                        class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        activeClass="text-foreground"
                    >
                        About
                    </A>

                    <A
                        href="/education"
                        class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        activeClass="text-foreground"
                    >
                        Education
                    </A>

                    <A
                        href="/journal"
                        class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        activeClass="text-foreground"
                    >
                        Journal
                    </A>
                </nav>
                

                {/* Actions */}
                <div class="flex items-center gap-2">
                    <ThemeToggle />
                    <A
                        href="/login"
                        class="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
                    >
                        Log in
                    </A>

                    <Button
                        as={A}
                        href="/register"
                        size="sm"
                        class="font-medium"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    );
}

