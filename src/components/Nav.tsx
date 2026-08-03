import { createSignal, type Component, type JSX } from "solid-js";
import * as Popover from "@kobalte/core/popover";
import { Button } from "~/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  description?: string;
}

const navItems: NavItem[] = [
  {
    label: "Account Management",
    href: "/account-management",
    description: "Automated account bridging & managed services",
  },
  {
    label: "Education",
    href: "/education",
    description: "Courses, market analysis & trading guides",
  },
  {
    label: "Mentorship",
    href: "/mentorship",
    description: "1-on-1 coaching & exclusive community access",
  },
  {
    label: "About Us",
    href: "/about",
  },
];

export const Navbar: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <a href="/" class="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-90">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold shadow-sm">
            FH
          </div>
          <span class="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Forexhighway
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav class="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              href={item.href}
              class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div class="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" as="a" href="/login">
            Client Portal
          </Button>
          <Button size="sm" as="a" href="/register">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle (Kobalte Popover) */}
        <div class="flex md:hidden">
          <Popover.Root open={isOpen()} onOpenChange={setIsOpen}>
            <Popover.Trigger
              as={Button}
              variant="ghost"
              size="icon"
              aria-label="Toggle Navigation Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                {isOpen() ? (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content class="z-50 w-screen max-w-sm rounded-b-lg border border-border bg-background p-6 shadow-xl transition-all animate-in fade-in-0 zoom-in-95">
                <div class="flex flex-col space-y-4">
                  <div class="space-y-2">
                    {navItems.map((item) => (
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        class="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <div>{item.label}</div>
                        {item.description && (
                          <span class="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>

                  <div class="pt-4 border-t border-border flex flex-col gap-2">
                    <Button variant="outline" class="w-full justify-center" as="a" href="/login">
                      Client Portal
                    </Button>
                    <Button class="w-full justify-center" as="a" href="/register">
                      Get Started
                    </Button>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

      </div>
    </header>
  );
};