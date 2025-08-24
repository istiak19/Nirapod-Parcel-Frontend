import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
const SenderParcels = lazy(() => import("@/pages/Sender/SenderParcels"));
const CreateParcel = lazy(() => import("@/pages/Sender/CreateParcel"));

export const senderSidebarRoute = [
    {
        title: "DashBoard",
        items: [
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