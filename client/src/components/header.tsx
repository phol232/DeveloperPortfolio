import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";

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

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-5">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xl font-bold text-white flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="ml-2 font-bold tracking-tight">PHOL EDWIN TAQUIRI ROJAS</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavLink active={activeSection === "home"} onClick={() => scrollToSection("home")}>
              Inicio
            </NavLink>
            <NavLink active={activeSection === "services"} onClick={() => scrollToSection("services")}>
              Servicios
            </NavLink>
            <NavLink active={activeSection === "projects"} onClick={() => scrollToSection("projects")}>
              Proyectos
            </NavLink>
            <NavLink active={activeSection === "experience"} onClick={() => scrollToSection("experience")}>
              Experiencia
            </NavLink>
            <NavLink active={activeSection === "contact"} onClick={() => scrollToSection("contact")}>
              Contacto
            </NavLink>
            <NavLink active={activeSection === "cursos"} onClick={() => scrollToSection("cursos")}>
              Cursos Linea
            </NavLink>
            <NavLink active={activeSection === "admin"} onClick={() => scrollToSection("admin")}>
              Admin
            </NavLink>

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
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById('home');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                >
                  <span>Inicio</span>
                  <span className="opacity-50 text-primary">→</span>
                </button>

                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById('services');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                >
                  <span>Servicios</span>
                  <span className="opacity-50 text-primary">→</span>
                </button>

                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById('projects');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                >
                  <span>Proyectos</span>
                  <span className="opacity-50 text-primary">→</span>
                </button>

                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById('experience');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                >
                  <span>Experiencia</span>
                  <span className="opacity-50 text-primary">→</span>
                </button>

                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="font-medium text-gray-200 hover:text-white py-3 px-4 text-left w-full rounded-md hover:bg-primary/10 border border-primary/10 flex items-center justify-between"
                >
                  <span>Contacto</span>
                  <span className="opacity-50 text-primary">→</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
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

// Componente de navegación móvil eliminado - ahora usamos botones directamente en el código