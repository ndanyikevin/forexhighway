import { createMemo, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { A, useParams } from "@solidjs/router";
import {
    ArrowLeft,
    BookOpen,
    Edit,
    Plus,
    Users,
} from "lucide-solid";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

import {
    getAdminCourse,
    type AdminCourse,
} from "~/data/admin/courses";

import {
    getAdminModules,
    type AdminModule,
} from "~/data/admin/modules";

import {
    getAdminLessons,
    type AdminLesson,
} from "~/data/admin/lessons";

interface ModuleWithLessons extends AdminModule {
    lessons: AdminLesson[];
}

export default function AdminCoursePage() {
    const params = useParams();

    const course = createMemo<AdminCourse | undefined>(() => {
        const courseId = Number(params.courseId);

        if (!Number.isInteger(courseId)) {
            return undefined;
        }

        return getAdminCourse(courseId);
    });

    const modulesWithLessons =
        createMemo<ModuleWithLessons[]>(() => {
            const currentCourse = course();

            if (!currentCourse) {
                return [];
            }

            const rawModules = getAdminModules(
                currentCourse.id,
            );

            return rawModules.map((module) => ({
                ...module,
                lessons: getAdminLessons(module.id),
            }));
        });

    const lessonCount = createMemo(() => {
        return modulesWithLessons().reduce(
            (total, module) =>
                total + module.lessons.length,
            0,
        );
    });

    return (
        <>
            <Title>
                {course()?.title ?? "Course"} | Education | Admin |
                ForexHighway
            </Title>

            <Show
                when={course()}
                fallback={
                    <main class="p-6">
                        <div class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
                            <BookOpen class="size-10 text-muted-foreground" />

                            <h1 class="mt-4 text-2xl font-bold">
                                Course not found
                            </h1>

                            <p class="mt-2 text-muted-foreground">
                                The course with ID "
                                {params.courseId}" could not be
                                found.
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
                        <div class="mx-auto max-w-7xl space-y-6">
                            <Button
                                as={A}
                                href="/admin/education"
                                variant="ghost"
                                size="sm"
                                class="-ml-2"
                            >
                                <ArrowLeft class="mr-2 size-4" />
                                Education
                            </Button>

                            {/* Course header */}
                            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                <div class="flex gap-4">
                                    <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <BookOpen class="size-6" />
                                    </div>

                                    <div>
                                        <div class="flex flex-wrap items-center gap-2">
                                            <h1 class="text-2xl font-bold tracking-tight">
                                                {currentCourse().title}
                                            </h1>

                                            <Badge
                                                variant={
                                                    currentCourse()
                                                        .status ===
                                                        "Published"
                                                        ? "default"
                                                        : currentCourse()
                                                            .status ===
                                                            "Draft"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                            >
                                                {
                                                    currentCourse()
                                                        .status
                                                }
                                            </Badge>
                                        </div>

                                        <p class="mt-2 max-w-3xl text-muted-foreground">
                                            {
                                                currentCourse()
                                                    .description
                                            }
                                        </p>

                                        <p class="mt-2 text-sm text-muted-foreground">
                                            Instructor:{" "}
                                            <span class="font-medium text-foreground">
                                                {
                                                    currentCourse()
                                                        .instructor
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    as={A}
                                    href={`/admin/education/${currentCourse().id}/edit-course`}
                                >
                                    <Edit class="mr-2 size-4" />
                                    Edit Course
                                </Button>
                            </div>

                            {/* Statistics */}
                            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardHeader class="pb-2">
                                        <CardTitle class="text-sm font-medium">
                                            Students
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <div class="flex items-center gap-2">
                                            <Users class="size-4 text-muted-foreground" />

                                            <span class="text-2xl font-bold">
                                                {
                                                    currentCourse()
                                                        .students
                                                }
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader class="pb-2">
                                        <CardTitle class="text-sm font-medium">
                                            Modules
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <span class="text-2xl font-bold">
                                            {
                                                modulesWithLessons()
                                                    .length
                                            }
                                        </span>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader class="pb-2">
                                        <CardTitle class="text-sm font-medium">
                                            Lessons
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <span class="text-2xl font-bold">
                                            {lessonCount()}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Course content */}
                            <Card>
                                <CardHeader>
                                    <div class="flex items-center justify-between gap-4">
                                        <div>
                                            <CardTitle>
                                                Course Content
                                            </CardTitle>

                                            <CardDescription>
                                                Organize your modules
                                                and lessons.
                                            </CardDescription>
                                        </div>

                                        <Button
                                            as={A}
                                            href={`/admin/education/${currentCourse().id}/module/new-module`}
                                            variant="outline"
                                        >
                                            <Plus class="mr-2 size-4" />
                                            Add Module
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent class="space-y-4">
                                    <Show
                                        when={
                                            modulesWithLessons()
                                                .length > 0
                                        }
                                        fallback={
                                            <div class="rounded-lg border border-dashed border-border px-6 py-10 text-center">
                                                <BookOpen class="mx-auto size-8 text-muted-foreground" />

                                                <p class="mt-3 font-medium">
                                                    No modules yet
                                                </p>

                                                <p class="mt-1 text-sm text-muted-foreground">
                                                    Add your first
                                                    module to start
                                                    building this
                                                    course.
                                                </p>
                                            </div>
                                        }
                                    >
                                        <For
                                            each={modulesWithLessons()}
                                        >
                                            {(module) => (
                                                <div class="overflow-hidden rounded-lg border border-border">
                                                    <div class="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-3">
                                                        <div class="min-w-0 flex-1">
                                                            <p class="font-medium">
                                                                {
                                                                    module.title
                                                                }
                                                            </p>

                                                            <Show
                                                                when={
                                                                    module.description
                                                                }
                                                            >
                                                                {(
                                                                    description,
                                                                ) => (
                                                                    <p class="mt-1 text-xs text-muted-foreground">
                                                                        {description()}
                                                                    </p>
                                                                )}
                                                            </Show>
                                                        </div>

                                                        <span class="text-xs text-muted-foreground">
                                                            {
                                                                module
                                                                    .lessons
                                                                    .length
                                                            }{" "}
                                                            {module
                                                                .lessons
                                                                .length ===
                                                                1
                                                                ? "lesson"
                                                                : "lessons"}
                                                        </span>
                                                    </div>

                                                    <Show
                                                        when={
                                                            module
                                                                .lessons
                                                                .length >
                                                            0
                                                        }
                                                    >
                                                        <div class="divide-y divide-border">
                                                            <For
                                                                each={
                                                                    module.lessons
                                                                }
                                                            >
                                                                {(
                                                                    lesson,
                                                                ) => (
                                                                    <div class="flex items-center gap-3 px-4 py-3 pl-8">
                                                                        <BookOpen class="size-4 shrink-0 text-muted-foreground" />

                                                                        <span class="min-w-0 flex-1 truncate text-sm">
                                                                            {
                                                                                lesson.title
                                                                            }
                                                                        </span>

                                                                        <span class="text-xs text-muted-foreground">
                                                                            {
                                                                                lesson.type
                                                                            }
                                                                        </span>

                                                                        <span class="text-xs text-muted-foreground">
                                                                            {
                                                                                lesson.duration
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </For>
                                                        </div>
                                                    </Show>
                                                </div>
                                            )}
                                        </For>
                                    </Show>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                )}
            </Show>
        </>
    );
}