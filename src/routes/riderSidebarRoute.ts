import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
const Deliveries = lazy(() => import("@/pages/Rider/Deliveries"));
// const ReceiverParcels = lazy(() => import("@/pages/Receiver/ReceiverParcels"));
const RiderAnalytics = lazy(() => import("@/pages/Rider/RiderAnalytics"));

export const riderSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Analytics",
                url: "/rider/rider-analytics",
                component: RiderAnalytics
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