import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navbarSlice";
import heroReducer from "./homeSlice";
import aboutReducer from "./aboutSlice";
import educationReducer from "./educationSlice";
import skillReducer from "./skillSlice";
import platformSlice from "./platformSlice";
import projectReducer from "./projectSlice";

const store = configureStore({
  reducer: {
    menu: navReducer,
    hero: heroReducer,
    about: aboutReducer,
    education: educationReducer,
    skill: skillReducer,
    platform: platformSlice,
    projects: projectReducer,
  },
});

export default store;
