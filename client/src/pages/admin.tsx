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
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUserData(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleAuthSuccess = (user: { user_id: number; nombre: string }) => {
    const completeUserData = {
      ...user,
      email: JSON.parse(localStorage.getItem('user') || '{}').email || ''
    };
    setUserData(completeUserData);
    setIsAuthenticated(true);
  };

  const handleClose = () => {
    setLocation("/");
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
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