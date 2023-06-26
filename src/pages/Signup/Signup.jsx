import React, {useState} from 'react'
import Helmet from "../../components/Helmet/Helmet"
import {Container, Row, Col, Form, FormGroup} from "reactstrap"
import {Link} from "react-router-dom"
import "../Signup/signup.css"
import "../Login/login.css"
import { useNavigate } from 'react-router-dom'

import {toast} from "react-toastify"

import { storage } from '../../firebase.config'
import { auth } from '../../firebase.config'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase.config'

import { v4 as uuidv4 } from "uuid"

const Signup = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const signup = async (e) => {
      e.preventDefault()
      setLoading(true)

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user

        const storageRef = ref(storage, `images/${Date.now()}-${uuidv4()}-${username}`)
        console.log(Date.now());
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on((error) => {
          toast.error(error.message)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            // CARGAR USUARIO
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            })

            // DATA DE USUARIO EN FIRESTORE
            await setDoc(doc(db, "users", user.uid),{
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            })

          })
        })
        
        setLoading(false)
        toast.success("Cuenta creada")
        navigate("/login")
      } catch (error) {
        setLoading(false)
        toast.error("Algo salió mal")
      }
    }

  return (
    <Helmet title="Registro">
        <section>
            <Container>
                <Row>
                    {
                      loading? (<Col lg="12" className='text-center'><h5 className='fw-bold'>Cargando...</h5></Col>) : (<Col lg="6" className='m-auto text-center'>
                      <h3 className='fw-bold mb-4'>Registro</h3>
                      <Form className='auth__form' onSubmit={signup}>
                      <FormGroup className='form__group'>
                              <input type="text" placeholder='Usuario' value={username} onChange={e=> setUsername(e.target.value)} />                                
                          </FormGroup>
                          <FormGroup className='form__group'>
                              <input type="email" placeholder='Ingrese su correo' value={email} onChange={e=> setEmail(e.target.value)} />                                
                          </FormGroup>
                          <FormGroup className='form__group'>
                          <input type="password" placeholder='Ingrese su contraseña' value={password} onChange={e=> setPassword(e.target.value)} />
                          </FormGroup>
                          <FormGroup className='form__group'>
                          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                          </FormGroup>
                          <button type='submit' className='buy__btn auth__btn'>Create una cuenta</button>
                          <p>¿Ya tienes cuenta? <Link to="/login">Login</Link> </p>
                      </Form>
                  </Col>) 
                    }
                </Row>
            </Container>
        </section>
    </Helmet>
  )
}

export default Signup