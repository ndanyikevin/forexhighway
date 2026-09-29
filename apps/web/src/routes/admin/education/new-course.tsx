import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";

import CourseForm from "~/components/admin/course-form";

import {
    createAdminCourse,
} from "~/data/admin/courses";

export default function NewCoursePage() {
    const navigate = useNavigate();

    function handleCreateCourse(values: Parameters<typeof createAdminCourse>[0]) {
        const course = createAdminCourse(values);

        navigate(`/admin/education/${course.id}`);
    }

    return (
        <>
            <Title>
                Create Course | Education | Admin | ForexHighway
            </Title>

            <main class="p-6">
                <div class="mx-auto max-w-7xl">
                    <CourseForm
                        onSubmit={handleCreateCourse}
                    />
                </div>
            </main>
        </>
    );
}