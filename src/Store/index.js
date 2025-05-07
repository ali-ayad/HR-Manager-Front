
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../Api/MainApi"; // Your main API slice

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
