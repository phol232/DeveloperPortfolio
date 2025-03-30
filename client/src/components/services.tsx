import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/data.tsx";

export function Services() {
  const [openService, setOpenService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenService(openService === id ? null : id);
  };

  return (
    <section id="services" className="py-20 bg-background/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            My Quality Services
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I offer complete solutions for web application development and robust backend systems 
            with the most in-demand technologies.
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id}
              service={service}
              isOpen={openService === service.id}
              onToggle={() => toggleService(service.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    tags: string[];
  };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function ServiceCard({ service, isOpen, onToggle, index }: ServiceCardProps) {
  return (
    <motion.div 
      className="p-5 rounded-lg bg-card border border-primary/20 cursor-pointer"
      onClick={onToggle}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
            {service.icon}
          </div>
          <h3 className="font-semibold text-lg">{service.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mt-4 pl-14"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-400 mb-3">{service.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {service.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
