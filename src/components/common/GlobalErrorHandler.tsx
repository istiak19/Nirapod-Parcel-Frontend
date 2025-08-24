/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const GlobalErrorHandler = () => {
    const queries = useAppSelector((state: RootState) => state.baseApi.queries);
    const getMeQuery = queries['getMeUser(undefined)'] as any;
    const isLoggedIn = !!getMeQuery?.data?.data?.email;

    useEffect(() => {
        Object.values(queries).forEach((q: any) => {
            if (q?.status === "rejected" && q?.error) {
                const errMsg =
                    "status" in q.error
                        ? q.error.data?.message || `Error ${q.error.status}`
                        : "Something went wrong";

                if (!isLoggedIn && (errMsg.includes("No token provided") || errMsg.includes("Unauthorized"))) {
                    return;
                };
                toast.error(errMsg);
            };
        });
    }, [queries, isLoggedIn]);

    return null;
};

export default GlobalErrorHandler;