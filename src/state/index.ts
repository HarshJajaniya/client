import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStatetypes {
  isSidebarCollapsed: boolean;
  isDarkmode: boolean;
}

const initialState: initialStatetypes = {
  isSidebarCollapsed: false,
  isDarkmode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Define your reducers here
    setisSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setisDarkmode: (state, action: PayloadAction<boolean>) => {
      state.isDarkmode = action.payload;
    },
  },
});

export const { setisSidebarCollapsed, setisDarkmode } = globalSlice.actions;
export default globalSlice.reducer;
