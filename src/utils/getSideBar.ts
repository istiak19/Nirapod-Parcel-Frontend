import { role } from "@/constants/role";
import { adminSidebarRoute } from "@/routes/adminRoutes";
import { receiverSidebarRoute } from "@/routes/receiverSidebarRoute";
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
        default:
            return [];
    }
};