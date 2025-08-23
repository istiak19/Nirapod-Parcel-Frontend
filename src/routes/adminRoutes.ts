import Contact from "@/pages/Contact";
// import UpdateProfile from "@/pages/updateProfile";
import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
// const AddTour = lazy(() => import("@/pages/Admin/AddTour"));
// const AddTourType = lazy(() => import("@/pages/Admin/AddTourType"));

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
            // {
            //     title: "Add Tour Type",
            //     url: "/admin/add-tour-type",
            //     component: AddTourType,
            // },
        ],
    },
];