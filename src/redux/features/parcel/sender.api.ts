import { baseApi } from "@/redux/baseApi";

export const senderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: (parcelInfo) => ({
                url: "/parcels",
                method: "POST",
                data: parcelInfo
            })
        }),
        getMeParcel: builder.query({
            providesTags: ["PARCEL"],
            query: () => ({
                url: "/parcels/me",
                method: "GET"
            })
        }),
        getStatusParcel: builder.query({
            providesTags: ["PARCEL"],
            query: (id) => ({
                url: `/parcels/status-log/${id}`,
                method: "GET"
            })
        }),
        parcelCancel: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/cancel/${id}`,
                method: "POST",
                data: parcelInfo
            })
        }),
    })
});

export const { useCreateParcelMutation, useGetMeParcelQuery, useGetStatusParcelQuery, useParcelCancelMutation } = senderApi;