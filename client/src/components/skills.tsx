import React from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data.tsx";

export function Skills() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            My Technical Skills
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A glimpse of the technologies and tools I work with regularly.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((category, index) => (
            <SkillCategory 
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SkillCategoryProps {
  category: {
    id: string;
    title: string;
    skills: {
      name: string;
      percentage: number;
    }[];
  };
  index: number;
}

function SkillCategory({ category, index }: SkillCategoryProps) {
  return (
    <motion.div 
      className="bg-card rounded-lg p-6 border border-primary/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <h3 className="text-xl font-bold mb-6">{category.title}</h3>
      
      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <SkillBar 
            key={skill.name}
            name={skill.name}
            percentage={skill.percentage}
            index={skillIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface SkillBarProps {
  name: string;
  percentage: number;
  index: number;
}

function SkillBar({ name, percentage, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          style={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
        />
      </div>
    </motion.div>
  );
}
