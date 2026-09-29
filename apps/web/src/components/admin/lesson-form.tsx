import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";
import {
    ArrowLeft,
    Check,
} from "lucide-solid";

import {
    TextField,
    TextFieldInput,
    TextFieldLabel,
} from "~/components/ui/text-field";

import { Button } from "~/components/ui/button";

import type {
    AdminLessonType,
    CreateAdminLessonInput,
} from "~/data/admin/lessons";

interface LessonFormProps {
    courseId: number;
    moduleId: number;

    initialValues?: Partial<CreateAdminLessonInput>;

    title?: string;
    descriptionText?: string;
    submitLabel?: string;

    backHref?: string;
    backLabel?: string;

    onSubmit: (
        values: CreateAdminLessonInput,
    ) => void;
}

export default function LessonForm(
    props: LessonFormProps,
) {
    const [title, setTitle] = createSignal(
        props.initialValues?.title ?? "",
    );

    const [type, setType] =
        createSignal<AdminLessonType>(
            props.initialValues?.type ?? "Video",
        );

    const [duration, setDuration] = createSignal(
        props.initialValues?.duration ?? "",
    );

    const [error, setError] = createSignal("");

    function handleSubmit(event: SubmitEvent) {
        console.log("🔥 LESSON FORM SUBMIT FIRED");
        event.preventDefault();

        const values: CreateAdminLessonInput = {
            moduleId: props.moduleId,
            title: title().trim(),
            type: type(),
            duration: duration().trim(),
        };

        if (!values.title) {
            setError("Lesson title is required.");
            return;
        }

        if (!values.duration) {
            setError("Lesson duration is required.");
            return;
        }

        setError("");

        props.onSubmit(values);
    }

    return (
        <form
            onSubmit={handleSubmit}
            class="space-y-6"
        >
            <div class="flex items-center gap-2">
                <Button
                    as={A}
                    href={
                        props.backHref ??
                        `/admin/education/${props.courseId}/module/${props.moduleId}`
                    }
                    variant="ghost"
                    size="sm"
                    type="button"
                    class="-ml-2"
                >
                    <ArrowLeft class="mr-2 size-4" />

                    {props.backLabel ?? "Module"}
                </Button>
            </div>

            <div>
                <h1 class="text-2xl font-bold tracking-tight">
                    {props.title ?? "Create Lesson"}
                </h1>

                <p class="mt-1 text-muted-foreground">
                    {props.descriptionText ??
                        "Add a new lesson to this module."}
                </p>
            </div>

            <div class="max-w-3xl">
                <div class="rounded-xl border border-border bg-card p-6">
                    <div class="mb-6">
                        <h2 class="font-semibold">
                            Lesson Information
                        </h2>

                        <p class="mt-1 text-sm text-muted-foreground">
                            Define the content and format of this lesson.
                        </p>
                    </div>

                    <div class="space-y-5">
                        <TextField>
                            <TextFieldLabel>
                                Lesson Title
                            </TextFieldLabel>

                            <TextFieldInput
                                value={title()}
                                onInput={(event) =>
                                    setTitle(
                                        event.currentTarget.value,
                                    )
                                }
                                placeholder="e.g. What is Forex?"
                            />
                        </TextField>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">
                                Lesson Type
                            </label>

                            <div class="grid gap-2 sm:grid-cols-3">
                                <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Video"
                                        checked={
                                            type() === "Video"
                                        }
                                        onChange={() =>
                                            setType("Video")
                                        }
                                        class="accent-primary"
                                    />

                                    <span class="text-sm font-medium">
                                        Video
                                    </span>
                                </label>

                                <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Article"
                                        checked={
                                            type() === "Article"
                                        }
                                        onChange={() =>
                                            setType("Article")
                                        }
                                        class="accent-primary"
                                    />

                                    <span class="text-sm font-medium">
                                        Article
                                    </span>
                                </label>

                                <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Quiz"
                                        checked={
                                            type() === "Quiz"
                                        }
                                        onChange={() =>
                                            setType("Quiz")
                                        }
                                        class="accent-primary"
                                    />

                                    <span class="text-sm font-medium">
                                        Quiz
                                    </span>
                                </label>
                            </div>
                        </div>

                        <TextField>
                            <TextFieldLabel>
                                Duration
                            </TextFieldLabel>

                            <TextFieldInput
                                value={duration()}
                                onInput={(event) =>
                                    setDuration(
                                        event.currentTarget.value,
                                    )
                                }
                                placeholder="e.g. 15 min"
                            />
                        </TextField>
                    </div>
                </div>
            </div>

            <Show when={error()}>
                <div class="max-w-3xl rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error()}
                </div>
            </Show>

            <div class="flex max-w-3xl items-center justify-end gap-3 border-t border-border pt-6">
                <Button
                    as={A}
                    href={
                        props.backHref ??
                        `/admin/education/${props.courseId}/module/${props.moduleId}`
                    }
                    variant="outline"
                    type="button"
                >
                    Cancel
                </Button>

                <Button type="submit">
                    <Check class="mr-2 size-4" />

                    {props.submitLabel ?? "Create Lesson"}
                </Button>
            </div>
        </form>
    );
}