import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/userSlice";

// Creating store
export const store = configureStore({
  reducer: {
    user: userReduser,
  },
});
