import type { ParentProps } from "solid-js";

import PublicLayout from "~/components/layouts/public-layout";

export default function PublicRoute(props: ParentProps) {
    return (
        <PublicLayout>
            {props.children}
        </PublicLayout>
    );
}