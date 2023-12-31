import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tr } from '../Carrito/Carrito';
import { clearCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im"

const ModalCart = ({ onCloseModal }) => {

  const navigateToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalAmount = useSelector(state => state.cart.totalAmount)

  const handleClearCart = () => {
    const confirmed = window.confirm('¿Estás seguro que deseas eliminar todo el carrito?');
    if (confirmed) {
      dispatch(clearCart());
    }
  };

  const isCartEmpty = cartItems.length === 0;

  const handleCloseModal = () => {
    onCloseModal();
    navigateToTop();
  };

  return (
    <>
      <motion.div whileTap={{ scale: 1.2 }} className='exit' onClick={handleCloseModal}><ImCross /></motion.div>
      {isCartEmpty ? (
        <p className='cart__modal-p'>Aún no hay productos agregados al carrito</p>
      ) : (
        <>
          <h4 className='misproductos'>Mis productos</h4>
          <table className='table'>
            <tbody className='tbody'>
              {cartItems.map((item, index) => (
                <Tr item={item} key={index} className='table__body' />
              ))}
            </tbody>
          </table>
          <div className='cart__buttons'>
            <button className='clear-cart-button' onClick={handleClearCart} disabled={isCartEmpty}>
              Borrar todos los productos <FaTrashAlt />
            </button>
            <span className='subtotal'>Subtotal: ${totalAmount}</span>
            <div className='checkout'>
              <motion.button whileTap={{ scale: 1.2 }} className="checkout-button" onClick={handleCloseModal}>
                <Link to="/checkout" className="checkout-link">
                  Completar compra
                </Link>
              </motion.button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalCart;