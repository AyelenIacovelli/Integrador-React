import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
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
  console.log(checkoutCartData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetCheckoutCart = () => {
    setCheckoutCartData({
      cantidad: 0,
      subtotal: 0,
      envio: 0,
      totalPagar: 0,
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().matches(/^[A-Za-z ]*$/, 'No se permiten números').required('Campo requerido'),
    email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
    phoneNumber: Yup.number().required('Campo requerido'),
    address: Yup.string().required('Campo requerido'),
    province: Yup.string().required('Campo requerido'),
    postalCode: Yup.number().required('Campo requerido'),
    locality: Yup.string().required('Campo requerido'),
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
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
      setIsSubmitting(false);
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Completar compra" />
      <h2 className='checkout-title'>¡Ultimos pasos!</h2>
      <section className='checkout__section'>
        <div className='checkout__container'>
          <div className='buys__container'>
            <div className="buys__container-cart">
              <h3 className='billing__container-title'>Datos de la compra</h3>
              <h6>Cantidad: <span>{totalQty} productos</span></h6>
              <h6>Subtotal: <span>${totalAmount}</span></h6>
              <h6>Envío: <span>$0</span></h6>
              <p>¡Envío gratis!</p>
              <h4>Total a pagar: <span>${totalAmount}</span></h4>
            </div>
          </div>
          <div className='billing__container'>
            <h3 className='billing__container-title'>Completa el Formulario</h3>
            <Formik
              initialValues={{
                name: '',
                email: '',
                phoneNumber: '',
                address: '',
                province: '',
                postalCode: '',
                locality: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, touched, errors, handleChange, isValid }) => (
                <Form className="billing__container-form">
                  <div className="form__group-check">
                    <Field
                      type="text"
                      placeholder="Escribe tu nombre"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      className={errors.name && touched.name ? 'is-invalid' : ''}
                    />
                    {errors.name && touched.name && <small className="invalid-feedback">{errors.name}</small>}
                  </div>
                  <div className="form__group-check">
                    <Field
                      type="email"
                      placeholder="Escribe tu email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className={errors.email && touched.email ? 'is-invalid' : ''}
                    />
                    {errors.email && touched.email && <small className="invalid-feedback">{errors.email}</small>}
                  </div>
                  <div className="form__group-check">
                    <Field
                      type="number"
                      placeholder="Escribe tu número de celular"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      className={errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''}
                    />
                    {errors.phoneNumber && touched.phoneNumber && <small className="invalid-feedback">{errors.phoneNumber}</small>}
                  </div>
                  <div className="form__group-check">
                    <Field
                      type="text"
                      placeholder="Escribe tu dirección"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      className={errors.address && touched.address ? 'is-invalid' : ''}
                    />
                    {errors.address && touched.address && <small className="invalid-feedback">{errors.address}</small>}
                  </div>
                  <div className="form__group-check">
                    <Field
                      type="text"
                      placeholder="Escribe tu Provincia"
                      name="province"
                      value={values.province}
                      onChange={handleChange}
                      className={errors.province && touched.province ? 'is-invalid' : ''}
                    />
                    {errors.province && touched.province && <small className="invalid-feedback">{errors.province}</small>}
                  </div>
                  <div className="form__group-check">
                    <Field
                      type="number"
                      placeholder="Escribe tu Código Postal"
                      name="postalCode"
                      value={values.postalCode}
                      onChange={handleChange}
                      className={errors.postalCode && touched.postalCode ? 'is-invalid' : ''}
                    />
                    {errors.postalCode && touched.postalCode && <small className="invalid-feedback">{errors.postalCode}</small>}
                  </div>
                  <div className="form__group-check">
                    <Field
                      type="text"
                      placeholder="Escribe tu Localidad"
                      name="locality"
                      value={values.locality}
                      onChange={handleChange}
                      className={errors.locality && touched.locality ? 'is-invalid' : ''}
                    />
                    {errors.locality && touched.locality && <small className="invalid-feedback">{errors.locality}</small>}
                  </div>
                  <button className='check__btn' type="submit" disabled={!isValid || isSubmitting}>
                    {isSubmitting ? 'Comprando...' : 'Completar compra'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Checkout;