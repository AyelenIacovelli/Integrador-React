import React from 'react'
import "./header.css"

import { BsShop } from "react-icons/bs";
import {FaHeart, FaBars} from "react-icons/fa"

import {NavLink} from "react-router-dom"
import {motion} from "framer-motion"

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
  return (
    <header>
      <nav>
        <div className='logo'>
          <img src='' alt='logo' />
        </div>
        <div className='navigation'>
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
            <span className='badge'>1</span>
          </span>
          <span>
            <motion.img whileTap={{scale: 1.1}} src='' alt='user' />
          </span>
        </div>
        <div className='mobile__menu'>
          <FaBars />
        </div>

      </nav>
    </header>
  )
}

export default Header