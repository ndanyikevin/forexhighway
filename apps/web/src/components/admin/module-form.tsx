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

import type { CreateAdminModuleInput } from "~/data/admin/modules";

interface ModuleFormProps {
    courseId: number;
    onSubmit: (
        values: CreateAdminModuleInput,
    ) => void;
}

export default function ModuleForm(
    props: ModuleFormProps,
) {
    const [title, setTitle] = createSignal("");
    const [description, setDescription] =
        createSignal("");

    const [error, setError] =
        createSignal("");

    function handleSubmit(
        event: SubmitEvent,
    ) {
        event.preventDefault();

        const values: CreateAdminModuleInput = {
            courseId: props.courseId,
            title: title().trim(),
            description: description().trim(),
        };

        if (!values.title) {
            setError("Module title is required.");
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
                    href={`/admin/education/${props.courseId}`}
                    variant="ghost"
                    size="sm"
                    type="button"
                    class="-ml-2"
                >
                    <ArrowLeft class="mr-2 size-4" />
                    Course
                </Button>
            </div>

            <div>
                <h1 class="text-2xl font-bold tracking-tight">
                    Add Module
                </h1>

                <p class="mt-1 text-muted-foreground">
                    Add a new module to this course.
                </p>
            </div>

            <div class="rounded-xl border border-border bg-card p-6">
                <div class="mb-6">
                    <h2 class="font-semibold">
                        Module Information
                    </h2>

                    <p class="mt-1 text-sm text-muted-foreground">
                        Define the section students will
                        work through.
                    </p>
                </div>

                <div class="space-y-5">
                    <TextField>
                        <TextFieldLabel>
                            Module Title
                        </TextFieldLabel>

                        <TextFieldInput
                            value={title()}
                            onInput={(event) =>
                                setTitle(
                                    event.currentTarget.value,
                                )
                            }
                            placeholder="e.g. Forex Foundations"
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
                            placeholder="Describe what students will learn in this module..."
                            class="min-h-32 resize-none"
                        />
                    </TextField>
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
                    href={`/admin/education/${props.courseId}`}
                    variant="outline"
                    type="button"
                >
                    Cancel
                </Button>

                <Button type="submit">
                    <Check class="mr-2 size-4" />
                    Add Module
                </Button>
            </div>
        </form>
    );
}