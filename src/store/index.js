import { configureStore } from "@reduxjs/toolkit";

import { alertReducer } from "./alert.slice";
import { authReducer } from "./auth.slice";
import { usersReducer } from "./users.slice";

export * from "./alert.slice";
export * from "./auth.slice";
export * from "./users.slice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export default store;
