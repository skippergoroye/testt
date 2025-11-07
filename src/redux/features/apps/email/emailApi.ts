/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ToastNotification from "@/components/shared/ToastNotification";
import { apiSlice } from "../../api/apiSlice";

export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCharacters: builder.query<any, { page?: number; name?: string; status?: string; gender?: string }>({
      query: ({ page = 1, name, status, gender }) => ({
        url: "/character",
        params: { page, name, status, gender },
      }),
    }),
  }),
});

export const { useFetchCharactersQuery } = emailApi;
