export const selectFavoriteProductsCount = (state) => {
    const favorites = state.favs.favorites;
    return favorites ? favorites.length : 0;
  };