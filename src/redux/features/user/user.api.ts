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
        getAllUser: builder.query({
            providesTags: ["USER"],
            query: () => ({
                url: "/user/all-user",
                method: "GET"
            })
        }),
        getSingleUser: builder.query({
            providesTags: ["USER"],
            query: (id: string) => ({
                url: `/user/${id}`,
                method: "GET"
            })
        }),
        updateUser: builder.mutation({
            invalidatesTags: ["USER"],
            query: ({ id, isBlocked }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: { isBlocked }
            })
        }),
    })
});

export const { useGetMeUserQuery, useGetAllUserQuery, useGetSingleUserQuery, useUpdateUserMutation } = userApi;