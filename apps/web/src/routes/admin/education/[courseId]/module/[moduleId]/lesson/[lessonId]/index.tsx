import { createSignal, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import {
    A,
    useNavigate,
    useParams,
} from "@solidjs/router";
import {
    ArrowLeft,
    BookOpen,
    Clock,
    Edit,
    FileText,
    Play,
    Trash2,
    HelpCircle,
} from "lucide-solid";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import {
    getAdminCourse,
} from "~/data/admin/courses";

import {
    getAdminModule,
} from "~/data/admin/modules";

import {
    deleteAdminLesson,
    getAdminLesson,
} from "~/data/admin/lessons";

export default function AdminLessonPage() {
    const params = useParams();
    const navigate = useNavigate();

    const [showDeleteConfirmation, setShowDeleteConfirmation] =
        createSignal(false);

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

    function handleDelete() {
        const deleted = deleteAdminLesson(lessonId);

        if (!deleted) {
            return;
        }

        navigate(
            `/admin/education/${courseId}/module/${moduleId}`,
        );
    }

    function getLessonIcon() {
        if (!lesson) {
            return BookOpen;
        }

        switch (lesson.type) {
            case "Video":
                return Play;

            case "Article":
                return FileText;

            case "Quiz":
                return HelpCircle;

            default:
                return BookOpen;
        }
    }

    return (
        <>
            <Title>
                {lesson?.title ?? "Lesson"} | Education | Admin |
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
                                The lesson you're looking for could not
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
                    <div class="mx-auto max-w-5xl space-y-6">
                        <Button
                            as={A}
                            href={`/admin/education/${courseId}/module/${moduleId}`}
                            variant="ghost"
                            size="sm"
                            class="-ml-2"
                        >
                            <ArrowLeft class="mr-2 size-4" />
                            {module!.title}
                        </Button>

                        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div class="flex gap-4">
                                <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    {(() => {
                                        const Icon = getLessonIcon();

                                        return (
                                            <Icon class="size-6" />
                                        );
                                    })()}
                                </div>

                                <div class="min-w-0">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <h1 class="text-2xl font-bold tracking-tight">
                                            {lesson!.title}
                                        </h1>

                                        <Badge variant="secondary">
                                            {lesson!.type}
                                        </Badge>
                                    </div>

                                    <p class="mt-2 text-muted-foreground">
                                        Part of{" "}
                                        <span class="font-medium text-foreground">
                                            {module!.title}
                                        </span>
                                    </p>

                                    <div class="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <span class="flex items-center gap-1.5">
                                            <Clock class="size-4" />
                                            {lesson!.duration}
                                        </span>

                                        <span>
                                            Lesson {lesson!.position}
                                        </span>

                                        <span>
                                            Course: {course!.title}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex shrink-0 items-center gap-2">
                                <Button
                                    as={A}
                                    href={`/admin/education/${courseId}/module/${moduleId}/lesson/${lessonId}/edit-lesson`}
                                    variant="outline"
                                >
                                    <Edit class="mr-2 size-4" />
                                    Edit Lesson
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        setShowDeleteConfirmation(
                                            true,
                                        )
                                    }
                                >
                                    <Trash2 class="mr-2 size-4" />
                                    Delete
                                </Button>
                            </div>
                        </div>

                        <div class="grid gap-6 lg:grid-cols-[1fr_280px]">
                            <div class="space-y-6">
                                <section class="rounded-xl border border-border bg-card">
                                    <div class="border-b border-border p-6">
                                        <h2 class="font-semibold">
                                            Lesson Content
                                        </h2>

                                        <p class="mt-1 text-sm text-muted-foreground">
                                            The actual lesson content will
                                            be managed here.
                                        </p>
                                    </div>

                                    <div class="flex min-h-64 items-center justify-center p-6">
                                        <div class="text-center">
                                            <div class="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted">
                                                {(() => {
                                                    const Icon =
                                                        getLessonIcon();

                                                    return (
                                                        <Icon class="size-6 text-muted-foreground" />
                                                    );
                                                })()}
                                            </div>

                                            <h3 class="mt-4 font-medium">
                                                {lesson!.type} lesson
                                            </h3>

                                            <p class="mt-1 max-w-md text-sm text-muted-foreground">
                                                Lesson content editing will
                                                be added when we expand the
                                                lesson model.
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <aside class="space-y-4">
                                <div class="rounded-xl border border-border bg-card p-5">
                                    <h2 class="font-semibold">
                                        Lesson Details
                                    </h2>

                                    <dl class="mt-4 space-y-4">
                                        <div>
                                            <dt class="text-xs text-muted-foreground">
                                                Type
                                            </dt>

                                            <dd class="mt-1 text-sm font-medium">
                                                {lesson!.type}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt class="text-xs text-muted-foreground">
                                                Duration
                                            </dt>

                                            <dd class="mt-1 text-sm font-medium">
                                                {lesson!.duration}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt class="text-xs text-muted-foreground">
                                                Position
                                            </dt>

                                            <dd class="mt-1 text-sm font-medium">
                                                Lesson {lesson!.position}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt class="text-xs text-muted-foreground">
                                                Module
                                            </dt>

                                            <dd class="mt-1 text-sm font-medium">
                                                {module!.title}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div class="rounded-xl border border-border bg-card p-5">
                                    <h2 class="font-semibold">
                                        Course
                                    </h2>

                                    <p class="mt-1 text-sm text-muted-foreground">
                                        {course!.title}
                                    </p>

                                    <Button
                                        as={A}
                                        href={`/admin/education/${courseId}`}
                                        variant="outline"
                                        size="sm"
                                        class="mt-4 w-full"
                                    >
                                        View Course
                                    </Button>
                                </div>
                            </aside>
                        </div>

                        <Show when={showDeleteConfirmation()}>
                            <div class="rounded-xl border border-destructive/30 bg-destructive/10 p-5">
                                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 class="font-semibold text-destructive">
                                            Delete this lesson?
                                        </h2>

                                        <p class="mt-1 text-sm text-muted-foreground">
                                            This will permanently remove{" "}
                                            <span class="font-medium text-foreground">
                                                "{lesson!.title}"
                                            </span>{" "}
                                            from this module. This action
                                            cannot be undone.
                                        </p>
                                    </div>

                                    <div class="flex shrink-0 items-center gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setShowDeleteConfirmation(
                                                    false,
                                                )
                                            }
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            onClick={handleDelete}
                                        >
                                            <Trash2 class="mr-2 size-4" />
                                            Delete Lesson
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Show>
                    </div>
                </main>
            </Show>
        </>
    );
}