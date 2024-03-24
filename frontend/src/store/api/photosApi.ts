import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL.concat('/v1'),
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') ?? ''
    }
  }),
  tagTypes: ['Album', 'Image', 'User'],
  endpoints: (builder) => ({
    getUserAlbums: builder.query<Album[], string>({
      query: (id) => `/users/${id}/albums`,
      providesTags: ['Album'],
    }),
    getUserProfilePhotos: builder.query<ProfilePhoto[], string>({
      query: (id: string) => `/users/${id}/profile-photos`,
    }),
    uploadAlbumPhoto: builder.mutation<Image, FormData>({
      query: (form) => ({
        url: `/images`,
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['Album']
    }),
    addAlbum: builder.mutation<Album, string>({
      query: (name) => ({
        url: `/albums`,
        method: 'POST',
        body: {
          name
        },
      }),
      invalidatesTags: ['Album']
    }),
    updateAlbumName: builder.mutation<Album, Pick<Album, 'id' | 'name'>>({
      query: ({id, name}) => ({
        url: `/albums/${id}`,
        method: 'PATCH',
        body: {
          name
        },
      }),
      invalidatesTags: ['Album']
    }),
    deleteAlbum: builder.mutation<Album, string>({
      query: (id) => ({
        url: `/albums/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Album']
    }),
    updateUserDetails: builder.mutation<Album[], null>({
      query: () => `/auth`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserAlbumsQuery,
  useGetUserProfilePhotosQuery,
  useUploadAlbumPhotoMutation,
  useUpdateAlbumNameMutation,
  useDeleteAlbumMutation,
  useAddAlbumMutation,
} =
  photosApi;
