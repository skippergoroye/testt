// features/auth/authApi.ts

import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
     
    }),
    confirm2FA: builder.mutation({
      query: (credentials: { ref: string; otp: string }) => ({
        url: "/auth/signin/confirm",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/logout",
        method: "POST",
        body: credentials,
      }),
     
    }),
    forgotPassword: builder.mutation({
      query: (credentials: { email: string }) => ({
        url: "/auth/password/forgot",
        method: "POST",
        body: credentials,
      }),
    }),
    validateResetPasswordOtp: builder.mutation({
      query: (credentials: { email: string; otp: string; ref: string }) => ({
        url: "/auth/password/otp",
        method: "POST",
        body: credentials,
      }),
    }),
    resendOtp: builder.mutation({
      query: (credentials: { ref: string }) => ({
        url: "/auth/otp/resend",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials: {
        token: string;
        password: string;
        confirmPassword: string;
      }) => ({
        url: "/auth/password/reset",
        method: "POST",
        body: credentials,
      }),
    }),
    setPassword: builder.mutation({
      query: (credentials: {
        email: string;
        password: string;
        confirmPassword: string;
      }) => ({
        url: "/auth/password/set",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useValidateResetPasswordOtpMutation,
  useSetPasswordMutation,
  useConfirm2FAMutation,
  useResendOtpMutation,
} = authApi;
