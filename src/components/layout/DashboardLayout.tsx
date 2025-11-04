import { AppSidebar } from "@/components/app-sidebar"
// import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import Footer from "./Footer/Footer"
import { SiteHeader } from "../site-header"

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    )
};