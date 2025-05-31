
import React, { useState } from "react";
import { useLocation } from "wouter";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AuthModal } from "@/components/admin/auth-modal";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleClose = () => {
    setLocation("/");
  };

  if (!isAuthenticated) {
    return (
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleClose}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  return <AdminPanel onClose={handleClose} />;
}
