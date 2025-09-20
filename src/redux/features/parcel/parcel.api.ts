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
            query: (params) => ({
                url: "/parcels",
                method: "GET",
                params
            })
        }),
        parcelStatusChange: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, parcelInfo }) => ({
                url: `/parcels/status/${id}`,
                method: "PATCH",
                data: parcelInfo
            })
        }),
        parcelBlock: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, isBlocked }) => ({
                url: `/parcels/block/${id}`,
                method: "PATCH",
                data: { isBlocked }
            })
        }),
        assignRider: builder.mutation({
            invalidatesTags: ["PARCEL"],
            query: ({ id, rider }) => ({
                url: `/parcels/assign-parcel/${id}`,
                method: "PATCH",
                data: { rider }
            })
        }),
    })
});

export const { useTrackQuery, useGetAllParcelQuery, useParcelStatusChangeMutation, useParcelBlockMutation, useAssignRiderMutation } = parcelApi;