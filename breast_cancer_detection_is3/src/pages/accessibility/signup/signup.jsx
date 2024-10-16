import { useState } from 'react';
import { Input, Button, PasswordInput } from '@mantine/core';
import healthcare from '../../../../public/assets/healthcare.webp';
import logoHealthcare from '../../../../public/assets/logo_healthcare.webp';
import '../login/login.css';
import { validateEmail, validateMedicalCode, validatePassword } from '../../validators/validator.js';
import { writeUser } from '../../../firebase/userController.js';
import { useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth } from '../../../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';
import bcryptjs from 'bcryptjs';

const auth = getFirebaseAuth();

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    medicalCode: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar si todos los campos son válidos
    const areAllFieldsValid = 
      !errors.email && 
      !errors.medicalCode && 
      !errors.password && 
      !errors.confirmPassword &&
      formData.email && 
      formData.medicalCode && 
      formData.password && 
      formData.confirmPassword;

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
      case 'medicalCode':
        error = validateMedicalCode(value) ? '' : 'Código médico inválido';
        break;
      case 'password':
        error = validatePassword(value) ? '' : 'Contraseña inválida';
        break;
      case 'confirmPassword':
        error = value === formData.password ? '' : 'Las contraseñas no coinciden';
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
      let passwordEncrypted = bcryptjs.hashSync(formData.password, 10);
      await createUserWithEmailAndPassword(auth, formData.email, passwordEncrypted);
      writeUser(formData.medicalCode,formData.email,passwordEncrypted,'prueba','apellido1','apellido2',980312931);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Usuario creado');
          setIsLoading(false);
          navigate('/');
        } else {
          console.log('Usuario no creado');
          setIsLoading(false);
        }
      });
    }
    catch(error){
      console.error("Error creating user:" + error);
      setIsLoading(false);
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
          <h1 className="login__form-title">Sign up</h1>
          <form onSubmit={handleSubmit} className="login__form-container">
            <div className="login__form-inputs">
              <Input
                className="input"
                radius="xl"
                placeholder="Email address"
                type='email'
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                className="input"
                radius="xl"
                placeholder="Medical code"
                name="medicalCode"
                value={formData.medicalCode}
                onChange={handleChange}
                error={errors.medicalCode}
              />
              <PasswordInput
                radius="xl"
                placeholder="Input password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <PasswordInput
                radius="xl"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <Button
                type="submit"
                variant="light"
                color="rgba(252, 54, 255, 1)"
                size="md"
                radius="xl"
                fullWidth
                disabled = {!isFormValid}
              >
                {isLoading ? <Loader color="violet" size="lg" type="dots" /> : 'Sign up'}
              </Button>
              <div className="login__form-links">
                <p>Forgot your password? <a href="/recover_password">Click here</a></p>
                <p>Do you have an account? <a href="/">Sign in</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;