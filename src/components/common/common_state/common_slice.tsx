import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initialCommonStateType = {
  game_of_life_running: boolean;
};

const initialState: initialCommonStateType = {
  game_of_life_running: true,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setGameOfLifeRunning: (state, action: PayloadAction<boolean>) => {
      state.game_of_life_running = action.payload;
    },
  },
});

export const { setGameOfLifeRunning } = commonSlice.actions;
