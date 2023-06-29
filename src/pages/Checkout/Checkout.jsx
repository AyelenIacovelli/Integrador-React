import React, { useState } from 'react'
import "../Checkout/checkout.css"
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useNavigate } from 'react-router-dom'


import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';







const Checkout = () => {

  
  const dispatch = useDispatch();



  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    adress: '',
    province: '',
    postalCode: '',
    locality: '',
  });


  

  const [checkoutCartData, setCheckoutCartData] = useState({
    cantidad: totalQty,
    subtotal: totalAmount,
    envio: 0,
    totalPagar: totalAmount,
  });

  
  
const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      adress: '',
      province: '',
      postalCode: '',
      locality: '',
    });
  };

  const resetCheckoutCart = () => {
    setCheckoutCartData({
      cantidad: 0,
      subtotal: 0,
      envio: 0,
      totalPagar: 0,
    });
  };

  // const saveDataToFirestore = async () => {
  //   try {
  //     await setDoc(doc(db, 'checkout', 'data'), formData);
  //     console.log('Datos guardados en Firestore');
  //   } catch (error) {
  //     console.error('Error al guardar los datos en Firestore', error);
  //   }
  // };




  const realizarCompra = async () => {
    try {
      setIsLoading(true);
      // Guardar los datos del formulario en Firestore
      await setDoc(doc(db, 'checkout', 'data'), formData);
      console.log('Datos del formulario guardados en Firestore');
  
      // Actualizar el estado de checkoutCartData con los valores deseados
      const updatedCheckoutCartData = {
        ...checkoutCartData,
        cantidad: totalQty,
        subtotal: totalAmount,
        totalPagar: totalAmount
      };
      setCheckoutCartData(updatedCheckoutCartData);
  
      // Guardar los datos de checkoutCartData en Firestore
      await setDoc(doc(db, 'checkout', 'checkout_cart'), updatedCheckoutCartData);
      console.log('Datos de checkoutCartData guardados en Firestore');
  
      // Aquí puedes agregar cualquier otra lógica que necesites después de guardar los datos
      console.log('La compra se ha guardado exitosamente en Firestore');
      


      dispatch(clearCart());



      resetForm();
      resetCheckoutCart();
      navigate('/felicitaciones');
    } catch (error) {
      console.error('Error al guardar la compra en Firestore:', error);
    }
  };
  return (
    <Helmet title="Checkout">
      <CommonSection title="Verificación" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className='mb-4 fw-bold'>Facturación</h6>
              <Form className='billingform'>
                <FormGroup className='formgroup'>
                  <input type="text" placeholder='Escribe tu nombre' name="name"
                    value={formData.name}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="email" placeholder='Escribe tu email' name="email"
                    value={formData.email}
                    onChange={handleChange} />
                </FormGroup>
<FormGroup className='formgroup'>
                  <input type="number" placeholder='Escribe tu número de teléfono' name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup className='formgroup'>
                  <input type="text" placeholder='Escribe tu dirección' name="adress"
                    value={formData.adress}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup className='formgroup'>
                  <input type="text" placeholder='Escribe tu Provincia' name="province"
                    value={formData.province}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup className='formgroup'>
                  <input type="number" placeholder='Escribe tu Código Postal' name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Escribe tu Localidad' name="locality"
                    value={formData.locality}
                    onChange={handleChange} />
                </FormGroup>
              </Form>
</Col>
            <Col lg="4">
            {isLoading ? (
  <div className="loading">Cargando...</div>
) : (
              <div className='checkoutcart'>
                <h6>Cantidad: <span>{totalQty} productos</span></h6>
                <h6>Subtotal: <span>${totalAmount}</span></h6>
                <h6>Envío: <span>$0</span></h6>
                <p>Envío gratis</p>
                <h4>Total a pagar: <span>${totalAmount}</span></h4>
                <button onClick={realizarCompra} className='buybtn auth__btn w-100'>Realizar compra</button>
              </div>)}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout