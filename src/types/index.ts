import type { ComponentType } from "react";

export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        url: string;
        component: ComponentType;
    }[];
};

export interface SectionHeadingProps {
    kicker?: string;
    title: string;
    subtitle?: string;
    align?: "left" | "center";
};