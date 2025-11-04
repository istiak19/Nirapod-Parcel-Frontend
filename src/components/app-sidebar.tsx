"use client";

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
    SidebarRail,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import Logo from "@/assets/icons/Logo";
import { getSideBar } from "@/utils/getSideBar";
import { useGetMeUserQuery } from "@/redux/features/user/user.api";
import type { LucideIcon } from "lucide-react";
import type { ISidebarItem, ISidebarRoute } from "@/types";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: userData } = useGetMeUserQuery(undefined);
    const location = useLocation();

    const navSections: ISidebarItem[] = getSideBar(userData?.data?.role);

    const isActiveRoute = (url: string) => location.pathname === url;

    return (
        <Sidebar {...props}>
            {/* Header */}
            <SidebarHeader className="pl-5">
                <NavLink
                    to="/"
                    className="flex items-center gap-2 text-red-500 hover:text-red-500 transition"
                >
                    <Logo />
                    <span className="text-lg font-semibold tracking-wide">Nirapod-Parcel</span>
                </NavLink>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent>
                {navSections.map((section) => (
                    <SidebarGroup key={section.title}>
                        <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item: ISidebarRoute) => {
                                    const Icon = item.icon as LucideIcon | undefined;
                                    const hasSubItems = Array.isArray(item.items) && item.items.length > 0;

                                    return (
                                        <Collapsible
                                            key={item.title}
                                            asChild
                                            defaultOpen={isActiveRoute(item.url)}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <NavLink
                                                            to={item.url}
                                                            className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${isActiveRoute(item.url)
                                                                    ? "text-red-500 font-semibold bg-red-100 dark:bg-red-900/30"
                                                                    : "text-foreground hover:text-foreground hover:bg-gray-700 dark:hover:bg-gray-700/50"
                                                                }`}
                                                        >
                                                            {Icon && <Icon className="w-5 h-5 shrink-0" />}
                                                            <span className="truncate">{item.title}</span>

                                                            {hasSubItems && (
                                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                            )}
                                                        </NavLink>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>

                                                {/* Sub-items */}
                                                {hasSubItems && (
                                                    <CollapsibleContent>
                                                        <SidebarMenu>
                                                            {item.items?.map((sub) => (
                                                                <SidebarMenuItem key={sub.title}>
                                                                    <SidebarMenuButton asChild>
                                                                        <NavLink
                                                                            to={sub.url}
                                                                            className={`ml-8 block w-full px-3 py-2 rounded-md transition-colors ${isActiveRoute(sub.url)
                                                                                    ? "text-red-500 font-semibold bg-red-100 dark:bg-red-900/30"
                                                                                    : "text-muted-foreground hover:text-foreground hover:bg-gray-700 dark:hover:bg-gray-700/50"
                                                                                }`}
                                                                        >
                                                                            {sub.title}
                                                                        </NavLink>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                            ))}
                                                        </SidebarMenu>
                                                    </CollapsibleContent>
                                                )}
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
};