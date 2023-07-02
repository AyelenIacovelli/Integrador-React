import React from 'react';
import { useSelector } from 'react-redux';
// import {toggleFavorite} from '../../redux/slices/favsSlice';
import ProductCard from "../../components/UI/products/ProductCard"
// import ProductsList from '../../components/UI/products/ProductsList';
import { products } from '../../data/Products';
import { createSelector } from 'reselect';
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"

import "../Favoritos/favoritos.css"
import { Col, Container, Row } from 'reactstrap';

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
      <Helmet title={Favoritos}>
        <CommonSection title={Favoritos} />
        <Container>
          <Row>
            <Col>
            <section className='favoritos__section'>
        <div className='favoritos__container'>
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
      </section>
            </Col>
          </Row>
        </Container>
        
            
            
            
         
        
      </Helmet>
      
    );
  }

export default Favoritos;