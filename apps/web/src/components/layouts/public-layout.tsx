import type { ParentComponent } from "solid-js";

import Navbar from "~/components/navbar";

const PublicLayout: ParentComponent = (props) => {
    return (
        <div class="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />

            <main class="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
                {props.children}
            </main>

            <footer class="mt-auto border-t border-border">
                <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
                    <p class="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} ForexHighway
                    </p>

                    <p class="text-sm text-muted-foreground">
                        Learn. Practice. Trade. Grow.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;