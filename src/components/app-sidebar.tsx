import * as React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { getSideBar } from "@/utils/getSideBar";
import { useGetMeUserQuery } from "@/redux/features/user/user.api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: userData } = useGetMeUserQuery(undefined);
    const data = {
        navMain: getSideBar(userData?.data?.role),
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader className="pl-5">
                <Link to="/" className="flex items-center gap-2 text-red-500 hover:text-red-500 transition">
                    <Logo />
                    <span className="text-lg font-semibold tracking-wide">
                        Nirapod-Parcel
                    </span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>{item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
};