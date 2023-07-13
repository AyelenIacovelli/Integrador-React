import React from 'react'
import "../Carrito/carrito.css"
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa"
import { deleteItem, incrementQuantity, decrementQuantity, clearCart } from "../../redux/slices/cartSlice"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"



const Carrito = () => {

  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  const dispatch = useDispatch()

  const handleClearCart = () => {
    const confirmed = window.confirm('¿Estás seguro que deseas eliminar todo el carrito?');
    if (confirmed) {
      dispatch(clearCart());
    }
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <Helmet title="Carrito de compras">
      <CommonSection title="Carrito de compras" />
      <section className='cart__section'>


        <div className='cart__container'>
          <h2>Tus productos</h2>
          <div className='cart__container-top'>
            {
              cartItems.length === 0 ? (<h2>No hay productos en el carrito</h2>) : (
                <table className='table bordered'>
                  {/* <thead>
                    <tr className='bordered-title'>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Borrar</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {
                      cartItems.map((item, index) => (
                        <Tr item={item} key={index} />
                      ))
                    }
                  </tbody>
                </table>
              )
            }

          </div>
          <h6 className='subtotal'>
            Subtotal:
            <span> ${totalAmount}</span>
          </h6>
          <div className='cart__container-bottom'>




            <div className='cart__container-bottom-buttons'>
              <button className="clear-cart-button" onClick={handleClearCart} disabled={isCartEmpty}>
                Borrar carrito <FaTrashAlt />
              </button>
              <button className='buy__btn'><Link to="/tienda">Continuar eligiendo productos</Link></button>
              <div className='checkout-btn'>
                <button className='checkout-button' disabled={isCartEmpty}><Link to={isCartEmpty ? '#' : "/checkout"}>Completar compra</Link></button>
              </div>

            </div>
          </div>
        </div>

      </section>
    </Helmet>
  )
}

export const Tr = ({ item }) => {

  const dispatch = useDispatch()

  const deleteProduct = () => {
    const confirmed = window.confirm('¿Estás seguro que deseas eliminar el producto del carrito?');
    if (confirmed) {
      dispatch(deleteItem(item.id))
    }

  }

  const incrementProductQuantity = () => {
    dispatch(incrementQuantity(item.id));
  };

  const decrementProductQuantity = () => {
    dispatch(decrementQuantity(item.id));
  };

  const totalPrice = item.price * item.quantity;

  return (
    <tr className=''>
    <td className='td-container'>
      
<div className='td-top'>
        <Link to={`/tienda/${item.id}`}>
          <img src={item.img} alt="img" />
        </Link>
        <span>{item.title}</span>
      </div>
      <div className='td-bottom'>
        <span>${totalPrice}</span>
        <div className='btns__quantity'>
          <button onClick={decrementProductQuantity} disabled={item.quantity === 1} className='btn__quantity decrement'>
            <FaMinus className='btn__quantity-icon' />
          </button>
          <span>{item.quantity}</span>
          <button onClick={incrementProductQuantity} className='btn__quantity increment'>
            <FaPlus className='btn__quantity-icon' />
          </button>
          <FaTrashAlt className='btn__trash' onClick={deleteProduct} />
        </div>
      </div>
      
      
    </td>
  </tr>
  )
}

export default Carrito