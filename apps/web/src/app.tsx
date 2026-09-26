
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import PublicLayout from "~/components/layouts/public-layout";

import "@fontsource/inter";
import "./app.css";

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

