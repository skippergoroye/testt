import { RootState } from "@/redux/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ToastNotification from "@/components/shared/ToastNotification";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
    prepareHeaders: (headers, {getState}) => {

      const token = (getState() as RootState).auth?.token;
       console.log("User token", token)

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }


      // Set the Authorization header if token exists
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    // Custom response handler
    responseHandler: async (response) => {
      const abortController = new AbortController();

      if (response && response.status === 401) {
        if (abortController) {
          abortController.abort("User is unauthorized. Logging out...");
        }

        ToastNotification({
          title: "Session",
          description: "Session timed out, please login.",
          type: "error",
        });

        window.location.href = "/login";

        return;
      }
    },
  }),

  tagTypes: ["Users"],
  endpoints: () => ({}),
});
