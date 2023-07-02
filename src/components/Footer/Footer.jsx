import React from 'react'
import {Container, Row, Col} from "reactstrap"
import "../Footer/footer.css"
import {BsInstagram, BsFacebook, BsTwitter} from "react-icons/bs"

const Footer = () => {
  return (
    <section className='footer__section'>
      <Container>
        <Row>
          <Col >
          <div className='contacto' >
            <h4>Contacto</h4>
            <h6>Dirección</h6>
            <p>Calle falsa 123</p>
            <h6>Teléfono</h6>
            <p>1161234567</p>
          </div>
          </Col>
          <Col>
            <div className='redes'>
              <h4>Redes sociales</h4>
              <p><a href="https://www.instagram.com/"><BsInstagram /></a></p>
              <p><a href='https://www.facebook.com/'><BsFacebook /></a></p>
              <p><a href="https://www.twitter.com/"><BsTwitter /></a></p>
            </div>
          </Col>        
          <div>
            <p>Ayelén Iacovelli. Todos los derechos reservados 2023.</p>
          </div>        
        </Row>
      </Container>
    </section>
  )
}

export default Footer