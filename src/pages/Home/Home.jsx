import React, { useState, useEffect } from 'react'
import "./home.css"

import { Link } from "react-router-dom"




import { products } from "../../data/Products"
import Helmet from '../../components/Helmet/Helmet'
import Services from '../../services/Services'
import ProductsList from '../../components/UI/products/ProductsList'
import Clock from "../../components/UI/clock/Clock"

import ofertaok from "../../assets/images/ofertaok.png"

import { motion, useAnimation } from 'framer-motion';

import { BsArrowUpRight } from "react-icons/bs"

// ITERAR LUEGO PARA HACER DINAMICAS LAS OFERTAS Y TENDENCIAS

const Home = () => {

  const navigateToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
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
    const filteredBestSalesProducts = products.filter(item => item.category === "Buzos")

    setTrendingProducts(filteredTrendingProducts)
    setBestSalesProducts(filteredBestSalesProducts)
  }, [])

  const controlsX = useAnimation();
  const controlsY = useAnimation();

  useEffect(() => {
    controlsX.start({ x: 0 });
  }, [controlsX]);

  useEffect(() => {
    controlsY.start({ y: 0 });
  }, [controlsY]);

  return (
    // HELMET
    <Helmet title="Home">
      {/* HERO */}
      <section className='hero__section'>
        <h1>GREVERY STORE</h1>
        <div className='hero__content'>
          <h2>Tienda de regalos</h2>
          <p className='hero__content-p'>Conoce lo nuevo del {year}</p>
          <motion.button whileTap={{ scale: 1.2 }} className='hero__content-btn'><Link to="/tienda">Tienda Online<BsArrowUpRight className='hero__content-icon' /></Link></motion.button>
        </div>

      </section>
      {/* SERVICIOS */}
      <Services />
      {/* TENDENCIA */}
      <section className='trending__products'>
        <h2>Productos en tendencia</h2>
        <div className='trending__content'>
          <ProductsList data={trendingProducts} />
        </div>
      </section>
      {/* SALE */}
      <section className='best_sales'>
        <h2>Ofertas</h2>
        <div className='sales__content'>
          <ProductsList data={bestSalesProducts} />
        </div>
      </section>
      {/* TIMER */}
      <section className='timer__count'>
        <div className="timer__overlay"></div>
        <div className='timer__content'>
          <div className='clock__down'>

            <h4>Ofertas por tiempo limitado</h4>

            <Clock />
            <motion.button whileTap={{ scale: 1.2 }} className='hero__content-btn clock__btn'><Link to="/tienda" onClick={navigateToTop}>Tienda Online<BsArrowUpRight className='hero__content-icon' /></Link></motion.button>

          </div>
          <div className='counter__img'>
            <img src={ofertaok} alt="foto sale" />
          </div>
        </div>

      </section>
    </Helmet>
  )
}

export default Home