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

  const handleAuthSuccess = (user: { user_id: number; nombre: string; email?: string }) => {
    console.log("=== handleAuthSuccess called ===");
    console.log("User data received:", user);

    // Get the complete user data from localStorage after successful auth
    const savedUser = localStorage.getItem('user');
    console.log("Saved user in localStorage:", savedUser);

    let completeUserData;
    if (savedUser) {
      try {
        completeUserData = JSON.parse(savedUser);
        console.log("Parsed user data:", completeUserData);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        completeUserData = {
          user_id: user.user_id,
          nombre: user.nombre,
          email: user.email || ''
        };
      }
    } else {
      completeUserData = {
        user_id: user.user_id,
        nombre: user.nombre,
        email: user.email || ''
      };
    }

    console.log("Complete user data to set:", completeUserData);
    setUserData(completeUserData);
    setIsAuthenticated(true);
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

  return <AdminPanel onClose={handleClose} userData={userData} onLogout={handleLogout} />;
}