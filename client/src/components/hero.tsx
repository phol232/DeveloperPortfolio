import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Left content - takes up 7 columns on large screens */}
          <motion.div className="lg:col-span-7" variants={item}>
            <div className="max-w-3xl mx-auto lg:mx-0">
              <motion.p 
                className="text-primary font-medium mb-2"
                variants={item}
              >
                I'm Phol!
              </motion.p>
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                variants={item}
              >
                <span className="block">Web Developer +</span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  App Developper
                </span>
              </motion.h1>
              <motion.p 
                className="text-gray-300 mb-8 text-lg max-w-2xl"
                variants={item}
              >
                Laravel and Spring Boot specialist focused on creating high-impact digital solutions. 
                I transform ideas into scalable business applications through sustainable architectures 
                and advanced version control practices. My approach ensures resilient systems with over 99.9% 
                availability that evolve without accumulating technical debt, turning technical challenges 
                into lasting competitive advantages for your business.
              </motion.p>
              
              <motion.div 
                className="flex space-x-4"
                variants={item}
              >
                <Button
                  onClick={() => {
                    const projectsSection = document.getElementById("projects");
                    if (projectsSection) {
                      // Ajustamos el offset para diferentes dispositivos
                      const offset = window.innerWidth < 768 ? 60 : 80;
                      window.scrollTo({
                        top: projectsSection.offsetTop - offset,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                >
                  Ver Proyectos
                </Button>
                <Button
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      // Ajustamos el offset para diferentes dispositivos
                      const offset = window.innerWidth < 768 ? 60 : 80;
                      window.scrollTo({
                        top: contactSection.offsetTop - offset,
                        behavior: "smooth",
                      });
                    }
                  }}
                  variant="outline" 
                  className="px-6 py-3 border-primary/30 hover:bg-primary/10 text-white"
                >
                  Contacto
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right content - Profile image takes up 5 columns */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            variants={item}
          >
            <div className="relative rounded-2xl overflow-hidden h-[350px] w-[350px] bg-card border border-primary/20">
              {/* Space for profile image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">Profile Image</span>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <StatCard value="14" label="Proyectos Completados" />
          <StatCard value="50+" label="Clientes Satisfechos" />
          <StatCard value="1.5K+" label="Commits en GitHub" />
          <StatCard value="14" label="Años de Experiencia" />
        </motion.div>
      </div>
    </section>
  );
}

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center p-4 rounded-lg bg-card border border-primary/20">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
        {value}
      </h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}
