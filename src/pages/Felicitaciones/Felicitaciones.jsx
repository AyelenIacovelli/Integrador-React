import React from 'react'
import Helmet from '../../components/Helmet/Helmet'
import CommonSection from '../../components/UI/common/CommonSection'
import {Link} from "react-router-dom"

const Felicitaciones = () => {
  return (
    <Helmet title="Felicitaciones">
      <CommonSection title="Felicitaciones" />
      <section>
        <h2>¡Compra realizada con éxito!</h2>
        <p>Los detalles de tu compra y el seguimiento del envío te llegarán al mail que nos proporcionaste.</p>
        <p>Si tienes alguna duda, no dudes en comunicarte con nosotros:</p>
        <ul>
          <li>clientes@grevery.com</li>
          <li>1161234567</li>
        </ul>
        <button><Link to="/tienda">Volver a la tienda</Link></button>
      </section>
    </Helmet>
  );
};

export default Felicitaciones;