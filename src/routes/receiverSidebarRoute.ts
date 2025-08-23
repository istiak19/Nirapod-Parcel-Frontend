import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"))

export const receiverSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Profile",
                url: "/receiver/profile",
                component: Profile
            },
        ],
    },
];