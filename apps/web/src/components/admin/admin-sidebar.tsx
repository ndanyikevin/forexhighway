import {
    BarChart3,
    BookOpen,
    ChartNoAxesCombined,
    LayoutDashboard,
    Settings,
    Users,
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

const managementNavigation = [
    {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
        end: true,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Education",
        href: "/admin/education",
        icon: BookOpen,
    },
];

const tradingNavigation = [
    {
        title: "Trading",
        href: "/admin/trading",
        icon: ChartNoAxesCombined,
    },
    {
        title: "Investments",
        href: "/admin/investments",
        icon: Wallet,
    },
    {
        title: "Activity",
        href: "/admin/activity",
        icon: BarChart3,
    },
];

export default function AdminSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" as={A} href="/admin">
                            <img
                                src="/logo.png"
                                alt="ForexHighway Logo"
                                class="size-8 shrink-0 rounded-lg object-contain"
                            />
                            <div class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span class="truncate font-semibold">ForexHighway</span>
                                <span class="truncate text-xs text-muted-foreground">
                                    Admin Panel
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {managementNavigation.map((item) => (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        as={A}
                                        href={item.href}
                                        end={item.end}
                                        tooltip={item.title}
                                    >
                                        <item.icon class="size-4 shrink-0" />
                                        <span class="group-data-[collapsible=icon]:hidden">
                                            {item.title}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {tradingNavigation.map((item) => (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        as={A}
                                        href={item.href}
                                        tooltip={item.title}
                                    >
                                        <item.icon class="size-4 shrink-0" />
                                        <span class="group-data-[collapsible=icon]:hidden">
                                            {item.title}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    as={A}
                                    href="/admin/settings"
                                    tooltip="Settings"
                                >
                                    <Settings class="size-4 shrink-0" />
                                    <span class="group-data-[collapsible=icon]:hidden">
                                        Settings
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted font-medium">
                                KN
                            </div>
                            <div class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span class="truncate font-medium">Kevin Ndanyi</span>
                                <span class="truncate text-xs text-muted-foreground">
                                    Administrator
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}