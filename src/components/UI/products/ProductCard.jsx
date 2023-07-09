import React from 'react'
import { motion } from "framer-motion"
import "../products/productCard.css"
import { FaPlus } from "react-icons/fa"
import { AiTwotoneFire } from "react-icons/ai"

// import "../../../data/Recomended"
import "../../../data/Products"

import { Link } from 'react-router-dom'
import { Col } from "reactstrap"
import { toast } from "react-toastify"

import { useDispatch, useSelector } from "react-redux"
import { addItem } from '../../../redux/slices/cartSlice'



import { toggleFavorite } from '../../../redux/slices/favsSlice'
import { FaHeart } from "react-icons/fa"

const ProductCard = ({ item }) => {

    // const [isClicked, setIsClicked] = useState(false);

    const dispatch = useDispatch()

    // const cart = useSelector((state) => state.cart);
    const favorites = useSelector((state) => state.favs.favorites);

    const isFavorite = favorites.includes(item.id);

    const addToCart = () => {
        dispatch(addItem({
            id: item.id,
            title: item.title,
            price: item.hasOwnProperty("pricesale") ? item.pricesale : item.price,
            img: item.img,
        }))

        toast.success("Producto agregado correctamente al carrito")
    }

    const handleIconClick = () => {
        dispatch(toggleFavorite(item.id)); // Invierte el estado individual al hacer clic
    }


    const isPriceSale = item.hasOwnProperty('pricesale');
    const showOfferFire = isPriceSale ? 'show' : '';

    return (
        <Col lg="2" md="4" className='mb-2'>
            <div className={`product__item ${isFavorite ? 'favorite' : ''}`}>
                <div className='product__img'>
                    {isPriceSale && <span className={`offer-fire ${showOfferFire}`}><AiTwotoneFire /></span>}
                    <Link to={`/tienda/${item.id}`}><motion.img whileHover={{ scale: 0.9 }} src={item.img} alt="producto" /></Link>
                </div>

                <div className='p-2 product__info'>
                    <h3 className='product__name'><Link to={`/tienda/${item.id}`}>{item.title}</Link></h3>
                    <span className={`favs ${isFavorite ? 'clicked' : ''}`}>
                        <FaHeart className={`favs__icon ${isFavorite ? 'clicked' : ''}`} onClick={handleIconClick} />
                    </span>
                    <span className='text-center d-block'>{item.category}</span>
                </div>
                <div className='product__card-bottom p-2'>
                    <span className="price">
                        <span className={`price-original ${isPriceSale ? 'strikethrough' : ''}`}>${item.price}</span>
                        {isPriceSale && <span className="price-sale">${item.pricesale}</span>}
                    </span>
                    <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}><FaPlus className='more_icon' /></motion.span>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard