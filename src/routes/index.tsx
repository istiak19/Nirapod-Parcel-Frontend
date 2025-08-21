import App from "@/App";
import About from "@/pages/About";
import Home from "@/pages/Home";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const Contact = lazy(() => import("@/pages/Contact"));

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
    }
]);

export default router;