import type { ParentProps } from "solid-js";

import DashboardLayout from "~/components/layouts/dashboard-layout";

export default function DashboardRoute(props: ParentProps) {
    return (
        <DashboardLayout>
            {props.children}
        </DashboardLayout>
    );
}