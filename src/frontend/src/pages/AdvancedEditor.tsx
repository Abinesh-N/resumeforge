import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate, useParams } from "@tanstack/react-router";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronLeft,
  Download,
  FileText,
  GripVertical,
  Italic,
  List,
  ListOrdered,
  Plus,
  Redo2,
  RefreshCw,
  Save,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useGetResume, useUpdateResume } from "../hooks/useBackend";
import { useResumeEditor } from "../hooks/useResumeEditor";
import type {
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  ResumeContent,
} from "../types";
import { generatePDF } from "../utils/pdfGenerator";

// ─── Types ──────────────────────────────────────────────────────────────────

type SectionType =
  | "personalInfo"
  | "experience"
  | "education"
  | "skills"
  | "projects";

interface Section {
  id: string;
  type: SectionType;
  label: string;
}

const DEFAULT_SECTIONS: Section[] = [
  { id: "personalInfo", type: "personalInfo", label: "Personal Info" },
  { id: "experience", type: "experience", label: "Experience" },
  { id: "education", type: "education", label: "Education" },
  { id: "skills", type: "skills", label: "Skills" },
  { id: "projects", type: "projects", label: "Projects" },
];

const SECTION_LABELS: Record<SectionType, string> = {
  personalInfo: "Personal Info",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
};

const emptyContent: ResumeContent = {
  personalInfo: { name: "", email: "", phone: "", location: "", summary: "" },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

// ─── Toolbar Button ──────────────────────────────────────────────────────────

interface ToolbarBtnProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltip: string;
  shortcut?: string;
  children: React.ReactNode;
}

function ToolbarBtn({
  onClick,
  isActive,
  disabled,
  tooltip,
  shortcut,
  children,
}: ToolbarBtnProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`h-7 min-w-[28px] px-1.5 rounded text-sm transition-colors flex items-center justify-center gap-1 ${
            isActive
              ? "bg-primary/20 text-primary ring-1 ring-primary/30"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {tooltip}
        {shortcut && (
          <span className="ml-1.5 opacity-60 font-mono">{shortcut}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

// ─── Font Select ─────────────────────────────────────────────────────────────

const FONTS = [
  { label: "Sans-serif", value: "ui-sans-serif, system-ui, sans-serif" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Monospace", value: "ui-monospace, 'Courier New', monospace" },
  { label: "System", value: "system-ui, sans-serif" },
];

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28];

// ─── Sortable Section Wrapper ────────────────────────────────────────────────

interface SortableSectionProps {
  section: Section;
  content: ResumeContent;
  onUpdateContent: (updated: ResumeContent) => void;
  onRemove: (id: string) => void;
  activeSectionId: string | null;
  onActivate: (id: string) => void;
}

function SortableSection({
  section,
  content,
  onUpdateContent,
  onRemove,
  activeSectionId,
  onActivate,
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const isActive = activeSectionId === section.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative mb-4 rounded-lg border transition-all ${
        isActive
          ? "border-primary/40 bg-card/60"
          : "border-border/40 bg-card/30 hover:border-border"
      }`}
      data-ocid={`advanced.section.${section.type}`}
    >
      {/* Section header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
        <div className="flex items-center gap-2 flex-1">
          {/* Drag handle */}
          <span
            className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors opacity-0 group-hover:opacity-100"
            data-ocid={`advanced.section_drag.${section.type}`}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </span>
          <h3
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer"
            onClick={() => onActivate(section.id)}
            onKeyDown={(e) => e.key === "Enter" && onActivate(section.id)}
          >
            {section.label}
          </h3>
        </div>
        {section.type !== "personalInfo" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(section.id);
            }}
            className="opacity-0 group-hover:opacity-100 text-muted-foreground/50 hover:text-destructive transition-all"
            data-ocid={`advanced.section_remove.${section.type}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Section content */}
      <div className="p-3">
        <SectionContent
          section={section}
          content={content}
          onUpdateContent={onUpdateContent}
        />
      </div>
    </div>
  );
}

// ─── Section Content Forms ────────────────────────────────────────────────────

interface SectionContentProps {
  section: Section;
  content: ResumeContent;
  onUpdateContent: (updated: ResumeContent) => void;
}

function SectionContent({
  section,
  content,
  onUpdateContent,
}: SectionContentProps) {
  switch (section.type) {
    case "personalInfo":
      return (
        <PersonalInfoSection content={content} onUpdate={onUpdateContent} />
      );
    case "experience":
      return <ExperienceSection content={content} onUpdate={onUpdateContent} />;
    case "education":
      return <EducationSection content={content} onUpdate={onUpdateContent} />;
    case "skills":
      return <SkillsSection content={content} onUpdate={onUpdateContent} />;
    case "projects":
      return <ProjectsSection content={content} onUpdate={onUpdateContent} />;
    default:
      return null;
  }
}

// Personal Info
function PersonalInfoSection({
  content,
  onUpdate,
}: {
  content: ResumeContent;
  onUpdate: (c: ResumeContent) => void;
}) {
  const { personalInfo } = content;
  const set = (k: keyof typeof personalInfo, v: string) =>
    onUpdate({
      ...content,
      personalInfo: { ...personalInfo, [k]: v },
    });

  return (
    <div className="space-y-2">
      {(
        [
          { key: "name", label: "Full Name", placeholder: "Alex Chen" },
          { key: "email", label: "Email", placeholder: "alex@example.com" },
          { key: "phone", label: "Phone", placeholder: "+1 555-0100" },
          {
            key: "location",
            label: "Location",
            placeholder: "San Francisco, CA",
          },
        ] as Array<{
          key: keyof typeof personalInfo;
          label: string;
          placeholder: string;
        }>
      ).map(({ key, label, placeholder }) => (
        <div key={key}>
          <label
            htmlFor={`personal-${key}`}
            className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide"
          >
            {label}
          </label>
          <Input
            id={`personal-${key}`}
            value={personalInfo[key]}
            onChange={(e) => set(key, e.target.value)}
            placeholder={placeholder}
            className="h-7 text-xs mt-0.5 bg-background/50"
            data-ocid={`advanced.personal_${key}_input`}
          />
        </div>
      ))}
      <div>
        <label
          htmlFor="personal-summary"
          className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide"
        >
          Summary
        </label>
        <textarea
          id="personal-summary"
          value={personalInfo.summary}
          onChange={(e) => set("summary", e.target.value)}
          placeholder="Professional summary..."
          rows={3}
          className="w-full mt-0.5 text-xs rounded-md border border-input bg-background/50 px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-ring"
          data-ocid="advanced.personal_summary_input"
        />
      </div>
    </div>
  );
}

// Experience
function ExperienceSection({
  content,
  onUpdate,
}: {
  content: ResumeContent;
  onUpdate: (c: ResumeContent) => void;
}) {
  const addEntry = () =>
    onUpdate({
      ...content,
      experience: [
        ...content.experience,
        { title: "", company: "", startDate: "", endDate: "", description: "" },
      ],
    });

  const updateEntry = (i: number, patch: Partial<ExperienceEntry>) => {
    const updated = content.experience.map((e, idx) =>
      idx === i ? { ...e, ...patch } : e,
    );
    onUpdate({ ...content, experience: updated });
  };

  const removeEntry = (i: number) =>
    onUpdate({
      ...content,
      experience: content.experience.filter((_, idx) => idx !== i),
    });

  return (
    <div className="space-y-3">
      {content.experience.map((exp, i) => (
        <div
          key={`exp-${String(i)}`}
          className="p-2 bg-background/40 rounded-md border border-border/40 space-y-1.5"
          data-ocid={`advanced.experience.item.${i + 1}`}
        >
          <div className="flex justify-between items-start gap-1">
            <Input
              value={exp.title}
              onChange={(e) => updateEntry(i, { title: e.target.value })}
              placeholder="Job Title"
              className="h-6 text-xs bg-transparent border-transparent focus:border-input"
            />
            <button
              type="button"
              onClick={() => removeEntry(i)}
              className="text-muted-foreground/40 hover:text-destructive shrink-0 mt-0.5"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <Input
            value={exp.company}
            onChange={(e) => updateEntry(i, { company: e.target.value })}
            placeholder="Company"
            className="h-6 text-xs bg-transparent border-transparent focus:border-input"
          />
          <div className="flex gap-1">
            <Input
              value={exp.startDate}
              onChange={(e) => updateEntry(i, { startDate: e.target.value })}
              placeholder="Start"
              className="h-6 text-xs bg-transparent border-transparent focus:border-input"
            />
            <Input
              value={exp.endDate}
              onChange={(e) => updateEntry(i, { endDate: e.target.value })}
              placeholder="End"
              className="h-6 text-xs bg-transparent border-transparent focus:border-input"
            />
          </div>
          <textarea
            value={exp.description}
            onChange={(e) => updateEntry(i, { description: e.target.value })}
            placeholder="Description..."
            rows={2}
            className="w-full text-xs rounded border border-input/30 bg-transparent px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={addEntry}
        className="w-full h-7 text-xs gap-1 border border-dashed border-border hover:border-primary/40"
        data-ocid="advanced.experience_add_button"
      >
        <Plus className="w-3 h-3" />
        Add Experience
      </Button>
    </div>
  );
}

// Education
function EducationSection({
  content,
  onUpdate,
}: {
  content: ResumeContent;
  onUpdate: (c: ResumeContent) => void;
}) {
  const addEntry = () =>
    onUpdate({
      ...content,
      education: [
        ...content.education,
        { school: "", degree: "", startDate: "", endDate: "", description: "" },
      ],
    });

  const updateEntry = (i: number, patch: Partial<EducationEntry>) => {
    const updated = content.education.map((e, idx) =>
      idx === i ? { ...e, ...patch } : e,
    );
    onUpdate({ ...content, education: updated });
  };

  const removeEntry = (i: number) =>
    onUpdate({
      ...content,
      education: content.education.filter((_, idx) => idx !== i),
    });

  return (
    <div className="space-y-3">
      {content.education.map((edu, i) => (
        <div
          key={`edu-${String(i)}`}
          className="p-2 bg-background/40 rounded-md border border-border/40 space-y-1.5"
          data-ocid={`advanced.education.item.${i + 1}`}
        >
          <div className="flex justify-between items-start gap-1">
            <Input
              value={edu.school}
              onChange={(e) => updateEntry(i, { school: e.target.value })}
              placeholder="School / University"
              className="h-6 text-xs bg-transparent border-transparent focus:border-input"
            />
            <button
              type="button"
              onClick={() => removeEntry(i)}
              className="text-muted-foreground/40 hover:text-destructive shrink-0 mt-0.5"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <Input
            value={edu.degree}
            onChange={(e) => updateEntry(i, { degree: e.target.value })}
            placeholder="Degree / Field"
            className="h-6 text-xs bg-transparent border-transparent focus:border-input"
          />
          <div className="flex gap-1">
            <Input
              value={edu.startDate}
              onChange={(e) => updateEntry(i, { startDate: e.target.value })}
              placeholder="Start"
              className="h-6 text-xs bg-transparent border-transparent focus:border-input"
            />
            <Input
              value={edu.endDate}
              onChange={(e) => updateEntry(i, { endDate: e.target.value })}
              placeholder="End"
              className="h-6 text-xs bg-transparent border-transparent focus:border-input"
            />
          </div>
          <textarea
            value={edu.description}
            onChange={(e) => updateEntry(i, { description: e.target.value })}
            placeholder="Description..."
            rows={2}
            className="w-full text-xs rounded border border-input/30 bg-transparent px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={addEntry}
        className="w-full h-7 text-xs gap-1 border border-dashed border-border hover:border-primary/40"
        data-ocid="advanced.education_add_button"
      >
        <Plus className="w-3 h-3" />
        Add Education
      </Button>
    </div>
  );
}

// Skills
function SkillsSection({
  content,
  onUpdate,
}: {
  content: ResumeContent;
  onUpdate: (c: ResumeContent) => void;
}) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onUpdate({ ...content, skills: [...content.skills, trimmed] });
    setInput("");
  };

  const removeSkill = (i: number) =>
    onUpdate({
      ...content,
      skills: content.skills.filter((_, idx) => idx !== i),
    });

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 min-h-[28px]">
        {content.skills.map((skill, i) => (
          <Badge
            key={`skill-${String(i)}`}
            variant="secondary"
            className="text-xs gap-1 pr-1 cursor-pointer group/badge"
            data-ocid={`advanced.skill.item.${i + 1}`}
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(i)}
              className="opacity-50 group-hover/badge:opacity-100 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        ))}
        {content.skills.length === 0 && (
          <span className="text-xs text-muted-foreground/50 italic">
            No skills added yet
          </span>
        )}
      </div>
      <div className="flex gap-1.5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          placeholder="Add a skill…"
          className="h-7 text-xs bg-background/50"
          data-ocid="advanced.skills_input"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={addSkill}
          className="h-7 px-2 text-xs"
          data-ocid="advanced.skills_add_button"
        >
          Add
        </Button>
      </div>
    </div>
  );
}

// Projects
function ProjectsSection({
  content,
  onUpdate,
}: {
  content: ResumeContent;
  onUpdate: (c: ResumeContent) => void;
}) {
  const addEntry = () =>
    onUpdate({
      ...content,
      projects: [...content.projects, { title: "", link: "", description: "" }],
    });

  const updateEntry = (i: number, patch: Partial<ProjectEntry>) => {
    const updated = content.projects.map((p, idx) =>
      idx === i ? { ...p, ...patch } : p,
    );
    onUpdate({ ...content, projects: updated });
  };

  const removeEntry = (i: number) =>
    onUpdate({
      ...content,
      projects: content.projects.filter((_, idx) => idx !== i),
    });

  return (
    <div className="space-y-3">
      {content.projects.map((proj, i) => (
        <div
          key={`proj-${String(i)}`}
          className="p-2 bg-background/40 rounded-md border border-border/40 space-y-1.5"
          data-ocid={`advanced.project.item.${i + 1}`}
        >
          <div className="flex justify-between items-start gap-1">
            <Input
              value={proj.title}
              onChange={(e) => updateEntry(i, { title: e.target.value })}
              placeholder="Project Name"
              className="h-6 text-xs bg-transparent border-transparent focus:border-input"
            />
            <button
              type="button"
              onClick={() => removeEntry(i)}
              className="text-muted-foreground/40 hover:text-destructive shrink-0 mt-0.5"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <Input
            value={proj.link}
            onChange={(e) => updateEntry(i, { link: e.target.value })}
            placeholder="Link (optional)"
            className="h-6 text-xs bg-transparent border-transparent focus:border-input"
          />
          <textarea
            value={proj.description}
            onChange={(e) => updateEntry(i, { description: e.target.value })}
            placeholder="Description..."
            rows={2}
            className="w-full text-xs rounded border border-input/30 bg-transparent px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={addEntry}
        className="w-full h-7 text-xs gap-1 border border-dashed border-border hover:border-primary/40"
        data-ocid="advanced.project_add_button"
      >
        <Plus className="w-3 h-3" />
        Add Project
      </Button>
    </div>
  );
}

// ─── A4 Canvas Preview ────────────────────────────────────────────────────────

import { renderTemplate } from "../utils/templateRenderer";

interface A4CanvasProps {
  templateId: string;
  content: ResumeContent;
  sections: Section[];
}

function A4Canvas({ templateId, content, sections }: A4CanvasProps) {
  // Build ordered content matching section order
  const orderedContent: ResumeContent = {
    ...content,
    // sections order is reflected in the template rendering
    experience: sections.find((s) => s.type === "experience")
      ? content.experience
      : [],
    education: sections.find((s) => s.type === "education")
      ? content.education
      : [],
    skills: sections.find((s) => s.type === "skills") ? content.skills : [],
    projects: sections.find((s) => s.type === "projects")
      ? content.projects
      : [],
  };

  return (
    <div
      className="bg-white shadow-[0_4px_40px_-8px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden"
      style={{ width: "794px", minHeight: "1123px" }}
      data-ocid="advanced.a4_canvas"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: template HTML for A4 resume preview
      dangerouslySetInnerHTML={{
        __html: renderTemplate(templateId, orderedContent),
      }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdvancedEditor() {
  const { resumeId } = useParams({
    from: "/protected/resume/$resumeId/advanced",
  });
  const navigate = useNavigate();
  const { data: resume, isLoading } = useGetResume(resumeId);
  const updateResume = useUpdateResume();

  // Section order state — initialized from defaults
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    "personalInfo",
  );
  const [selectedFont, setSelectedFont] = useState(FONTS[0].value);
  const [selectedFontSize, setSelectedFontSize] = useState(14);
  const [charCount, setCharCount] = useState(0);

  const canvasRef = useRef<HTMLDivElement>(null);

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

  // TipTap rich-text editor (summary field — main composition surface)
  const tiptapEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      FontFamily,
      FontSize,
    ],
    content: `<p>${resume?.content?.personalInfo?.summary ?? ""}</p>`,
    onUpdate: ({ editor: e }) => {
      const html = e.getHTML();
      const div = document.createElement("div");
      div.innerHTML = html;
      const text = div.textContent ?? "";
      setCharCount(text.length);
      editor.setContent({
        ...editor.content,
        personalInfo: { ...editor.content.personalInfo, summary: html },
      });
    },
  });

  // Sync tiptap when resume loads
  useEffect(() => {
    if (tiptapEditor && resume?.content?.personalInfo?.summary) {
      tiptapEditor.commands.setContent(
        `<p>${resume.content.personalInfo.summary}</p>`,
      );
    }
  }, [tiptapEditor, resume?.content?.personalInfo?.summary]);

  // Apply font family to tiptap
  useEffect(() => {
    if (tiptapEditor) {
      tiptapEditor.chain().focus().setFontFamily(selectedFont).run();
    }
  }, [tiptapEditor, selectedFont]);

  // Keyboard shortcuts for undo/redo (section-level)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        if (!tiptapEditor?.isFocused) {
          e.preventDefault();
          editor.undo();
        }
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        if (!tiptapEditor?.isFocused) {
          e.preventDefault();
          editor.redo();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [editor, tiptapEditor]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSections((prev) => {
        const oldIdx = prev.findIndex((s) => s.id === active.id);
        const newIdx = prev.findIndex((s) => s.id === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  }, []);

  const removeSection = useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addSection = useCallback((type: SectionType) => {
    setSections((prev) => [
      ...prev,
      { id: type, type, label: SECTION_LABELS[type] },
    ]);
  }, []);

  const missingTypes = (
    ["experience", "education", "skills", "projects"] as SectionType[]
  ).filter((t) => !sections.find((s) => s.type === t));

  const handleManualSave = async () => {
    try {
      await editor.manualSave();
      toast.success("Resume saved successfully.");
    } catch {
      toast.error("Failed to save resume.");
    }
  };

  const handleDownload = async () => {
    if (resume?.downloadUnlocked) {
      try {
        toast.info("Generating your PDF…");
        await generatePDF(resume);
        toast.success("PDF downloaded!");
      } catch {
        toast.error("PDF generation failed. Please try again.");
      }
    } else {
      navigate({ to: "/resume/$resumeId/payment", params: { resumeId } });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="h-12 bg-card border-b border-border px-6 flex items-center gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="h-10 bg-card/80 border-b border-border px-6 flex items-center gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={`sk-${String(i)}`} className="h-7 w-8" />
          ))}
        </div>
        <div className="flex flex-1 overflow-hidden">
          <Skeleton className="w-72 h-full m-4 rounded-xl" />
          <Skeleton className="flex-1 h-full m-4 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Resume not found.
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={400}>
      <div className="min-h-screen bg-background flex flex-col overflow-hidden">
        {/* ── Top Navigation Bar ─────────────────────────────── */}
        <header
          className="h-12 bg-card border-b border-border px-4 flex items-center justify-between gap-3 shrink-0 z-30"
          data-ocid="advanced.topbar"
        >
          {/* Left: back + brand + title */}
          <div className="flex items-center gap-2 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                navigate({
                  to: "/resume/$resumeId/edit",
                  params: { resumeId },
                })
              }
              className="h-8 gap-1.5 shrink-0 text-muted-foreground hover:text-foreground"
              data-ocid="advanced.back_button"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Form Editor</span>
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-1.5 min-w-0">
              <FileText className="w-4 h-4 text-primary shrink-0" />
              <Input
                value={editor.title}
                onChange={(e) => editor.setTitle(e.target.value)}
                className="h-7 w-40 font-medium text-sm bg-transparent border-transparent hover:border-input focus:border-input transition-colors"
                data-ocid="advanced.title_input"
              />
            </div>

            {/* Save status */}
            {editor.isSaving ? (
              <span
                className="flex items-center gap-1 text-xs text-muted-foreground"
                data-ocid="advanced.saving_state"
              >
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span className="hidden sm:inline">Saving…</span>
              </span>
            ) : editor.isDirty ? (
              <Badge
                variant="outline"
                className="text-[10px] h-5 px-1.5 text-amber-400 border-amber-400/40"
              >
                Unsaved
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-[10px] h-5 px-1.5 text-emerald-400 border-emerald-400/40"
              >
                Saved
              </Badge>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleManualSave}
              disabled={editor.isSaving || !editor.isDirty}
              className="h-8 gap-1.5 text-xs hidden sm:flex"
              data-ocid="advanced.save_button"
            >
              <Save className="w-3.5 h-3.5" />
              Save
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="h-8 gap-1.5 text-xs"
              data-ocid="advanced.download_button"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>
          </div>
        </header>

        {/* ── Floating Formatting Toolbar ─────────────────────── */}
        <div
          className="h-10 bg-card/95 backdrop-blur border-b border-border px-4 flex items-center gap-1 shrink-0 z-20 overflow-x-auto scrollbar-none"
          data-ocid="advanced.toolbar"
        >
          {/* Undo/Redo */}
          <ToolbarBtn
            onClick={() => {
              if (tiptapEditor?.isFocused)
                tiptapEditor?.chain().focus().undo().run();
              else editor.undo();
            }}
            disabled={!editor.canUndo && !tiptapEditor?.can().undo()}
            tooltip="Undo"
            shortcut="Ctrl+Z"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              if (tiptapEditor?.isFocused)
                tiptapEditor?.chain().focus().redo().run();
              else editor.redo();
            }}
            disabled={!editor.canRedo && !tiptapEditor?.can().redo()}
            tooltip="Redo"
            shortcut="Ctrl+Y"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Separator orientation="vertical" className="h-5 mx-1" />

          {/* Font family */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-7 px-2 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1 shrink-0"
                data-ocid="advanced.font_family_select"
              >
                <span className="max-w-[72px] truncate">
                  {FONTS.find((f) => f.value === selectedFont)?.label ?? "Font"}
                </span>
                <span className="text-[9px] opacity-50">▼</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {FONTS.map((f) => (
                <DropdownMenuItem
                  key={f.value}
                  onClick={() => {
                    setSelectedFont(f.value);
                    tiptapEditor?.chain().focus().setFontFamily(f.value).run();
                  }}
                  className={
                    selectedFont === f.value ? "text-primary" : undefined
                  }
                >
                  <span style={{ fontFamily: f.value }}>{f.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font size */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-7 px-2 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1 shrink-0"
                data-ocid="advanced.font_size_select"
              >
                {selectedFontSize}pt
                <span className="text-[9px] opacity-50">▼</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24">
              {FONT_SIZES.map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => {
                    setSelectedFontSize(size);
                    tiptapEditor
                      ?.chain()
                      .focus()
                      .setFontSize(`${size}pt`)
                      .run();
                  }}
                  className={
                    selectedFontSize === size ? "text-primary" : undefined
                  }
                >
                  {size}pt
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="h-5 mx-1" />

          {/* Bold / Italic / Underline */}
          <ToolbarBtn
            onClick={() => tiptapEditor?.chain().focus().toggleBold().run()}
            isActive={tiptapEditor?.isActive("bold") ?? false}
            tooltip="Bold"
            shortcut="Ctrl+B"
          >
            <Bold className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => tiptapEditor?.chain().focus().toggleItalic().run()}
            isActive={tiptapEditor?.isActive("italic") ?? false}
            tooltip="Italic"
            shortcut="Ctrl+I"
          >
            <Italic className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() =>
              tiptapEditor?.chain().focus().toggleUnderline().run()
            }
            isActive={tiptapEditor?.isActive("underline") ?? false}
            tooltip="Underline"
            shortcut="Ctrl+U"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Separator orientation="vertical" className="h-5 mx-1" />

          {/* Alignment */}
          <ToolbarBtn
            onClick={() =>
              tiptapEditor?.chain().focus().setTextAlign("left").run()
            }
            isActive={tiptapEditor?.isActive({ textAlign: "left" }) ?? false}
            tooltip="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() =>
              tiptapEditor?.chain().focus().setTextAlign("center").run()
            }
            isActive={tiptapEditor?.isActive({ textAlign: "center" }) ?? false}
            tooltip="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() =>
              tiptapEditor?.chain().focus().setTextAlign("right").run()
            }
            isActive={tiptapEditor?.isActive({ textAlign: "right" }) ?? false}
            tooltip="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Separator orientation="vertical" className="h-5 mx-1" />

          {/* Lists */}
          <ToolbarBtn
            onClick={() =>
              tiptapEditor?.chain().focus().toggleBulletList().run()
            }
            isActive={tiptapEditor?.isActive("bulletList") ?? false}
            tooltip="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() =>
              tiptapEditor?.chain().focus().toggleOrderedList().run()
            }
            isActive={tiptapEditor?.isActive("orderedList") ?? false}
            tooltip="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolbarBtn>
        </div>

        {/* ── Main Layout: Sections Panel + A4 Canvas ──────────── */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Draggable Sections Panel */}
          <aside
            className="w-72 border-r border-border bg-card/80 flex flex-col shrink-0 overflow-hidden"
            data-ocid="advanced.sections_panel"
          >
            <div className="px-3 py-2 border-b border-border flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Sections
              </p>

              {/* Add section dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    disabled={missingTypes.length === 0}
                    data-ocid="advanced.add_section_button"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  {missingTypes.map((type) => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() => addSection(type)}
                    >
                      {SECTION_LABELS[type]}
                    </DropdownMenuItem>
                  ))}
                  {missingTypes.length === 0 && (
                    <DropdownMenuItem disabled>
                      All sections added
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <ScrollArea className="flex-1 px-2 py-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {sections.map((section) => (
                    <SortableSection
                      key={section.id}
                      section={section}
                      content={editor.content}
                      onUpdateContent={editor.setContent}
                      onRemove={removeSection}
                      activeSectionId={activeSectionId}
                      onActivate={setActiveSectionId}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </ScrollArea>

            {/* Status bar */}
            <div className="px-3 py-2 border-t border-border flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground font-mono">
                {charCount} chars
              </span>
              <span className="text-[10px] text-muted-foreground">
                {sections.length} sections
              </span>
            </div>
          </aside>

          {/* Center: A4 Canvas */}
          <main
            className="flex-1 bg-muted/20 overflow-auto"
            data-ocid="advanced.canvas_area"
          >
            <div className="min-h-full py-8 px-4 flex flex-col items-center">
              {/* Page indicator */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-widest">
                  A4 · 210 × 297 mm
                </span>
              </div>

              {/* A4 canvas — scale to viewport on mobile */}
              <div
                ref={canvasRef}
                className="w-full max-w-[794px] origin-top"
                style={{
                  width: "794px",
                }}
              >
                <A4Canvas
                  templateId={editor.templateId}
                  content={editor.content}
                  sections={sections}
                />
              </div>

              {/* Page footer */}
              <div className="mt-3 text-[10px] text-muted-foreground/40 font-mono">
                Page 1 of 1
              </div>
            </div>
          </main>
        </div>

        {/* TipTap BubbleMenu */}
        {tiptapEditor && (
          <BubbleMenu
            editor={tiptapEditor}
            className="bg-popover border border-border rounded-lg shadow-elevated px-1 py-0.5 flex items-center gap-0.5"
          >
            <ToolbarBtn
              onClick={() => tiptapEditor.chain().focus().toggleBold().run()}
              isActive={tiptapEditor.isActive("bold")}
              tooltip="Bold"
              shortcut="Ctrl+B"
            >
              <Bold className="w-3.5 h-3.5" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => tiptapEditor.chain().focus().toggleItalic().run()}
              isActive={tiptapEditor.isActive("italic")}
              tooltip="Italic"
              shortcut="Ctrl+I"
            >
              <Italic className="w-3.5 h-3.5" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() =>
                tiptapEditor.chain().focus().toggleUnderline().run()
              }
              isActive={tiptapEditor.isActive("underline")}
              tooltip="Underline"
              shortcut="Ctrl+U"
            >
              <UnderlineIcon className="w-3.5 h-3.5" />
            </ToolbarBtn>
          </BubbleMenu>
        )}

        {/* Hidden tiptap editor to keep it alive for toolbar actions */}
        <div className="sr-only" aria-hidden>
          <EditorContent editor={tiptapEditor} />
        </div>
      </div>
    </TooltipProvider>
  );
}
