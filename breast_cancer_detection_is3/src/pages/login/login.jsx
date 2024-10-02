import { useState, useEffect } from 'react';
import { Input, Button, PasswordInput, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import healthcare from '../../../public/assets/healthcare.webp';
import logoHealthcare from '../../../public/assets/logo_healthcare.webp';
import './login.css';
import { validateMedicalCode, validatePassword } from '../../components/validators/validator';
import useAuthStore from '../../stores/authStore';

const Login = () => {
  const [formData, setFormData] = useState({
    medicalCode: '',
    password: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const { login, isLoading, loginError, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/home');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
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
    await login(formData.medicalCode, formData.password);
  };

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
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? <Loader color="violet" size="lg" type="dots" /> : 'Sign in'}
              </Button>
              
              <div className="login__form-links">
                <p>Forgot your password? <a href="/recover_password">Click here</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;