import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            })
        }),
        logout: builder.mutation({
            invalidatesTags: ["USER"],
            query: (userInfo) => ({
                url: "/auth/logout",
                method: "POST",
                data: userInfo
            })
        }),
        sentOtp: builder.mutation({
            query: (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo
            })
        }),
        verifyOtp: builder.mutation({
            query: (userInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userInfo
            })
        }),
    })
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useSentOtpMutation, useVerifyOtpMutation } = authApi;