import {
    BarChart3,
    BookOpen,
    ChartNoAxesCombined,
    LayoutDashboard,
    Settings,
    Wallet,
} from "lucide-solid";

import { A } from "@solidjs/router";
import { For } from "solid-js";

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

const workspaceNavigation = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
        end: true,
    },
    {
        title: "Journal",
        href: "/dashboard/journal",
        icon: BookOpen,
    },
    {
        title: "Trading",
        href: "/dashboard/trading",
        icon: ChartNoAxesCombined,
    },
    {
        title: "Accounts",
        href: "/dashboard/accounts",
        icon: Wallet,
    },
];

const resourcesNavigation = [
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

export default function AppSidebar() {
    return (
        <Sidebar
            collapsible="icon"
            class="border-r border-border bg-sidebar text-sidebar-foreground"
        >
            <SidebarHeader class="border-b border-sidebar-border/50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" as={A} href="/dashboard">
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
                <SidebarGroup>
                    <SidebarGroupLabel class="text-sidebar-foreground/70">
                        Workspace
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <For each={workspaceNavigation}>
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

                <SidebarGroup>
                    <SidebarGroupLabel class="text-sidebar-foreground/70">
                        Resources
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <For each={resourcesNavigation}>
                                {(item) => {
                                    const Icon = item.icon;
                                    return (
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                as={A}
                                                href={item.href}
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