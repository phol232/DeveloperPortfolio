import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact form submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Contact form validation schema
export const contactFormSchema = createInsertSchema(contactSubmissions).omit({ 
  id: true,
  createdAt: true
}).extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters long." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." })
});

// Type definitions
export type InsertContactSubmission = z.infer<typeof contactFormSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
