import React from 'react'
import { Container, Row, Col } from "reactstrap"
import {useParams} from "react-router-dom"
import {products} from "../../data/Products"
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"

const ProductDetails = () => {

  const {id} = useParams()
  const product = products.find((item) => item.id === id)

  const {title, img, desc, price} = product

  return (
    <Helmet>
      <CommonSection />
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg="6">
              <img src={img} alt="foto producto" />
            </Col>
            <Col lg="6">
              <div className='product__details'>
                <h2>{title}</h2>
                <span>{price}</span>
                <p>{desc}</p>
                <button className='buy__btn'>Agregar al carrito</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails