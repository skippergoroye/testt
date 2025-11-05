// features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    profilePicture: string | null;
    role: {
      title: string;
    };
    email: string | null;
  } | null;
  otp: {
    ref: string | null;
    email: string | null;
  } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  otp: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user?: AuthState["user"];
      }>
    ) => {
      state.token = action.payload.token;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    setOtpData: (
      state,
      action: PayloadAction<{
        ref: string;
        email: string;
      }>
    ) => {
      state.otp = {
        ref: action.payload.ref,
        email: action.payload.email,
      };
    },
    clearOtpData: (state) => {
      state.otp = null;
    },
    // Clear user data and token, also clear persisted state
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.otp = null;

      // Clear persisted redux state
      if (typeof window !== "undefined") {
        localStorage.removeItem("persist:auth"); // Or your specific redux-persist key
        sessionStorage.removeItem("persist:auth");
      }
    },
  },
  extraReducers: (builder) => {
    // Add authApi response handling
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if (payload.token) {
          state.token = payload.token;
        }
        if (payload.user) {
          state.user = payload.user;
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.confirm2FA.matchFulfilled,
      (state, { payload }) => {
        if (payload.token) {
          state.token = payload.token;
          state.otp = null; // Clear OTP data after successful confirmation
        }
      }
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.otp = null;
    });
  },
});

// Cookie utility integration
export const setAuthCookie = (token: string, days = 1) => {
  if (typeof window !== "undefined") {
    const expires = new Date(Date.now() + days * 86400e3).toUTCString();
    document.cookie = `authToken=${token}; expires=${expires}; path=/; Secure; SameSite=Lax`;
  }
};

export const clearAuthCookie = () => {
  if (typeof window !== "undefined") {
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
};

// Action creators
export const {
  setCredentials,
  setOtpData,
  clearOtpData,
  logout,
} = authSlice.actions;

// Selectors
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectOtpData = (state: { auth: AuthState }) => state.auth.otp;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;

export default authSlice.reducer;
