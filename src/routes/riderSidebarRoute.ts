import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
// const IncomingParcels = lazy(() => import("@/pages/Receiver/IncomingParcels"));
// const ReceiverParcels = lazy(() => import("@/pages/Receiver/ReceiverParcels"));
const ReceiverAnalytics = lazy(() => import("@/pages/Receiver/ReceiverAnalytics"));

export const riderSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Analytics",
                url: "/rider/rider-analytics",
                component: ReceiverAnalytics
            },
            {
                title: "Profile",
                url: "/rider/profile",
                component: Profile
            },
            // {
            //     title: "Incoming Parcels",
            //     url: "/receiver/incoming-parcels",
            //     component: IncomingParcels
            // },
            // {
            //     title: "My Parcels",
            //     url: "/receiver/receiver-parcels",
            //     component: ReceiverParcels
            // },
        ],
    },
];