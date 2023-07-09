import React from 'react'
import { Container, Row, Col } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import { products } from "../../data/Products"
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"
import "../../data/Products";
import "../ProductDetails/productDetails.css"
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addItem } from "../../redux/slices/cartSlice"
import { toast } from 'react-toastify'

const ProductDetails = () => {

  const dispatch = useDispatch()

  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    // Si no se encuentra el producto, puedes mostrar un mensaje de error o redirigir a una página de manejo de errores.
    return <div>El producto no fue encontrado.</div>;
  }

  const { title, img, desc, desc2, price, pricesale, img2, img3, img4, img5 } = product;

  const addToCart = () => {
    const selectedPrice = pricesale || price;
    dispatch(addItem({
      id,
      img: img,
      title,
      price: selectedPrice,
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
              {img2 && <img src={img2} alt="foto secundaria" />}
              {img3 && <img src={img3} alt="foto secundaria" />}
              {img4 && <img src={img4} alt="foto secundaria" />}
              {img5 && <img src={img5} alt="foto secundaria" />}
            </Col>
            <Col lg="6">
              <div className='product__details'>
                <h2>{title}</h2>
                {pricesale ? <span>${pricesale}</span> : <span>${price}</span>}
                <p>{desc}</p>
                <p>{desc2}</p>
                <motion.button whileTap={{ scale: 1.2 }} className='buy__btn' onClick={addToCart}>Agregar al carrito</motion.button>
                <motion.button whileTap={{ scale: 1.2 }}><Link to="/tienda">Volver a la tienda</Link></motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails