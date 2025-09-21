import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
const Deliveries = lazy(() => import("@/pages/Rider/Deliveries"));
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
            {
                title: "My Deliveries",
                url: "/rider/deliveries-parcels",
                component: Deliveries
            },
            // {
            //     title: "My Parcels",
            //     url: "/receiver/receiver-parcels",
            //     component: ReceiverParcels
            // },
        ],
    },
];