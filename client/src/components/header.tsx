import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-5">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xl font-bold text-white">
              Phol<span className="text-primary">.</span>
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
              className="md:hidden mt-4 pb-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-3">
                <MobileNavLink onClick={() => scrollToSection("home")}>Inicio</MobileNavLink>
                <MobileNavLink onClick={() => scrollToSection("services")}>Servicios</MobileNavLink>
                <MobileNavLink onClick={() => scrollToSection("projects")}>Proyectos</MobileNavLink>
                <MobileNavLink onClick={() => scrollToSection("experience")}>Experiencia</MobileNavLink>
                <MobileNavLink onClick={() => scrollToSection("contact")}>Contacto</MobileNavLink>
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

function MobileNavLink({ children, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className="font-medium text-gray-200 hover:text-white transition-colors py-2 text-left"
    >
      {children}
    </button>
  );
}
