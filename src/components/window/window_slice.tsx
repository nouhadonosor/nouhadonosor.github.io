import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WindowPrefabsUnion } from "./window_prefabs";

export type WindowDescType = {
  style: { [k: string]: any };
};

export type WindowSliceStateType = {
  active_windows: { [k: string]: WindowDescType };
};

const initialState: WindowSliceStateType = {
  active_windows: {},
};

const initialZIndex = 1;

const initialWindowState: WindowDescType = {
  style: {
    zindex: initialZIndex,
  },
};

export const windowSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    touch: (state, action: PayloadAction<WindowPrefabsUnion>) => {
      const window_prefab_name = action.payload;
      for (let key in state.active_windows) {
        state.active_windows[key].style.zindex = 1;
      }
      state.active_windows[window_prefab_name].style.zindex = 2;
    },
    openWindow: (state, action: PayloadAction<WindowPrefabsUnion>) => {
      const window_prefab_name = action.payload;
      state.active_windows[window_prefab_name] = initialWindowState;
      //WindowPrefabs[window_prefab_name];
    },
    closeWindow: (state, action: PayloadAction<WindowPrefabsUnion>) => {
      const window_prefab_name = action.payload;
      delete state.active_windows[window_prefab_name];
    },
  },
});

export const { openWindow, closeWindow, touch } = windowSlice.actions;
