import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASIC_URL } from "./index";

// Base fetch
const baseQuery = fetchBaseQuery({
  baseUrl: BASIC_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

// Enhanced with re-auth
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const isUnauthorized =
    result.error?.status === 401 ||
    result.error?.data?.message?.toLowerCase().includes("invalid token");

  if (isUnauthorized) {
    console.warn("🔐 Access token expired. Attempting refresh...");

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.warn("❌ No refresh token found. Logging out...");
      logout();
      return result;
    }

    // 🧠 Attempt token refresh
    const refreshResult = await baseQuery(
      {
        url: "/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.accessToken) {
      console.info("✅ Token refreshed. Retrying original request...");

      const newAccessToken = refreshResult.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      if (refreshResult.data.refreshToken) {
        localStorage.setItem("refreshToken", refreshResult.data.refreshToken);
      }

      // 🛠️ Manually inject new access token into retry headers
      const retryHeaders = new Headers();
      retryHeaders.set("Authorization", ` ${newAccessToken}`);

      const retryArgs =
        typeof args === "string"
          ? { url: args, headers: retryHeaders }
          : { ...args, headers: retryHeaders };

      result = await baseQuery(retryArgs, api, extraOptions);
    } else {
      console.error("❌ Refresh failed. Logging out...");
      logout();
    }
  }

  return result;
};


// Logout
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("User");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// API
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "getTask",
    "getTaskById",
    "addTask",
    "deleteTaskById",
    "updateTask",
    "getTaskStatistics",
    "getSiteDone",
    "getProblem",
    "addSiteDone",
    "deleteSiteDoneById",
    "deleteProblem2ById",
    "DeleteSiteDone2ById",
  ],
  endpoints: (build) => ({}),
});
