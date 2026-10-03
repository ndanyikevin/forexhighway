import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

import {
    TextField,
    TextFieldInput,
    TextFieldLabel,
} from "~/components/ui/text-field";

import { Button } from "~/components/ui/button";
import { showToast, Toaster } from "~/components/ui/toast";

import { apiFetch } from "~/lib/api";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");

    const [error, setError] = createSignal("");
    const [loading, setLoading] = createSignal(false);

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await apiFetch("/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name: name(),
                    email: email(),
                    password: password(),
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const errorMessage =
                    data?.error?.message ||
                    data?.message ||
                    "Registration failed. Please check your credentials.";

                setError(errorMessage);

                showToast({
                    title: "Registration Error",
                    description: errorMessage,
                    variant: "error",
                });

                return;
            }

            showToast({
                title: "Account Created!",
                description: "Your registration was successful. Welcome aboard!",
                variant: "success",
            });

            // Redirect after brief delay for toast visibility
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            console.error("Registration submit error:", err);

            const networkErrorMessage =
                "Unable to connect to the authentication server.";

            setError(networkErrorMessage);

            showToast({
                title: "Connection Failed",
                description: networkErrorMessage,
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
            <Card class="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>          <CardDescription>
                        Start your ForexHighway journey.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        method="post"
                        onSubmit={(event) => {
                            event.preventDefault();
                            void handleSubmit(event);
                        }}
                        class="space-y-5"
                    >
                        <TextField>
                            <TextFieldLabel>Name</TextFieldLabel>
                            <TextFieldInput
                                type="text"
                                value={name()}
                                onInput={(event) =>
                                    setName(event.currentTarget.value)
                                }
                                placeholder="Your name"
                                autocomplete="name"
                                required
                            />
                        </TextField>

                        <TextField>
                            <TextFieldLabel>Email</TextFieldLabel>
                            <TextFieldInput
                                type="email"
                                value={email()}
                                onInput={(event) =>
                                    setEmail(event.currentTarget.value)
                                }
                                placeholder="you@example.com"
                                autocomplete="email"
                                required
                            />
                        </TextField>

                        <TextField>
                            <TextFieldLabel>Password</TextFieldLabel>
                            <TextFieldInput
                                type="password"
                                value={password()}
                                onInput={(event) =>
                                    setPassword(event.currentTarget.value)
                                }
                                placeholder="At least 8 characters"
                                autocomplete="new-password"
                                required
                            />
                        </TextField>

                        {error() && (
                            <p class="text-sm text-destructive">{error()}</p>
                        )}

                        <Button
                            type="submit"
                            class="w-full"
                            disabled={loading()}
                        >
                            {loading() ? "Creating account..." : "Create account"}
                        </Button>

                        <div class="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <A
                                href="/login"
                                class="font-medium text-primary hover:underline"
                            >
                                Sign in
                            </A>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Toaster />
        </main>
    );
}