import type { backendInterface } from "../backend";
import { PaymentStatus, TemplateCategory } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  getMyProfile: async () => ({
    principalId: "user-123",
    name: "Alex Chen",
    email: "alex@resumeforge.io",
    createdAt: now,
  }),

  getMyResumes: async () => [
    {
      id: "resume-1",
      title: "Software Engineer Resume",
      content: {
        personalInfo: {
          name: "Alex Chen",
          email: "alex@resumeforge.io",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          summary:
            "Full-stack software engineer with 6+ years of experience building scalable web applications.",
        },
        experience: [
          {
            title: "Senior Software Engineer",
            company: "Innovate Solutions Inc.",
            startDate: "Jan 2021",
            endDate: "Present",
            description:
              "Led development of microservices architecture. Mentored junior engineers.",
          },
          {
            title: "Software Engineer",
            company: "TechCorp",
            startDate: "Jun 2018",
            endDate: "Dec 2020",
            description:
              "Developed core product features using React and Node.js.",
          },
        ],
        education: [
          {
            degree: "B.S. Computer Science",
            school: "State University",
            startDate: "Sep 2014",
            endDate: "May 2018",
            description: "GPA: 3.8/4.0. Dean's List.",
          },
        ],
        skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS", "Docker"],
        projects: [
          {
            title: "ResumeForge",
            link: "https://resumeforge.io",
            description: "SaaS resume builder with AI-powered suggestions.",
          },
        ],
      },
      templateId: "template-modern",
      ownerId: "user-123",
      createdAt: now - BigInt(7 * 24 * 60 * 60 * 1_000_000_000),
      updatedAt: now - BigInt(2 * 24 * 60 * 60 * 1_000_000_000),
      downloadUnlocked: true,
    },
    {
      id: "resume-2",
      title: "Product Manager Resume",
      content: {
        personalInfo: {
          name: "Alex Chen",
          email: "alex@resumeforge.io",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          summary: "Product manager specializing in developer tools and B2B SaaS.",
        },
        experience: [
          {
            title: "Senior Product Manager",
            company: "ProductLabs",
            startDate: "Mar 2020",
            endDate: "Present",
            description: "Defined product roadmap and drove 40% user growth.",
          },
        ],
        education: [
          {
            degree: "MBA",
            school: "Business School",
            startDate: "Sep 2016",
            endDate: "May 2018",
            description: "Concentration in Technology Management.",
          },
        ],
        skills: ["Product Strategy", "OKRs", "SQL", "Figma", "Agile"],
        projects: [],
      },
      templateId: "template-professional",
      ownerId: "user-123",
      createdAt: now - BigInt(3 * 24 * 60 * 60 * 1_000_000_000),
      updatedAt: now - BigInt(1 * 24 * 60 * 60 * 1_000_000_000),
      downloadUnlocked: false,
    },
  ],

  getResume: async (resumeId) => ({
    id: resumeId,
    title: "Software Engineer Resume",
    content: {
      personalInfo: {
        name: "Alex Chen",
        email: "alex@resumeforge.io",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        summary:
          "Full-stack software engineer with 6+ years of experience building scalable web applications.",
      },
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Innovate Solutions Inc.",
          startDate: "Jan 2021",
          endDate: "Present",
          description:
            "Led development of microservices architecture. Mentored junior engineers.",
        },
      ],
      education: [
        {
          degree: "B.S. Computer Science",
          school: "State University",
          startDate: "Sep 2014",
          endDate: "May 2018",
          description: "GPA: 3.8/4.0",
        },
      ],
      skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
      projects: [],
    },
    templateId: "template-modern",
    ownerId: "user-123",
    createdAt: now,
    updatedAt: now,
    downloadUnlocked: false,
  }),

  createResume: async (input) => ({
    id: "resume-new-" + Date.now(),
    title: input.title,
    content: input.content,
    templateId: input.templateId,
    ownerId: "user-123",
    createdAt: now,
    updatedAt: now,
    downloadUnlocked: false,
  }),

  updateResume: async (input) => ({
    id: input.id,
    title: input.title,
    content: input.content,
    templateId: input.templateId,
    ownerId: "user-123",
    createdAt: now,
    updatedAt: now,
    downloadUnlocked: false,
  }),

  deleteResume: async () => true,

  getTemplates: async () => [
    {
      id: "template-modern",
      name: "Modern",
      description: "Clean lines and bold typography for tech professionals.",
      category: TemplateCategory.Modern,
    },
    {
      id: "template-professional",
      name: "Professional",
      description: "Classic structure trusted by Fortune 500 recruiters.",
      category: TemplateCategory.Professional,
    },
    {
      id: "template-creative",
      name: "Creative",
      description: "Stand out with a distinctive two-column layout.",
      category: TemplateCategory.Creative,
    },
    {
      id: "template-minimal",
      name: "Minimal",
      description: "Let your content speak with elegant minimalism.",
      category: TemplateCategory.Minimal,
    },
    {
      id: "template-executive",
      name: "Executive",
      description: "Authoritative design for senior leadership roles.",
      category: TemplateCategory.Professional,
    },
    {
      id: "template-tech",
      name: "Tech",
      description: "Optimized layout for engineering and developer roles.",
      category: TemplateCategory.Modern,
    },
    {
      id: "template-designer",
      name: "Designer",
      description: "Visually striking for UX/UI and creative careers.",
      category: TemplateCategory.Creative,
    },
    {
      id: "template-clean",
      name: "Clean",
      description: "Simple and distraction-free, works anywhere.",
      category: TemplateCategory.Minimal,
    },
  ],

  getTemplate: async (templateId) => ({
    id: templateId,
    name: "Modern",
    description: "Clean lines and bold typography for tech professionals.",
    category: TemplateCategory.Modern,
  }),

  getPaymentHistory: async () => [
    {
      id: "payment-1",
      resumeId: "resume-1",
      userId: "user-123",
      stripePaymentIntentId: "pi_mock_123",
      amount: BigInt(1500),
      status: PaymentStatus.success,
      createdAt: now - BigInt(5 * 24 * 60 * 60 * 1_000_000_000),
      unlockedAt: now - BigInt(5 * 24 * 60 * 60 * 1_000_000_000),
    },
  ],

  createPaymentRecord: async (input) => ({
    id: "payment-new-" + Date.now(),
    resumeId: input.resumeId,
    userId: "user-123",
    stripePaymentIntentId: input.stripePaymentIntentId,
    amount: input.amount,
    status: PaymentStatus.pending,
    createdAt: now,
    unlockedAt: undefined,
  }),

  confirmPayment: async (paymentId) => ({
    id: paymentId,
    resumeId: "resume-1",
    userId: "user-123",
    stripePaymentIntentId: "pi_mock_confirmed",
    amount: BigInt(1500),
    status: PaymentStatus.success,
    createdAt: now,
    unlockedAt: now,
  }),

  isStripeConfigured: async () => true,

  setStripeConfiguration: async () => undefined,

  createCheckoutSession: async () => "https://checkout.stripe.com/mock-session",

  getStripeSessionStatus: async () => ({
    __kind__: "completed" as const,
    completed: {
      userPrincipal: "user-123",
      response: "{}",
    },
  }),

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),

  updateMyProfile: async (_email, _name) => ({
    principalId: "user-123",
    name: _name ?? "Alex Chen",
    email: _email ?? "alex@resumeforge.io",
    createdAt: now,
  }),
};
