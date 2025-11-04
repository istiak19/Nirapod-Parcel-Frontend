"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Link } from "react-router";

export function SiteHeader() {
    return (
        <header className="flex h-16 items-center border-b px-4 lg:px-6 gap-2 bg-white dark:bg-black">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-6" />

            {/* <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                    <img src="/logo.png" alt="Logo" className="object-contain" />
                </div>
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                    PHCareHub
                </span>
            </div> */}

            <div className="ml-auto flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Bell className="w-5 h-5" />
                </button>

                <Button variant="outline" size="sm" asChild>
                    <Link to="/docs" className="dark:text-foreground">
                        Docs
                    </Link>
                </Button>

                <button className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1 dark:bg-gray-800">
                    <span>Anik</span>
                    {/* <Image src="/doctors/doctor-1.jpg" alt="Anik" width={24} height={24} className="rounded-full" /> */}
                </button>
            </div>
        </header>
    );
}