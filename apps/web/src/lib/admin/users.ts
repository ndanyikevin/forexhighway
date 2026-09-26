import type { AdminUser } from "~/data/admin/users";

export function filterAdminUsers(
    users: AdminUser[],
    query: string,
) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return users;
    }

    return users.filter((user) => {
        return (
            user.name.toLowerCase().includes(normalizedQuery) ||
            user.email.toLowerCase().includes(normalizedQuery) ||
            user.role.toLowerCase().includes(normalizedQuery) ||
            user.status.toLowerCase().includes(normalizedQuery)
        );
    });
}

export function getUserInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

export function getPaginatedItems<T>(
    items: T[],
    page: number,
    pageSize: number,
) {
    const start = (page - 1) * pageSize;

    return items.slice(start, start + pageSize);
}

