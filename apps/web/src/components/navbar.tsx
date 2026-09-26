import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { Menu, X } from "lucide-solid";

import { Button } from "~/components/ui/button";
import ThemeToggle from "~/components/theme-toggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = createSignal(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { href: "/", label: "Home", end: true },
        { href: "/about", label: "About" },
        { href: "/education", label: "Education" },
        { href: "/journal", label: "Journal" },
    ];

    return (
        <header class="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand */}
                <A
                    href="/"
                    class="flex items-center gap-2.5"
                    aria-label="ForexHighway home"
                    onClick={closeMenu}
                >
                    <img
                        src="/logo.png"
                        alt="ForexHighway"
                        class="h-9 w-auto object-contain"
                    />

                    <span class="text-base font-semibold tracking-tight">
                        ForexHighway
                    </span>
                </A>

                {/* Desktop Navigation */}
                <nav class="hidden items-center gap-7 md:flex">
                    {navLinks.map((link) => (
                        <A
                            href={link.href}
                            end={link.end}
                            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            activeClass="text-foreground font-semibold"
                        >
                            {link.label}
                        </A>
                    ))}
                </nav>

                {/* Desktop Actions */}
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
                        class="hidden font-medium sm:inline-flex"
                        onClick={closeMenu}
                    >
                        Get Started
                    </Button>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        class="md:hidden"
                        onClick={toggleMenu}
                        aria-label="Toggle Navigation Menu"
                    >
                        {isOpen() ? <X class="size-5" /> : <Menu class="size-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen() && (
                <div class="border-b border-border/60 bg-background/95 px-4 pb-6 pt-4 backdrop-blur-md md:hidden">
                    <nav class="flex flex-col space-y-3">
                        {navLinks.map((link) => (
                            <A
                                href={link.href}
                                end={link.end}
                                onClick={closeMenu}
                                class="rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                activeClass="bg-accent text-foreground font-semibold"
                            >
                                {link.label}
                            </A>
                        ))}

                        <div class="pt-2">
                            <A
                                href="/login"
                                onClick={closeMenu}
                                class="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                Log in
                            </A>
                        </div>

                        <div class="pt-2">
                            <Button
                                as={A}
                                href="/register"
                                class="w-full justify-center font-medium"
                                onClick={closeMenu}
                            >
                                Get Started
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}