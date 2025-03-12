import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navbarSlice";
import heroReducer from "./homeSlice";
import aboutReducer from "./aboutSlice";

const store = configureStore({
  reducer: {
    menu: navReducer,
    hero: heroReducer,
    about: aboutReducer,
  },
});

export default store;
