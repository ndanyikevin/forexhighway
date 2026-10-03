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

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");

    const [error, setError] = createSignal("");
    const [loading, setLoading] = createSignal(false);

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: email(),
                    password: password(),
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const errorMessage =
                    data?.error?.message ||
                    data?.message ||
                    "Invalid email or password.";

                setError(errorMessage);

                showToast({
                    title: "Sign in Failed",
                    description: errorMessage,
                    variant: "error",
                });

                return;
            }

            showToast({
                title: "Welcome back!",
                description: "You have successfully signed in.",
                variant: "success",
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (err) {
            console.error("Login submit error:", err);

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
                    <CardTitle>Sign in to your account</CardTitle>
                    <CardDescription>
                        Enter your credentials to access ForexHighway.
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
                            <div class="flex items-center justify-between">
                                <TextFieldLabel>Password</TextFieldLabel>
                                <A
                                    href="/forgot-password"
                                    class="text-xs text-muted-foreground hover:text-primary hover:underline"
                                >
                                    Forgot password?
                                </A>
                            </div>
                            <TextFieldInput
                                type="password"
                                value={password()}
                                onInput={(event) =>
                                    setPassword(event.currentTarget.value)
                                }
                                placeholder="••••••••"
                                autocomplete="current-password"
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
                            {loading() ? "Signing in..." : "Sign in"}
                        </Button>

                        <div class="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <A
                                href="/register"
                                class="font-medium text-primary hover:underline"
                            >
                                Create account
                            </A>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Toaster />
        </main>
    );
}