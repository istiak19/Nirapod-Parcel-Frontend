import { role } from "@/constants/role";
import { adminSidebarRoute } from "@/routes/adminRoutes";
import { receiverSidebarRoute } from "@/routes/receiverSidebarRoute";
import { riderSidebarRoute } from "@/routes/riderSidebarRoute";
import { senderSidebarRoute } from "@/routes/senderSidebarRoutes";
import type { IRole } from "@/types";

export const getSideBar = (userRole: IRole) => {
    switch (userRole) {
        case role.admin:
            return [...adminSidebarRoute];
        case role.receiver:
            return [...receiverSidebarRoute];
        case role.sender:
            return [...senderSidebarRoute];
        case role.rider:
            return [...riderSidebarRoute];
        default:
            return [];
    }
};