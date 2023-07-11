import React, { useRef, useEffect, useState } from 'react'
import "../Header/header.css"
import userIcon from "../../assets/images/user-icon.png"
import logo from "../../assets/images/logo.png"

import { BsShop } from "react-icons/bs";
import { FaHeart, FaBars } from "react-icons/fa"

import { toast } from "react-toastify"

import { Link, NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase.config"

import useAuth from "../../custom-hooks/useAuth"

// import { selectFavoriteProductsCount } from './selectors';




import Modal from "react-modal"
// import Carrito from '../../pages/Carrito/Carrito';
import ModalCart from '../../pages/Carrito/ModalCart';




const nav__links = [
  {
    path: "home",
    display: "Inicio"
  },
  {
    path: "tienda",
    display: "Tienda"
  },
  {
    path: "carrito",
    display: "Carrito"
  },
]

const Header = () => {

  const navigateToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const [isProfileActionsOpen, setProfileActionsOpen] = useState(false);

  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };



  const toggleProfileActions = () => {
    // Cerrar el modal del carrito antes de cambiar el estado del perfil
    closeCartModal();
    setProfileActionsOpen(!isProfileActionsOpen);
  };

  const closeProfileActions = () => {
    setProfileActionsOpen(false);
  };

  // const cartItems = useSelector((state) => state.cart.cartItems);
  const closeCartModal = () => {
    setCartModalOpen(false);
  };




  // const favorites = useSelector((state) => state.favs.favorites);
  const favorites = useSelector((state) => state.favs.favorites);

  const headerRef = useRef(null)
  // const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const profileActionsRef = useRef(null)
  const profileImageRef = useRef(null);


  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  const logout = () => {
    signOut(auth).then(() => {
      toast.success("Sesión cerrada")
      navigate("/home")
    }).catch(err => {
      toast.error(err.message)
    })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  })



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileActionsRef.current &&
        !profileActionsRef.current.contains(event.target) &&
        !profileImageRef.current.contains(event.target)
      ) {
        closeProfileActions();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  // const navigateToCart = () => {
  //   navigate("/carrito")
  // }



  const navigateToFavs = () => {
    navigate("/favoritos")
  }



  // const toggleProfileActions = () => profileActionsRef.current.classList.toggle('show__profileActions')

  const favoriteProductsCount = favorites ? favorites.length : 0;

  return (
    <header className='header' ref={headerRef}>


      <div className='nav__wrapper'>
        <div className='logo'>
          <Link to="/home" onClick={navigateToTop}>
            <img src={logo} alt='logo' />
          </Link>
          {/* <h1>Grevery Store</h1> */}
        </div>
        <div className='navigation' ref={menuRef} onClick={menuToggle}>
          <motion.ul className='menu'>
            {
              nav__links.map((item, index) => (
                <li className='nav__item' key={index}>
                  <NavLink to={item.path} onClick={navigateToTop} className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                </li>
              ))
            }
          </motion.ul>
        </div>
        <div className='nav__icons'>
          <span className='fav__icon' onClick={navigateToFavs}>
            <FaHeart />
            <span className='badge'>{favoriteProductsCount}</span>
          </span>
          <span className='cart__icon' onClick={toggleCartModal}>
            <BsShop />
            <span className='badge'>{totalQuantity}</span>
          </span>

          <div className='profile'>
            <motion.img whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : userIcon} ref={profileImageRef} onClick={toggleProfileActions} alt='user' />
            <div
              className={`profile__actions${isProfileActionsOpen ? ' show__profileActions' : ''
                }`}
              ref={profileActionsRef}
            >
              {
                currentUser ? (<span onClick={logout}>Cerrar sesión</span>) : (<div className='user__action'>
                  <Link to='/signup'>Registrate</Link>
                  <Link to='/login'>Iniciar sesión</Link>
                  {/* <Link to='/dashboard'>Dashboard</Link> */}
                </div>)
              }
            </div>
          </div>

          <div className='mobile__menu'>
            <span onClick={menuToggle}>
              <FaBars />
            </span>
          </div>
        </div>

      </div>






      <Modal
        isOpen={isCartModalOpen}
        onRequestClose={toggleCartModal}
        contentLabel='Carrito de compras'
        className="modal-cart-content"
      >
        <ModalCart onCloseModal={closeCartModal} />
      </Modal>



    </header>

  )
}

export default Header