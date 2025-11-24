// import { RootState } from "@/redux/app/store";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     // baseUrl: process.env.BASE_URL,
//     baseUrl: "https://rickandmortyapi.com/api",
//     // baseUrl: "https://email-list-api-4.onrender.com/api",
//     prepareHeaders: (headers, {getState}) => {

//       const token = (getState() as RootState).auth?.token;
//       //  console.log("User token", token)

//       // Set the Authorization header if token exists
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },

//   }),

//   tagTypes: ["Users"],
//   endpoints: () => ({}),
// });





import { RootState } from "@/redux/app/store";
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const EMAIL_API = "https://email-list-api-4.onrender.com/api";
const RICK_MORTY_API = "https://rickandmortyapi.com/api";

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const endpoint = typeof args === "string" ? args : args.url;
  
  // Check if the current browser route is for marketing
   const isMarketingRoute = 
    window.location.pathname.includes("/apps/email") ||
    window.location.pathname.includes("/apps/calendar");

  
  // Use Rick and Morty API for marketing, Email API for auth routes
  const baseUrl = isMarketingRoute ? RICK_MORTY_API : EMAIL_API;

  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Users", "Marketing"],
  endpoints: () => ({}),
});