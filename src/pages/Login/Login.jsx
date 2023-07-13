import React, { useState } from 'react'
import Helmet from "../../components/Helmet/Helmet"
import { Form, FormGroup } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
// import "../Login/login.css"
import "../Signup/signup.css"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from "react-toastify"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const signIn = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            console.log(user)
            setLoading(false)
            toast.success("Sesión iniciada")
            navigate("/checkout")
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }


    return (
        <Helmet title="Login">
            <section className='signup__section'>


                {
                    loading ? (<div className='loading'><h5>Cargando...</h5></div>) : (<div className='form__container'>
                        <h3>Login</h3>

                        <Form className='auth__form' onSubmit={signIn}>
                            <FormGroup className='form__group'>
                                <input type="email" placeholder='Ingrese su correo' value={email} onChange={e => setEmail(e.target.value)} />
                            </FormGroup>
                            <FormGroup className='form__group'>
                                <input type="password" placeholder='Ingrese su contraseña' value={password} onChange={e => setPassword(e.target.value)} />
                            </FormGroup>
                            <button type='submit' className='auth__btn'>Ingresar</button>
                            <p>¿Aún no tienes cuenta? <Link to="/signup">Regístrate aquí</Link> </p>
                        </Form>
                    </div>)
                }


            </section>
        </Helmet>
    )
}

export default Login