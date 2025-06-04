// src/api/authApi.js
import { api } from "../MainApi"; // Assuming api is already configured with baseUrl

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    authenticate: build.mutation({
      query: (credentials) => ({
        url: "login", // POST /api/login
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthenticateMutation } = authApi;
