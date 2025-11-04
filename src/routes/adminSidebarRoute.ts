import { lazy } from "react";
import { BarChart3, User, Users, Package, ClipboardList } from "lucide-react";
import type { ISidebarItem } from "@/types";

const Profile = lazy(() => import("@/pages/Profile"));
const ManageUsers = lazy(() => import("@/pages/Admin/ManageUsers"));
const ManageParcels = lazy(() => import("@/pages/Admin/ManageParcels"));
const AdminAnalytics = lazy(() => import("@/pages/Admin/AdminAnalytics"));
const ManageRidersList = lazy(() => import("@/pages/Admin/ManageRidersList"));

export const adminSidebarRoute: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/admin-analytics",
                component: AdminAnalytics,
                icon: BarChart3
            },
            {
                title: "Profile",
                url: "/admin/profile",
                component: Profile,
                icon: User
            },
            {
                title: "Manage Users",
                url: "/admin/manage-users",
                component: ManageUsers,
                icon: Users
            },
            {
                title: "Manage Parcels",
                url: "/admin/manage-parcels",
                component: ManageParcels,
                icon: Package
            },
            {
                title: "Pending Riders List",
                url: "/admin/manage-riders",
                component: ManageRidersList,
                icon: ClipboardList
            },
        ],
    },
];