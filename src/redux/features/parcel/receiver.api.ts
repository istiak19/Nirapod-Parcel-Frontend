import { baseApi } from "@/redux/baseApi";

export const receiverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getParcel: builder.query({
            providesTags: ["PARCEL"],
            query: (params) => ({
                url: "/parcels/me-receiver",
                method: "GET",
                params
            })
        }),
        incomingParcel: builder.query({
            providesTags: ["PARCEL"],
            query: () => ({
                url: "/parcels/incoming",
                method: "GET"
            })
        }),
        historyParcel: builder.query({
            providesTags: ["PARCEL"],
            query: () => ({
                url: "/parcels/history",
                method: "GET"
            })
        }),
        rescheduleParcel: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/reschedule/${id}`,
                method: "PATCH",
                data: parcelInfo
            })
        }),
        returnParcel: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/return/${id}`,
                method: "PATCH",
                data: parcelInfo
            })
        }),
        deliveredParcel: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/delivered/${id}`,
                method: "PATCH",
                data: parcelInfo
            })
        }),
    })
});

export const { useGetParcelQuery, useIncomingParcelQuery, useHistoryParcelQuery, useRescheduleParcelMutation, useReturnParcelMutation, useDeliveredParcelMutation } = receiverApi;