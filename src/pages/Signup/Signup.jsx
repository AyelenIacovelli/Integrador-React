import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase.config';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import CommonSection from '../../components/UI/common/CommonSection';
import Helmet from '../../components/Helmet/Helmet';

const Signup = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es requerido'),
    email: Yup.string().email('Ingrese un correo válido').required('El correo es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  });

  const signup = async (values) => {
    setLoading(true);

    try {
      const isValid = await validationSchema.isValid(values);
      if (!isValid) {
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      if (file) {
        const storageRef = ref(storage, `images/${Date.now()}-${uuidv4()}-${values.username}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Progress monitoring if needed
          },
          (error) => {
            setLoading(false);
            toast.error(error.message);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, {
              displayName: values.username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: values.username,
              email: values.email,
              photoURL: downloadURL,
            });

            setLoading(false);
            toast.success('Cuenta creada');
            navigate(-1);
          }
        );
      } else {
        await updateProfile(user, {
          displayName: values.username,
        });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: values.username,
          email: values.email,
        });

        setLoading(false);
        toast.success('Cuenta creada');
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Algo salió mal');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Helmet title="Registrarse">
            <CommonSection title="Registrarse" />
    <section className="signup__section">
      
      {loading ? (
        <div>
          <h5>Cargando...</h5>
        </div>
      ) : (
        <div className="form__container">
          <h3 className='login-title'>Create una cuenta</h3>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              file: null
            }}
            onSubmit={signup}
            validationSchema={validationSchema}
          >
            <Form className="auth__form">
              <div className="form__group">
                <Field type="text" name="username" placeholder="Usuario" />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>
              <div className="form__group">
                <Field type="email" name="email" placeholder="Ingrese su correo" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form__group">
                <Field type="password" name="password" placeholder="Ingrese su contraseña" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div className="form__group">
                <input type="file" onChange={handleFileChange} />
              </div>
              <button type="submit" className="auth__btn">
                Crear una cuenta
              </button>
              <p>
                ¿Ya tienes cuenta? <Link to="/login">Login</Link>
              </p>
            </Form>
          </Formik>
        </div>
      )}
    </section>
    </Helmet>
  );
};

export default Signup;