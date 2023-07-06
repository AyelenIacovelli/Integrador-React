import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tr } from '../Carrito/Carrito';
import { clearCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const ModalCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    const confirmed = window.confirm('¿Estás seguro que deseas eliminar todo el carrito?');
    if (confirmed) {
      dispatch(clearCart());
    }
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      {isCartEmpty ? (
        <p>Aún no hay productos agregados al carrito</p>
      ) : (
        <>
          <table className='table'>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <Tr item={item} key={index} />
              ))}
            </tbody>
          </table>
          <button className='clear-cart-button' onClick={handleClearCart} disabled={isCartEmpty}>
            Borrar todos los elementos
          </button>
          <button className="checkout-button">
            <Link to="/checkout" className="checkout-link">
              Ir al Checkout
            </Link>
          </button>
        </>
      )}
    </>
  );
};

export default ModalCart;