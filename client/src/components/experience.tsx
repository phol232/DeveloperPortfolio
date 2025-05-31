import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experiences, education } from "@/lib/data.tsx";

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-background/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <motion.h2 
              className="text-3xl font-bold mb-8 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-primary/20 text-primary rounded-lg p-2 mr-3">
                <Briefcase className="h-6 w-6" />
              </span>
              My Experience
            </motion.h2>
            
            <div className="space-y-8 relative">
              <div className="absolute left-[-26px] top-0 bottom-0 w-[2px] bg-muted"></div>
              
              {experiences.map((exp, index) => (
                <ExperienceItem 
                  key={exp.id}
                  item={exp} 
                  index={index} 
                />
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div>
            <motion.h2 
              className="text-3xl font-bold mb-8 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-primary/20 text-primary rounded-lg p-2 mr-3">
                <GraduationCap className="h-6 w-6" />
              </span>
              My Education
            </motion.h2>
            
            <div className="space-y-8 relative">
              <div className="absolute left-[-26px] top-0 bottom-0 w-[2px] bg-muted"></div>
              
              {education.map((edu, index) => (
                <ExperienceItem 
                  key={edu.id} 
                  item={edu} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExperienceItemProps {
  item: {
    id: string;
    title: string;
    organization: string;
    period: string;
    description: string;
    skills?: string[];
  };
  index: number;
}

function ExperienceItem({ item, index }: ExperienceItemProps) {
  return (
    <motion.div 
      className="relative pl-8 before:content-[''] before:absolute before:left-[-32px] before:top-[6px] before:w-3 before:h-3 before:rounded-full before:bg-primary before:z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-card p-5 rounded-lg border border-primary/20">
        <div className="flex justify-between mb-2">
          <h3 className="font-bold text-lg">{item.title}</h3>
          <span className="text-primary text-sm">{item.period}</span>
        </div>
        <h4 className="text-gray-400 mb-3">{item.organization}</h4>
        <p className="text-gray-400 text-sm">{item.description}</p>
        
        {item.skills && (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.skills.map((skill) => (
              <span key={skill} className="px-2 py-1 rounded-full text-xs bg-primary/10 text-gray-300">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
