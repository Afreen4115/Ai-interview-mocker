import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// Mock Interview Table Definition
export const mockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMocResp: text("jsonMocResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(), // Email of the person registered
  createdAt: varchar("createdAt"), // Consider changing to a Date type if applicable
  mockId: varchar("mockId").notNull(),
});

// User Answer Table Definition
export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockIdRef").notNull(), // Corrected to function call notation
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

// TypeScript Interfaces
export interface MockInterview {
  id: number;
  jsonMocResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt?: string; // Optional field if nullable
  mockId: string;
}

export interface UserAnswer {
  id: number;
  mockIdRef: string;
  question: string;
  correctAns?: string | null; // Optional and nullable
  userAns?: string | null;
  feedback?: string | null;
  rating?: string | null;
  userEmail?: string | null;
  createdAt?: string | null;
}
