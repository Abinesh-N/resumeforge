import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { Check, Eye, Loader2, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useCreateResume, useGetTemplates } from "../hooks/useBackend";
import type { Template } from "../types";
import { TEMPLATE_IDS, renderTemplate } from "../utils/templateRenderer";

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_CONTENT = {
  personalInfo: {
    name: "Alexandra Chen",
    email: "alex@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    summary:
      "Product-driven software engineer with 6+ years crafting scalable web applications and leading cross-functional teams.",
  },
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Horizon Labs",
      startDate: "Jan 2021",
      endDate: "Present",
      description:
        "Led development of core platform features serving 500K+ users. Reduced API latency by 40%.",
    },
    {
      title: "Software Engineer",
      company: "Beacon Inc.",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      description:
        "Built React component library adopted across 12 product teams.",
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "Stanford University",
      startDate: "2014",
      endDate: "2018",
      description: "Dean's List, ACM Chapter President",
    },
  ],
  skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS", "Figma"],
  projects: [
    {
      title: "OpenMetrics",
      link: "github.com/openmetrics",
      description:
        "Open-source observability toolkit with 2K+ GitHub stars. Real-time dashboards with WebSocket streaming.",
    },
  ],
};

// ─── All 40 template metadata ─────────────────────────────────────────────────

interface TemplateInfo {
  id: string;
  name: string;
  category: string;
  description: string;
}

const ALL_TEMPLATES: TemplateInfo[] = [
  // Modern (8)
  {
    id: "modern-clean",
    name: "Modern Clean",
    category: "Modern",
    description:
      "Clean blue accents with left-border section headers and pill skill badges.",
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    category: "Modern",
    description:
      "Dark navy header with cyan highlights — striking and contemporary.",
  },
  {
    id: "modern-navy",
    name: "Modern Navy",
    category: "Modern",
    description:
      "Sophisticated navy palette with right-aligned contact details.",
  },
  {
    id: "modern-teal",
    name: "Modern Teal",
    category: "Modern",
    description:
      "Vibrant teal header with matching section dividers on a light background.",
  },
  {
    id: "modern-slate",
    name: "Modern Slate",
    category: "Modern",
    description: "Two-column layout with dark slate sidebar and skill dots.",
  },
  {
    id: "modern-gradient",
    name: "Gradient",
    category: "Modern",
    description:
      "Bold purple-to-blue gradient header for a tech-forward impression.",
  },
  {
    id: "modern-bold",
    name: "Bold",
    category: "Modern",
    description:
      "Black header with amber accents — powerful and high-contrast.",
  },
  {
    id: "modern-compact",
    name: "Compact",
    category: "Modern",
    description:
      "Compact layout with pill-badge section labels, ideal for dense content.",
  },
  // Professional (8)
  {
    id: "pro-classic",
    name: "Classic",
    category: "Professional",
    description: "Centered serif layout inspired by traditional print resumes.",
  },
  {
    id: "pro-executive",
    name: "Executive",
    category: "Professional",
    description:
      "Gold accent line with right-aligned contact — executive presence.",
  },
  {
    id: "pro-corporate",
    name: "Corporate",
    category: "Professional",
    description:
      "Deep navy corporate header with structured indented sections.",
  },
  {
    id: "pro-formal",
    name: "Formal",
    category: "Professional",
    description:
      "Small-caps typography with formal serif font and clean dividers.",
  },
  {
    id: "pro-elegant",
    name: "Elegant",
    category: "Professional",
    description: "Crimson accents with Georgian serif — refined and elegant.",
  },
  {
    id: "pro-refined",
    name: "Refined",
    category: "Professional",
    description:
      "Green sidebar with skill list on the left, experience on the right.",
  },
  {
    id: "pro-polished",
    name: "Polished",
    category: "Professional",
    description: "Stripe-textured navy header with a subtle refined aesthetic.",
  },
  {
    id: "pro-distinguished",
    name: "Distinguished",
    category: "Professional",
    description:
      "Bold orange accent bar with separated header and clean typography.",
  },
  // Creative (6)
  {
    id: "creative-color",
    name: "Color Burst",
    category: "Creative",
    description:
      "Indigo sidebar with avatar initials — vibrant and personality-driven.",
  },
  {
    id: "creative-vibrant",
    name: "Vibrant Orange",
    category: "Creative",
    description:
      "Energetic orange header with timeline-style experience section.",
  },
  {
    id: "creative-bold",
    name: "Terminal Dark",
    category: "Creative",
    description:
      "Dark background with neon green accents — developer aesthetic.",
  },
  {
    id: "creative-designer",
    name: "Designer Split",
    category: "Creative",
    description:
      "Pink accent split layout with skills and projects in the left column.",
  },
  {
    id: "creative-artistic",
    name: "Artistic",
    category: "Creative",
    description:
      "Multi-color section borders — each section has its own accent color.",
  },
  {
    id: "creative-dynamic",
    name: "Dynamic",
    category: "Creative",
    description:
      "Diagonal clip-path purple header with diamond bullet section markers.",
  },
  // Minimal (6)
  {
    id: "minimal-pure",
    name: "Pure",
    category: "Minimal",
    description:
      "Ultra-light Helvetica layout — maximum whitespace, zero decoration.",
  },
  {
    id: "minimal-clean",
    name: "Clean",
    category: "Minimal",
    description:
      "Green at-sign for company names — subtle color in a clean framework.",
  },
  {
    id: "minimal-zen",
    name: "Zen",
    category: "Minimal",
    description:
      "Centered serif layout with warm amber section titles — meditative calm.",
  },
  {
    id: "minimal-swiss",
    name: "Swiss Grid",
    category: "Minimal",
    description: "Numbered sections on a strict Swiss-style typographic grid.",
  },
  {
    id: "minimal-nordic",
    name: "Nordic",
    category: "Minimal",
    description:
      "Warm beige header block with stone tones — Scandinavian simplicity.",
  },
  {
    id: "minimal-simple",
    name: "Simple",
    category: "Minimal",
    description:
      "Times New Roman with thin rules — timeless, no-frills simplicity.",
  },
  // Two-Column (5)
  {
    id: "twocol-modern",
    name: "Blue Split",
    category: "Two-Column",
    description:
      "Blue left panel with skills and education; experience on the right.",
  },
  {
    id: "twocol-classic",
    name: "Classic Split",
    category: "Two-Column",
    description:
      "Navy sidebar with dot-skills list and right-side main content.",
  },
  {
    id: "twocol-skills",
    name: "Skills Chart",
    category: "Two-Column",
    description:
      "Dark green left panel with animated skill-bar chart visualization.",
  },
  {
    id: "twocol-sidebar",
    name: "Dark Sidebar",
    category: "Two-Column",
    description:
      "Charcoal sidebar with amber accents and clean right-side layout.",
  },
  {
    id: "twocol-accent",
    name: "Accent Line",
    category: "Two-Column",
    description:
      "Orange vertical accent divider separating left and right content.",
  },
  // Academic (3)
  {
    id: "academic-traditional",
    name: "Traditional",
    category: "Academic",
    description:
      "Centered small-caps serif layout for academic and faculty positions.",
  },
  {
    id: "academic-research",
    name: "Research CV",
    category: "Academic",
    description:
      "Teal accents with emphasis on education, research, and publications.",
  },
  {
    id: "academic-cv",
    name: "Academic CV",
    category: "Academic",
    description:
      "Navy centered header in Times New Roman — classic academic CV style.",
  },
  // Executive (2)
  {
    id: "exec-premium",
    name: "Premium Gold",
    category: "Executive",
    description:
      "Warm amber header on cream — premium quality for senior leadership.",
  },
  {
    id: "exec-leadership",
    name: "Leadership",
    category: "Executive",
    description:
      "Charcoal header with green leadership accents and call-out summary.",
  },
  // Startup & Tech (2)
  {
    id: "startup-modern",
    name: "Startup",
    category: "Startup & Tech",
    description:
      "Monospace comment-style section headers — modern startup engineer look.",
  },
  {
    id: "startup-tech",
    name: "Terminal",
    category: "Startup & Tech",
    description: "Full dark terminal aesthetic with green-on-black code style.",
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Modern",
  "Professional",
  "Creative",
  "Minimal",
  "Two-Column",
  "Academic",
  "Executive",
  "Startup & Tech",
];

// ─── Category badge colors ────────────────────────────────────────────────────

const CATEGORY_BADGE: Record<string, string> = {
  Modern: "bg-blue-50 text-blue-700 border-blue-200",
  Professional: "bg-slate-100 text-slate-700 border-slate-200",
  Creative: "bg-purple-50 text-purple-700 border-purple-200",
  Minimal: "bg-stone-100 text-stone-600 border-stone-200",
  "Two-Column": "bg-green-50 text-green-700 border-green-200",
  Academic: "bg-amber-50 text-amber-700 border-amber-200",
  Executive: "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Startup & Tech": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// ─── Merge backend templates with local fallback ──────────────────────────────

function mergeTemplates(
  backendTemplates: Template[] | undefined,
): TemplateInfo[] {
  if (!backendTemplates || backendTemplates.length === 0) return ALL_TEMPLATES;
  // Ensure all 40 are present; backend may only have a subset
  const backendIds = new Set(backendTemplates.map((t) => t.id));
  const extras = ALL_TEMPLATES.filter((t) => !backendIds.has(t.id));
  const merged: TemplateInfo[] = [
    ...backendTemplates.map((t) => {
      const local = ALL_TEMPLATES.find((l) => l.id === t.id);
      return {
        id: t.id,
        name: local?.name ?? (t.name as string),
        category: local?.category ?? (t.category as string),
        description: local?.description ?? (t.description as string) ?? "",
      };
    }),
    ...extras,
  ];
  return merged;
}

// ─── Template preview ─────────────────────────────────────────────────────────

function TemplatePreview({
  templateId,
  scale,
  className,
}: {
  templateId: string;
  scale: number;
  className?: string;
}) {
  const templateHtml = renderTemplate(templateId, SAMPLE_CONTENT);
  return (
    <div
      className={`relative overflow-hidden bg-white ${className ?? ""}`}
      style={{ aspectRatio: "210/297" }}
    >
      <iframe
        srcDoc={templateHtml}
        title={`Preview of ${templateId}`}
        scrolling="no"
        style={{
          width: `${Math.round(100 / scale)}%`,
          height: `${Math.round(100 / scale)}%`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          border: "none",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Template card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  index,
  isSelected,
  isCreating,
  onSelect,
  onPreview,
  onUse,
}: {
  template: TemplateInfo;
  index: number;
  isSelected: boolean;
  isCreating: boolean;
  onSelect: (id: string) => void;
  onPreview: (t: TemplateInfo) => void;
  onUse: (id: string) => void;
}) {
  const badgeClass =
    CATEGORY_BADGE[template.category] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.3) }}
      data-ocid={`templates.item.${index + 1}`}
    >
      <button
        type="button"
        className={[
          "group rounded-xl border bg-card overflow-hidden cursor-pointer transition-all duration-200 w-full text-left",
          isSelected
            ? "border-primary shadow-[0_0_0_2px_oklch(var(--primary)/0.2)] ring-2 ring-primary/10"
            : "border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5",
        ].join(" ")}
        onClick={() => onSelect(template.id)}
        aria-pressed={isSelected}
        aria-label={`Select ${template.name} template`}
      >
        {/* Preview area */}
        <div className="relative border-b border-border overflow-hidden">
          <TemplatePreview templateId={template.id} scale={0.28} />

          {/* Hover overlay with Preview button */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-200 flex items-center justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 bg-background/95 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border shadow-lg"
              data-ocid={`templates.preview_button.${index + 1}`}
              aria-label={`Preview ${template.name}`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>

          {/* Selected checkmark */}
          {isSelected && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <Check className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
          )}

          {/* Category badge */}
          <div className="absolute bottom-2 left-2">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`}
            >
              {template.category}
            </span>
          </div>
        </div>

        {/* Card info */}
        <div className="p-3.5">
          <h3 className="font-semibold text-sm text-foreground mb-1 truncate">
            {template.name}
          </h3>
          <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed min-h-[2.6rem]">
            {template.description}
          </p>
          <Button
            size="sm"
            className="w-full gap-1.5 h-8 text-xs"
            variant={isSelected ? "default" : "outline"}
            onClick={(e) => {
              e.stopPropagation();
              onUse(template.id);
            }}
            disabled={isCreating}
            data-ocid={`templates.use_button.${index + 1}`}
          >
            {isCreating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Creating…
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Use This Template
              </>
            )}
          </Button>
        </div>
      </button>
    </motion.div>
  );
}

// ─── Preview modal ────────────────────────────────────────────────────────────

function TemplatePreviewModal({
  template,
  isOpen,
  isCreating,
  onClose,
  onUse,
}: {
  template: TemplateInfo | null;
  isOpen: boolean;
  isCreating: boolean;
  onClose: () => void;
  onUse: (id: string) => void;
}) {
  if (!template) return null;
  const badgeClass =
    CATEGORY_BADGE[template.category] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-3xl p-0 overflow-hidden border-border bg-card"
        data-ocid="templates.dialog"
      >
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border bg-card">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <DialogTitle className="font-semibold text-base text-foreground truncate">
                {template.name}
              </DialogTitle>
              <span
                className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`}
              >
                {template.category}
              </span>
            </div>
            <Button
              size="sm"
              className="shrink-0 gap-1.5"
              onClick={() => onUse(template.id)}
              disabled={isCreating}
              data-ocid="templates.confirm_button"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Use This Template
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            {template.description}
          </p>
        </DialogHeader>

        {/* Full preview */}
        <div className="overflow-auto bg-muted/30 p-6 flex justify-center">
          <div className="w-full max-w-lg shadow-lg rounded-sm overflow-hidden border border-border/50">
            <TemplatePreview
              templateId={template.id}
              scale={0.62}
              className="w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────

function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5"
      data-ocid="templates.loading_state"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skel-${String(i)}`}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <Skeleton className="w-full" style={{ aspectRatio: "210/297" }} />
          <div className="p-3.5 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-8 w-full mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Count badge ──────────────────────────────────────────────────────────────

function CountBadge({ count }: { count: number }) {
  return (
    <span className="ml-1 text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 font-medium tabular-nums">
      {count}
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Templates() {
  const navigate = useNavigate();
  const { data: backendTemplates, isLoading } = useGetTemplates();
  const createResume = useCreateResume();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateInfo | null>(
    null,
  );
  const [creatingId, setCreatingId] = useState<string | null>(null);

  // Merge backend templates with local definitions
  const templates = useMemo(
    () => mergeTemplates(backendTemplates),
    [backendTemplates],
  );

  // Ensure all TEMPLATE_IDS are accounted for
  const allTemplates = useMemo(() => {
    const existingIds = new Set(templates.map((t) => t.id));
    const missing = TEMPLATE_IDS.filter((id) => !existingIds.has(id));
    const fallbacks = missing.map((id) => ({
      id,
      name: id
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      category: "Modern",
      description: "Professional resume template.",
    }));
    return [...templates, ...fallbacks];
  }, [templates]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allTemplates.length };
    for (const t of allTemplates) {
      counts[t.category] = (counts[t.category] ?? 0) + 1;
    }
    return counts;
  }, [allTemplates]);

  // Filter
  const filtered = useMemo(() => {
    let result = allTemplates;
    if (selectedCategory !== "All") {
      result = result.filter((t) => t.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [allTemplates, selectedCategory, searchQuery]);

  const handleUse = useCallback(
    async (templateId: string) => {
      setCreatingId(templateId);
      try {
        const resume = await createResume.mutateAsync({
          title: "My Resume",
          templateId,
          content: {
            personalInfo: {
              name: "",
              email: "",
              phone: "",
              location: "",
              summary: "",
            },
            education: [],
            experience: [],
            skills: [],
            projects: [],
          },
        });
        navigate({
          to: "/resume/$resumeId/edit",
          params: { resumeId: resume.id },
        });
      } catch {
        toast.error("Failed to create resume. Please try again.");
        setCreatingId(null);
      }
    },
    [createResume, navigate],
  );

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-6 py-10">
        {/* Page header */}
        <div className="mb-8" data-ocid="templates.page">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between"
          >
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2">
                Choose Your Template
              </h1>
              <p className="text-sm text-muted-foreground max-w-lg">
                {allTemplates.length} professionally designed layouts — all
                support click-to-edit, rich text, and PDF export.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates…"
                className="pl-8 h-9 text-sm"
                data-ocid="templates.search_input"
              />
            </div>
          </motion.div>
        </div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="mb-8 overflow-x-auto"
        >
          <Tabs
            value={selectedCategory}
            onValueChange={(v) => {
              setSelectedCategory(v);
              setSearchQuery("");
            }}
            data-ocid="templates.category.tab"
          >
            <TabsList className="bg-muted/60 border border-border p-0.5 h-auto inline-flex min-w-max">
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="text-xs px-3.5 py-1.5 whitespace-nowrap data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  data-ocid={`templates.filter.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}.tab`}
                >
                  {cat}
                  {categoryCounts[cat] !== undefined && (
                    <CountBadge count={categoryCounts[cat]} />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Results count */}
        {!isLoading && searchQuery && (
          <p className="text-xs text-muted-foreground mb-4">
            {filtered.length} template{filtered.length !== 1 ? "s" : ""} for "
            {searchQuery}"
          </p>
        )}

        {/* Loading */}
        {isLoading && <SkeletonGrid count={12} />}

        {/* Grid */}
        {!isLoading && filtered.length > 0 && (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5"
            >
              {filtered.map((template, i) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={i}
                  isSelected={selectedId === template.id}
                  isCreating={creatingId === template.id}
                  onSelect={setSelectedId}
                  onPreview={setPreviewTemplate}
                  onUse={handleUse}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-muted-foreground"
            data-ocid="templates.empty_state"
          >
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm font-medium text-foreground mb-1">
              No templates found
            </p>
            <p className="text-xs mb-4">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "No templates in this category"}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              data-ocid="templates.clear_filter_button"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Preview modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={!!previewTemplate}
        isCreating={creatingId === previewTemplate?.id}
        onClose={() => setPreviewTemplate(null)}
        onUse={handleUse}
      />
    </Layout>
  );
}
