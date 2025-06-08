import { configureStore } from "@reduxjs/toolkit"; // Importing configureStore from Redux Toolkit to set up the Redux store
import UserReducer from "./UserSlice.js";
import messageReducer from "./MessageSlice.js";

// Creating and configuring the Redux store
export const store = configureStore({
  // Combining multiple reducers into a single reducer object
  reducer: {
    user: UserReducer,
    message: messageReducer,
  },
});
