import React from 'react';
import { useSelector } from 'react-redux';
// import {toggleFavorite} from '../../redux/slices/favsSlice';
// import ProductCard from '../../components/UI/products/ProductCard';
// import ProductsList from '../../components/UI/products/ProductsList';
import { products } from '../../data/Products';
import { createSelector } from 'reselect';

const getFavorites = (state) => state.favs.favorites ?? [];

const getProducts = (state) => products;

const getFavoriteProducts = createSelector(
  [getFavorites, getProducts],
  (favorites, products) =>
    products.filter((product) => favorites.includes(product.id))
);

const Favoritos = () => {
    const favoriteProducts = useSelector(getFavoriteProducts);
  
    return (
      <div>
        {favoriteProducts.map((product) => (
          <div key={product.id}>
            {product.title}
            {/* Resto de la estructura del producto */}
          </div>
        ))}
      </div>
    );
  }

export default Favoritos;