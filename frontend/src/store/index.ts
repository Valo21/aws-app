import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from "./slices/authSlice.ts";
import {photosApi} from "./api/photosApi.ts";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(photosApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
