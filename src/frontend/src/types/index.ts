// Re-export all backend types from backend.ts (the real implementation file)
export type {
  ResumeContent,
  PersonalInfo,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  Template,
  ResumeView,
  ProfileView,
  PaymentRecordView,
  ShoppingItem,
  StripeConfiguration,
  CreateResumeInput,
  UpdateResumeInput,
  CreatePaymentInput,
  ResumeId,
  TemplateId,
  UserId,
  PaymentId,
  Timestamp,
  StripeSessionStatus,
} from "../backend";

export { PaymentStatus, TemplateCategory } from "../backend";

// UI-specific types
export interface CheckoutSession {
  id: string;
  url: string;
}

export interface EditorSection {
  id: string;
  type: "personalInfo" | "experience" | "education" | "skills" | "projects";
  label: string;
  order: number;
}
