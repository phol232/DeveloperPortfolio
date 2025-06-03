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
    const savedToken = localStorage.getItem('auth_token');
    console.log("Saved user from localStorage:", savedUser);
    console.log("Saved token exists:", !!savedToken);

    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("Parsed user data:", parsedUser);

        // Ensure the user object has all required fields
        if (parsedUser.user_id && parsedUser.nombre) {
          const completeUserData: UserData = {
            user_id: parsedUser.user_id,
            nombre: parsedUser.nombre,
            email: parsedUser.email || ''
          };

          // Set userData first, then authentication
          setUserData(completeUserData);
          setTimeout(() => {
            setIsAuthenticated(true);
            console.log("User authenticated successfully from localStorage");
          }, 50);
        } else {
          console.log("Incomplete user data, removing from localStorage");
          localStorage.removeItem('user');
          localStorage.removeItem('auth_token');
        }
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      }
    } else {
      console.log("No saved user or token found in localStorage");
      if (savedUser && !savedToken) {
        // Clean incomplete data
        localStorage.removeItem('user');
      }
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
      // Guardar primero en localStorage
      localStorage.setItem('user', JSON.stringify(completeUserData));
      if (user.token) {
        localStorage.setItem('auth_token', user.token);
      }

      // Usar un callback para asegurar que userData se actualiza antes que isAuthenticated
      setUserData(completeUserData);

      // Pequeño delay para asegurar que el estado se actualiza correctamente
      setTimeout(() => {
        setIsAuthenticated(true);
        console.log("User data successfully set and authentication completed");
      }, 100);

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