import React, { useState, useEffect } from 'react'
import "./home.css"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { products } from "../../data/Products"

import Helmet from '../../components/Helmet/Helmet'
import Services from '../../services/Services'
import ProductsList from '../../components/UI/products/ProductsList'

const Home = () => {

  // TRENDING PRODUCTS
  const [trendingProducts, setTrendingProducts] = useState([])

  // SALE PRODUCTS
  const [bestSalesProducts, setBestSalesProducts] = useState([])

  // AÑO EN HERO
  const year = new Date().getFullYear()

  // FILTRO TRENDING
  useEffect(() => {
    const filteredTrendingProducts = products.filter(item => item.category === "Pijamas")
    // FILTRO SALE


    setTrendingProducts(filteredTrendingProducts)
  }, [])

  return (
    <Helmet title={"Home"}>
      <section className='hero__section'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1>GREVERY STORE</h1>
            <h2>Tienda de regalos</h2>
            <p className='hero__subtitle'>Lo nuevo del {year}</p>
            <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'><Link to="/tienda">Tienda Online</Link></motion.button>
          </div>
          <div className='hero__img'>
            <img src='' alt='heroimg' />
          </div>
        </div>
      </section>
      <Services />
      <section className='trending__products'>
        <div className='trending__container'>
          <h2 className='section__title'>Productos en tendencia</h2>
          <div className='products-list'>
            <ProductsList data={trendingProducts} />
          </div>

        </div>
      </section>
    </Helmet>
  )
}

export default Home