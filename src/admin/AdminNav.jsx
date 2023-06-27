import React from 'react'
import { Container, Row } from "reactstrap"
import { FaSearch } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import { FcSettings } from "react-icons/fc"
import useAuth from "../custom-hooks/useAuth"
import "./styles/adminNav.css"
import { NavLink } from "react-router-dom"

const admin__nav = [
    {
        display: 'Dashboard',
        path: '/dashboard'
    },
    {
        display: 'All-Products',
        path: '/dashboard/all-products'
    },
    {
        display: 'Orders',
        path: '/dashboard/orders'
    },
    {
        display: 'Users',
        path: '/dashboard/users'
    },
]

const AdminNav = () => {

    const { currentUser } = useAuth()

    return (
        <>
            <header className='admin__header'>
                <div className='admin__nav-top'>
                    <Container>
                        <div className='admin__nav-wrapper-top'>
                            <div className='logo'>
                                <h2>Grevery Store</h2>
                            </div>
                            <div className='search__box'>
                                <input type="text" placeholder='Buscar...' />
                                <span><FaSearch /></span>
                            </div>
                            <div className='admin__nav-top-right'>
                                <span><IoIosNotifications /></span>
                                <span><FcSettings /></span>
                                <img src={currentUser.photoURL} alt="user" />
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            <section>
                <Container className='admin__menu p-0'>
                    <Row>
                        <div className='admin__navigation'>
                            <ul className='admin__menu-list'>
                                {
                                    admin__nav.map((item, index) => (
                                        <li className='admin__menu-item' key={index}>
                                            <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__admin-menu' : ''}>{item.display}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default AdminNav