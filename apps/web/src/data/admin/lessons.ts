import type { AdminModule } from "~/data/admin/modules";

export type AdminLessonType =
    | "Video"
    | "Article"
    | "Quiz";

export interface AdminLesson {
    id: number;
    moduleId: AdminModule["id"];
    title: string;
    type: AdminLessonType;
    duration: string;
    position: number;
}

export interface CreateAdminLessonInput {
    moduleId: AdminModule["id"];
    title: string;
    type: AdminLessonType;
    duration: string;
}

export interface UpdateAdminLessonInput {
    title?: string;
    type?: AdminLessonType;
    duration?: string;
    position?: number;
}

export const adminLessons: AdminLesson[] = [
    {
        id: 1,
        moduleId: 1,
        title: "What is Forex?",
        type: "Video",
        duration: "12 min",
        position: 1,
    },
    {
        id: 2,
        moduleId: 1,
        title: "Currency Pairs",
        type: "Video",
        duration: "15 min",
        position: 2,
    },
    {
        id: 3,
        moduleId: 1,
        title: "Pips & Points",
        type: "Article",
        duration: "10 min",
        position: 3,
    },
    {
        id: 4,
        moduleId: 1,
        title: "Lots & Position Size",
        type: "Video",
        duration: "18 min",
        position: 4,
    },
    {
        id: 5,
        moduleId: 2,
        title: "Trading Sessions",
        type: "Video",
        duration: "14 min",
        position: 1,
    },
    {
        id: 6,
        moduleId: 2,
        title: "Leverage",
        type: "Article",
        duration: "11 min",
        position: 2,
    },
    {
        id: 7,
        moduleId: 2,
        title: "Spread & Commission",
        type: "Article",
        duration: "13 min",
        position: 3,
    },
    {
        id: 8,
        moduleId: 3,
        title: "Choosing a Trading Account",
        type: "Video",
        duration: "16 min",
        position: 1,
    },
    {
        id: 9,
        moduleId: 3,
        title: "Your First Trade",
        type: "Video",
        duration: "20 min",
        position: 2,
    },
];

export function getAdminLessons(
    moduleId: number,
) {
    return adminLessons
        .filter(
            (lesson) => lesson.moduleId === moduleId,
        )
        .sort(
            (a, b) => a.position - b.position,
        );
}

export function getAdminLesson(id: number) {
    return adminLessons.find(
        (lesson) => lesson.id === id,
    );
}

export function createAdminLesson(
    input: CreateAdminLessonInput,
): AdminLesson {
    const moduleLessons = getAdminLessons(
        input.moduleId,
    );

    const nextId =
        adminLessons.length > 0
            ? Math.max(
                ...adminLessons.map(
                    (lesson) => lesson.id,
                ),
            ) + 1
            : 1;

    const lesson: AdminLesson = {
        id: nextId,
        moduleId: input.moduleId,
        title: input.title.trim(),
        type: input.type,
        duration: input.duration.trim(),
        position: moduleLessons.length + 1,
    };

    adminLessons.push(lesson);

    return lesson;
}

export function updateAdminLesson(
    id: number,
    input: UpdateAdminLessonInput,
) {
    const lesson = getAdminLesson(id);

    if (!lesson) {
        return undefined;
    }

    if (input.title !== undefined) {
        lesson.title = input.title.trim();
    }

    if (input.type !== undefined) {
        lesson.type = input.type;
    }

    if (input.duration !== undefined) {
        lesson.duration =
            input.duration.trim();
    }

    if (input.position !== undefined) {
        lesson.position = input.position;
    }

    return lesson;
}

export function deleteAdminLesson(id: number) {
    const index = adminLessons.findIndex(
        (lesson) => lesson.id === id,
    );

    if (index === -1) {
        return false;
    }

    const [deletedLesson] = adminLessons.splice(
        index,
        1,
    );

    if (!deletedLesson) {
        return false;
    }

    const remainingLessons = getAdminLessons(
        deletedLesson.moduleId,
    );

    remainingLessons.forEach((lesson, index) => {
        lesson.position = index + 1;
    });

    return true;
}