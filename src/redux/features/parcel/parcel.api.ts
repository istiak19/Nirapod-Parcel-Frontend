import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        track: builder.query({
            query: (trackId) => ({
                url: `/parcels/track/${trackId}`,
                method: "GET"
            })
        }),
        // updateUser: builder.mutation({
        //     invalidatesTags: ["USER"],
        //     query: ({ id, userInfo }) => ({
        //         url: `/user/${id}`,
        //         method: "POST",
        //         data: userInfo
        //     })
        // }),
    })
});

export const { useTrackQuery } = parcelApi;