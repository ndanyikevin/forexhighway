
import {
    BarChart3,
    BookOpen,
    ChartNoAxesCombined,
    LayoutDashboard,
    List,
    Plus,
    Settings,
    TrendingUp,
} from "lucide-solid";

import { A } from "@solidjs/router";
import type { Component, JSX } from "solid-js";
import { For } from "solid-js";

import { Separator } from "~/components/ui/separator";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";

interface NavigationItem {
    title: string;
    href: string;
    icon: Component<{
        size?: string | number;
        class?: string;
    }>;
    end?: boolean;
}

const workspaceNavigation: NavigationItem[] = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
        end: true,
    },
];

const tradingNavigation: NavigationItem[] = [
    {
        title: "Overview",
        href: "/dashboard/trading",
        icon: ChartNoAxesCombined,
        end: true,
    },
    {
        title: "Positions",
        href: "/dashboard/trading/positions",
        icon: TrendingUp,
    },
    {
        title: "Orders",
        href: "/dashboard/trading/orders",
        icon: List,
    },
];

const journalNavigation: NavigationItem[] = [
    {
        title: "Overview",
        href: "/dashboard/journal",
        icon: BookOpen,
        end: true,
    },
    {
        title: "Trades",
        href: "/dashboard/journal/trades",
        icon: List,
    },
    {
        title: "New Trade",
        href: "/dashboard/journal/new-trade",
        icon: Plus,
    },
    {
        title: "Performance",
        href: "/dashboard/journal/performance",
        icon: TrendingUp,
    },
];

const resourcesNavigation: NavigationItem[] = [
    {
        title: "Education",
        href: "/education",
        icon: BarChart3,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

function NavigationSection(props: {
    title: string;
    items: NavigationItem[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel class="text-xs font-semibold uppercase tracking-wider text-primary">
                {props.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    <For each={props.items}>
                        {(item) => {
                            const Icon = item.icon;

                            return (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        as={A}
                                        href={item.href}
                                        end={item.end}
                                        tooltip={item.title}
                                        class="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <Icon class="size-4 shrink-0 text-sidebar-foreground" />

                                        <span class="group-data-[collapsible=icon]:hidden">
                                            {item.title}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        }}
                    </For>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export default function AppSidebar() {
    return (
        <Sidebar
            collapsible="icon"
            class="border-r border-border bg-sidebar text-sidebar-foreground"
        >
            <SidebarHeader class="border-b border-sidebar-border/50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            as={A}
                            href="/dashboard"
                        >
                            <img
                                src="/logo.png"
                                alt="ForexHighway Logo"
                                class="size-8 shrink-0 rounded-lg object-contain"
                            />

                            <div class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span class="truncate font-semibold text-sidebar-foreground">
                                    ForexHighway
                                </span>

                                <span class="truncate text-xs text-muted-foreground">
                                    Workspace
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent class="bg-sidebar">
                <NavigationSection
                    title="Workspace"
                    items={workspaceNavigation}
                />

                <Separator class="mx-3 w-auto bg-sidebar-border/50" />

                <NavigationSection
                    title="Trading"
                    items={tradingNavigation}
                />

                <Separator class="mx-3 w-auto bg-sidebar-border/50" />

                <NavigationSection
                    title="Journal"
                    items={journalNavigation}
                />

                <Separator class="mx-3 w-auto bg-sidebar-border/50" />

                <NavigationSection
                    title="Resources"
                    items={resourcesNavigation}
                />
            </SidebarContent>

            <SidebarFooter class="border-t border-sidebar-border/50 bg-sidebar">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            class="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                            <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted font-medium text-foreground">
                                KN
                            </div>

                            <div class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span class="truncate font-medium text-sidebar-foreground">
                                    Kevin Ndanyi
                                </span>

                                <span class="truncate text-xs text-muted-foreground">
                                    Trader
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

