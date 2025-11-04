import { lazy } from "react";
import { BarChart3, User, Package, PlusSquare } from "lucide-react";

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
                component: SenderAnalytics,
                icon: BarChart3,
            },
            {
                title: "Profile",
                url: "/sender/profile",
                component: Profile,
                icon: User,
            },
            {
                title: "My Parcels",
                url: "/sender/parcels",
                component: SenderParcels,
                icon: Package,
            },
            {
                title: "Create Parcel",
                url: "/sender/create-parcel",
                component: CreateParcel,
                icon: PlusSquare,
            },
        ],
    },
];