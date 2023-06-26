import React from 'react'
import { motion } from "framer-motion"
import "../products/productCard.css"
import { FaPlus } from "react-icons/fa"

// import "../../../data/Recomended"
import "../../../data/Products"

import { Link } from 'react-router-dom'
import { Col } from "reactstrap"
import { toast } from "react-toastify"

import { useDispatch } from "react-redux"
import { cartActions } from '../../../redux/slices/cartSlice'

const ProductCard = ({ item }) => {

    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            title: item.title,
            price: item.price,
            img: item.img,
        }))

        toast.success("Producto agregado correctamente al carrito")
    }

    return (
        <Col lg="2" md="4" className='mb-2'>
            <div className='product__item'>
                <div className='product__img'>
                    <motion.img whileHover={{ scale: 0.9 }} src={item.img} alt="producto" />
                </div>
                <div className='p-2 product__info'>
                    <h3 className='product__name'><Link to={`/tienda/${item.id}`}>{item.title}</Link></h3>
                    <span className='text-center d-block'>{item.category}</span>
                </div>
                <div className='product__card-bottom p-2'>
                    <span className='price'>
                        {item.price}
                    </span>
                    <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}><FaPlus className='more_icon' /></motion.span>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard