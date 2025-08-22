import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import Home from "@/pages/Home";
import type { IRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarRoute } from "./adminRoutes";
import { generateRoutes } from "@/utils/generatingRoute";
import { senderSidebarRoute } from "./senderSidebarRoutes";
import { receiverSidebarRoute } from "./receiverSidebarRoute";

const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Verify = lazy(() => import("@/pages/Verify"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const TrackingPage = lazy(() => import("@/pages/TrackingPage"));

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/about",
                Component: About
            },
            {
                path: "/contact",
                Component: Contact
            },
            {
                path: "/track",
                Component: TrackingPage
            },
        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.admin as IRole),
        children: [
            {
                index: true, element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(adminSidebarRoute)
        ]
    },
    {
        path: "/sender",
        Component: withAuth(DashboardLayout, role.admin as IRole),
        children: [
            {
                index: true, element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(senderSidebarRoute)
        ]
    },
    {
        path: "/receiver",
        Component: withAuth(DashboardLayout, role.admin as IRole),
        children: [
            {
                index: true, element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(receiverSidebarRoute)
        ]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: "/verify",
        Component: Verify
    },
    {
        path: "/unauthorized",
        Component: Unauthorized
    },
    {
        path: "*",
        Component: NotFound
    },
]);

export default router;