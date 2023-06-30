import React from 'react'
import "../Carrito/carrito.css"
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"
import { Container, Row, Col } from 'reactstrap'
import { FaTrashAlt } from "react-icons/fa"
import { deleteItem } from "../../redux/slices/cartSlice"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const Carrito = () => {

  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <Helmet title="Carrito de compras">
      <CommonSection title="Carrito de compras" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {
                cartItems.length === 0 ? (<h2 className='fs-4 text-center'>No hay productos en el carrito</h2>) : (
                  <table className='table bordered'>
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
                      {
                        cartItems.map((item, index) => (
                          <Tr item={item} key={index} />
                        ))
                      }
                    </tbody>
                  </table>
                )
              }
            </Col>
            <Col lg="3">
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>
                  Subtotal
                  <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-6 mt-2'>El envío se calculará al finalizar la compra</p>
              <div>
                <button className='buy__btn w-100'><Link to="/checkout">Verificar compra</Link></button>
                <button className='buy__btn w-100 mt-3'><Link to="/tienda">Continuar comprando</Link></button>
              </div>
            </Col>
          </Row>
        </Container>

      </section>
    </Helmet>
  )
}

const Tr = ({ item }) => {

  const dispatch = useDispatch()

  const deleteProduct = () => {
    dispatch(deleteItem(item.id))
  }

  return (
    <tr>
      <td><img src={item.img} alt="img" /></td>
      <td>{item.title}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td><FaTrashAlt onClick={deleteProduct} /></td>
    </tr>
  )
}

export default Carrito