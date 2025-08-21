import App from "@/App";
import Home from "@/pages/Home";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const Login = lazy(() => import("@/pages/Auth/Login"));

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
        ]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    }
]);

export default router;