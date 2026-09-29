import { createMemo, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { A, useParams } from "@solidjs/router";

import {
    ArrowLeft,
    BookOpen,
    Edit,
    FileText,
    Plus,
    Video,
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

import { getAdminCourse } from "~/data/admin/courses";

import {
    getAdminModule,
    getAdminModules,
} from "~/data/admin/modules";

import { getAdminLessons } from "~/data/admin/lessons";

export default function AdminModulePage() {
    const params = useParams();

    const courseId = createMemo(() => {
        const id = Number(params.courseId);

        return Number.isInteger(id)
            ? id
            : undefined;
    });

    const moduleId = createMemo(() => {
        const id = Number(params.moduleId);

        return Number.isInteger(id)
            ? id
            : undefined;
    });

    const course = createMemo(() => {
        const id = courseId();

        if (id === undefined) {
            return undefined;
        }

        return getAdminCourse(id);
    });

    const module = createMemo(() => {
        const id = moduleId();
        const currentCourse = course();

        if (
            id === undefined ||
            !currentCourse
        ) {
            return undefined;
        }

        const currentModule = getAdminModule(id);

        if (
            !currentModule ||
            currentModule.courseId !== currentCourse.id
        ) {
            return undefined;
        }

        return currentModule;
    });

    const lessons = createMemo(() => {
        const currentModule = module();

        if (!currentModule) {
            return [];
        }

        return getAdminLessons(currentModule.id);
    });

    const modulePosition = createMemo(() => {
        const currentCourse = course();
        const currentModule = module();

        if (
            !currentCourse ||
            !currentModule
        ) {
            return undefined;
        }

        const modules = getAdminModules(
            currentCourse.id,
        );

        const index = modules.findIndex(
            (item) =>
                item.id === currentModule.id,
        );

        return index === -1
            ? undefined
            : index + 1;
    });

    const courseUrl = createMemo(() => {
        const id = courseId();

        return id !== undefined
            ? `/admin/education/${id}`
            : "/admin/education";
    });

    const moduleUrl = createMemo(() => {
        const currentCourse = course();
        const currentModule = module();

        if (
            !currentCourse ||
            !currentModule
        ) {
            return "/admin/education";
        }

        return `/admin/education/${currentCourse.id}/module/${currentModule.id}`;
    });

    const newLessonUrl = createMemo(() => {
        const currentCourse = course();
        const currentModule = module();

        if (
            !currentCourse ||
            !currentModule
        ) {
            return "/admin/education";
        }

        return `/admin/education/${currentCourse.id}/module/${currentModule.id}/lesson/new-lesson`;
    });

    const editModuleUrl = createMemo(() => {
        const currentCourse = course();
        const currentModule = module();

        if (
            !currentCourse ||
            !currentModule
        ) {
            return "/admin/education";
        }

        return `/admin/education/${currentCourse.id}/module/${currentModule.id}/edit-module`;
    });

    const isValidModule = createMemo(() => {
        return Boolean(
            course() &&
            module(),
        );
    });

    return (
        <>
            <Title>
                {module()?.title ?? "Module"} | Education | Admin |
                ForexHighway
            </Title>

            <Show
                when={isValidModule()}
                fallback={
                    <main class="p-6">
                        <div class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
                            <BookOpen class="size-10 text-muted-foreground" />

                            <h1 class="mt-4 text-2xl font-bold">
                                Module not found
                            </h1>

                            <p class="mt-2 text-muted-foreground">
                                The module you're looking for doesn't exist
                                or doesn't belong to this course.
                            </p>

                            <Button
                                as={A}
                                href={
                                    course()
                                        ? courseUrl()
                                        : "/admin/education"
                                }
                                variant="outline"
                                class="mt-6"
                            >
                                <ArrowLeft class="mr-2 size-4" />

                                {course()
                                    ? "Back to Course"
                                    : "Back to Education"}
                            </Button>
                        </div>
                    </main>
                }
            >
                <main class="p-6">
                    <div class="mx-auto max-w-7xl space-y-6">
                        {/* Back navigation */}

                        <Button
                            as={A}
                            href={courseUrl()}
                            variant="ghost"
                            size="sm"
                            class="-ml-2"
                        >
                            <ArrowLeft class="mr-2 size-4" />

                            {course()!.title}
                        </Button>

                        {/* Module header */}

                        <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div class="flex gap-4">
                                <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <BookOpen class="size-6" />
                                </div>

                                <div class="min-w-0">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <Show
                                            when={modulePosition()}
                                        >
                                            <Badge variant="secondary">
                                                Module{" "}
                                                {modulePosition()}
                                            </Badge>
                                        </Show>

                                        <h1 class="text-2xl font-bold tracking-tight">
                                            {module()!.title}
                                        </h1>
                                    </div>

                                    <Show
                                        when={
                                            module()!.description
                                        }
                                    >
                                        <p class="mt-2 max-w-3xl text-muted-foreground">
                                            {module()!.description}
                                        </p>
                                    </Show>
                                </div>
                            </div>

                            <div class="flex shrink-0 gap-2">
                                <Button
                                    as={A}
                                    href={editModuleUrl()}
                                    variant="outline"
                                >
                                    <Edit class="mr-2 size-4" />
                                    Edit Module
                                </Button>

                                <Button
                                    as={A}
                                    href={newLessonUrl()}
                                >
                                    <Plus class="mr-2 size-4" />
                                    Add Lesson
                                </Button>
                            </div>
                        </div>

                        {/* Statistics */}

                        <div class="grid gap-4 sm:grid-cols-2">
                            <Card>
                                <CardHeader class="pb-2">
                                    <CardTitle class="text-sm font-medium">
                                        Lessons
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <span class="text-2xl font-bold">
                                        {lessons().length}
                                    </span>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader class="pb-2">
                                    <CardTitle class="text-sm font-medium">
                                        Course
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <span class="truncate text-sm font-medium">
                                        {course()!.title}
                                    </span>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Lessons */}

                        <Card>
                            <CardHeader>
                                <div class="flex items-center justify-between gap-4">
                                    <div>
                                        <CardTitle>
                                            Lessons
                                        </CardTitle>

                                        <CardDescription>
                                            Manage the lessons inside this
                                            module.
                                        </CardDescription>
                                    </div>

                                    <Button
                                        as={A}
                                        href={newLessonUrl()}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Plus class="mr-2 size-4" />
                                        Add Lesson
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <Show
                                    when={
                                        lessons().length > 0
                                    }
                                    fallback={
                                        <div class="rounded-lg border border-dashed border-border px-6 py-10 text-center">
                                            <BookOpen class="mx-auto size-8 text-muted-foreground" />

                                            <p class="mt-3 font-medium">
                                                No lessons yet
                                            </p>

                                            <p class="mt-1 text-sm text-muted-foreground">
                                                Add your first lesson to
                                                this module.
                                            </p>

                                            <Button
                                                as={A}
                                                href={newLessonUrl()}
                                                class="mt-5"
                                                size="sm"
                                            >
                                                <Plus class="mr-2 size-4" />
                                                Add Lesson
                                            </Button>
                                        </div>
                                    }
                                >
                                    <div class="overflow-hidden rounded-lg border border-border">
                                        <div class="hidden grid-cols-[48px_1fr_120px_100px_80px] items-center border-b border-border bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground sm:grid">
                                            <span>#</span>

                                            <span>
                                                Lesson
                                            </span>

                                            <span>
                                                Type
                                            </span>

                                            <span>
                                                Duration
                                            </span>

                                            <span class="text-right">
                                                Action
                                            </span>
                                        </div>

                                        <div class="divide-y divide-border">
                                            <For each={lessons()}>
                                                {(lesson, index) => (
                                                    <div class="flex flex-col gap-3 px-4 py-3 sm:grid sm:grid-cols-[48px_1fr_120px_100px_80px] sm:items-center">
                                                        <span class="text-xs text-muted-foreground">
                                                            {String(
                                                                index() + 1,
                                                            ).padStart(
                                                                2,
                                                                "0",
                                                            )}
                                                        </span>

                                                        <div class="flex min-w-0 items-center gap-3">
                                                            <div class="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                                                                <Show
                                                                    when={
                                                                        lesson.type ===
                                                                        "Video"
                                                                    }
                                                                    fallback={
                                                                        <FileText class="size-4 text-muted-foreground" />
                                                                    }
                                                                >
                                                                    <Video class="size-4 text-muted-foreground" />
                                                                </Show>
                                                            </div>

                                                            <span class="truncate text-sm font-medium">
                                                                {lesson.title}
                                                            </span>
                                                        </div>

                                                        <Badge
                                                            variant="outline"
                                                            class="w-fit"
                                                        >
                                                            {lesson.type}
                                                        </Badge>

                                                        <span class="text-xs text-muted-foreground">
                                                            {lesson.duration}
                                                        </span>

                                                        <div class="sm:text-right">
                                                            <Button
                                                                as={A}
                                                                href={`/admin/education/${course()!.id}/module/${module()!.id}/lesson/${lesson.id}`}
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </For>
                                        </div>
                                    </div>
                                </Show>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </Show>
        </>
    );
}