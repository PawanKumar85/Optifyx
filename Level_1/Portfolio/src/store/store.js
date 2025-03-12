import { configureStore} from "@reduxjs/toolkit";
import portfolioReducer from "./portfolioReducer";

const store = configureStore({
  reducer: {
    menu: portfolioReducer,
  },
});

export default store;
