import React from 'react'
import { motion } from "framer-motion"
import "../products/productCard.css"
import "../../../data/Recomended"
import { Link } from 'react-router-dom'

const ProductCard = ({ item }) => {
    return (
        <div>
            <div className='product__item'>
                <div className='product__img'>
                    <motion.img whileHover={{ scale: 0.9 }} src={item.img} alt="producto" />
                </div>
                <div className='product__info'>
                    <h3 className='product__name'><Link to="/shop/${item.id}">{item.title}</Link></h3>
                    <span>{item.category}</span>
                </div>
                <div className='product__card-bottom'>
                    <span className='price'>
                        {item.price}
                    </span>
                    <motion.span whileTap={{ scale: 1.2 }}><img src="" alt="icono +" /></motion.span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard