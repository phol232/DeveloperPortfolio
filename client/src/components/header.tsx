import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { AuthModal } from "@/components/admin/auth-modal";
import { AdminPanel } from "@/components/admin/admin-panel";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "projects", "experience", "contact"];
      // Ajustamos el offset para diferentes dispositivos
      const offset = window.innerWidth < 768 ? 150 : 100;
      const scrollPosition = window.scrollY + offset;

      // Encontrar la sección más cercana al scroll actual
      let activeSection = sections[0];
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const distance = Math.abs(scrollPosition - offsetTop);

          if (distance < minDistance) {
            minDistance = distance;
            activeSection = section;
          }

          // Si estamos claramente dentro de una sección, la activamos inmediatamente
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }

      // Si no encontramos una sección clara, usamos la más cercana
      setActiveSection(activeSection);
    };

    // Throttle para mejor rendimiento en móviles
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    // Ejecutar una vez al cargar para establecer la sección inicial
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Primero cerramos el menú móvil
    setIsOpen(false);

    // Simple y efectivo - funciona en iOS y Android
    const element = document.getElementById(sectionId);
    if (element) {
      // Ajustamos el offset para diferentes dispositivos
      const offset = window.innerWidth < 768 ? 60 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Usamos la forma más simple y confiable de scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Actualizamos manualmente la sección activa
      setActiveSection(sectionId);
    }
  };

  if (showAdminPanel) {
    return (
        <AdminPanel
            onClose={() => setShowAdminPanel(false)}
            onLogout={() => {
              setIsAuthenticated(false);
              setShowAdminPanel(false);
            }}
            userData={null}
        />
    );
  }

  // Check if we're on the courses page
  const isCoursesPage = window.location.pathname === '/cursos';

  const handleNavigation = (target: string) => {
    if (isCoursesPage && target.startsWith('#')) {
      // If we're on courses page and clicking a home section, go to home first
      window.location.href = `/${target}`;
    } else if (target.startsWith('#')) {
      // Smooth scroll to section on same page
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to different page
      window.location.href = target;
    }
    setIsOpen(false);
  };

  return (
      <>
        <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
          <div className="container mx-auto px-6 py-5">
            <nav className="flex items-center justify-between">
              <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('/')}>
                <div className="text-xl font-bold text-white flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                  <span className="ml-2 font-bold tracking-tight">PHOL EDWIN TAQUIRI ROJAS</span>
                </div>
              </div>

              <div className="hidden md:flex space-x-8">
                <button
                    onClick={() => handleNavigation(isCoursesPage ? '/#home' : '#home')}
                    className={`relative font-medium hover:text-white transition-colors nav-link ${
                        activeSection === "home" ? "text-white after:w-full" : "text-gray-200"
                    }`}
                >
                  Inicio
                  <span
                      className={`absolute left-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          activeSection === "home" ? "w-full" : "w-0"
                      }`}
                  />
                </button>
                <button
                    onClick={() => handleNavigation(isCoursesPage ? '/#services' : '#services')}
                    className={`relative font-medium hover:text-white transition-colors nav-link ${
                        activeSection === "services" ? "text-white after:w-full" : "text-gray-200"
                    }`}
                >
                  Servicios
                  <span
                      className={`absolute left-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          activeSection === "services" ? "w-full" : "w-0"
                      }`}
                  />
                </button>
                <button
                    onClick={() => handleNavigation(isCoursesPage ? '/#projects' : '#projects')}
                    className={`relative font-medium hover:text-white transition-colors nav-link ${
                        activeSection === "projects" ? "text-white after:w-full" : "text-gray-200"
                    }`}
                >
                  Proyectos
                  <span
                      className={`absolute left-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          activeSection === "projects" ? "w-full" : "w-0"
                      }`}
                  />
                </button>
                <button
                    onClick={() => handleNavigation(isCoursesPage ? '/#experience' : '#experience')}
                    className={`relative font-medium hover:text-white transition-colors nav-link ${
                        activeSection === "experience" ? "text-white after:w-full" : "text-gray-200"
                    }`}
                >
                  Experiencia
                  <span
                      className={`absolute left-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          activeSection === "experience" ? "w-full" : "w-0"
                      }`}
                  />
                </button>
                <button
                    onClick={() => handleNavigation(isCoursesPage ? '/#contact' : '#contact')}
                    className={`relative font-medium hover:text-white transition-colors nav-link ${
                        activeSection === "contact" ? "text-white after:w-full" : "text-gray-200"
                    }`}
                >
                  Contacto
                  <span
                      className={`absolute left-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          activeSection === "contact" ? "w-full" : "w-0"
                      }`}
                  />
                </button>
                <button
                    onClick={() => handleNavigation('/cursos')}
                    className={`relative font-medium hover:text-white transition-colors nav-link ${
                        false ? "text-white after:w-full" : "text-gray-200"
                    }`}
                >
                  Cursos Línea
                  <span
                      className={`absolute left-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          false ? "w-full" : "w-0"
                      }`}
                  />
                </button>
                <button
                    onClick={() => {
                      console.log("Admin button clicked");
                      setShowAuthModal(true);
                    }}
                    className="relative font-medium hover:text-white transition-colors nav-link text-gray-200"
                >
                  Admin
                  <span className="absolute left-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 w-0 hover:w-full"></span>
                </button>
              </div>

              <button
                  className="md:hidden text-white focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="md:hidden mt-4 pb-4 overflow-hidden fixed inset-x-0 bg-background/95 backdrop-blur-md border-b border-primary/10 px-6"
                      style={{ top: "64px", zIndex: 40 }}
                  >
                    <div className="flex flex-col space-y-4 py-3 max-w-md mx-auto">
                      <button
                          onClick={() => handleNavigation(isCoursesPage ? '/#home' : '#home')}
                          className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                      >
                        <span>Inicio</span>
                        <span className="opacity-50 text-primary">→</span>
                      </button>

                      <button
                          onClick={() => handleNavigation(isCoursesPage ? '/#services' : '#services')}
                          className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                      >
                        <span>Servicios</span>
                        <span className="opacity-50 text-primary">→</span>
                      </button>

                      <button
                          onClick={() => handleNavigation(isCoursesPage ? '/#projects' : '#projects')}
                          className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                      >
                        <span>Proyectos</span>
                        <span className="opacity-50 text-primary">→</span>
                      </button>

                      <button
                          onClick={() => handleNavigation(isCoursesPage ? '/#experience' : '#experience')}
                          className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                      >
                        <span>Experiencia</span>
                        <span className="opacity-50 text-primary">→</span>
                      </button>

                      <button
                          onClick={() => handleNavigation(isCoursesPage ? '/#contact' : '#contact')}
                          className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                      >
                        <span>Contacto</span>
                        <span className="opacity-50 text-primary">→</span>
                      </button>

                      <button
                          onClick={() => handleNavigation('/cursos')}
                          className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                      >
                        <span>Cursos Línea</span>
                        <span className="opacity-50 text-primary">→</span>
                      </button>

                      <button
                          onClick={() => {
                            console.log("Mobile Admin button clicked");
                            setShowAuthModal(true);
                            setIsOpen(false);
                          }}
                          className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                      >
                        <span>Admin</span>
                        <span className="opacity-50 text-primary">→</span>
                      </button>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Auth Modal */}
        <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onSuccess={() => {
              setIsAuthenticated(true);
              setShowAuthModal(false);
              setShowAdminPanel(true);
            }}
        />
      </>
  );
}

interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

function NavLink({ children, active, onClick }: NavLinkProps) {
  return (
      <button
          onClick={onClick}
          className={`relative font-medium hover:text-white transition-colors nav-link ${
              active ? "text-white after:w-full" : "text-gray-200"
          }`}
      >
        {children}
        <span
            className={`absolute left-0 bottom-[-2px] h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                active ? "w-full" : "w-0"
            }`}
        />
      </button>
  );
}