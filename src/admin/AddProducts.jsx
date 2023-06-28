import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import { toast } from "react-toastify"

import { db, storage } from "../firebase.config"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'

const AddProducts = () => {

    const [enterTitle, setEnterTitle] = useState('')
    const [enterDescription, setEnterDescription] = useState('')
    const [enterCategory, setEnterCategory] = useState('')
    const [enterPrice, setEnterPrice] = useState('')
    const [enterProductImg, setEnterProductImg] = useState(null)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const addProduct = async (e) => {
        e.preventDefault()
        setLoading(true)

        // AGREGO PRODUCTO A FIREBASE
        try {
            const docRef = await collection(db, 'products')
            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
            // `images/${Date.now()}-${uuidv4()}-${username}`
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)
            uploadTask.on(() => {
                toast.error("Imagen sin cargar")
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await addDoc(docRef, {
                        title: enterTitle,
                        description: enterDescription,
                        category: enterCategory,
                        price: enterPrice,
                        img: downloadURL,
                    })
                })
            })
            setLoading(false)
            toast.success("Producto agregado correctamente")
            navigate('/dashboard/all-products')
        } catch (err) {
            setLoading(false)
            toast.error("Producto no agregado")
        }
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {
                            loading ? (<h4 className='py-5'>Cargando...</h4>) : (<>
                                <h4 className='mb-5'>Agregar producto</h4>
                                <Form onSubmit={addProduct}>
                                    <FormGroup className='form__group'>
                                        <span>Nombre del producto</span>
                                        <input type="text" placeholder='double sofa' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                                    </FormGroup>
                                    <FormGroup className='form__group'>
                                        <span>Descripción</span>
                                        <input type="text" placeholder='descripcion' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                                    </FormGroup>
                                    <div className='d-flex align-items-center justifi-content-between'>
                                        <FormGroup className='form__group w-50'>
                                            <span>Precio</span>
                                            <input type="number" placeholder='$100' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                                        </FormGroup>
                                        <FormGroup className='form__group w-50'>
                                            <span>Categoría</span>
                                            <select className='w-100 p-2' value={enterCategory} onChange={e => setEnterCategory(e.target.value)} >
                                                <option>Seleccioná la categoría</option>
                                                <option value="Tazas">Tazas</option>
                                                <option value="Pijamas">Pijamas</option>
                                                <option value="Remeras">Remeras</option>
                                                <option value="Buzos">Buzos</option>
                                            </select>
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className='form__group'>
                                            <span>Imagen</span>
                                            <input type='file' onChange={e => setEnterProductImg(e.target.files[0])} required />
                                        </FormGroup>
                                    </div>
                                    <button className='buy__btn' type='submit'>Agregar producto</button>
                                </Form>
                            </>)
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AddProducts