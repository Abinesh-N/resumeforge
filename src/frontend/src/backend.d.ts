import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CreatePaymentInput {
    resumeId: ResumeId;
    stripePaymentIntentId: string;
    amount: bigint;
}
export interface CreateResumeInput {
    title: string;
    content: ResumeContent;
    templateId: TemplateId;
}
export type TemplateId = string;
export interface PersonalInfo {
    name: string;
    email: string;
    summary: string;
    phone: string;
    location: string;
}
export interface ExperienceEntry {
    title: string;
    endDate: string;
    description: string;
    company: string;
    startDate: string;
}
export interface EducationEntry {
    endDate: string;
    school: string;
    description: string;
    degree: string;
    startDate: string;
}
export interface Template {
    id: TemplateId;
    name: string;
    description: string;
    category: TemplateCategory;
}
export interface http_header {
    value: string;
    name: string;
}
export interface ResumeView {
    id: ResumeId;
    title: string;
    content: ResumeContent;
    ownerId: UserId;
    templateId: TemplateId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    downloadUnlocked: boolean;
}
export type UserId = string;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export type ResumeId = string;
export interface ProfileView {
    name?: string;
    createdAt: Timestamp;
    email?: string;
    principalId: UserId;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface UpdateResumeInput {
    id: ResumeId;
    title: string;
    content: ResumeContent;
    templateId: TemplateId;
}
export interface PaymentRecordView {
    id: PaymentId;
    status: PaymentStatus;
    unlockedAt?: Timestamp;
    userId: UserId;
    createdAt: Timestamp;
    resumeId: ResumeId;
    stripePaymentIntentId: string;
    amount: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface ResumeContent {
    projects: Array<ProjectEntry>;
    education: Array<EducationEntry>;
    experience: Array<ExperienceEntry>;
    personalInfo: PersonalInfo;
    skills: Array<string>;
}
export interface ProjectEntry {
    title: string;
    link: string;
    description: string;
}
export type PaymentId = string;
export enum PaymentStatus {
    pending = "pending",
    success = "success",
    failed = "failed"
}
export enum TemplateCategory {
    Creative = "Creative",
    Minimal = "Minimal",
    Professional = "Professional",
    Modern = "Modern"
}
export interface backendInterface {
    confirmPayment(paymentId: PaymentId): Promise<PaymentRecordView>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createPaymentRecord(input: CreatePaymentInput): Promise<PaymentRecordView>;
    createResume(input: CreateResumeInput): Promise<ResumeView>;
    deleteResume(resumeId: ResumeId): Promise<boolean>;
    getMyProfile(): Promise<ProfileView | null>;
    getMyResumes(): Promise<Array<ResumeView>>;
    getPaymentHistory(): Promise<Array<PaymentRecordView>>;
    getResume(resumeId: ResumeId): Promise<ResumeView | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTemplate(templateId: TemplateId): Promise<Template | null>;
    getTemplates(): Promise<Array<Template>>;
    isStripeConfigured(): Promise<boolean>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateMyProfile(email: string | null, name: string | null): Promise<ProfileView>;
    updateResume(input: UpdateResumeInput): Promise<ResumeView>;
}
