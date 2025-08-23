/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const GlobalErrorHandler = () => {
    const errors = useAppSelector((state: RootState) => state.baseApi.queries);
    useEffect(() => {
        Object.values(errors).forEach((q: any) => {
            if (q?.status === "rejected" && q?.error) {
                const errMsg =
                    "status" in q.error
                        ? q.error.data?.message || `Error ${q.error.status}`
                        : "Something went wrong";

                toast.error(errMsg);
            }
        });
    }, [errors]);

    return null;
};

export default GlobalErrorHandler;