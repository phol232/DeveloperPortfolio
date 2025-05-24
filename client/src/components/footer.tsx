import { contactInfo } from "@/lib/data.tsx";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card py-10 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="ml-2 font-bold tracking-tight">PHOL EDWIN TAQUIRI ROJAS</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <FooterLink href="#home">Inicio</FooterLink>
            <FooterLink href="#services">Servicios</FooterLink>
            <FooterLink href="#projects">Proyectos</FooterLink>
            <FooterLink href="#experience">Experiencia</FooterLink>
            <FooterLink href="#contact">Contacto</FooterLink>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm text-center md:text-right">
              &copy; {currentYear} {contactInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}
