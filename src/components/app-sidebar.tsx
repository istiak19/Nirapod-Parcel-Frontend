import * as React from "react";
import { NavLink, useLocation } from "react-router";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { getSideBar } from "@/utils/getSideBar";
import { useGetMeUserQuery } from "@/redux/features/user/user.api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: userData } = useGetMeUserQuery(undefined);
    const location = useLocation();
    const data = {
        navMain: getSideBar(userData?.data?.role),
    };

    const isActiveRoute = (url: string) => {
        return location.pathname === url;
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader className="pl-5">
                <NavLink to="/" className="flex items-center gap-2 text-red-500 hover:text-red-500 transition">
                    <Logo />
                    <span className="text-lg font-semibold tracking-wide">
                        Nirapod-Parcel
                    </span>
                </NavLink>
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((section) => (
                    <SidebarGroup key={section.title}>
                        <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <NavLink
                                                to={item.url}
                                                className={`block w-full px-3 py-2 rounded-md transition-colors duration-200 ease-in-out ${isActiveRoute(item.url)
                                                    ? "text-red-500 font-semibold bg-red-100 dark:bg-red-900/30"
                                                    : "text-foreground hover:text-foreground hover:bg-gray-700 dark:hover:bg-gray-700/50"
                                                    }`}
                                            >
                                                {item.title}
                                            </NavLink>
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
    );
};