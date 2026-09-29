import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import {
    BookOpen,
    Plus,
    Search,
    Users,
} from "lucide-solid";

import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationItems,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";

import {
    TextField,
    TextFieldInput,
} from "~/components/ui/text-field";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import {
    adminCourses,
    type AdminCourse,
} from "~/data/admin/courses";

import {
    filterAdminCourses,
    getPaginatedCourses,
} from "~/lib/admin/courses";

const PAGE_SIZE = 6;

export default function AdminEducationPage() {
    const [search, setSearch] = createSignal("");
    const [page, setPage] = createSignal(1);

    const filteredCourses = createMemo(() => {
        return filterAdminCourses(
            adminCourses,
            search(),
        );
    });

    const totalPages = createMemo(() => {
        return Math.max(
            1,
            Math.ceil(
                filteredCourses().length / PAGE_SIZE,
            ),
        );
    });

    const paginatedCourses = createMemo(() => {
        return getPaginatedCourses(
            filteredCourses(),
            page(),
            PAGE_SIZE,
        );
    });

    const publishedCourses = createMemo(() => {
        return adminCourses.filter(
            (course) => course.status === "Published",
        ).length;
    });

    const totalStudents = createMemo(() => {
        return adminCourses.reduce(
            (total, course) => total + course.students,
            0,
        );
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    createEffect(() => {
        const pages = totalPages();

        if (page() > pages) {
            setPage(pages);
        }
    });

    return (
        <>
            <Title>Education | Admin | ForexHighway</Title>

            <div class="p-6">
                <div class="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">
                                Education
                            </h1>

                            <p class="text-muted-foreground">
                                Manage courses and learning content.
                            </p>
                        </div>

                        <Button as={A} href="/admin/education/new-course">
                            <Plus class="mr-2 size-4" />
                            Add Course
                        </Button>
                    </div>

                    {/* Summary */}
                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle class="text-sm font-medium">
                                    Total Courses
                                </CardTitle>

                                <BookOpen class="size-4 text-muted-foreground" />
                            </CardHeader>

                            <CardContent>
                                <div class="text-2xl font-bold">
                                    {adminCourses.length}
                                </div>

                                <p class="text-xs text-muted-foreground">
                                    Courses in the platform
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle class="text-sm font-medium">
                                    Published
                                </CardTitle>

                                <BookOpen class="size-4 text-muted-foreground" />
                            </CardHeader>

                            <CardContent>
                                <div class="text-2xl font-bold">
                                    {publishedCourses()}
                                </div>

                                <p class="text-xs text-muted-foreground">
                                    Currently available to students
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle class="text-sm font-medium">
                                    Enrollments
                                </CardTitle>

                                <Users class="size-4 text-muted-foreground" />
                            </CardHeader>

                            <CardContent>
                                <div class="text-2xl font-bold">
                                    {totalStudents()}
                                </div>

                                <p class="text-xs text-muted-foreground">
                                    Total course enrollments
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Courses */}
                    <Card>
                        <CardHeader>
                            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle>All Courses</CardTitle>

                                    <CardDescription>
                                        Browse and manage learning content.
                                    </CardDescription>
                                </div>

                                <div class="relative w-full sm:w-64">
                                    <Search class="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

                                    <TextField>
                                        <TextFieldInput
                                            type="search"
                                            placeholder="Search courses..."
                                            value={search()}
                                            onInput={(event) =>
                                                handleSearch(
                                                    event.currentTarget.value,
                                                )
                                            }
                                            class="pl-9"
                                        />
                                    </TextField>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <Show
                                when={paginatedCourses().length > 0}
                                fallback={
                                    <div class="flex min-h-40 flex-col items-center justify-center text-center">
                                        <BookOpen class="size-8 text-muted-foreground" />

                                        <h3 class="mt-3 font-medium">
                                            No courses found
                                        </h3>

                                        <p class="mt-1 text-sm text-muted-foreground">
                                            Try adjusting your search.
                                        </p>
                                    </div>
                                }
                            >
                                <div class="overflow-x-auto">
                                    <table class="w-full text-sm">
                                        <thead>
                                            <tr class="border-b border-border text-left">
                                                <th class="px-3 py-2 text-xs font-medium text-muted-foreground">
                                                    Course
                                                </th>

                                                <th class="px-3 py-2 text-xs font-medium text-muted-foreground">
                                                    Status
                                                </th>

                                                <th class="px-3 py-2 text-xs font-medium text-muted-foreground">
                                                    Students
                                                </th>

                                                <th class="px-3 py-2 text-xs font-medium text-muted-foreground">
                                                    Lessons
                                                </th>

                                                <th class="px-3 py-2 text-xs font-medium text-muted-foreground">
                                                    Updated
                                                </th>

                                                <th class="px-3 py-2 text-right text-xs font-medium text-muted-foreground">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <For each={paginatedCourses()}>
                                                {(course: AdminCourse) => (
                                                    <tr class="border-b border-border last:border-0">
                                                        <td class="max-w-md px-3 py-2.5">
                                                            <div class="flex items-center gap-2.5">
                                                                <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                                    <BookOpen class="size-4" />
                                                                </div>

                                                                <div class="min-w-0">
                                                                    <p class="truncate font-medium">
                                                                        {
                                                                            course.title
                                                                        }
                                                                    </p>

                                                                    <p class="truncate text-xs text-muted-foreground">
                                                                        {
                                                                            course.description
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td class="px-3 py-2.5">
                                                            <Badge
                                                                variant={
                                                                    course.status ===
                                                                        "Published"
                                                                        ? "default"
                                                                        : course.status ===
                                                                            "Draft"
                                                                            ? "secondary"
                                                                            : "outline"
                                                                }
                                                            >
                                                                {
                                                                    course.status
                                                                }
                                                            </Badge>
                                                        </td>

                                                        <td class="px-3 py-2.5">
                                                            <span class="font-medium">
                                                                {
                                                                    course.students
                                                                }
                                                            </span>
                                                        </td>

                                                        <td class="px-3 py-2.5">
                                                            <span class="text-muted-foreground">
                                                                {
                                                                    course.lessons
                                                                }
                                                            </span>
                                                        </td>

                                                        <td class="whitespace-nowrap px-3 py-2.5 text-muted-foreground">
                                                            {
                                                                course.updatedAt
                                                            }
                                                        </td>

                                                        <td class="px-3 py-2.5 text-right">
                                                            <Button
                                                                as={A}
                                                                href={`/admin/education/${course.id}`}
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                View
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </For>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div class="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                                    <p class="text-sm text-muted-foreground">
                                        Showing{" "}
                                        <span class="font-medium text-foreground">
                                            {(page() - 1) * PAGE_SIZE + 1}
                                        </span>{" "}
                                        to{" "}
                                        <span class="font-medium text-foreground">
                                            {Math.min(
                                                page() * PAGE_SIZE,
                                                filteredCourses().length,
                                            )}
                                        </span>{" "}
                                        of{" "}
                                        <span class="font-medium text-foreground">
                                            {filteredCourses().length}
                                        </span>{" "}
                                        courses
                                    </p>

                                    <Pagination
                                        count={totalPages()}
                                        page={page()}
                                        onPageChange={setPage}
                                        itemComponent={(props) => (
                                            <PaginationItem
                                                page={props.page}
                                            >
                                                {props.page}
                                            </PaginationItem>
                                        )}
                                        ellipsisComponent={() => (
                                            <PaginationEllipsis />
                                        )}
                                    >
                                        <PaginationPrevious />
                                        <PaginationItems />
                                        <PaginationNext />
                                    </Pagination>
                                </div>
                            </Show>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}