import { Title } from "@solidjs/meta";
import { A, useNavigate, useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { ArrowLeft, BookOpen } from "lucide-solid";

import CourseForm from "~/components/admin/course-form";

import {
    getAdminCourse,
    updateAdminCourse,
} from "~/data/admin/courses";

import { Button } from "~/components/ui/button";

export default function EditCoursePage() {
    const params = useParams();
    const navigate = useNavigate();

    const courseId = Number(params.courseId);

    const course =
        Number.isInteger(courseId)
            ? getAdminCourse(courseId)
            : undefined;

    function handleUpdateCourse(
        values: Parameters<typeof updateAdminCourse>[1],
    ) {
        updateAdminCourse(courseId, values);

        navigate(`/admin/education/${courseId}`);
    }

    return (
        <>
            <Title>
                {course?.title ?? "Edit Course"} | Education | Admin |
                ForexHighway
            </Title>

            <Show
                when={course}
                fallback={
                    <main class="p-6">
                        <div class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
                            <BookOpen class="size-10 text-muted-foreground" />

                            <h1 class="mt-4 text-2xl font-bold">
                                Course not found
                            </h1>

                            <p class="mt-2 text-muted-foreground">
                                The course with ID "{params.courseId}" could
                                not be found.
                            </p>

                            <Button
                                as={A}
                                href="/admin/education"
                                variant="outline"
                                class="mt-6"
                            >
                                <ArrowLeft class="mr-2 size-4" />
                                Back to Education
                            </Button>
                        </div>
                    </main>
                }
            >
                {(currentCourse) => (
                    <main class="p-6">
                        <div class="mx-auto max-w-7xl">
                            <CourseForm
                                initialValues={{
                                    title: currentCourse().title,
                                    description: currentCourse().description,
                                    instructor: currentCourse().instructor,
                                    status: currentCourse().status,
                                }}
                                title="Edit Course"
                                descriptionText="Update the course information and publishing settings."
                                submitLabel="Save Changes"
                                backHref={`/admin/education/${currentCourse().id}`}
                                backLabel="Course"
                                onSubmit={handleUpdateCourse}
                            />
                        </div>
                    </main>
                )}
            </Show>
        </>
    );
}