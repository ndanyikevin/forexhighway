
export type AdminUserRole = "Trader" | "Investor";

export type AdminUserStatus = "Active" | "Pending";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: AdminUserRole;
    status: AdminUserStatus;
}

const firstNames = [
    "John",
    "Mary",
    "Peter",
    "Grace",
    "Daniel",
    "Faith",
    "Brian",
    "Mercy",
    "Samuel",
    "Esther",
    "David",
    "Ruth",
    "James",
    "Joy",
    "Kevin",
];

const lastNames = [
    "Kamau",
    "Wanjiku",
    "Mwangi",
    "Njeri",
    "Otieno",
    "Achieng",
    "Kiptoo",
    "Chebet",
    "Mutua",
    "Kariuki",
    "Omondi",
    "Nyambura",
    "Maina",
    "Kipchoge",
    "Muthoni",
];

export const adminUsers: AdminUser[] = Array.from(
    { length: 75 },
    (_, index) => {
        const firstName = firstNames[index % firstNames.length];
        const lastName =
            lastNames[Math.floor(index / firstNames.length)];

        const role: AdminUserRole =
            index % 3 === 0 ? "Investor" : "Trader";

        const status: AdminUserStatus =
            index % 7 === 0 ? "Pending" : "Active";

        return {
            id: `USR - ${ String(index + 1).padStart(3, "0") } `,
            name: `${ firstName } ${ lastName } `,
            email: `${ firstName.toLowerCase() }.${ lastName.toLowerCase() }${ index + 1 } @forexhighway.com`,
            role,
            status,
        };
    },
);

