import { configureStore } from "@reduxjs/toolkit";
import userFavSlice from "./features/userFavSlice";

export const store = configureStore({
  reducer: {
    favorite: userFavSlice,
  },
});
console.log(userFavSlice, "<<< counterSlice");
