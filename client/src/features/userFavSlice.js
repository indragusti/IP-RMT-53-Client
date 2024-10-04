import { createSlice } from "@reduxjs/toolkit";

export const userFavSlice = createSlice({
  name: "userFav",
  initialState: {
    favorites: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { setFavorites } = userFavSlice.actions;

export default userFavSlice.reducer;
