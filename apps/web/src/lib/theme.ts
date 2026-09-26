
const STORAGE_KEY = "forexhighway-theme";

export type Theme = "light" | "dark";

/**
 * Get the current theme.
 *
 * Dark is the default theme for ForexHighway.
 * If the user has previously selected a theme,
 * their preference is restored from localStorage.
 */
export function getTheme(): Theme {
    if (typeof window === "undefined") {
        return "dark";
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
        return stored;
    }

    return "dark";
}

/**
 * Apply a theme to the document.
 */
export function setTheme(theme: Theme) {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");

    root.setAttribute("data-kb-theme", theme);

    localStorage.setItem(STORAGE_KEY, theme);
}

/**
 * Toggle between light and dark themes.
 */
export function toggleTheme() {
    const nextTheme = getTheme() === "dark"
        ? "light"
        : "dark";

    setTheme(nextTheme);
}

