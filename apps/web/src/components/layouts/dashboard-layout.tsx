import type { ParentProps } from "solid-js";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar";

import AppSidebar from "~/components/dashboard/app-sidebar";

export default function DashboardLayout(props: ParentProps) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <header class="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
                    <SidebarTrigger />

                    <div class="h-4 w-px bg-border" />

                    <span class="text-sm font-medium">
                        Dashboard
                    </span>
                </header>

                <main class="flex-1">
                    {props.children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}