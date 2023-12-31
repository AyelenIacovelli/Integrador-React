import React from 'react'
import {Container, Row, Col} from "reactstrap"
import useGetData from '../custom-hooks/useGetData'
import { deleteDoc, doc } from 'firebase/firestore'
import {db} from "../firebase.config"
import {toast} from "react-toastify"

const Users = () => {

    const {data: usersData, loading} = useGetData('users')

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id))
        toast.success("Usuario eliminado")
    }

  return (
    <section>
        <Container>
            <Row>
                <Col lg="12">
                    <h4 className='fw-bold'>Usuarios</h4>
                </Col>
                <Col lg="12" className='pt-5'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? <h5 className='pt-5 fw-bold'>Cargando...</h5> : usersData?.map(user=>(
                                    <tr key={user.uid}>
                                        <td><img src={user.photoURL} alt="foto" /></td>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td><button className='btn btn-danger' onClick={() => {
                                            deleteUser(user.uid)
                                        }}>Borrar</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Users