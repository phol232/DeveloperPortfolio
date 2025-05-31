import React, { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { AdminPanel } from "@/components/admin/admin-panel";

export default function Home() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminMode(true);
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
  };

  // Si está en modo admin, solo mostrar el panel administrativo
  if (isAdminMode) {
    return <AdminPanel onClose={handleAdminLogout} />;
  }

  // Mostrar la página normal
  return (
    <div className="min-h-screen bg-background">
      <Header onAdminLogin={handleAdminLogin} />
      <main className="relative">
        <Hero />
        <Services />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}