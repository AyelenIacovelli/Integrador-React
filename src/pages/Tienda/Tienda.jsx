import React, { useState } from 'react'
import CommonSection from '../../components/UI/common/CommonSection'
import Helmet from "../../components/Helmet/Helmet"

import { FaSearch } from "react-icons/fa"
import "../Tienda/tienda.css"
import { products } from "../../data/Products"
import ProductsList from "../../components/UI/products/ProductsList"



const Tienda = () => {

  const [productsData, setProductsData] = useState(products)
  const [displayCount, setDisplayCount] = useState(8);

  // MANEJADOR DE FILTROS
  const handleFilter = (e) => {
    const filterValue = e.target.value

    if (filterValue === "") {
      setProductsData(products);
    }

    if (filterValue === "Tazas") {
      const filteredProducts = products.filter((item) => item.category === "Tazas")

      setProductsData(filteredProducts)
    }
    if (filterValue === "Pijamas") {
      const filteredProducts = products.filter((item) => item.category === "Pijamas")

      setProductsData(filteredProducts)
    }
    if (filterValue === "Remeras") {
      const filteredProducts = products.filter((item) => item.category === "Remeras")

      setProductsData(filteredProducts)
    }
    if (filterValue === "Buzos") {
      const filteredProducts = products.filter((item) => item.category === "Buzos")

      setProductsData(filteredProducts)
    }
    setDisplayCount(8);
  }



  // MANEJADOR DE ORDEN
  const handleOrder = (e) => {
    const orderValue = e.target.value;

    if (orderValue === "ascending") {
      const sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
      setProductsData(sortedProducts);
    }
    if (orderValue === "descending") {
      const sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
      setProductsData(sortedProducts);
      setDisplayCount(8);
    }
  }

  // MANEJADOR DE BUSCADOR
  const handleSearch = e => {
    const searchTerm = e.target.value

    const searchedProducts = products.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchedProducts)
    setDisplayCount(8);
  }

  // Cargar más productos
  const loadMoreProducts = () => {
    setDisplayCount((prevCount) => prevCount + 8);
  };

  return (
    <Helmet title="Tienda">
      <CommonSection title="Productos" />

      <section className='shop__section'>
        <div className='shop__container'>


          <div className='filter__widget'>
            <select onChange={handleFilter}>
              <option>Filtrar por categoría</option>
              <option value="">Todos</option>
              <option value="Tazas">Tazas</option>
              <option value="Pijamas">Pijamas</option>
              <option value="Remeras">Remeras</option>
              <option value="Buzos">Buzos</option>
            </select>
          </div>


          <div className='filter__widget'>
            <select onChange={handleOrder}>
              <option>Ordenar por:</option>
              <option value="ascending">Menor precio</option>
              <option value="descending">Mayor precio</option>
            </select>
          </div>


          <div className='search__box'>
            <input type="text" placeholder='Buscar por título o personaje...' onChange={handleSearch} />
            <span><FaSearch /></span>
          </div>


        </div>
      </section>


      <section className="products__section">
        <div className="products__container">
          {productsData.length === 0 ? (
            <h1>No se encontraron productos</h1>
          ) : (
            <>
              <div className='products__container-list'>
                <ProductsList data={productsData.slice(0, displayCount)} /></div>
              {displayCount < productsData.length && (
                <button className="load-more" onClick={loadMoreProducts}>
                  Cargar más productos
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </Helmet>
  )
}

export default Tienda