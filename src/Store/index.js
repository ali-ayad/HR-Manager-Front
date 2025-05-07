import { configureStore } from "@reduxjs/toolkit";
import { api } from "../Api/MainApi"; // RTK Query slice
import themeReducer from "./them/themeSlice"; // Import your theme reducer

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // RTK Query reducer
    theme: themeReducer,            // Theme slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
