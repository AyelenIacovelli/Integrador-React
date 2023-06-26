import React from 'react'
import { Container, Row, Col } from "reactstrap"
import {useParams} from "react-router-dom"
import { products } from "../../data/Products"
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"
import "../../data/Products";
import "../ProductDetails/productDetails.css"
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify'

const ProductDetails = () => {

  const dispatch =useDispatch()

  const {id} = useParams()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    // Si no se encuentra el producto, puedes mostrar un mensaje de error o redirigir a una página de manejo de errores.
    return <div>El producto no fue encontrado.</div>;
  }

  const {title, img, desc, price, img2} = product;

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      img: img,
      title,
      price,      
    }))
    toast.success("Producto agregado correctamente al carrito")
  }

  return (
    <Helmet title={title}>
      <CommonSection title={title} />
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg="6">
              <img src={img} alt="foto producto" />
              <img src={img2} alt="foto secundaria"/>
            </Col>
            <Col lg="6">
              <div className='product__details'>
                <h2>{title}</h2>
                <span>{price}</span>
                <p>{desc}</p>
                <motion.button whileTap={{scale:1.2}} className='buy__btn' onClick={addToCart}>Agregar al carrito</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails