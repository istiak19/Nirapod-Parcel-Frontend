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
        getAllRiders: builder.query({
            providesTags: ["USER"],
            query: () => ({
                url: "/user/all-rider",
                method: "GET"
            })
        }),
        getAllAssign: builder.query({
            providesTags: ["USER"],
            query: () => ({
                url: "/user/assign-rider",
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

export const { useGetMeUserQuery, useGetAllRidersQuery, useGetAllAssignQuery, useGetAllUserQuery, useGetSingleUserQuery, useUpdateUserMutation } = userApi;