import React, { useState } from 'react'
import Helmet from "../../components/Helmet/Helmet"
import { Form, Field, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
// import "../Login/login.css"
import "../Signup/signup.css"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signIn = async (values) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            console.log(user);
            setLoading(false);
            toast.success('Sesión iniciada');
            navigate(-1);
        } catch (error) {
            setLoading(false);
            toast.error("Debe completar los campos");
        }
    };

    return (
        <Helmet title="Login">
            <section className="signup__section">
                {loading ? (
                    <div className="loading">
                        <h5>Cargando...</h5>
                    </div>
                ) : (
                    <div className="form__container">
                        <h3>Login</h3>

                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            onSubmit={signIn}
                        >
                            <Form className="auth__form">
                                <div className="form__group">
                                    <Field type="email" name="email" placeholder="Ingrese su correo" />
                                </div>
                                <div className="form__group">
                                    <Field type="password" name="password" placeholder="Ingrese su contraseña" />
                                </div>
                                <button type="submit" className="auth__btn">
                                    Ingresar
                                </button>
                                <p>
                                    ¿Aún no tienes cuenta? <Link to="/signup">Regístrate aquí</Link>{' '}
                                </p>
                            </Form>
                        </Formik>
                    </div>
                )}
            </section>
        </Helmet>
    );
};

export default Login;