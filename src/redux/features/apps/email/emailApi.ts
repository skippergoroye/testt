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

    fetchEmails: builder.query<any, { 
      page?: number; 
      limit?: number; 
      view?: string; 
      labels?: string; 
      search?: string; 
      dateFrom?: string; 
      dateTo?: string;
    }>({
      query: ({ page = 1, limit = 15, view, labels, search, dateFrom, dateTo }) => ({
        url: "/emails", 
        params: { page, limit, view, labels, search, dateFrom, dateTo },
      }),
    
    }),
  

  


   
  }),
});

export const {  useFetchCharactersQuery, useFetchEmailsQuery } = emailApi;
