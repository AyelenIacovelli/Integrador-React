import React, { useState } from 'react'
import CommonSection from '../../components/UI/common/CommonSection'
import Helmet from "../../components/Helmet/Helmet"
import { Container, Row, Col } from 'reactstrap'
import { FaSearch } from "react-icons/fa"
import "../Tienda/tienda.css"
import { products } from "../../data/Products"
import ProductsList from "../../components/UI/products/ProductsList"

const Tienda = () => {

  const [productsData, setProductsData] = useState(products)
  // MANEJADOR DE FILTROS
  const handleFilter = (e) => {
    const filterValue = e.target.value
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
    }
  }

  // MANEJADOR DE BUSCADOR
  const handleSearch = e => {
    const searchTerm = e.target.value

    const searchedProducts = products.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchedProducts)
  }

  return (
    <Helmet title="Tienda">
      <CommonSection title="Productos" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className='filter__widget'>
                <select onChange={handleFilter}>
                  <option>Filtrar por categoría</option>
                  <option value="Tazas">Tazas</option>
                  <option value="Pijamas">Pijamas</option>
                  <option value="Remeras">Remeras</option>
                  <option value="Buzos">Buzos</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="3">
              <div className='filter__widget'>
                <select onChange={handleOrder}>
                  <option>Ordenar por:</option>
                  <option value="ascending">Menor precio</option>
                  <option value="descending">Mayor precio</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className='search__box'>
                <input type="text" placeholder='Buscar por título o personaje...' onChange={handleSearch} />
                <span><FaSearch /></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {
              productsData.length === 0 ? <h1 className='text-center fs-4'>No se encontraron productos</h1> : <ProductsList data={productsData} />
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Tienda