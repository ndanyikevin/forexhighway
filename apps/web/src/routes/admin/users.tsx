import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import {
    Search,
    UserPlus,
    Users,
} from "lucide-solid";

import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationItems,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";

import {
    TextField,
    TextFieldInput,
} from "~/components/ui/text-field";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import {
    adminUsers,
    type AdminUser,
} from "~/data/admin/users";

import {
    filterAdminUsers,
    getPaginatedItems,
    getUserInitials,
} from "~/lib/admin/users";

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
    const [search, setSearch] = createSignal("");
    const [page, setPage] = createSignal(1);

    const filteredUsers = createMemo(() => {
        return filterAdminUsers(adminUsers, search());
    });

    const totalPages = createMemo(() => {
        return Math.max(
            1,
            Math.ceil(filteredUsers().length / PAGE_SIZE),
        );
    });

    const paginatedUsers = createMemo(() => {
        return getPaginatedItems(
            filteredUsers(),
            page(),
            PAGE_SIZE,
        );
    });

    createEffect(() => {
        const pages = totalPages();

        if (page() > pages) {
            setPage(pages);
        }
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <>
            <Title>Users | Admin | ForexHighway</Title>

            <div class="p-6">
                <div class="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 class="text-2xl font-bold tracking-tight">
                                Users
                            </h1>

                            <p class="text-muted-foreground">
                                Manage traders, investors, and platform
                                users.
                            </p>
                        </div>

                        <Button as={A} href="/admin/users/new">
                            <UserPlus class="mr-2 size-4" />
                            Add User
                        </Button>
                    </div>

                    {/* Summary */}
                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle class="text-sm font-medium">
                                    Total Users
                                </CardTitle>

                                <Users class="size-4 text-muted-foreground" />
                            </CardHeader>

                            <CardContent>
                                <div class="text-2xl font-bold">
                                    {adminUsers.length}
                                </div>

                                <p class="text-xs text-muted-foreground">
                                    Registered platform users
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle class="text-sm font-medium">
                                    Active Users
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div class="text-2xl font-bold">
                                    {
                                        adminUsers.filter(
                                            (user) =>
                                                user.status === "Active",
                                        ).length
                                    }
                                </div>

                                <p class="text-xs text-muted-foreground">
                                    Currently active accounts
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle class="text-sm font-medium">
                                    Investors
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div class="text-2xl font-bold">
                                    {
                                        adminUsers.filter(
                                            (user) =>
                                                user.role === "Investor",
                                        ).length
                                    }
                                </div>

                                <p class="text-xs text-muted-foreground">
                                    Users participating as investors
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Users */}
                    <Card>
                        <CardHeader>
                            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle>All Users</CardTitle>

                                    <CardDescription>
                                        Browse and manage registered users.
                                    </CardDescription>
                                </div>

                                <div class="relative w-full sm:w-64">
                                    <Search class="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

                                    <TextField>
                                        <TextFieldInput
                                            type="search"
                                            placeholder="Search users..."
                                            value={search()}
                                            onInput={(event) =>
                                                handleSearch(
                                                    event.currentTarget.value,
                                                )
                                            }
                                            class="pl-9"
                                        />
                                    </TextField>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <Show
                                when={paginatedUsers().length > 0}
                                fallback={
                                    <div class="flex min-h-40 flex-col items-center justify-center text-center">
                                        <Users class="size-8 text-muted-foreground" />

                                        <h3 class="mt-3 font-medium">
                                            No users found
                                        </h3>

                                        <p class="mt-1 text-sm text-muted-foreground">
                                            Try adjusting your search.
                                        </p>
                                    </div>
                                }
                            >
                                <div class="overflow-x-auto">
                                    <table class="w-full text-sm">
                                        <thead>
                                            <tr class="border-b border-border text-left">
                                                <th class="px-4 py-3 font-medium text-muted-foreground">
                                                    User
                                                </th>

                                                <th class="px-4 py-3 font-medium text-muted-foreground">
                                                    Role
                                                </th>

                                                <th class="px-4 py-3 font-medium text-muted-foreground">
                                                    Status
                                                </th>

                                                <th class="px-4 py-3 text-right font-medium text-muted-foreground">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <For each={paginatedUsers()}>
                                                {(user: AdminUser) => (
                                                    <tr class="border-b border-border last:border-0">
                                                        <td class="px-3 py-2.5">
                                                            <div class="flex items-center gap-2.5">
                                                                <div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                                                                    {getUserInitials(user.name)}
                                                                </div>

                                                                <div class="min-w-0">
                                                                    <p class="truncate text-sm font-medium">
                                                                        {user.name}
                                                                    </p>

                                                                    <p class="truncate text-xs text-muted-foreground">
                                                                        {user.email}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td class="px-3 py-2.5">
                                                            <Badge
                                                                variant={
                                                                    user.role === "Trader"
                                                                        ? "default"
                                                                        : "secondary"
                                                                }
                                                            >
                                                                {user.role}
                                                            </Badge>
                                                        </td>

                                                        <td class="px-3 py-2.5">
                                                            <Badge
                                                                variant={
                                                                    user.status === "Active"
                                                                        ? "outline"
                                                                        : "secondary"
                                                                }
                                                            >
                                                                {user.status}
                                                            </Badge>
                                                        </td>

                                                        <td class="px-3 py-2.5 text-right">
                                                            <Button
                                                                as={A}
                                                                href={`/admin/users/${user.id}`}
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                View
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </For>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div class="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                                    <p class="text-sm text-muted-foreground">
                                        Showing{" "}
                                        <span class="font-medium text-foreground">
                                            {(page() - 1) * PAGE_SIZE + 1}
                                        </span>{" "}
                                        to{" "}
                                        <span class="font-medium text-foreground">
                                            {Math.min(
                                                page() * PAGE_SIZE,
                                                filteredUsers().length,
                                            )}
                                        </span>{" "}
                                        of{" "}
                                        <span class="font-medium text-foreground">
                                            {filteredUsers().length}
                                        </span>{" "}
                                        users
                                    </p>

                                    <Pagination
                                        count={totalPages()}
                                        page={page()}
                                        onPageChange={setPage}
                                        itemComponent={(props) => (
                                            <PaginationItem
                                                page={props.page}
                                            >
                                                {props.page}
                                            </PaginationItem>
                                        )}
                                        ellipsisComponent={() => (
                                            <PaginationEllipsis />
                                        )}
                                    >
                                        <PaginationPrevious />
                                        <PaginationItems />
                                        <PaginationNext />
                                    </Pagination>
                                </div>
                            </Show>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}