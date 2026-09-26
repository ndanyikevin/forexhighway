import type { ParentProps } from "solid-js";

import AdminSidebar from "~/components/admin/admin-sidebar";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar";

export default function AdminLayout(props: ParentProps) {
    return (
        <SidebarProvider>
            <AdminSidebar />

            <SidebarInset>
                <header class="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
                    <SidebarTrigger />

                    <div class="h-4 w-px bg-border" />

                    <span class="text-sm font-medium">
                        Administration
                    </span>
                </header>

                <main class="flex-1">
                    {props.children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}