import { Title } from "@solidjs/meta";
import { useNavigate, useParams } from "@solidjs/router";

import LessonForm from "~/components/admin/lesson-form";

import {
    createAdminLesson,
} from "~/data/admin/lessons";

export default function NewLessonPage() {
    const params = useParams();
    const navigate = useNavigate();

    const courseId = Number(params.id);
    const moduleId = Number(params.moduleId);

    function handleCreateLesson(
        values: Parameters<typeof createAdminLesson>[0],
    ) {
        createAdminLesson(values);

        navigate(
            `/admin/education/${courseId}/module/${moduleId}`,
        );
    }

    return (
        <>
            <Title>
                Create Lesson | Education | Admin | ForexHighway
            </Title>

            <main class="p-6">
                <div class="mx-auto max-w-7xl">
                    <LessonForm
                        courseId={courseId}
                        moduleId={moduleId}
                        onSubmit={handleCreateLesson}
                    />
                </div>
            </main>
        </>
    );
}