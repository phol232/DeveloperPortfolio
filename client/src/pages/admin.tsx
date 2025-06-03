import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AuthModal } from "@/components/admin/auth-modal";

interface UserData {
  user_id: number;
  nombre: string;
  email: string;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    console.log("=== Admin page useEffect ===");
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem('user');
    console.log("Saved user from localStorage:", savedUser);

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("Parsed user data:", parsedUser);

        // Ensure the user object has all required fields
        if (parsedUser.user_id && parsedUser.nombre) {
          setUserData({
            user_id: parsedUser.user_id,
            nombre: parsedUser.nombre,
            email: parsedUser.email || ''
          });
          setIsAuthenticated(true);
          console.log("User authenticated successfully");
        } else {
          console.log("Incomplete user data, removing from localStorage");
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem('user');
      }
    } else {
      console.log("No saved user found in localStorage");
    }
  }, []);

  const handleAuthSuccess = (user: { user_id: number; nombre: string; email?: string; token?: string }) => {
    console.log("=== handleAuthSuccess called ===");
    console.log("User data received:", user);

    // Asegurar que tenemos todos los datos necesarios
    const completeUserData: UserData = {
      user_id: user.user_id,
      nombre: user.nombre,
      email: user.email || ''
    };

    console.log("Complete user data to set:", completeUserData);

    // Verificar que los datos son válidos antes de guardar
    if (completeUserData.user_id && completeUserData.nombre) {
      setUserData(completeUserData);
      setIsAuthenticated(true);

      // Guardar también en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(completeUserData));
      if (user.token) {
        localStorage.setItem('auth_token', user.token);
      }

      console.log("User data successfully set and saved to localStorage");
    } else {
      console.error("Invalid user data received:", completeUserData);
    }
  };

  const handleClose = () => {
    setLocation("/");
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token'); // Limpiar también el token
    setUserData(null);
    setIsAuthenticated(false);
    setLocation("/");
  };

  if (!isAuthenticated) {
    return (
        <AuthModal
            isOpen={true}
            onClose={handleClose}
            onSuccess={handleAuthSuccess}
        />
    );
  }

  // Extra validation to ensure userData is not null
  if (!userData || !userData.user_id) {
    console.error("UserData is null or invalid, forcing re-authentication");
    setIsAuthenticated(false);
    return (
        <AuthModal
            isOpen={true}
            onClose={handleClose}
            onSuccess={handleAuthSuccess}
        />
    );
  }

  return <AdminPanel onClose={handleClose} userData={userData} onLogout={handleLogout} />;
}