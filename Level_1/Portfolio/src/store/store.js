import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navbarSlice";
import heroReducer from "./homeSlice";

const store = configureStore({
  reducer: {
    menu: navReducer,
    hero: heroReducer,
  },
});

export default store;
