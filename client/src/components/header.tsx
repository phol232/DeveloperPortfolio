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
    <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm z-50 border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="ml-2 font-bold tracking-tight">DevPortfolio</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <NavLink active={activeSection === "home"} onClick={() => scrollToSection("home")}>
              Home
            </NavLink>
            <NavLink active={activeSection === "services"} onClick={() => scrollToSection("services")}>
              Services
            </NavLink>
            <NavLink active={activeSection === "projects"} onClick={() => scrollToSection("projects")}>
              Projects
            </NavLink>
            <NavLink active={activeSection === "experience"} onClick={() => scrollToSection("experience")}>
              Experience
            </NavLink>
            <NavLink active={activeSection === "contact"} onClick={() => scrollToSection("contact")}>
              Contact
            </NavLink>
          </div>
          
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden md:flex bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
          >
            Contact Me
          </Button>
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
                <MobileNavLink onClick={() => scrollToSection("home")}>Home</MobileNavLink>
                <MobileNavLink onClick={() => scrollToSection("services")}>Services</MobileNavLink>
                <MobileNavLink onClick={() => scrollToSection("projects")}>Projects</MobileNavLink>
                <MobileNavLink onClick={() => scrollToSection("experience")}>Experience</MobileNavLink>
                <MobileNavLink onClick={() => scrollToSection("contact")}>Contact</MobileNavLink>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white w-full mt-2"
                >
                  Contact Me
                </Button>
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
