import Contact from "@/pages/Contact";
import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
const ManageUsers = lazy(() => import("@/pages/Admin/ManageUsers"));
const ManageParcels = lazy(() => import("@/pages/Admin/ManageParcels"));

export const adminSidebarRoute = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Contact,
            },
            {
                title: "Profile",
                url: "/admin/profile",
                component: Profile,
            },
            {
                title: "Manage Users",
                url: "/admin/manage-users",
                component: ManageUsers,
            },
            {
                title: "Manage Parcels",
                url: "/admin/manage-parcels",
                component: ManageParcels,
            },
        ],
    },
];