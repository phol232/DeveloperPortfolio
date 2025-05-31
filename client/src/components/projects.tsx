import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import { projects, projectCategories } from "@/lib/data.tsx";
import { ArrowRight } from "lucide-react";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            My Recent Works
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A selection of the most outstanding projects I have worked on recently.
          </motion.p>
        </div>
        
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex p-1 bg-card rounded-lg">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md ${
                  activeCategory === category.id 
                    ? "bg-primary text-white" 
                    : "text-gray-400 hover:text-white"
                } transition-colors`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="inline-flex items-center px-6 py-3 border-primary/30 hover:bg-primary/10 text-white"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    category: string;
    categoryLabel: string;
    description: string;
    technologies: string[];
    url: string;
  };
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div 
      className="rounded-xl overflow-hidden bg-card border border-primary/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)" }}
    >
      <div className="h-48 bg-gray-800">
        {/* Space for project image */}
        <div className="h-full w-full flex items-center justify-center">
          <span className="text-gray-400">Project Image</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{project.title}</h3>
          <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs">
            {project.categoryLabel}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="text-xs text-gray-500">{tech}</span>
            ))}
          </div>
          <a 
            href={project.url} 
            className="text-primary hover:text-accent transition-colors flex items-center text-sm font-medium"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
