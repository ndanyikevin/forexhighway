
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Toaster } from "~/components/ui/sonner";


import "@fontsource/inter";
import "./dark.css";

const themeScript = `
    (function () {
        try {
            var theme = localStorage.getItem("forexhighway-theme") || "dark";
            var root = document.documentElement;

            root.classList.toggle("dark", theme === "dark");
            root.setAttribute("data-kb-theme", theme);
        } catch (e) { }
    })();
`;

export default function App() {
    return (
        <Router
            root={(props) => (
                <MetaProvider>
                    <Title>ForexHighway</Title>

                    <script innerHTML={themeScript} />

                        <Toaster />
                        <Suspense>
                            {props.children}
                        </Suspense>
                    
                </MetaProvider>
            )}
        >
            <FileRoutes />
        </Router>
    );
}

