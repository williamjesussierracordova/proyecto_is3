import { Input, Button } from '@mantine/core';
import healthcare from '../../../../public/assets/healthcare.webp';
import logoHealthcare from '../../../../public/assets/logo_healthcare.webp';
import '../login/login.css';
import { validateEmail } from '../../validators/validator';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getFirebaseAuth } from '../../../firebase/firebase';
import { Loader } from '@mantine/core';
const auth = getFirebaseAuth();
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar si todos los campos son válidos
    const areAllFieldsValid = 
      !errors.email && 
      formData.email ;
    setIsFormValid(areAllFieldsValid);
  }, [formData, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Validar el campo cuando cambia
    let error = '';
    switch (name) {
      case 'email':
        error = validateEmail(value) ? '' : 'Email inválido';
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      // Aquí va el código para enviar el correo de recuperación de contraseña
      await sendPasswordResetEmail(auth, formData.email);
      setIsLoading(false);
      alert('Email sent, if you do not receive it, check your spam folder');
      navigate('/');
    }
    catch(error){
      console.error(error);
      setIsLoading(false);
      alert('An error occurred, please try again');
    }
  }

  return (
    <div className="login">
      <div className="login__image">
        <img src={healthcare} alt="Healthcare" />
      </div>
      <div className="login__form">
        <div className="login__form-logo">
          <img src={logoHealthcare} alt="Healthcare Logo" />
        </div>
        <div className="login__form-body">
          <h1 className="login__form-title">Recover Password</h1>
          <p style={{fontSize:'11px'}}>Enter your email so we can send you a recovery code</p>
          <form onSubmit={handleSubmit} className="login__form-container">
            <div className="login__form-inputs">
              <Input
                className="input"
                radius="xl"
                placeholder="Email adress"
                type='email'
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Button
                variant="light"
                color="rgba(252, 54, 255, 1)"
                size="md"
                radius="xl"
                fullWidth
                disabled={!isFormValid}
                type="submit"
              >
                {isLoading ? <Loader color="violet" size="lg" type="dots" /> : 'Send'}
              </Button>
              <div className="login__form-links">
                <p>So you have an acount? <a href="/">Sign in</a></p>
                <p>Don't have an account? <a href="/register">Sign up</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;