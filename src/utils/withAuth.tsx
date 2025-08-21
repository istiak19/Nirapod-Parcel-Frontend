import { useGetMeUserQuery } from "@/redux/features/user/user.api";
import type { IRole } from "@/types";
import type { ComponentType } from "react";
import { useLocation, Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: IRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useGetMeUserQuery(undefined);
        const location = useLocation();

        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login" state={{ from: location.pathname }} replace />;
        };

        if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
            return <Navigate to="/unauthorized" />;
        };

        return <Component />;
    };
};