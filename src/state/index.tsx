import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Define your reducers here
  },
});

export const {} = globalSlice.actions;
export default globalSlice.reducer;
