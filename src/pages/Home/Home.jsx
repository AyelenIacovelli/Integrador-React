import React, { useState, useEffect } from 'react'
import "./home.css"

import { Link } from "react-router-dom"

import { motion } from "framer-motion"
import { Container, Row, Col } from "reactstrap"

import { products } from "../../data/Products"
import Helmet from '../../components/Helmet/Helmet'
import Services from '../../services/Services'
import ProductsList from '../../components/UI/products/ProductsList'
import Clock from "../../components/UI/clock/Clock"

import oferta from "../../assets/images/oferta.png"

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
  }, [products])

  return (
    // HELMET
    <Helmet title={"Home"}>
      {/* HERO */}
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className='hero__content'>
                <h1>GREVERY STORE</h1>
                <h2>Tienda de regalos</h2>
                <p className='hero__subtitle'>Lo nuevo del {year}</p>
                <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'><Link to="/tienda">Tienda Online</Link></motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className='hero__img'>
                <img src='' alt='heroimg' />
              </div>
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