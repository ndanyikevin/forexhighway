
export type AdminCourseStatus =
    | "Published"
    | "Draft"
    | "Archived";

export interface AdminCourse {
    id: number;
    title: string;
    description: string;
    instructor: string;
    status: AdminCourseStatus;
    students: number;
    lessons: number;
    updatedAt: string;
}

export interface CreateAdminCourseInput {
    title: string;
    description: string;
    instructor: string;
    status: AdminCourseStatus;
}

export interface UpdateAdminCourseInput {
    title?: string;
    description?: string;
    instructor?: string;
    status?: AdminCourseStatus;
}

export const adminCourses: AdminCourse[] = [
    {
        id: 1,
        title: "Forex Fundamentals",
        description:
            "Learn the foundations of forex markets, currency pairs, pips, lots, and leverage.",
        instructor: "ForexHighway Academy",
        status: "Published",
        students: 84,
        lessons: 18,
        updatedAt: "2 days ago",
    },
    {
        id: 2,
        title: "Technical Analysis",
        description:
            "Understand market structure, price action, support, resistance, and technical setups.",
        instructor: "ForexHighway Academy",
        status: "Published",
        students: 61,
        lessons: 24,
        updatedAt: "5 days ago",
    },
    {
        id: 3,
        title: "Risk Management",
        description:
            "Build disciplined risk management habits and learn how to protect trading capital.",
        instructor: "ForexHighway Academy",
        status: "Draft",
        students: 0,
        lessons: 12,
        updatedAt: "1 day ago",
    },
    {
        id: 4,
        title: "Trading Psychology",
        description:
            "Develop the mindset and discipline required for consistent trading.",
        instructor: "ForexHighway Academy",
        status: "Published",
        students: 47,
        lessons: 15,
        updatedAt: "1 week ago",
    },
    {
        id: 5,
        title: "Market Structure",
        description:
            "Learn how to read market structure and identify meaningful price movements.",
        instructor: "ForexHighway Academy",
        status: "Published",
        students: 39,
        lessons: 16,
        updatedAt: "1 week ago",
    },
    {
        id: 6,
        title: "Liquidity & Price Action",
        description:
            "Explore liquidity, sweeps, displacement, and price-action based trading concepts.",
        instructor: "ForexHighway Academy",
        status: "Draft",
        students: 0,
        lessons: 20,
        updatedAt: "3 days ago",
    },
    {
        id: 7,
        title: "Trading Journal Mastery",
        description:
            "Learn how to document, review, and improve your trading performance.",
        instructor: "ForexHighway Academy",
        status: "Published",
        students: 31,
        lessons: 10,
        updatedAt: "2 weeks ago",
    },
    {
        id: 8,
        title: "Advanced Risk Management",
        description:
            "Go deeper into position sizing, drawdown management, and portfolio risk.",
        instructor: "ForexHighway Academy",
        status: "Archived",
        students: 22,
        lessons: 14,
        updatedAt: "1 month ago",
    },
];

export function getAdminCourses() {
    return adminCourses;
}

export function getAdminCourse(id: number) {
    return adminCourses.find(
        (course) => course.id === id,
    );
}

export function createAdminCourse(
    input: CreateAdminCourseInput,
): AdminCourse {
    const nextId =
        adminCourses.length > 0
            ? Math.max(
                  ...adminCourses.map(
                      (course) => course.id,
                  ),
              ) + 1
            : 1;

    const course: AdminCourse = {
        id: nextId,
        title: input.title.trim(),
        description: input.description.trim(),
        instructor: input.instructor.trim(),
        status: input.status,
        students: 0,
        lessons: 0,
        updatedAt: "Just now",
    };

    adminCourses.push(course);

    return course;
}

export function updateAdminCourse(
    id: number,
    input: UpdateAdminCourseInput,
) {
    const course = getAdminCourse(id);

    if (!course) {
        return undefined;
    }

    if (input.title !== undefined) {
        course.title = input.title.trim();
    }

    if (input.description !== undefined) {
        course.description = input.description.trim();
    }

    if (input.instructor !== undefined) {
        course.instructor = input.instructor.trim();
    }

    if (input.status !== undefined) {
        course.status = input.status;
    }

    course.updatedAt = "Just now";

    return course;
}

export function deleteAdminCourse(id: number) {
    const index = adminCourses.findIndex(
        (course) => course.id === id,
    );

    if (index === -1) {
        return false;
    }

    adminCourses.splice(index, 1);

    return true;
}

