import { MetaProvider, Title } from "@solidjs/meta";
import { Router, A } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <nav class="flex items-center gap-4 p-4 border-b border-border bg-background">
            <A
              href="/"
              end
              class="text-sm font-medium transition-colors hover:text-primary"
              activeClass="text-primary font-semibold"
            >
              Index
            </A>
            <A
              href="/about"
              class="text-sm font-medium transition-colors hover:text-primary"
              activeClass="text-primary font-semibold"
            >
              About
            </A>
            <A
              href="/test"
              class="text-sm font-medium transition-colors hover:text-primary"
              activeClass="text-primary font-semibold"
            >
              Test
            </A>
          </nav>
          <main>
            <Suspense>{props.children}</Suspense>
          </main>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}