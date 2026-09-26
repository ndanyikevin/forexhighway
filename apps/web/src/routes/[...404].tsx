import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { ArrowLeft, Home } from "lucide-solid";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Title>Page Not Found | ForexHighway</Title>
      <HttpStatusCode code={404} />

      <main class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div class="mx-auto max-w-xl text-center">
          <div class="mb-6 text-8xl font-bold tracking-tighter text-primary/20 sm:text-9xl">
            404
          </div>

          <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
            Looks like you took a wrong turn.
          </h1>

          <p class="mx-auto mt-4 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or may have
            been moved. Let's get you back on the right path.
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <Button as={A} href="/">
              <Home class="mr-2 size-4" />
              Back Home
            </Button>

            <Button
              as={A}
              href="/about"
              variant="outline"
            >
              Learn About ForexHighway
              <ArrowLeft class="ml-2 size-4" />
            </Button>
          </div>

          <p class="mt-10 text-sm text-muted-foreground">
            Error code: 404
          </p>
        </div>
      </main>
    </>
  );
}