import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
const SenderParcels = lazy(() => import("@/pages/Sender/SenderParcels"));
const CreateParcel = lazy(() => import("@/pages/Sender/CreateParcel"));
const SenderAnalytics = lazy(() => import("@/pages/Sender/SenderAnalytics"));

export const senderSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Analytics",
                url: "/sender/sender-analytics",
                component: SenderAnalytics
            },
            {
                title: "Profile",
                url: "/sender/profile",
                component: Profile
            },
            {
                title: "My Parcels",
                url: "/sender/parcels",
                component: SenderParcels
            },
            {
                title: "Create Parcel",
                url: "/sender/create-parcel",
                component: CreateParcel
            },
        ],
    },
];