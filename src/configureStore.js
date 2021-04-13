import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./components/cardSlice";

const store = configureStore({
  reducer: {
    cards: cardSlice,
  },
});

export default store;
