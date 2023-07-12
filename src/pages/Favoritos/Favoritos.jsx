import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {toggleFavorite} from '../../redux/slices/favsSlice';
import ProductCard from "../../components/UI/products/ProductCard"
// import ProductsList from '../../components/UI/products/ProductsList';
import { products } from '../../data/Products';
import { createSelector } from 'reselect';
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"
import { clearFavorites } from '../../redux/slices/favsSlice';
import { FaHeart } from "react-icons/fa"
import "../Favoritos/favoritos.css"


const getFavorites = (state) => state.favs.favorites ?? [];

const getProducts = (state) => products;

const getFavoriteProducts = createSelector(
  [getFavorites, getProducts],
  (favorites, products) =>
    products.filter((product) => favorites.includes(product.id))
);

const Favoritos = () => {

  const dispatch = useDispatch();

  const handleClearFavorites = () => {
    const confirmed = window.confirm('¿Seguro deseas eliminar todos los Favoritos?');
    if (confirmed) {
      dispatch(clearFavorites());
    }
  };

  const favoriteProducts = useSelector(getFavoriteProducts);

  return (
    <Helmet title="Favoritos">
      <CommonSection title="Favoritos" />



      <section className='favoritos__section'>
        <div className='favoritos__container'>
          {favoriteProducts.length === 0 ? (
            <p>Aún no hay productos agregados a favoritos</p>
          ) : (
            favoriteProducts.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))
          )}
        </div>
        <button onClick={handleClearFavorites} className='fav__btn'>Borrar todos los Favoritos <FaHeart /></button>
      </section>








    </Helmet>

  );
}

export default Favoritos;