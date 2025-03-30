import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { contactInfo } from "@/lib/data.tsx";
import { contactFormSchema } from "@/lib/types";

type ContactFormData = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message! I'll get back to you as soon as possible.",
        variant: "default",
      });
      reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-background/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Contact Me
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Have a project in mind? I'm available to help you take it to the next level.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-primary/20 text-primary rounded-lg p-2 mr-3">
                <Mail className="h-5 w-5" />
              </span>
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <ContactInfoItem 
                icon={<Mail className="h-5 w-5 text-primary" />}
                title="Email"
                content={contactInfo.email}
              />
              
              <ContactInfoItem 
                icon={<Phone className="h-5 w-5 text-primary" />}
                title="Phone"
                content={contactInfo.phone}
              />
              
              <ContactInfoItem 
                icon={<MapPin className="h-5 w-5 text-primary" />}
                title="Location"
                content={contactInfo.location}
              />
            </div>
            
            <h3 className="text-xl font-bold mt-10 mb-6">Follow Me</h3>
            <div className="flex space-x-4">
              <SocialLink href={contactInfo.social.github} icon={<Github size={18} />} />
              <SocialLink href={contactInfo.social.linkedin} icon={<Linkedin size={18} />} />
              <SocialLink href={contactInfo.social.twitter} icon={<Twitter size={18} />} />
              <SocialLink href={contactInfo.social.instagram} icon={<Instagram size={18} />} />
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="bg-card rounded-lg p-6 border border-primary/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <Input
                  id="name"
                  className="bg-background/80 border-primary/20 text-white focus:ring-primary/50"
                  placeholder="Your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input
                  id="email"
                  type="email"
                  className="bg-background/80 border-primary/20 text-white focus:ring-primary/50"
                  placeholder="your@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  id="subject"
                  className="bg-background/80 border-primary/20 text-white focus:ring-primary/50"
                  placeholder="Message subject"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  id="message"
                  rows={4}
                  className="bg-background/80 border-primary/20 text-white focus:ring-primary/50"
                  placeholder="Write your message here..."
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

function ContactInfoItem({ icon, title, content }: ContactInfoItemProps) {
  return (
    <div className="flex items-start">
      <div className="bg-card p-3 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
    >
      {icon}
    </a>
  );
}
