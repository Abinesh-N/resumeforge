import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDeleteResume,
  useGetMyResumes,
  useGetPaymentHistory,
} from "@/hooks/useBackend";
import { PaymentStatus, TemplateCategory } from "@/types";
import type { PaymentRecordView, ResumeView } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Clock,
  CreditCard,
  Download,
  Edit3,
  FileText,
  MoreHorizontal,
  PenLine,
  Plus,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { generatePDF } from "../utils/pdfGenerator";

// ─── Category styling ─────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<
  TemplateCategory,
  { label: string; textClass: string; bgClass: string; dotClass: string }
> = {
  [TemplateCategory.Modern]: {
    label: "Modern",
    textClass: "text-blue-400",
    bgClass: "bg-blue-500/10 border-blue-500/25",
    dotClass: "bg-blue-400",
  },
  [TemplateCategory.Professional]: {
    label: "Professional",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10 border-emerald-500/25",
    dotClass: "bg-emerald-400",
  },
  [TemplateCategory.Creative]: {
    label: "Creative",
    textClass: "text-violet-400",
    bgClass: "bg-violet-500/10 border-violet-500/25",
    dotClass: "bg-violet-400",
  },
  [TemplateCategory.Minimal]: {
    label: "Minimal",
    textClass: "text-amber-400",
    bgClass: "bg-amber-500/10 border-amber-500/25",
    dotClass: "bg-amber-400",
  },
  [TemplateCategory.Academic]: {
    label: "Academic",
    textClass: "text-cyan-400",
    bgClass: "bg-cyan-500/10 border-cyan-500/25",
    dotClass: "bg-cyan-400",
  },
  [TemplateCategory.Executive]: {
    label: "Executive",
    textClass: "text-rose-400",
    bgClass: "bg-rose-500/10 border-rose-500/25",
    dotClass: "bg-rose-400",
  },
  [TemplateCategory.StartupTech]: {
    label: "Startup Tech",
    textClass: "text-orange-400",
    bgClass: "bg-orange-500/10 border-orange-500/25",
    dotClass: "bg-orange-400",
  },
  [TemplateCategory.TwoColumn]: {
    label: "Two Column",
    textClass: "text-indigo-400",
    bgClass: "bg-indigo-500/10 border-indigo-500/25",
    dotClass: "bg-indigo-400",
  },
};

function getCategoryFromTemplateId(templateId: string): TemplateCategory {
  const lower = templateId.toLowerCase();
  for (const cat of Object.values(TemplateCategory)) {
    if (lower.includes(cat.toLowerCase())) return cat;
  }
  return TemplateCategory.Modern;
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAmount(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

// ─── Resume Thumbnail ─────────────────────────────────────────────────────

function ResumeThumbnail({ category }: { category: TemplateCategory }) {
  const cfg = CATEGORY_CONFIG[category];
  return (
    <div
      className={`w-full h-[120px] rounded-lg border flex flex-col gap-2 items-center justify-center ${cfg.bgClass}`}
    >
      <div
        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${cfg.bgClass}`}
      >
        <FileText className={`w-4 h-4 ${cfg.textClass}`} />
      </div>
      <div className="flex flex-col gap-1 w-14">
        <div
          className={`h-1.5 w-full rounded-full opacity-50 ${cfg.dotClass}`}
        />
        <div className={`h-1 w-4/5 rounded-full opacity-30 ${cfg.dotClass}`} />
        <div className={`h-1 w-full rounded-full opacity-25 ${cfg.dotClass}`} />
        <div className={`h-1 w-3/5 rounded-full opacity-20 ${cfg.dotClass}`} />
      </div>
    </div>
  );
}

// ─── Resume Card ──────────────────────────────────────────────────────────

interface ResumeCardProps {
  resume: ResumeView;
  index: number;
  onDelete: (resume: ResumeView) => void;
}

function ResumeCard({ resume, index, onDelete }: ResumeCardProps) {
  const navigate = useNavigate();
  const category = getCategoryFromTemplateId(resume.templateId);
  const cfg = CATEGORY_CONFIG[category];

  return (
    <Card
      className="group flex flex-col bg-card border-border hover:border-primary/30 transition-smooth hover:shadow-elevated"
      data-ocid={`dashboard.resume_card.item.${index}`}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <Badge
            variant="outline"
            className={`text-xs font-medium border ${cfg.bgClass} ${cfg.textClass}`}
            data-ocid={`dashboard.resume_card.category_badge.${index}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${cfg.dotClass}`}
            />
            {cfg.label}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground -mr-1 -mt-1"
                aria-label="Resume actions"
                data-ocid={`dashboard.resume_card.actions_menu.${index}`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: "/resume/$resumeId/edit",
                    params: { resumeId: resume.id },
                  })
                }
                data-ocid={`dashboard.resume_card.edit_button.${index}`}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: "/resume/$resumeId/advanced",
                    params: { resumeId: resume.id },
                  })
                }
                data-ocid={`dashboard.resume_card.advanced_edit_button.${index}`}
              >
                <PenLine className="w-4 h-4 mr-2" />
                Advanced Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {resume.downloadUnlocked ? (
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      toast.info("Generating PDF…");
                      await generatePDF(resume);
                      toast.success("PDF downloaded!");
                    } catch {
                      toast.error("PDF generation failed. Please try again.");
                    }
                  }}
                  data-ocid={`dashboard.resume_card.download_button.${index}`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: "/resume/$resumeId/payment",
                      params: { resumeId: resume.id },
                    })
                  }
                  data-ocid={`dashboard.resume_card.pay_button.${index}`}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay to Download
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(resume)}
                className="text-destructive focus:text-destructive"
                data-ocid={`dashboard.resume_card.delete_button.${index}`}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="px-4 pt-2 pb-3 flex-1 space-y-3">
        <ResumeThumbnail category={category} />
        <h3
          className="text-sm font-semibold text-foreground truncate"
          title={resume.title}
        >
          {resume.title || "Untitled Resume"}
        </h3>
      </CardContent>

      <CardFooter className="px-4 py-3 border-t border-border/50 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
          <Clock className="w-3 h-3 shrink-0" />
          <span className="truncate">{formatDate(resume.updatedAt)}</span>
        </span>
        {resume.downloadUnlocked ? (
          <Badge
            variant="outline"
            className="text-xs shrink-0 border-emerald-500/25 bg-emerald-500/10 text-emerald-400 gap-1"
          >
            <Download className="w-2.5 h-2.5" />
            Unlocked
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-xs shrink-0 border-border text-muted-foreground"
          >
            Locked
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}

// ─── Loading Skeletons ────────────────────────────────────────────────────

function SkeletonCards() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      data-ocid="dashboard.resumes.loading_state"
    >
      {(["a", "b", "c", "d"] as const).map((id) => (
        <Card
          key={`skel-${id}`}
          className="flex flex-col bg-card border-border"
        >
          <CardHeader className="p-4 pb-2">
            <Skeleton className="h-5 w-20 rounded-full" />
          </CardHeader>
          <CardContent className="px-4 pt-2 pb-3 space-y-3">
            <Skeleton className="h-[120px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
          <CardFooter className="px-4 py-3 border-t border-border/50 flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────

function EmptyResumes() {
  const navigate = useNavigate();
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      data-ocid="dashboard.resumes.empty_state"
    >
      <div className="w-20 h-20 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-5">
        <FileText className="w-9 h-9 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No resumes yet
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
        Build your professional resume in minutes. Pick a template and start
        editing.
      </p>
      <Button
        onClick={() => navigate({ to: "/templates" })}
        data-ocid="dashboard.resumes.create_first_button"
      >
        <Plus className="w-4 h-4 mr-1.5" />
        Create Your First Resume
      </Button>
    </motion.div>
  );
}

// ─── Download History Tab ─────────────────────────────────────────────────

interface DownloadHistoryProps {
  payments: PaymentRecordView[];
  resumes: ResumeView[];
  isLoading: boolean;
}

function DownloadHistory({
  payments,
  resumes,
  isLoading,
}: DownloadHistoryProps) {
  const completed = payments.filter((p) => p.status === PaymentStatus.success);
  const resumeMap = Object.fromEntries(resumes.map((r) => [r.id, r.title]));

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="dashboard.history.loading_state">
        {(["a", "b", "c"] as const).map((id) => (
          <div
            key={`hist-skel-${id}`}
            className="flex items-center gap-4 py-3 border-b border-border/50"
          >
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (completed.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        data-ocid="dashboard.history.empty_state"
      >
        <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4">
          <CreditCard className="w-7 h-7 text-muted-foreground/50" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">
          No downloads yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Unlock a resume to see your payment and download history here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto" data-ocid="dashboard.history.table">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Resume Name
            </th>
            <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Download Date
            </th>
            <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {completed.map((p, i) => (
            <tr
              key={p.id}
              className="border-b border-border/40 hover:bg-muted/20 transition-colors"
              data-ocid={`dashboard.history.row.${i + 1}`}
            >
              <td className="py-3.5 pr-4 font-medium text-foreground">
                {resumeMap[p.resumeId] ?? "Deleted Resume"}
              </td>
              <td className="py-3.5 pr-4 text-muted-foreground">
                {p.unlockedAt
                  ? formatDate(p.unlockedAt)
                  : formatDate(p.createdAt)}
              </td>
              <td className="py-3.5 text-right font-mono text-foreground tabular-nums">
                {formatAmount(p.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: resumes = [], isLoading: resumesLoading } = useGetMyResumes();
  const { data: payments = [], isLoading: paymentsLoading } =
    useGetPaymentHistory();
  const deleteResume = useDeleteResume();
  const [pendingDelete, setPendingDelete] = useState<ResumeView | null>(null);

  // Sort newest first
  const sortedResumes = [...resumes].sort((a, b) =>
    Number(b.updatedAt - a.updatedAt),
  );

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    const title = pendingDelete.title;
    try {
      await deleteResume.mutateAsync(pendingDelete.id);
      toast.success(`"${title}" has been deleted.`);
    } catch {
      toast.error("Failed to delete resume. Please try again.");
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page header */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          data-ocid="dashboard.page_header"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your resumes and track downloads
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: "/templates" })}
            className="shrink-0"
            data-ocid="dashboard.create_resume_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create New Resume
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="resumes">
          <TabsList
            className="mb-6 bg-muted/40 border border-border"
            data-ocid="dashboard.tabs"
          >
            <TabsTrigger
              value="resumes"
              className="gap-1.5"
              data-ocid="dashboard.resumes_tab"
            >
              <FileText className="w-3.5 h-3.5" />
              My Resumes
              {resumes.length > 0 && (
                <span className="ml-0.5 text-xs bg-primary/15 text-primary rounded px-1.5 py-0.5 font-mono leading-none">
                  {resumes.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="gap-1.5"
              data-ocid="dashboard.history_tab"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Download History
            </TabsTrigger>
          </TabsList>

          {/* My Resumes */}
          <TabsContent value="resumes" data-ocid="dashboard.resumes_panel">
            {resumesLoading ? (
              <SkeletonCards />
            ) : sortedResumes.length === 0 ? (
              <EmptyResumes />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedResumes.map((resume, i) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <ResumeCard
                      resume={resume}
                      index={i + 1}
                      onDelete={setPendingDelete}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Download History */}
          <TabsContent value="history" data-ocid="dashboard.history_panel">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">
                  Payment & Download History
                </h2>
              </div>
              <DownloadHistory
                payments={payments}
                resumes={resumes}
                isLoading={paymentsLoading}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent data-ocid="dashboard.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete resume?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{pendingDelete?.title}"
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setPendingDelete(null)}
              data-ocid="dashboard.delete_dialog.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteResume.isPending}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              data-ocid="dashboard.delete_dialog.confirm_button"
            >
              {deleteResume.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
