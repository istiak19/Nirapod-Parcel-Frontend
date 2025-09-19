import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
const ManageUsers = lazy(() => import("@/pages/Admin/ManageUsers"));
const ManageParcels = lazy(() => import("@/pages/Admin/ManageParcels"));
const AdminAnalytics = lazy(() => import("@/pages/Admin/AdminAnalytics"));
const ManageRidersList = lazy(() => import("@/pages/Admin/ManageRidersList"));

export const adminSidebarRoute = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/admin-analytics",
                component: AdminAnalytics,
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
            {
                title: "Pending Riders List",
                url: "/admin/manage-riders",
                component: ManageRidersList,
            },
        ],
    },
];