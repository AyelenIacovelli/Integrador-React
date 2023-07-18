import React, { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase.config';
import { v4 as uuidv4 } from 'uuid';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (file) {
        const storageRef = ref(storage, `images/${Date.now()}-${uuidv4()}-${username}`);
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
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });

            setLoading(false);
            toast.success('Cuenta creada');
            navigate('/login');
          }
        );
      } else {
        await updateProfile(user, {
          displayName: username,
        });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: username,
          email,
        });

        setLoading(false);
        toast.success('Cuenta creada');
        navigate('/login');
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
    <section className="signup__section">
      {loading ? (
        <div>
          <h5>Cargando...</h5>
        </div>
      ) : (
        <div className="form__container">
          <h3>Registro</h3>
          <Form className="auth__form" onSubmit={signup}>
            <FormGroup className="form__group">
              <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup className="form__group">
              <input type="email" placeholder="Ingrese su correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup className="form__group">
              <input type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup className="form__group">
              <input type="file" onChange={handleFileChange} />
            </FormGroup>
            <button type="submit" className="auth__btn">
              Crear una cuenta
            </button>
            <p>
              ¿Ya tienes cuenta? <Link to="/login">Login</Link>{' '}
            </p>
          </Form>
        </div>
      )}
    </section>
  );
};

export default Signup;