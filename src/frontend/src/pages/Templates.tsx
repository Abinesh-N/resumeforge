import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { Check, Eye, Loader2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useCreateResume, useGetTemplates } from "../hooks/useBackend";
import type { Template } from "../types";
import { renderTemplate } from "../utils/templateRenderer";

// ─── Sample data for previews ────────────────────────────────────────────────

const SAMPLE_CONTENT = {
  personalInfo: {
    name: "Alexandra Chen",
    email: "alex@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    summary:
      "Product-driven software engineer with 6+ years crafting scalable web applications and leading cross-functional teams to ship impactful products.",
  },
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Horizon Labs",
      startDate: "Jan 2021",
      endDate: "Present",
      description:
        "Led development of core platform features serving 500K+ users. Reduced API latency by 40% through caching optimizations.",
    },
    {
      title: "Software Engineer",
      company: "Beacon Inc.",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      description:
        "Built React component library adopted across 12 product teams. Mentored 4 junior engineers.",
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
        "Open-source observability toolkit with 2K+ GitHub stars. Built real-time dashboards with WebSocket streaming.",
    },
  ],
};

// ─── Category styling ─────────────────────────────────────────────────────────

const CATEGORY_BADGE: Record<string, string> = {
  Modern: "bg-primary/15 text-primary border-primary/20",
  Professional: "bg-secondary text-secondary-foreground border-border",
  Creative: "bg-destructive/10 text-destructive border-destructive/20",
  Minimal: "bg-muted text-muted-foreground border-border",
};

// ─── Template preview iframe ──────────────────────────────────────────────────

function TemplatePreviewIframe({
  templateId,
  scale,
  className,
}: {
  templateId: string;
  scale: number;
  className?: string;
}) {
  const html = renderTemplate(templateId, SAMPLE_CONTENT);
  return (
    <div
      className={`relative overflow-hidden bg-white ${className ?? ""}`}
      style={{ aspectRatio: "210/297" }}
    >
      <iframe
        srcDoc={html}
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
  template: Template;
  index: number;
  isSelected: boolean;
  isCreating: boolean;
  onSelect: (id: string) => void;
  onPreview: (template: Template) => void;
  onUse: (id: string) => void;
}) {
  const badgeClass =
    CATEGORY_BADGE[template.category as string] ?? CATEGORY_BADGE.Minimal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      data-ocid={`templates.item.${index + 1}`}
    >
      <button
        type="button"
        className={[
          "group rounded-xl border bg-card overflow-hidden cursor-pointer transition-all duration-200 w-full text-left",
          isSelected
            ? "border-primary shadow-[0_0_0_2px_oklch(var(--primary)/0.25)] shadow-elevated"
            : "border-border hover:border-primary/50 hover:shadow-elevated hover:-translate-y-0.5",
        ].join(" ")}
        onClick={() => onSelect(template.id)}
        aria-pressed={isSelected}
        aria-label={`Select ${template.name} template`}
      >
        {/* Preview area */}
        <div className="relative border-b border-border overflow-hidden">
          <TemplatePreviewIframe templateId={template.id} scale={0.28} />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-200 flex items-center justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border shadow-elevated"
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
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${badgeClass}`}
            >
              {template.category as string}
            </span>
          </div>
        </div>

        {/* Card info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm text-foreground mb-1 truncate">
            {template.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
            {template.description}
          </p>
          <Button
            size="sm"
            className="w-full gap-1.5 transition-smooth"
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
  template: Template | null;
  isOpen: boolean;
  isCreating: boolean;
  onClose: () => void;
  onUse: (id: string) => void;
}) {
  if (!template) return null;
  const badgeClass =
    CATEGORY_BADGE[template.category as string] ?? CATEGORY_BADGE.Minimal;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-3xl p-0 overflow-hidden border-border bg-card"
        data-ocid="templates.dialog"
      >
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border bg-card">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <DialogTitle className="font-display font-semibold text-base text-foreground truncate">
                {template.name}
              </DialogTitle>
              <span
                className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${badgeClass}`}
              >
                {template.category as string}
              </span>
            </div>
            <Button
              size="sm"
              className="shrink-0 gap-1.5 transition-smooth"
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
          <p className="text-xs text-muted-foreground mt-1">
            {template.description}
          </p>
        </DialogHeader>

        {/* Full preview */}
        <div className="overflow-auto bg-muted/30 p-6 flex justify-center">
          <div className="w-full max-w-lg shadow-elevated rounded-sm overflow-hidden border border-border/50">
            <TemplatePreviewIframe
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

function SkeletonGrid() {
  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      data-ocid="templates.loading_state"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`skel-${String(i)}`}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <Skeleton className="w-full" style={{ aspectRatio: "210/297" }} />
          <div className="p-4 space-y-2">
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

// ─── Main page ────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Modern", "Professional", "Creative", "Minimal"];

export default function Templates() {
  const navigate = useNavigate();
  const { data: templates, isLoading } = useGetTemplates();
  const createResume = useCreateResume();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [creatingId, setCreatingId] = useState<string | null>(null);

  const filtered = templates?.filter(
    (t) =>
      selectedCategory === "All" || (t.category as string) === selectedCategory,
  );

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
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        {/* Page header */}
        <div className="mb-8" data-ocid="templates.page">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold tracking-tight text-foreground mb-2"
          >
            Choose Your Template
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-sm text-muted-foreground max-w-lg"
          >
            Start with a professionally designed layout. All templates support
            full rich-text editing and print-ready PDF export.
          </motion.p>
        </div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            data-ocid="templates.category.tab"
          >
            <TabsList className="bg-muted/60 border border-border p-0.5 h-auto">
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="text-xs px-4 py-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  data-ocid={`templates.filter.${cat.toLowerCase()}.tab`}
                >
                  {cat}
                  {cat !== "All" && templates && (
                    <span className="ml-1.5 text-[10px] text-muted-foreground">
                      {
                        templates.filter((t) => (t.category as string) === cat)
                          .length
                      }
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Loading */}
        {isLoading && <SkeletonGrid />}

        {/* Grid */}
        {!isLoading && filtered && filtered.length > 0 && (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={selectedCategory}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
        {!isLoading && filtered?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-muted-foreground"
            data-ocid="templates.empty_state"
          >
            <div className="text-4xl mb-3">🗂️</div>
            <p className="text-sm font-medium text-foreground mb-1">
              No templates in this category
            </p>
            <p className="text-xs">Try selecting a different category above.</p>
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
