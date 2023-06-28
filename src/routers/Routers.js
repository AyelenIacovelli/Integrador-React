import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"

import Home from "../pages/Home/Home"
import Carrito from "../pages/Carrito/Carrito"
import ProductDetails from "../pages/ProductDetails/ProductDetails"
import Checkout from "../pages/Checkout/Checkout"
import Login from "../pages/Login/Login"
import Signup from "../pages/Signup/Signup"
import Tienda from "../pages/Tienda/Tienda"
import ProtectedRoute from './ProtectedRoute'

import AddProducts from '../admin/AddProducts'
import AllProducts from '../admin/AllProducts'
import Dashboard from '../admin/Dashboard'
import Users from '../admin/Users'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="home" />} />
      <Route path='home' element={<Home />} />
      <Route path='tienda' element={<Tienda />} />
      <Route path='tienda/:id' element={<ProductDetails />} />
      <Route path='carrito' element={<Carrito />} />

      <Route path='/*' element={<ProtectedRoute />}>
        <Route path='checkout' element={<Checkout />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='dashboard/all-products' element={<AllProducts />} />
        <Route path='dashboard/add-product' element={<AddProducts />} />
        <Route path='dashboard/users' element={<Users />} />
      </Route>

      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Routes>
  )
}

export default Routers