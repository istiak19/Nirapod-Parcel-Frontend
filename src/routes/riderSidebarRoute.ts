import { lazy } from "react";
import { BarChart3, User, Truck } from "lucide-react";

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
                component: RiderAnalytics,
                icon: BarChart3,
            },
            {
                title: "Profile",
                url: "/rider/profile",
                component: Profile,
                icon: User,
            },
            {
                title: "My Deliveries",
                url: "/rider/deliveries-parcels",
                component: Deliveries,
                icon: Truck,
            },
            // Uncomment if needed in the future
            // {
            //   title: "My Parcels",
            //   url: "/receiver/receiver-parcels",
            //   component: ReceiverParcels,
            //   icon: Package,
            // },
        ],
    },
];