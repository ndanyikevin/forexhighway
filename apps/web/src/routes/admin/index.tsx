import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import {
    ArrowRight,
    BookOpen,
    ChartNoAxesCombined,
    CircleDollarSign,
    Users,
} from "lucide-solid";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { adminActivity } from "~/data/admin/activity";
import { adminAccounts } from "~/data/admin/accounts";
import { adminCourses } from "~/data/admin/courses";
import { adminInvestments } from "~/data/admin/investments";
import { adminUsers } from "~/data/admin/users";

export default function AdminHome() {
    const activeUsers = adminUsers.filter(
        (user) => user.status === "Active",
    ).length;

    const publishedCourses = adminCourses.filter(
        (course) => course.status === "Published",
    ).length;

    const activeAccounts = adminAccounts.filter(
        (account) => account.status === "Active",
    ).length;

    const activeInvestments = adminInvestments.filter(
        (investment) => investment.status === "Active",
    ).length;

    return (
        <>
            <Title>Admin Dashboard | ForexHighway</Title>

            <div class="p-6">
                <div class="mx-auto max-w-7xl space-y-8">
                    {/* Header */}
                    <div>
                        <p class="text-sm font-medium text-primary">
                            Administration
                        </p>

                        <h1 class="mt-1 text-2xl font-bold tracking-tight">
                            Overview
                        </h1>

                        <p class="mt-1 text-muted-foreground">
                            Monitor and manage the ForexHighway platform.
                        </p>
                    </div>

                    {/* Summary */}
                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardContent class="p-5">
                                <div class="flex items-center justify-between">
                                    <p class="text-sm text-muted-foreground">
                                        Active Users
                                    </p>

                                    <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Users class="size-4" />
                                    </div>
                                </div>

                                <p class="mt-4 text-2xl font-bold">
                                    {activeUsers}
                                </p>

                                <p class="mt-1 text-xs text-muted-foreground">
                                    Registered platform users
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent class="p-5">
                                <div class="flex items-center justify-between">
                                    <p class="text-sm text-muted-foreground">
                                        Courses
                                    </p>

                                    <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <BookOpen class="size-4" />
                                    </div>
                                </div>

                                <p class="mt-4 text-2xl font-bold">
                                    {publishedCourses}
                                </p>

                                <p class="mt-1 text-xs text-muted-foreground">
                                    Published courses
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent class="p-5">
                                <div class="flex items-center justify-between">
                                    <p class="text-sm text-muted-foreground">
                                        Trading Accounts
                                    </p>

                                    <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <ChartNoAxesCombined class="size-4" />
                                    </div>
                                </div>

                                <p class="mt-4 text-2xl font-bold">
                                    {activeAccounts}
                                </p>

                                <p class="mt-1 text-xs text-muted-foreground">
                                    Active accounts
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent class="p-5">
                                <div class="flex items-center justify-between">
                                    <p class="text-sm text-muted-foreground">
                                        Investments
                                    </p>

                                    <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <CircleDollarSign class="size-4" />
                                    </div>
                                </div>

                                <p class="mt-4 text-2xl font-bold">
                                    {activeInvestments}
                                </p>

                                <p class="mt-1 text-xs text-muted-foreground">
                                    Active investments
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Activity + Users */}
                    <div class="grid gap-6 lg:grid-cols-5">
                        <Card class="lg:col-span-3">
                            <CardHeader class="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>
                                        Recent Activity
                                    </CardTitle>

                                    <p class="mt-1 text-sm text-muted-foreground">
                                        Latest platform events.
                                    </p>
                                </div>

                                <A
                                    href="/admin/activity"
                                    class="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    View all
                                    <ArrowRight class="ml-1 size-4" />
                                </A>
                            </CardHeader>

                            <CardContent class="space-y-1">
                                {adminActivity.map((activity) => (
                                    <div class="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-muted/50">
                                        <div class="min-w-0">
                                            <p class="truncate text-sm font-medium">
                                                {activity.description}
                                            </p>

                                            <p class="mt-1 text-xs text-muted-foreground">
                                                {activity.user}
                                            </p>
                                        </div>

                                        <span class="ml-4 shrink-0 text-xs text-muted-foreground">
                                            {activity.time}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card class="lg:col-span-2">
                            <CardHeader class="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>
                                        Recent Users
                                    </CardTitle>

                                    <p class="mt-1 text-sm text-muted-foreground">
                                        Latest registered users.
                                    </p>
                                </div>

                                <A
                                    href="/admin/users"
                                    class="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    View all
                                </A>
                            </CardHeader>

                            <CardContent class="space-y-4">
                                {adminUsers.slice(0, 4).map((user) => (
                                    <div class="flex items-center gap-3">
                                        <div class="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                            {user.name
                                                .split(" ")
                                                .map((part) => part[0])
                                                .join("")}
                                        </div>

                                        <div class="min-w-0 flex-1">
                                            <p class="truncate text-sm font-medium">
                                                {user.name}
                                            </p>

                                            <p class="truncate text-xs text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>

                                        <Badge
                                            variant={
                                                user.status === "Active"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {user.status}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}