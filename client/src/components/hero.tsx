import { Button } from "@/components/ui/button";
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
    <section id="home" className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="w-full md:w-1/2 mb-10 md:mb-0" variants={item}>
            <div className="max-w-xl">
              <motion.p 
                className="text-primary font-medium mb-2"
                variants={item}
              >
                I am David!
              </motion.p>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                variants={item}
              >
                <span className="block">Web Developer +</span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  UX Designer
                </span>
              </motion.h1>
              <motion.p 
                className="text-gray-300 mb-8 text-lg"
                variants={item}
              >
                Specialist in Laravel and Spring Boot with a focus on robust, scalable, and high-performance solutions. 
                Turning ideas into applications that drive businesses forward.
              </motion.p>
              
              <motion.div 
                className="flex space-x-4"
                variants={item}
              >
                <Button
                  onClick={() => {
                    const projectsSection = document.getElementById("projects");
                    if (projectsSection) {
                      window.scrollTo({
                        top: projectsSection.offsetTop - 80,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                >
                  View Projects
                </Button>
                <Button
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      window.scrollTo({
                        top: contactSection.offsetTop - 80,
                        behavior: "smooth",
                      });
                    }
                  }}
                  variant="outline" 
                  className="px-6 py-3 border-primary/30 hover:bg-primary/10 text-white"
                >
                  Contact
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-end relative"
            variants={item}
          >
            <div className="relative rounded-2xl overflow-hidden h-80 w-80 bg-card border border-primary/20">
              {/* Space for profile image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">Profile Image</span>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
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
          <StatCard value="14" label="Projects Completed" />
          <StatCard value="50+" label="Satisfied Clients" />
          <StatCard value="1.5K+" label="GitHub Commits" />
          <StatCard value="14" label="Years of Experience" />
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
