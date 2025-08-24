import { lazy } from "react";

const Profile = lazy(() => import("@/pages/Profile"));
const IncomingParcels = lazy(() => import("@/pages/Receiver/IncomingParcels"));
const DeliveryHistory = lazy(() => import("@/pages/Receiver/DeliveryHistory"));
const DeliveryStatus = lazy(() => import("@/pages/Receiver/DeliveryStatus"));

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
                title: " Delivery Status",
                url: "/receiver/delivery-status",
                component: DeliveryStatus
            },
            {
                title: "Delivery History",
                url: "/receiver/delivery-history",
                component: DeliveryHistory
            },
        ],
    },
];