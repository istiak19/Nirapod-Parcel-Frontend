import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        track: builder.query({
            providesTags: ["PARCEL"],
            query: (trackId) => ({
                url: `/parcels/track/${trackId}`,
                method: "GET"
            })
        }),
        getAllParcel: builder.query({
            providesTags: ["PARCEL"],
            query: () => ({
                url: "/parcels",
                method: "GET"
            })
        }),
        parcelStatusChange: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/status/${id}`,
                method: "POST",
                data: parcelInfo
            })
        }),
        parcelBlock: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/block/${id}`,
                method: "POST",
                data: parcelInfo
            })
        }),
    })
});

export const { useTrackQuery, useGetAllParcelQuery, useParcelStatusChangeMutation, useParcelBlockMutation } = parcelApi;