import { Title } from "@solidjs/meta";
import { A, useNavigate, useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { ArrowLeft, BookOpen } from "lucide-solid";

import LessonForm from "~/components/admin/lesson-form";

import { Button } from "~/components/ui/button";

import { getAdminCourse } from "~/data/admin/courses";
import { getAdminModule } from "~/data/admin/modules";

import {
    getAdminLesson,
    updateAdminLesson,
} from "~/data/admin/lessons";

export default function EditLessonPage() {
    const params = useParams();
    const navigate = useNavigate();

    const courseId = Number(params.courseId);
    const moduleId = Number(params.moduleId);
    const lessonId = Number(params.lessonId);

    const course =
        Number.isInteger(courseId)
            ? getAdminCourse(courseId)
            : undefined;

    const module =
        Number.isInteger(moduleId)
            ? getAdminModule(moduleId)
            : undefined;

    const lesson =
        Number.isInteger(lessonId)
            ? getAdminLesson(lessonId)
            : undefined;

    const isValidLesson =
        course !== undefined &&
        module !== undefined &&
        lesson !== undefined &&
        module.courseId === course.id &&
        lesson.moduleId === module.id;

    function handleUpdateLesson(
        values: Parameters<typeof updateAdminLesson>[1],
    ) {
        updateAdminLesson(lessonId, values);

        navigate(
            `/admin/education/${courseId}/module/${moduleId}/lesson/${lessonId}`,
        );
    }

    return (
        <>
            <Title>
                {lesson?.title ?? "Edit Lesson"} | Education | Admin |
                ForexHighway
            </Title>

            <Show
                when={isValidLesson}
                fallback={
                    <main class="p-6">
                        <div class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
                            <BookOpen class="size-10 text-muted-foreground" />

                            <h1 class="mt-4 text-2xl font-bold">
                                Lesson not found
                            </h1>

                            <p class="mt-2 text-muted-foreground">
                                The lesson you're trying to edit could not
                                be found in this module.
                            </p>

                            <Button
                                as={A}
                                href={
                                    Number.isInteger(courseId) &&
                                        Number.isInteger(moduleId)
                                        ? `/admin/education/${courseId}/module/${moduleId}`
                                        : "/admin/education"
                                }
                                variant="outline"
                                class="mt-6"
                            >
                                <ArrowLeft class="mr-2 size-4" />
                                Back to Module
                            </Button>
                        </div>
                    </main>
                }
            >
                <main class="p-6">
                    <div class="mx-auto max-w-7xl">
                        <LessonForm
                            courseId={courseId}
                            moduleId={moduleId}
                            initialValues={{
                                title: lesson!.title,
                                type: lesson!.type,
                                duration: lesson!.duration,
                            }}
                            title="Edit Lesson"
                            descriptionText="Update the lesson information."
                            submitLabel="Save Changes"
                            backHref={`/admin/education/${courseId}/module/${moduleId}/lesson/${lessonId}`}
                            backLabel="Lesson"
                            onSubmit={handleUpdateLesson}
                        />
                    </div>
                </main>
            </Show>
        </>
    );
}