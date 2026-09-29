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
    TextFieldTextArea,
} from "~/components/ui/text-field";

import { Button } from "~/components/ui/button";

import type {
    AdminCourseStatus,
    CreateAdminCourseInput,
} from "~/data/admin/courses";

interface CourseFormProps {
    initialValues?: Partial<CreateAdminCourseInput>;

    title?: string;
    descriptionText?: string;
    submitLabel?: string;

    backHref?: string;
    backLabel?: string;

    onSubmit: (
        values: CreateAdminCourseInput,
    ) => void;
}

export default function CourseForm(props: CourseFormProps) {
    const [title, setTitle] = createSignal(
        props.initialValues?.title ?? "",
    );

    const [description, setDescription] = createSignal(
        props.initialValues?.description ?? "",
    );

    const [instructor, setInstructor] = createSignal(
        props.initialValues?.instructor ??
        "ForexHighway Academy",
    );

    const [status, setStatus] =
        createSignal<AdminCourseStatus>(
            props.initialValues?.status ?? "Draft",
        );

    const [error, setError] = createSignal("");

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const values: CreateAdminCourseInput = {
            title: title().trim(),
            description: description().trim(),
            instructor: instructor().trim(),
            status: status(),
        };

        if (!values.title) {
            setError("Course title is required.");
            return;
        }

        if (!values.description) {
            setError("Course description is required.");
            return;
        }

        if (!values.instructor) {
            setError("Instructor is required.");
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
                    href={props.backHref ?? "/admin/education"}
                    variant="ghost"
                    size="sm"
                    type="button"
                    class="-ml-2"
                >
                    <ArrowLeft class="mr-2 size-4" />

                    {props.backLabel ?? "Education"}
                </Button>
            </div>

            <div>
                <h1 class="text-2xl font-bold tracking-tight">
                    {props.title ?? "Create Course"}
                </h1>

                <p class="mt-1 text-muted-foreground">
                    {props.descriptionText ??
                        "Create a new course for the ForexHighway Academy."}
                </p>
            </div>

            <div class="grid gap-6 lg:grid-cols-[1fr_280px]">
                <div class="space-y-6">
                    <div class="rounded-xl border border-border bg-card p-6">
                        <div class="mb-6">
                            <h2 class="font-semibold">
                                Course Information
                            </h2>

                            <p class="mt-1 text-sm text-muted-foreground">
                                Basic information about the course.
                            </p>
                        </div>

                        <div class="space-y-5">
                            <TextField>
                                <TextFieldLabel>
                                    Course Title
                                </TextFieldLabel>

                                <TextFieldInput
                                    value={title()}
                                    onInput={(event) =>
                                        setTitle(
                                            event.currentTarget.value,
                                        )
                                    }
                                    placeholder="e.g. Forex Fundamentals"
                                />
                            </TextField>

                            <TextField>
                                <TextFieldLabel>
                                    Description
                                </TextFieldLabel>

                                <TextFieldTextArea
                                    value={description()}
                                    onInput={(event) =>
                                        setDescription(
                                            event.currentTarget.value,
                                        )
                                    }
                                    placeholder="Describe what students will learn..."
                                    class="min-h-32 resize-none"
                                />
                            </TextField>

                            <TextField>
                                <TextFieldLabel>
                                    Instructor
                                </TextFieldLabel>

                                <TextFieldInput
                                    value={instructor()}
                                    onInput={(event) =>
                                        setInstructor(
                                            event.currentTarget.value,
                                        )
                                    }
                                    placeholder="Course instructor"
                                />
                            </TextField>
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="rounded-xl border border-border bg-card p-6">
                        <div class="mb-5">
                            <h2 class="font-semibold">
                                Publishing
                            </h2>

                            <p class="mt-1 text-sm text-muted-foreground">
                                Choose how this course should appear.
                            </p>
                        </div>

                        <div class="space-y-2">
                            <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Draft"
                                    checked={status() === "Draft"}
                                    onChange={() =>
                                        setStatus("Draft")
                                    }
                                    class="mt-1 accent-primary"
                                />

                                <div>
                                    <p class="text-sm font-medium">
                                        Draft
                                    </p>

                                    <p class="text-xs text-muted-foreground">
                                        Keep the course private while
                                        building it.
                                    </p>
                                </div>
                            </label>

                            <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Published"
                                    checked={status() === "Published"}
                                    onChange={() =>
                                        setStatus("Published")
                                    }
                                    class="mt-1 accent-primary"
                                />

                                <div>
                                    <p class="text-sm font-medium">
                                        Published
                                    </p>

                                    <p class="text-xs text-muted-foreground">
                                        Make the course available to
                                        students.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <Show when={error()}>
                <div class="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error()}
                </div>
            </Show>

            <div class="flex items-center justify-end gap-3 border-t border-border pt-6">
                <Button
                    as={A}
                    href={props.backHref ?? "/admin/education"}
                    variant="outline"
                    type="button"
                >
                    Cancel
                </Button>

                <Button type="submit">
                    <Check class="mr-2 size-4" />

                    {props.submitLabel ?? "Create Course"}
                </Button>
            </div>
        </form>
    );
}