import type { ParentProps } from "solid-js";

import AdminLayout from "~/components/layouts/admin-layout";

export default function AdminRoute(props: ParentProps) {
    return (
        <AdminLayout>
            {props.children}
        </AdminLayout>
    );
}