import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
const IncomingParcels = lazy(() => import("@/pages/Receiver/IncomingParcels"));
const ReceiverParcels = lazy(() => import("@/pages/Receiver/ReceiverParcels"));

export const receiverSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Profile",
                url: "/receiver/profile",
                component: Profile
            },
            {
                title: "Incoming Parcels",
                url: "/receiver/incoming-parcels",
                component: IncomingParcels
            },
            {
                title: "My Parcels",
                url: "/receiver/receiver-parcels",
                component: ReceiverParcels
            },
        ],
    },
];