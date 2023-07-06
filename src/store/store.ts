import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { formDataReducer } from "../features/formSlice";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";

const serializableMiddleware = createSerializableStateInvariantMiddleware();

export const store = configureStore({
  reducer: {
    authState: authReducer,
    formState: formDataReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(serializableMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
