import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMeUser: builder.query({
            providesTags: ["USER"],
            query: () => ({
                url: "/user/get-me",
                method: "GET"
            })
        }),
    })
});

export const { useGetMeUserQuery } = userApi;