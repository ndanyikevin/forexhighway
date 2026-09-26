import {
    BarChart3,
    BookOpen,
    ChartNoAxesCombined,
    LayoutDashboard,
    Settings,
    Wallet,
} from "lucide-solid";

import { A } from "@solidjs/router";

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
        <Sidebar>
            <SidebarHeader>
                <div class="flex h-12 items-center px-2">
                    <A
                        href="/dashboard"
                        class="flex items-center gap-2"
                    >
                        <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                            F
                        </div>

                        <span class="font-semibold tracking-tight">
                            ForexHighway
                        </span>
                    </A>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Workspace
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {workspaceNavigation.map((item) => (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        as={A}
                                        href={item.href}
                                        end={item.end}
                                    >
                                        <item.icon class="size-4" />

                                        <span>
                                            {item.title}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Resources
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {resourcesNavigation.map((item) => (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        as={A}
                                        href={item.href}
                                    >
                                        <item.icon class="size-4" />

                                        <span>
                                            {item.title}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div class="px-2 py-2">
                    <div class="rounded-lg border border-sidebar-border p-3">
                        <p class="text-sm font-medium">
                            Kevin Ndanyi
                        </p>

                        <p class="text-xs text-muted-foreground">
                            Trader
                        </p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}