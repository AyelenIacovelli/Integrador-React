import React from 'react'
import Helmet from '../../components/Helmet/Helmet'
// import CommonSection from '../../components/UI/common/CommonSection'
import { Link } from "react-router-dom"
import "./felicitaciones.css"
import { motion } from "framer-motion"

const Felicitaciones = () => {

  const navigateToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Helmet title="Felicitaciones">
      {/* <CommonSection title="Felicitaciones" /> */}
      <section className='congratulations__section'>
        <div className='thanks__container'>
          <h2 className='thanks__container-title'>¡Gracias por tu compra!</h2>
        </div>
        <div className='congratulations__container'>

          <p className='congratulations__container-msg'>Los detalles de tu compra y el seguimiento del envío te llegarán al mail que nos proporcionaste.</p>
          <p className='congratulations__container-p'>Si tienes alguna duda, no dudes en comunicarte con nosotros:</p>
          <ul>
            <li>clientes@grevery.com</li>
            <li>1161234567</li>
          </ul>
          <motion.button whileTap={{ scale: 1.2 }} className='clock__btn' ><Link to="/tienda" onClick={navigateToTop}>Volver a la tienda</Link></motion.button>
        </div>
      </section>
    </Helmet>
  );
};

export default Felicitaciones;