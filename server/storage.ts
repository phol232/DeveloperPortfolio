import { contactFormSchema, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";

// Storage interface with CRUD methods
export interface IStorage {
  // Contact form submissions
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentContactId: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.currentContactId = 1;
  }

  // Contact submission methods
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const timestamp = new Date();
    
    const newSubmission: ContactSubmission = {
      id,
      ...submission,
      createdAt: timestamp
    };
    
    this.contactSubmissions.set(id, newSubmission);
    
    console.log(`New contact form submission received: ${newSubmission.name} (${newSubmission.email})`);
    return newSubmission;
  }
}

// Create and export storage instance
export const storage = new MemStorage();
