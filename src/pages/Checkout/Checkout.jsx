import React from 'react'
import "../Checkout/checkout.css"
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"
import {useSelector} from "react-redux"

const Checkout = () => {

  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <Helmet title="Checkout">
      <CommonSection title="Verificación" />
        <section>
          <Container>
            <Row>
              <Col lg="8">
                <h6 className='mb-4 fw-bold'>Facturación</h6>
                <Form className='billing__form'>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder='Escribe tu nombre' />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="email" placeholder='Escribe tu email' />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="number" placeholder='Escribe tu número de teléfono' />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder='Escribe tu dirección' />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder='Escribe tu Provincia' />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="number" placeholder='Escribe tu Código Postal' />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder='Escribe tu Localidad' />
                  </FormGroup>
                </Form>
              </Col>
              <Col lg="4">
                <div className='checkout__cart'>
                  <h6>Cantidad: <span>{totalQty} productos</span></h6>
                  <h6>Subtotal: <span>${totalAmount}</span></h6>
                  <h6>Envío: <span>$0</span></h6>
                  <p>Envío gratis</p>
                  <h4>Total a pagar: <span>${totalAmount}</span></h4>    
                  <button className='buy__btn auth__btn w-100'>Realizar compra</button>            
                </div>
                
              </Col>
            </Row>
          </Container>
        </section>
    </Helmet>
  )
}

export default Checkout