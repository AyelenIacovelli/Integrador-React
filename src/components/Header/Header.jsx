import React, { useRef, useEffect, useState } from 'react'
import "../Header/header.css"
import userIcon from "../../assets/images/user-icon.png"
import logo2 from "../../assets/images/logo2.png"
import { FaHeart, FaBars, FaShoppingCart } from "react-icons/fa"
import { toast } from "react-toastify"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase.config"
import useAuth from "../../custom-hooks/useAuth"
import Modal from "react-modal"
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

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const favorites = useSelector((state) => state.favs.favorites);

  const headerRef = useRef(null)
  const profileActionsRef = useRef(null)
  const profileImageRef = useRef(null);


  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
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
  const menuClose = () => menuRef.current.classList.remove('active__menu')

  const navigateToFavs = () => {
    navigate("/favoritos")
  }

  const handleLinkClick = () => {
    setProfileActionsOpen(false);
  };

  const handleSesion = () => {
    logout();
    handleLinkClick();
  }

  const favoriteProductsCount = favorites ? favorites.length : 0;

  const menuCloseFavLink = () => {
    navigateToTop();
    menuClose();
    navigateToFavs();
  }

  const menuCloseCartLink = () => {
    menuClose();
    toggleCartModal();
  }

  return (
    <header className='header' ref={headerRef}>
      <div className='nav__wrapper'>
        <div className='logo' onClick={menuClose}>
          <Link to="/home" onClick={navigateToTop}>
            <img src={logo2} alt='logo' />
          </Link>
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
          <span className='fav__icon' onClick={menuCloseFavLink}>
            <FaHeart />
            <span className='badge'>{favoriteProductsCount}</span>
          </span>
          <span className='cart__icon' onClick={menuCloseCartLink}>
            <FaShoppingCart />
            <span className='badge'>{totalQuantity}</span>

            <Modal
              isOpen={isCartModalOpen}
              onRequestClose={toggleCartModal}
              contentLabel='Carrito de compras'
              className="modal-cart-content"
            >
              <ModalCart onCloseModal={closeCartModal} />
            </Modal>

          </span>

          <div className='profile' onClick={menuClose}>
            <motion.img whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : userIcon} ref={profileImageRef} onClick={toggleProfileActions} alt='user' />
            <div
              className={`profile__actions${isProfileActionsOpen ? ' show__profileActions' : ''
                }`}
              ref={profileActionsRef}
            >
              {
                currentUser ? (<Link onClick={handleSesion}>Cerrar sesión</Link>) : (<div className='user__action'>
                  <Link to='/signup' onClick={handleLinkClick}>Registrate</Link>
                  <Link to='/login' onClick={handleLinkClick}>Iniciar sesión</Link>
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
    </header>
  )
}

export default Header