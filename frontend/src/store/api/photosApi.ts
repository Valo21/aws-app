import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL.concat('/v1') }),
  endpoints: (builder) => ({
    getUserAlbums: builder.query<Album[], string>({
      query: (id) => `/users/${id}/albums`,
    }),
    getUserProfilePhotos: builder.query<ProfilePhoto[], string>({
      query: (id: string) => `/users/${id}/profile-photos`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserAlbumsQuery, useGetUserProfilePhotosQuery } = photosApi
