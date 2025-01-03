import { configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./common_slice";
import { windowSlice } from "components/window/window_slice";

export const commonStore = configureStore({
  reducer: {
    common: commonSlice.reducer,
    windows: windowSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type CommonStateType = ReturnType<typeof commonStore.getState>;

export type CommonDispatchType = typeof commonStore.dispatch;
