import type { AdminCourse } from "~/data/admin/courses";

export interface AdminModule {
    id: number;
    courseId: AdminCourse["id"];
    title: string;
    description: string;
    position: number;
}

export interface CreateAdminModuleInput {
    courseId: AdminCourse["id"];
    title: string;
    description?: string;
}

export interface UpdateAdminModuleInput {
    title?: string;
    description?: string;
    position?: number;
}

export const adminModules: AdminModule[] = [
    {
        id: 1,
        courseId: 1,
        title: "Forex Foundations",
        description:
            "The fundamental concepts every new forex trader should understand.",
        position: 1,
    },
    {
        id: 2,
        courseId: 1,
        title: "Market Basics",
        description:
            "Understand how the forex market operates and how trades are executed.",
        position: 2,
    },
    {
        id: 3,
        courseId: 1,
        title: "Getting Started",
        description:
            "Prepare for your first real trading experience.",
        position: 3,
    },
];

export function getAdminModules(courseId: number) {
    return adminModules
        .filter((module) => module.courseId === courseId)
        .sort((a, b) => a.position - b.position);
}

export function getAdminModule(id: number) {
    return adminModules.find(
        (module) => module.id === id,
    );
}

export function createAdminModule(
    input: CreateAdminModuleInput,
): AdminModule {
    const courseModules = getAdminModules(
        input.courseId,
    );

    const nextId =
        adminModules.length > 0
            ? Math.max(
                ...adminModules.map(
                    (module) => module.id,
                ),
            ) + 1
            : 1;

    const module: AdminModule = {
        id: nextId,
        courseId: input.courseId,
        title: input.title.trim(),
        description: input.description?.trim() ?? "",
        position: courseModules.length + 1,
    };

    adminModules.push(module);

    return module;
}

export function updateAdminModule(
    id: number,
    input: UpdateAdminModuleInput,
) {
    const module = getAdminModule(id);

    if (!module) {
        return undefined;
    }

    if (input.title !== undefined) {
        module.title = input.title.trim();
    }

    if (input.description !== undefined) {
        module.description =
            input.description.trim();
    }

    if (input.position !== undefined) {
        module.position = input.position;
    }

    return module;
}

export function deleteAdminModule(id: number) {
    const index = adminModules.findIndex(
        (module) => module.id === id,
    );

    if (index === -1) {
        return false;
    }

    const [deletedModule] = adminModules.splice(
        index,
        1,
    );

    if (!deletedModule) {
        return false;
    }

    const remainingModules = getAdminModules(
        deletedModule.courseId,
    );

    remainingModules.forEach((module, index) => {
        module.position = index + 1;
    });

    return true;
}