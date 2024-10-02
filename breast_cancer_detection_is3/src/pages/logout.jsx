import React from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout, isLoading } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Button
      onClick={handleLogout}
      loading={isLoading}
      color="red"
      variant="outline"
    >
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;