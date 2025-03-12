import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const portfolioSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = portfolioSlice.actions;
export default portfolioSlice.reducer;
