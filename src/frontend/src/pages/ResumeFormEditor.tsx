import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  Check,
  ChevronLeft,
  Code2,
  Download,
  FolderOpen,
  RefreshCw,
  Save,
  User,
  Wand2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetResume,
  useGetTemplates,
  useUpdateResume,
} from "../hooks/useBackend";
import { useResumeEditor } from "../hooks/useResumeEditor";
import type {
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  ResumeContent,
  ResumeView,
} from "../types";
import { generatePDF } from "../utils/pdfGenerator";
import { TEMPLATE_IDS, renderTemplate } from "../utils/templateRenderer";

// ─── Constants ────────────────────────────────────────────────────────────────

const emptyContent: ResumeContent = {
  personalInfo: { name: "", email: "", phone: "", location: "", summary: "" },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

type SectionId =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects";

const SECTIONS: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderOpen },
];

const TEMPLATE_LABELS: Record<string, string> = {
  "modern-clean": "Modern",
  "professional-exec": "Executive",
  "creative-bold": "Creative",
  "minimal-zen": "Minimal",
  "two-column": "Two-Col",
  academic: "Academic",
  "startup-modern": "Startup",
  "elegant-dark": "Elegant",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionNav({
  active,
  onChange,
  content,
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
  content: ResumeContent;
}) {
  const counts: Record<SectionId, number> = {
    personal: content.personalInfo.name ? 1 : 0,
    experience: content.experience.length,
    education: content.education.length,
    skills: content.skills.length,
    projects: content.projects.length,
  };

  return (
    <nav className="w-44 shrink-0 sticky top-[120px] self-start">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-2">
        Sections
      </p>
      <ul className="space-y-0.5">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => onChange(id)}
              data-ocid={`editor.section_nav.${id}`}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active === id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{label}</span>
              {counts[id] > 0 && (
                <span
                  className={`ml-auto text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center ${
                    active === id
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {counts[id]}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TemplateThumbnail({
  templateId,
  active,
  content,
  onClick,
}: {
  templateId: string;
  active: boolean;
  content: ResumeContent;
  onClick: () => void;
}) {
  const html = renderTemplate(templateId, content);
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`editor.template_thumb.${templateId}`}
      className={`relative rounded-md overflow-hidden border-2 transition-all shrink-0 ${
        active
          ? "border-primary shadow-[0_0_0_3px] shadow-primary/20"
          : "border-border hover:border-primary/50"
      }`}
      style={{ width: 72, height: 96 }}
      title={TEMPLATE_LABELS[templateId] ?? templateId}
    >
      <div
        className="pointer-events-none"
        style={{
          transformOrigin: "top left",
          transform: "scale(0.09)",
          width: 794,
          height: 1123,
          position: "absolute",
          top: 0,
          left: 0,
          background: "#fff",
        }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: template HTML for thumbnail preview
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div
        className={`absolute bottom-0 inset-x-0 py-0.5 text-[9px] font-medium text-center ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-muted/80 text-muted-foreground"
        }`}
      >
        {TEMPLATE_LABELS[templateId] ?? templateId}
      </div>
    </button>
  );
}

function SaveStatus({
  isSaving,
  isDirty,
}: {
  isSaving: boolean;
  isDirty: boolean;
}) {
  if (isSaving) {
    return (
      <span
        className="text-xs text-muted-foreground flex items-center gap-1.5"
        data-ocid="editor.saving_state"
      >
        <RefreshCw className="w-3 h-3 animate-spin" />
        Saving…
      </span>
    );
  }
  if (!isDirty) {
    return (
      <span
        className="text-xs text-primary flex items-center gap-1.5"
        data-ocid="editor.saved_state"
      >
        <Check className="w-3 h-3" />
        Saved
      </span>
    );
  }
  return (
    <span
      className="text-xs text-muted-foreground"
      data-ocid="editor.unsaved_state"
    >
      Unsaved changes
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ResumeFormEditor() {
  const { resumeId } = useParams({ from: "/protected/resume/$resumeId/edit" });
  const navigate = useNavigate();
  const { data: resume, isLoading } = useGetResume(resumeId);
  const { data: templates } = useGetTemplates();
  const updateResume = useUpdateResume();

  const [activeSection, setActiveSection] = useState<SectionId>("personal");
  const [skillInput, setSkillInput] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>(
    {},
  );

  const handleSave = useCallback(
    async (data: {
      content: ResumeContent;
      title: string;
      templateId: string;
    }) => {
      if (!resumeId) return;
      await updateResume.mutateAsync({ id: resumeId, ...data });
    },
    [resumeId, updateResume],
  );

  const editor = useResumeEditor({
    initialContent: resume?.content ?? emptyContent,
    initialTitle: resume?.title ?? "My Resume",
    initialTemplateId: resume?.templateId ?? "modern-clean",
    onSave: handleSave,
  });

  // Scroll form panel to section on nav click
  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Track active section via intersection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const { id } of SECTIONS) {
      const el = sectionRefs.current[id];
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  // ── CRUD helpers ──────────────────────────────────────────────────────────

  const updatePersonalInfo = (field: string, value: string) => {
    editor.setContent({
      ...editor.content,
      personalInfo: { ...editor.content.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    editor.setContent({
      ...editor.content,
      experience: [
        ...editor.content.experience,
        { title: "", company: "", startDate: "", endDate: "", description: "" },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    editor.setContent({
      ...editor.content,
      experience: editor.content.experience.map((e, i) =>
        i === index ? { ...e, [field]: value } : e,
      ),
    });
  };

  const removeExperience = (index: number) => {
    editor.setContent({
      ...editor.content,
      experience: editor.content.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    editor.setContent({
      ...editor.content,
      education: [
        ...editor.content.education,
        { degree: "", school: "", startDate: "", endDate: "", description: "" },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    editor.setContent({
      ...editor.content,
      education: editor.content.education.map((e, i) =>
        i === index ? { ...e, [field]: value } : e,
      ),
    });
  };

  const removeEducation = (index: number) => {
    editor.setContent({
      ...editor.content,
      education: editor.content.education.filter((_, i) => i !== index),
    });
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const val = skillInput.replace(/,/g, "").trim();
    if (!val) return;
    editor.setContent({
      ...editor.content,
      skills: [...editor.content.skills, val],
    });
    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    editor.setContent({
      ...editor.content,
      skills: editor.content.skills.filter((_, i) => i !== index),
    });
  };

  const addProject = () => {
    editor.setContent({
      ...editor.content,
      projects: [
        ...editor.content.projects,
        { title: "", description: "", link: "" },
      ],
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    editor.setContent({
      ...editor.content,
      projects: editor.content.projects.map((p, i) =>
        i === index ? { ...p, [field]: value } : p,
      ),
    });
  };

  const removeProject = (index: number) => {
    editor.setContent({
      ...editor.content,
      projects: editor.content.projects.filter((_, i) => i !== index),
    });
  };

  const handleManualSave = async () => {
    try {
      await editor.manualSave();
      toast.success("Resume saved successfully.");
    } catch {
      toast.error("Failed to save resume.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!resume) return;
    if (!resume.downloadUnlocked) {
      navigate({ to: "/resume/$resumeId/payment", params: { resumeId } });
      return;
    }
    setIsGeneratingPDF(true);
    try {
      const resumeForPDF: ResumeView = {
        ...resume,
        content: editor.content,
        title: editor.title,
        templateId: editor.templateId,
      };
      await generatePDF(resumeForPDF);
      toast.success("PDF downloaded successfully!");
    } catch {
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const isRequiredFilled =
    editor.content.personalInfo.name.trim().length > 0 &&
    editor.content.personalInfo.email.trim().length > 0;

  // ── Loading state ──────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="h-14 bg-card border-b border-border" />
        <div className="h-12 bg-card border-b border-border" />
        <div className="flex-1 flex gap-0">
          <div className="w-44 bg-card border-r border-border" />
          <div className="flex-[45] p-6 space-y-4">
            {["personal", "experience", "education", "skills"].map((s) => (
              <Skeleton key={s} className="h-32 w-full rounded-xl" />
            ))}
          </div>
          <div className="flex-[55] bg-muted/20 border-l border-border p-6">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">Resume not found.</p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="form_editor.page"
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 h-14 gap-3">
          {/* Left */}
          <div className="flex items-center gap-2 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/dashboard" })}
              className="gap-1.5 shrink-0 h-8"
              data-ocid="editor.back_button"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <Input
              value={editor.title}
              onChange={(e) => editor.setTitle(e.target.value)}
              className="h-8 max-w-[200px] font-semibold text-sm bg-transparent border-transparent hover:border-input focus:border-input transition-colors"
              data-ocid="editor.title_input"
              aria-label="Resume title"
            />
            <SaveStatus isSaving={editor.isSaving} isDirty={editor.isDirty} />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate({
                  to: "/resume/$resumeId/advanced",
                  params: { resumeId },
                })
              }
              className="gap-1.5 h-8 hidden sm:flex"
              data-ocid="editor.advanced_editor_button"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Advanced Editor
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualSave}
              disabled={editor.isSaving || !isRequiredFilled}
              className="gap-1.5 h-8"
              data-ocid="editor.save_button"
            >
              <Save className="w-3.5 h-3.5" />
              Save
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF || !isRequiredFilled}
              className="gap-1.5 h-8"
              data-ocid="editor.download_button"
            >
              <Download className="w-3.5 h-3.5" />
              {isGeneratingPDF
                ? "Generating…"
                : resume.downloadUnlocked
                  ? "Download PDF"
                  : "Unlock PDF · $5"}
            </Button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0">
        {/* ── Left: section nav + form ── */}
        <div
          className="flex-[45] flex min-w-0 border-r border-border overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 56px)" }}
        >
          {/* Section sidebar */}
          <div className="hidden md:block border-r border-border bg-card/50 px-2 py-6">
            <SectionNav
              active={activeSection}
              onChange={scrollToSection}
              content={editor.content}
            />
          </div>

          {/* Form content */}
          <div className="flex-1 px-5 py-6 space-y-6 min-w-0">
            {/* Personal Info */}
            <section
              ref={(el) => {
                sectionRefs.current.personal = el;
              }}
              className="bg-card rounded-xl border border-border p-5"
              data-ocid="editor.personal_section"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <h2 className="font-semibold text-sm">Personal Information</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={editor.content.personalInfo.name}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    placeholder="Alex Johnson"
                    className={
                      !editor.content.personalInfo.name.trim()
                        ? "border-destructive/40 focus:border-destructive"
                        : ""
                    }
                    data-ocid="editor.personal_name_input"
                  />
                  {!editor.content.personalInfo.name.trim() && (
                    <p
                      className="text-xs text-destructive mt-1"
                      data-ocid="editor.name.field_error"
                    >
                      Full name is required
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={editor.content.personalInfo.email}
                    onChange={(e) =>
                      updatePersonalInfo("email", e.target.value)
                    }
                    placeholder="alex@example.com"
                    type="email"
                    className={
                      !editor.content.personalInfo.email.trim()
                        ? "border-destructive/40 focus:border-destructive"
                        : ""
                    }
                    data-ocid="editor.personal_email_input"
                  />
                  {!editor.content.personalInfo.email.trim() && (
                    <p
                      className="text-xs text-destructive mt-1"
                      data-ocid="editor.email.field_error"
                    >
                      Email is required
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">
                    Phone
                  </Label>
                  <Input
                    value={editor.content.personalInfo.phone}
                    onChange={(e) =>
                      updatePersonalInfo("phone", e.target.value)
                    }
                    placeholder="+1 (555) 000-0000"
                    data-ocid="editor.personal_phone_input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">
                    Location
                  </Label>
                  <Input
                    value={editor.content.personalInfo.location}
                    onChange={(e) =>
                      updatePersonalInfo("location", e.target.value)
                    }
                    placeholder="San Francisco, CA"
                    data-ocid="editor.personal_location_input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">
                    Professional Summary
                  </Label>
                  <Textarea
                    value={editor.content.personalInfo.summary}
                    onChange={(e) =>
                      updatePersonalInfo("summary", e.target.value)
                    }
                    placeholder="Results-driven engineer with 5+ years building scalable web applications…"
                    rows={4}
                    data-ocid="editor.personal_summary_textarea"
                  />
                </div>
              </div>
            </section>

            {/* Experience */}
            <section
              ref={(el) => {
                sectionRefs.current.experience = el;
              }}
              className="bg-card rounded-xl border border-border p-5"
              data-ocid="editor.experience_section"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h2 className="font-semibold text-sm">Work Experience</h2>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addExperience}
                  className="h-7 text-xs gap-1"
                  data-ocid="editor.add_experience_button"
                >
                  + Add Entry
                </Button>
              </div>

              {editor.content.experience.length === 0 && (
                <div
                  className="text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-lg"
                  data-ocid="editor.experience.empty_state"
                >
                  No experience yet — click "Add Entry" to begin
                </div>
              )}

              <div className="space-y-4">
                {editor.content.experience.map(
                  (exp: ExperienceEntry, i: number) => (
                    <ExperienceCard
                      key={`exp-${exp.company}-${exp.startDate}-${i}`}
                      exp={exp}
                      index={i}
                      onChange={updateExperience}
                      onRemove={removeExperience}
                    />
                  ),
                )}
              </div>
            </section>

            {/* Education */}
            <section
              ref={(el) => {
                sectionRefs.current.education = el;
              }}
              className="bg-card rounded-xl border border-border p-5"
              data-ocid="editor.education_section"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h2 className="font-semibold text-sm">Education</h2>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addEducation}
                  className="h-7 text-xs gap-1"
                  data-ocid="editor.add_education_button"
                >
                  + Add Entry
                </Button>
              </div>

              {editor.content.education.length === 0 && (
                <div
                  className="text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-lg"
                  data-ocid="editor.education.empty_state"
                >
                  No education yet — click "Add Entry" to begin
                </div>
              )}

              <div className="space-y-4">
                {editor.content.education.map(
                  (edu: EducationEntry, i: number) => (
                    <EducationCard
                      key={`edu-${edu.school}-${edu.startDate}-${i}`}
                      edu={edu}
                      index={i}
                      onChange={updateEducation}
                      onRemove={removeEducation}
                    />
                  ),
                )}
              </div>
            </section>

            {/* Skills */}
            <section
              ref={(el) => {
                sectionRefs.current.skills = el;
              }}
              className="bg-card rounded-xl border border-border p-5"
              data-ocid="editor.skills_section"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-3.5 h-3.5 text-primary" />
                </div>
                <h2 className="font-semibold text-sm">Skills</h2>
              </div>

              <div className="flex gap-2 mb-4">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter or comma…"
                  className="flex-1"
                  data-ocid="editor.skill_input"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addSkill}
                  className="shrink-0"
                  data-ocid="editor.add_skill_button"
                >
                  Add
                </Button>
              </div>

              {editor.content.skills.length === 0 ? (
                <div
                  className="text-sm text-muted-foreground text-center py-4 border border-dashed border-border rounded-lg"
                  data-ocid="editor.skills.empty_state"
                >
                  Add skills like React, TypeScript, Python…
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {editor.content.skills.map((skill: string, i: number) => {
                    const skillKey = `skill-${skill}`;
                    return (
                      <Badge
                        key={skillKey}
                        variant="secondary"
                        className="gap-1.5 pr-1 py-1 text-xs"
                        data-ocid={`editor.skill.item.${i + 1}`}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(i)}
                          className="ml-0.5 hover:text-destructive transition-colors leading-none text-base"
                          aria-label={`Remove ${skill}`}
                          data-ocid={`editor.skill.delete_button.${i + 1}`}
                        >
                          ×
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Projects */}
            <section
              ref={(el) => {
                sectionRefs.current.projects = el;
              }}
              className="bg-card rounded-xl border border-border p-5 mb-10"
              data-ocid="editor.projects_section"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h2 className="font-semibold text-sm">Projects</h2>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addProject}
                  className="h-7 text-xs gap-1"
                  data-ocid="editor.add_project_button"
                >
                  + Add Entry
                </Button>
              </div>

              {editor.content.projects.length === 0 && (
                <div
                  className="text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-lg"
                  data-ocid="editor.projects.empty_state"
                >
                  No projects yet — click "Add Entry" to begin
                </div>
              )}

              <div className="space-y-4">
                {editor.content.projects.map(
                  (proj: ProjectEntry, i: number) => (
                    <ProjectCard
                      key={`proj-${proj.title}-${i}`}
                      proj={proj}
                      index={i}
                      onChange={updateProject}
                      onRemove={removeProject}
                    />
                  ),
                )}
              </div>
            </section>
          </div>
        </div>

        {/* ── Right: live preview ── */}
        <div
          className="flex-[55] hidden lg:flex flex-col min-w-0 bg-muted/10 overflow-hidden"
          style={{ maxHeight: "calc(100vh - 56px)" }}
        >
          {/* Preview header */}
          <div className="bg-card border-b border-border px-4 py-2.5 flex items-center justify-between shrink-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Live Preview
            </span>
            <Badge
              variant="outline"
              className="text-[10px] font-medium"
              data-ocid="editor.preview_badge"
            >
              {TEMPLATE_LABELS[editor.templateId] ?? editor.templateId}
            </Badge>
          </div>

          {/* Preview iframe area */}
          <div
            className="flex-1 overflow-auto p-6"
            data-ocid="editor.preview_panel"
          >
            <div
              className="mx-auto rounded-lg border border-border/50 shadow-lg overflow-hidden bg-white"
              style={{ width: 794 }}
            >
              <div
                style={{ minHeight: 1123 }}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: template HTML for resume preview
                dangerouslySetInnerHTML={{
                  __html: renderTemplate(editor.templateId, editor.content),
                }}
              />
            </div>
          </div>

          {/* Template thumbnail strip */}
          <div
            className="bg-card border-t border-border px-4 py-3 shrink-0"
            data-ocid="editor.template_strip"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
              Choose Template
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {(templates ? templates.map((t) => t.id) : TEMPLATE_IDS).map(
                (tid) => (
                  <TemplateThumbnail
                    key={tid}
                    templateId={tid}
                    active={editor.templateId === tid}
                    content={editor.content}
                    onClick={() => editor.setTemplateId(tid)}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Entry sub-components ─────────────────────────────────────────────────────

function EntryCard({
  index,
  ocidPrefix,
  onRemove,
  children,
}: {
  index: number;
  ocidPrefix: string;
  onRemove: (i: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg border border-border bg-background/50 p-4 relative"
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute top-3 right-3 text-xs text-muted-foreground hover:text-destructive transition-colors px-1.5 py-0.5 rounded border border-border hover:border-destructive/40"
        data-ocid={`${ocidPrefix}.delete_button.${index + 1}`}
        aria-label="Remove entry"
      >
        Remove
      </button>
      {children}
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
  onChange,
  onRemove,
}: {
  exp: ExperienceEntry;
  index: number;
  onChange: (i: number, f: string, v: string) => void;
  onRemove: (i: number) => void;
}) {
  const isPresent = exp.endDate === "Present" || exp.endDate === "";
  return (
    <EntryCard index={index} ocidPrefix="editor.experience" onRemove={onRemove}>
      <div className="grid sm:grid-cols-2 gap-3 pr-16">
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            Job Title
          </Label>
          <Input
            value={exp.title}
            onChange={(e) => onChange(index, "title", e.target.value)}
            placeholder="Senior Engineer"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            Company
          </Label>
          <Input
            value={exp.company}
            onChange={(e) => onChange(index, "company", e.target.value)}
            placeholder="Acme Corp"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            Start Date
          </Label>
          <Input
            value={exp.startDate}
            onChange={(e) => onChange(index, "startDate", e.target.value)}
            placeholder="Jan 2021"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            End Date
          </Label>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`exp-present-${index}`}
                checked={isPresent}
                onCheckedChange={(checked) =>
                  onChange(index, "endDate", checked ? "Present" : "")
                }
              />
              <label
                htmlFor={`exp-present-${index}`}
                className="text-xs text-muted-foreground cursor-pointer"
              >
                Currently working here
              </label>
            </div>
            {!isPresent && (
              <Input
                value={exp.endDate}
                onChange={(e) => onChange(index, "endDate", e.target.value)}
                placeholder="Dec 2023"
              />
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs text-muted-foreground mb-1 block">
            Description
          </Label>
          <Textarea
            value={exp.description}
            onChange={(e) => onChange(index, "description", e.target.value)}
            placeholder="• Led migration from monolith to microservices&#10;• Reduced API response time by 40%"
            rows={3}
          />
        </div>
      </div>
    </EntryCard>
  );
}

function EducationCard({
  edu,
  index,
  onChange,
  onRemove,
}: {
  edu: EducationEntry;
  index: number;
  onChange: (i: number, f: string, v: string) => void;
  onRemove: (i: number) => void;
}) {
  const isPresent = edu.endDate === "Present" || edu.endDate === "";
  return (
    <EntryCard index={index} ocidPrefix="editor.education" onRemove={onRemove}>
      <div className="grid sm:grid-cols-2 gap-3 pr-16">
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            Degree
          </Label>
          <Input
            value={edu.degree}
            onChange={(e) => onChange(index, "degree", e.target.value)}
            placeholder="B.S. Computer Science"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            School
          </Label>
          <Input
            value={edu.school}
            onChange={(e) => onChange(index, "school", e.target.value)}
            placeholder="Stanford University"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            Start Date
          </Label>
          <Input
            value={edu.startDate}
            onChange={(e) => onChange(index, "startDate", e.target.value)}
            placeholder="Sep 2017"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            End Date
          </Label>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`edu-present-${index}`}
                checked={isPresent}
                onCheckedChange={(checked) =>
                  onChange(index, "endDate", checked ? "Present" : "")
                }
              />
              <label
                htmlFor={`edu-present-${index}`}
                className="text-xs text-muted-foreground cursor-pointer"
              >
                Currently enrolled
              </label>
            </div>
            {!isPresent && (
              <Input
                value={edu.endDate}
                onChange={(e) => onChange(index, "endDate", e.target.value)}
                placeholder="May 2021"
              />
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs text-muted-foreground mb-1 block">
            Description
          </Label>
          <Textarea
            value={edu.description}
            onChange={(e) => onChange(index, "description", e.target.value)}
            placeholder="GPA: 3.8/4.0, Dean's List, Relevant coursework…"
            rows={2}
          />
        </div>
      </div>
    </EntryCard>
  );
}

function ProjectCard({
  proj,
  index,
  onChange,
  onRemove,
}: {
  proj: ProjectEntry;
  index: number;
  onChange: (i: number, f: string, v: string) => void;
  onRemove: (i: number) => void;
}) {
  return (
    <EntryCard index={index} ocidPrefix="editor.project" onRemove={onRemove}>
      <div className="space-y-3 pr-16">
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            Project Title
          </Label>
          <Input
            value={proj.title}
            onChange={(e) => onChange(index, "title", e.target.value)}
            placeholder="ResumeForge — AI Resume Builder"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            URL / Link{" "}
            <span className="text-muted-foreground/60">(optional)</span>
          </Label>
          <Input
            value={proj.link}
            onChange={(e) => onChange(index, "link", e.target.value)}
            placeholder="https://github.com/user/project"
            type="url"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">
            Description
          </Label>
          <Textarea
            value={proj.description}
            onChange={(e) => onChange(index, "description", e.target.value)}
            placeholder="Built with React and TypeScript. Key features: real-time collaboration, PDF export…"
            rows={3}
          />
        </div>
      </div>
    </EntryCard>
  );
}
