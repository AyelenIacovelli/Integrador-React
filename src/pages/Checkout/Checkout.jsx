import React, { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';
import Helmet from '../../components/Helmet/Helmet';
import CommonSection from '../../components/UI/common/CommonSection';
import "./checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);


  const [checkoutCartData, setCheckoutCartData] = useState({
    cantidad: totalQty,
    subtotal: totalAmount,
    envio: 0,
    totalPagar: totalAmount,
  });
  console.log(checkoutCartData)


  const resetCheckoutCart = () => {
    setCheckoutCartData({
      cantidad: 0,
      subtotal: 0,
      envio: 0,
      totalPagar: 0,
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido'),
    email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
    // phoneNumber: Yup.number().required('Campo requerido'),
    // address: Yup.string().required('Campo requerido'),
    // province: Yup.string().required('Campo requerido'),
    // postalCode: Yup.number().required('Campo requerido'),
    // locality: Yup.string().required('Campo requerido'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      province: '',
      postalCode: '',
      locality: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        // Guardar los datos del formulario en Firestore
        await setDoc(doc(db, 'checkout', 'data'), values);
        console.log('Datos del formulario guardados en Firestore');

        // Actualizar el estado de checkoutCartData con los valores deseados
        const updatedCheckoutCartData = {
          cantidad: totalQty,
          subtotal: totalAmount,
          totalPagar: totalAmount,
        };
        setCheckoutCartData(updatedCheckoutCartData);

        // Guardar los datos de checkoutCartData en Firestore
        await setDoc(doc(db, 'checkout', 'checkout_cart'), updatedCheckoutCartData);
        console.log('Datos de checkoutCartData guardados en Firestore');

        // Aquí puedes agregar cualquier otra lógica que necesites después de guardar los datos
        console.log('La compra se ha guardado exitosamente en Firestore');

        dispatch(clearCart());

        resetCheckoutCart();
        navigate('/felicitaciones');
      } catch (error) {
        console.error('Error al guardar la compra en Firestore:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors, isValid, isSubmitting } = formik;

  return (
    <Helmet title="Checkout">
      <CommonSection title="Verificación" />
      <section className='checkout__section'>

        <div className='billing__container'>
          <h3>Completa el Formulario</h3>
          <Form className="billing__container-form" onSubmit={handleSubmit}>
            <FormGroup className="form__group">
              <input
                type="text"
                placeholder="Escribe tu nombre"
                name="name"
                value={values.name}
                onChange={handleChange}
                className={errors.name && touched.name ? 'is-invalid' : ''}
              />
              {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}
            </FormGroup>
            <FormGroup className="form__group">
              <input
                type="email"
                placeholder="Escribe tu email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={errors.email && touched.email ? 'is-invalid' : ''}
              />
              {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
            </FormGroup>
            {/* Resto de los campos del formulario */}
            <button className='check__btn' type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Comprar'}
            </button>
          </Form>
        </div>
        <div className='buys__container'>
          {isSubmitting ? (
            <div className="loading">Cargando...</div>
          ) : (
            <div className="buys__container-cart">
              <h3>Datos de la compra</h3>
              <h6>Cantidad: <span>{totalQty} productos</span></h6>
              <h6>Subtotal: <span>${totalAmount}</span></h6>
              <h6>Envío: <span>$0</span></h6>
              <p>¡Envío gratis!</p>
              <h4>Total a pagar: <span>${totalAmount}</span></h4>
              {/* <button
                    type="submit"
                    className="buybtn auth__btn w-100"
                    onClick={handleSubmit}
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? 'Procesando...' : 'Realizar compra'}
                  </button> */}
            </div>
          )}
        </div>

      </section>
    </Helmet>
  );
};

export default Checkout;