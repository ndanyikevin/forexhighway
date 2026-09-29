import type { AdminCourse } from "~/data/admin/courses";

export function filterAdminCourses(
    courses: AdminCourse[],
    query: string,
) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return courses;
    }

    return courses.filter((course) => {
        return (
            course.title.toLowerCase().includes(normalizedQuery) ||
            course.description.toLowerCase().includes(normalizedQuery) ||
            course.instructor.toLowerCase().includes(normalizedQuery) ||
            course.status.toLowerCase().includes(normalizedQuery)
        );
    });
}

export function getPaginatedCourses(
    courses: AdminCourse[],
    page: number,
    pageSize: number,
) {
    const start = (page - 1) * pageSize;

    return courses.slice(start, start + pageSize);
}