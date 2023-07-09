import { createSlice } from '@reduxjs/toolkit';

const favsSlice = createSlice({
  name: 'favs',
  initialState: {
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const itemId = action.payload;
      const index = state.favorites.indexOf(itemId);
      if (index === -1) {
        state.favorites.push(itemId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favsSlice.actions;

export default favsSlice.reducer;