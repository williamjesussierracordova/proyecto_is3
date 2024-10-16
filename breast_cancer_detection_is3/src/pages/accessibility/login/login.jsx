import { useState, useEffect } from 'react';
import { Input, Button, PasswordInput } from '@mantine/core';
import healthcare from '../../../../public/assets/healthcare.webp';
import logoHealthcare from '../../../../public/assets/logo_healthcare.webp';
import './login.css';
import { validateMedicalCode, validatePassword } from '../../validators/validator';
import { useNavigate } from 'react-router-dom';
import { getFirebaseAuth } from '../../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { readUser } from '../../../firebase/userController';
import bcryptjs from 'bcryptjs'
import { Loader } from '@mantine/core';

const auth = getFirebaseAuth();

const Login = () => {
  const [formData, setFormData] = useState({
    medicalCode: '',
    password: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // Verificar si todos los campos son válidos
    const areAllFieldsValid = 
      !errors.medicalCode && 
      !errors.password &&
      formData.medicalCode && 
      formData.password;

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
      case 'medicalCode':
        error = validateMedicalCode(value) ? '' : 'Código médico inválido';
        break;
      case 'password':
        error = validatePassword(value) ? '' : 'Contraseña inválida';
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
    let userData = await readUser(formData.medicalCode);
    console.log(userData);
    if(!userData){
      setIsLoading(false);
      setLoginError("You are not registered in the system, please sign up");
      return;
    }
    try{
      const validPassword = await bcryptjs.compare(userData.password, formData.password);
      if(!validPassword){
        await signInWithEmailAndPassword(auth, userData.email , userData.password);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoginError("");
            console.log(userData);
            setIsLoading(false);
            navigate('/home');
          }
          else{
            console.log("No user is signed in");
            setIsLoading(false);
          }
        }
        );
      }
      else{
        setIsLoading(false);
        setLoginError("Medical code or/and password incorrect");
      }
    }
    catch (error) {
      console.error("Error signing in:", error);
      setIsLoading(false);
      setLoginError("Medical code or/and password incorrect");
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
          <h1 className="login__form-title">Sign in</h1>
          <form onSubmit={handleSubmit} className="login__form-container">
            <div className="login__form-inputs">
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
              {loginError && (
                <p style={{color:"red",fontSize:'10px',align:"center",mt:"sm"}}>
                  {loginError}
                </p>
              )}
              <Button
                type="submit"
                variant="light"
                color="rgba(252, 54, 255, 1)"
                size="md"
                radius="xl"
                fullWidth
                disabled={!isFormValid}
              >
                {isLoading ? <Loader color="violet" size="lg" type="dots" /> : 'Sign in'}
              </Button>
              
              <div className="login__form-links">
                <p>Forgot your password? <a href="/recover_password">Click here</a></p>
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