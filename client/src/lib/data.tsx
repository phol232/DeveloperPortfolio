import { Terminal, Code, FileCode, Database } from "lucide-react";

// Services Data
export const services = [
  {
    id: "backend",
    title: "Backend Development",
    icon: <Terminal className="h-5 w-5 text-primary" />,
    description: "Development of robust APIs, microservices and scalable systems using best practices and design patterns.",
    tags: ["Laravel", "Spring Boot", "Node.js", "MySQL", "PostgreSQL"]
  },
  {
    id: "api",
    title: "API Architecture",
    icon: <Code className="h-5 w-5 text-primary" />,
    description: "Design and implementation of RESTful and GraphQL APIs. Documentation with Swagger and secure authentication with OAuth2 and JWT.",
    tags: ["REST", "GraphQL", "JWT", "OAuth2"]
  },
  {
    id: "web",
    title: "Web Development",
    icon: <FileCode className="h-5 w-5 text-primary" />,
    description: "Creation of complete web solutions, from landing pages to administrative systems with modern and responsive interfaces.",
    tags: ["HTML/CSS", "JavaScript", "React", "Tailwind"]
  },
  {
    id: "database",
    title: "Databases",
    icon: <Database className="h-5 w-5 text-primary" />,
    description: "Design, optimization and maintenance of databases. Implementation of relational and NoSQL models according to the needs of the project.",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "Redis"]
  }
];

// Project Categories
export const projectCategories = [
  { id: "all", name: "All" },
  { id: "backend", name: "Backend" },
  { id: "web", name: "Web" },
  { id: "api", name: "API" }
];

// Projects Data
export const projects = [
  {
    id: "project1",
    title: "Management System",
    category: "backend",
    categoryLabel: "Laravel",
    description: "Complete management platform for logistics company with inventory, customer and billing modules.",
    technologies: ["PHP", "MySQL", "Vue"],
    url: "#"
  },
  {
    id: "project2",
    title: "Payment API",
    category: "api",
    categoryLabel: "Spring Boot",
    description: "Payment processing microservice with integration to multiple gateways and anti-fraud system.",
    technologies: ["Java", "PostgreSQL", "REST"],
    url: "#"
  },
  {
    id: "project3",
    title: "Educational Platform",
    category: "web",
    categoryLabel: "Web",
    description: "Complete LMS system with courses, evaluations and progress analysis for educational institute.",
    technologies: ["Laravel", "React", "MySQL"],
    url: "#"
  }
];

// Experience Data
export const experiences = [
  {
    id: "exp1",
    title: "Lead Backend Developer",
    organization: "TechSolutions Inc.",
    period: "2020 - Present",
    description: "Led the backend team in the development of multiple projects with Laravel and Spring Boot. Implementation of scalable architectures and performance improvements.",
    skills: ["Laravel", "Spring Boot", "Microservices"]
  },
  {
    id: "exp2",
    title: "Backend Developer",
    organization: "Digital Innovators",
    period: "2018 - 2020",
    description: "Development of RESTful APIs and management systems with Laravel. Integration with third-party services and SQL query optimization.",
    skills: ["PHP", "Laravel", "MySQL"]
  },
  {
    id: "exp3",
    title: "Full Stack Developer",
    organization: "WebCraft Solutions",
    period: "2016 - 2018",
    description: "Development of complete web applications for various clients. Frontend with React and backend with Node.js and PHP.",
    skills: ["JavaScript", "React", "Node.js"]
  }
];

// Education Data
export const education = [
  {
    id: "edu1",
    title: "Master in Computer Science",
    organization: "Technology University",
    period: "2018 - 2020",
    description: "Specialization in Software Architecture and Distributed Systems."
  },
  {
    id: "edu2",
    title: "Computer Engineering",
    organization: "National University",
    period: "2014 - 2018",
    description: "Comprehensive training in software development, databases and networks."
  },
  {
    id: "edu3",
    title: "Spring Certification",
    organization: "Spring Framework",
    period: "2019",
    description: "Official certification in development with Spring Boot and Spring Cloud."
  },
  {
    id: "edu4",
    title: "Laravel Certification",
    organization: "Laravel Partners",
    period: "2020",
    description: "Advanced certification in development with Laravel and best practices."
  }
];

// Skills Data
export const skills = [
  {
    id: "backend-skills",
    title: "Backend",
    skills: [
      { name: "Laravel", percentage: 95 },
      { name: "Spring Boot", percentage: 90 },
      { name: "Node.js", percentage: 85 },
      { name: "Django", percentage: 75 },
      { name: "GraphQL", percentage: 80 }
    ]
  },
  {
    id: "frontend-tools",
    title: "Frontend & Tools",
    skills: [
      { name: "HTML/CSS", percentage: 90 },
      { name: "JavaScript/TypeScript", percentage: 85 },
      { name: "React", percentage: 80 },
      { name: "Docker", percentage: 85 },
      { name: "Git/CI/CD", percentage: 90 }
    ]
  }
];

// Contact Information
export const contactInfo = {
  name: "David",
  email: "contact@yourdomain.com",
  phone: "+123 456 7890",
  location: "City, Country",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com"
  }
};
