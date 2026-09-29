import { Title } from "@solidjs/meta";
import {
    useNavigate,
    useParams,
} from "@solidjs/router";
import { Show } from "solid-js";

import ModuleForm from "~/components/admin/module-form";

import {
    createAdminModule,
} from "~/data/admin/modules";

export default function NewModulePage() {
    const params = useParams();
    const navigate = useNavigate();

    const courseId = Number(params.courseId);

    function handleCreateModule(
        values: Parameters<
            typeof createAdminModule
        >[0],
    ) {
        const module =
            createAdminModule(values);

        navigate(
            `/admin/education/${module.courseId}`,
        );
    }

    return (
        <>
            <Title>
                Add Module | Education | Admin |
                ForexHighway
            </Title>

            <Show
                when={Number.isInteger(courseId)}
                fallback={
                    <div class="p-6">
                        <p class="text-muted-foreground">
                            Invalid course.
                        </p>
                    </div>
                }
            >
                <main class="p-6">
                    <div class="mx-auto max-w-3xl">
                        <ModuleForm
                            courseId={courseId}
                            onSubmit={
                                handleCreateModule
                            }
                        />
                    </div>
                </main>
            </Show>
        </>
    );
}