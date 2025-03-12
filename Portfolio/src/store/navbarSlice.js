import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const navbarSlice = createSlice({
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

export const { toggleMenu, closeMenu } = navbarSlice.actions;
export default navbarSlice.reducer;
