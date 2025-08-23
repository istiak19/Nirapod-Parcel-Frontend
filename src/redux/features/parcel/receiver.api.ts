import { baseApi } from "@/redux/baseApi";

export const receiverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
                method: "POST",
                data: parcelInfo
            })
        }),
        returnParcel: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/return/${id}`,
                method: "POST",
                data: parcelInfo
            })
        }),
        deliveredParcel: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/delivered/${id}`,
                method: "POST",
                data: parcelInfo
            })
        }),
    })
});

export const { useIncomingParcelQuery, useHistoryParcelQuery, useRescheduleParcelMutation, useReturnParcelMutation, useDeliveredParcelMutation } = receiverApi;