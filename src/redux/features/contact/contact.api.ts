import { baseApi } from "@/redux/baseApi";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllContact: builder.query({
            providesTags: ["CONTACT"],
            query: () => ({
                url: "/contact",
                method: "GET"
            })
        }),
        createContact: builder.mutation({
            invalidatesTags: ["CONTACT"],
            query: (contactInfo) => ({
                url: "/contact",
                method: "POST",
                data: contactInfo
            })
        }),
    })
});

export const { useCreateContactMutation, useGetAllContactQuery } = contactApi;