import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - prefix with /api
  
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate form data using Zod schema
      const contactData = contactFormSchema.parse(req.body);
      
      // Store the contact form submission
      const submission = await storage.createContactSubmission(contactData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully", 
        data: submission 
      });
      
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      // Handle other errors
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request" 
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
