import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));

export const senderSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Profile",
                url: "/sender/profile",
                component: Profile
            },
        ],
    },
];