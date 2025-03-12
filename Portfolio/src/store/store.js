import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navbarSlice";
import heroReducer from "./homeSlice";
import aboutReducer from "./aboutSlice";
import educationReducer from "./educationSlice";

const store = configureStore({
  reducer: {
    menu: navReducer,
    hero: heroReducer,
    about: aboutReducer,
    education: educationReducer,
  },
});

export default store;
