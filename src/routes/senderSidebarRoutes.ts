import CreateParcel from "@/pages/Sender/CreateParcel";
import SenderParcels from "@/pages/Sender/SenderParcels";
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