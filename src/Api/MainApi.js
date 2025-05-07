import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASIC_URL } from "./index";

// Base fetch logic
const baseQuery = fetchBaseQuery({
  baseUrl: BASIC_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

// Wrapper to catch 401 and handle logout
const baseQueryWithAuthHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const isUnauthorized =
    result.error?.status === 401 ||
    result.error?.data?.message?.toLowerCase().includes("invalid token");

  if (isUnauthorized) {
    console.warn("⛔ Invalid or expired token. Logging out...");

    localStorage.removeItem("authToken");
    localStorage.removeItem("User");

    // Optional: show a message or toast before redirecting

    // Redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return result;
};


// Create the API
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthHandling,
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
