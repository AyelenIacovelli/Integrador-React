import React, {useRef, useEffect} from 'react'
import "./header.css"

import { BsShop } from "react-icons/bs";
import {FaHeart, FaBars} from "react-icons/fa"

import {Container, Row} from "reactstrap"

import {NavLink} from "react-router-dom"
import {motion} from "framer-motion"
import {useSelector} from "react-redux"

const nav__links = [
  {
    path: "home",
    display: "Home"
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

  const headerRef = useRef(null)

  const totalQuantity = useSelector(state=>state.cart.totalQuantity)

  const menuRef = useRef(null)

   const stickyHeaderFunc = () => {
     window.addEventListener("scroll", () => {
       if(document.body.scrollTop > 115 || document.documentElement.scrollTop > 115) {
         headerRef.current.classList.add("sticky__header")
       } else {
         headerRef.current.classList.remove("sticky__header")
       }
     })
   }

   useEffect(()=>{
     stickyHeaderFunc()

    return () => window.removeEventListener("scroll", stickyHeaderFunc)
   })

  const menuToggle = () => menuRef.current.classList.toggle("active__menu")

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper'>
            <div className='logo'>
              <img src='' alt='logo' />
            </div>
            <div className='navigation' ref={menuRef} onClick={menuToggle}>
              <ul className='menu'>
                {
                  nav__links.map((item, index)=>(
                    <li className='nav__item' key={index}>
                      <NavLink to={item.path} className={(navClass)=> navClass.isActive ? "nav__active" : ""}>{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='nav__icons'>
              <span className='fav__icon'>
                <FaHeart />
                <span className='badge'>1</span>
              </span>
              <span className='cart__icon'>
                <BsShop />
                <span className='badge'>{totalQuantity}</span>
              </span>
              <span>
                <motion.img whileTap={{scale: 1.2}} src='' alt='user' />
              </span>
              <div className='mobile__menu'>
                <span onClick={menuToggle}>
                  <FaBars />
                </span>                
              </div>
            </div>
            
          </div>
        </Row>
      
    </Container>
    </header>
    
  )
}

export default Header