import React from 'react'
import {Container, Row, Col} from "reactstrap"
import useGetData from '../custom-hooks/useGetData'
import {db} from "../firebase.config"
import {doc, deleteDoc} from "firebase/firestore"
import {toast} from "react-toastify"

const AllProducts = () => {

    const {data:productsData, loading} = useGetData('products')
    const deleteProduct = async(id) => {
        await deleteDoc(doc(db, 'products', id))
        toast.success("Producto borrado")
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        <table className='table'>
                            <thead>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Acción</th>
                            </thead>
                            <tbody>
                                {
                                  loading ? (<h4 className='py-5 text-center fw-bold'>Cargando...</h4>) : (productsData.map(item=>(
                                        <tr key={item.id}>
                                    <td><img src={item.imgUrl} alt="producto" /></td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td><button onClick={()=>{deleteProduct(item.id)}} className='btn btn-danger'>Borrar</button></td>
                                </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AllProducts