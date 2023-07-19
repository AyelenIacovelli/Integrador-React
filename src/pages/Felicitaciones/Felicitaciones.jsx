import React from 'react'
import Helmet from '../../components/Helmet/Helmet'
import CommonSection from '../../components/UI/common/CommonSection'
import { Link } from "react-router-dom"
import "./felicitaciones.css"
import { motion } from "framer-motion"

const Felicitaciones = () => {
  return (
    <Helmet title="Felicitaciones">
      <CommonSection title="Felicitaciones" />
      <section className='congratulations__section'>
        <div className='congratulations__container'>
          <h2>¡Compra realizada con éxito!</h2>
          <p className='congratulations__container-msg'>Los detalles de tu compra y el seguimiento del envío te llegarán al mail que nos proporcionaste.</p>
          <p className='congratulations__container-p'>Si tienes alguna duda, no dudes en comunicarte con nosotros:</p>
          <ul>
            <li>clientes@grevery.com</li>
            <li>1161234567</li>
          </ul>
          <motion.button whileTap={{ scale: 1.2 }} className='shop__btn'><Link to="/tienda">Volver a la tienda</Link></motion.button>
        </div>
      </section>
    </Helmet>
  );
};

export default Felicitaciones;