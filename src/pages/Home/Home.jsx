import React, { useState, useEffect } from 'react'
import "./home.css"

import { Link } from "react-router-dom"


import { Container, Row, Col } from "reactstrap"

import { products } from "../../data/Products"
import Helmet from '../../components/Helmet/Helmet'
import Services from '../../services/Services'
import ProductsList from '../../components/UI/products/ProductsList'
import Clock from "../../components/UI/clock/Clock"

import oferta from "../../assets/images/oferta.png"

import hero from "../../assets/images/hero.jpg"

import { motion, useAnimation } from 'framer-motion';

// ITERAR LUEGO PARA HACER DINAMICAS LAS OFERTAS Y TENDENCIAS

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
      <section className='hero__section' style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover' }}>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <motion.h1
                initial={{ x: -500 }} // Posición inicial fuera de la pantalla (izquierda)
                animate={controlsX} // Controla la animación
                transition={{ duration: 2 }} // Duración de la animación
              >GREVERY STORE
              </motion.h1>
            </Col>
            <Col>
              <motion.div initial={{ y: 500 }} animate={controlsY} transition={{ duration: 2.5 }} className='hero__content'>
                <h2>Tienda de regalos</h2>
                <p className='hero__subtitle'>Conoce lo nuevo del {year}</p>
                <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'><Link to="/tienda">Tienda Online</Link></motion.button>
              </motion.div>
            </Col>

          </Row>
        </Container>
      </section>
      {/* SERVICIOS */}
      <Services />
      {/* TENDENCIA */}
      <section className='trending__products'>
        <Container>
          <Row>
            <Col lg="12" className='text-center'>
              <h2 className='section__title'>Productos en tendencia</h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>
      {/* SALE */}
      <section className='best_sales'>
        <Container>
          <Row>
            <Col lg="12" className='text-center'>
              <h2 className='section__title'>Ofertas</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>
      {/* TIMER */}
      <section className='timer__count'>
        <Row>
          <Col lg="6" md="12" className='clock__down-col'>
            <div className='clock__top-content'>
              <h4 className='text-white fs-6 mb-2'>Ofertas por tiempo limitado</h4>
            </div>
            <Clock />
            <motion.button whileTap={{ scale: 1.2 }} className='buy__btn store__btn clock_btn'>
              <Link to="/tienda">Visita nuestra Tienda</Link>
            </motion.button>
          </Col>
          <Col lg="6" md="12" className='text-end counter__img'>
            <img src={oferta} alt="foto sale" />
          </Col>
        </Row>
      </section>
    </Helmet>
  )
}

export default Home