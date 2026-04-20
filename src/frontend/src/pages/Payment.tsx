import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Lock,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import {
  useCreateCheckoutSession,
  useGetResume,
  useIsStripeConfigured,
  useSetStripeConfiguration,
} from "../hooks/useBackend";
import { generatePDF } from "../utils/pdfGenerator";
import { renderTemplate } from "../utils/templateRenderer";

const PRICE_CENTS = 500;

const WHAT_YOU_GET = [
  { icon: FileText, label: "Print-ready A4 PDF" },
  { icon: Zap, label: "Instant download after payment" },
  { icon: Shield, label: "ATS-optimised formatting" },
  { icon: Download, label: "Download again any time" },
];

export default function Payment() {
  const { resumeId } = useParams({
    from: "/protected/resume/$resumeId/payment",
  });
  const navigate = useNavigate();
  const { data: resume, isLoading: resumeLoading } = useGetResume(resumeId);
  const { data: stripeConfigured, isLoading: stripeLoading } =
    useIsStripeConfigured();
  const createCheckout = useCreateCheckoutSession();
  const setStripeConfig = useSetStripeConfiguration();

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showStripeSetup, setShowStripeSetup] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [allowedCountries, setAllowedCountries] = useState("US,CA,GB,AU");

  const handleCheckout = async () => {
    try {
      // Store resumeId so we can retrieve it after Stripe redirects back
      localStorage.setItem("pending_payment_resume_id", resumeId);
      const session = await createCheckout.mutateAsync([
        {
          productName: "Resume PDF Download",
          productDescription: `Download: ${resume?.title ?? "Resume"}`,
          currency: "usd",
          priceInCents: BigInt(PRICE_CENTS),
          quantity: BigInt(1),
        },
      ]);
      if (!session?.url) throw new Error("Stripe session missing url");
      window.location.href = session.url;
    } catch {
      localStorage.removeItem("pending_payment_resume_id");
      toast.error("Failed to start checkout. Please try again.");
    }
  };

  const handleDownloadDirectly = async () => {
    if (!resume) return;
    setIsGeneratingPDF(true);
    try {
      await generatePDF(resume);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleStripeSetup = async () => {
    const countries = allowedCountries
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    try {
      await setStripeConfig.mutateAsync({
        secretKey,
        allowedCountries: countries,
      });
      toast.success("Stripe configured successfully.");
      setShowStripeSetup(false);
    } catch {
      toast.error("Failed to configure Stripe.");
    }
  };

  // Build a small thumbnail preview of the resume
  const previewHtml = resume
    ? renderTemplate(resume.templateId, resume.content)
    : null;

  if (resumeLoading || stripeLoading) {
    return (
      <Layout>
        <div
          className="max-w-2xl mx-auto px-6 py-16 space-y-4"
          data-ocid="payment.loading_state"
        >
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-12 w-full rounded-lg mt-4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!resume) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          Resume not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            navigate({ to: "/resume/$resumeId/edit", params: { resumeId } })
          }
          className="gap-1.5 mb-8 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="payment.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to editor
        </Button>

        {/* Already unlocked banner */}
        {resume.downloadUnlocked && (
          <div className="mb-6 flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-5 py-4">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">Download already unlocked</p>
              <p className="text-xs text-muted-foreground">
                You've already paid for this resume. Download it anytime below.
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left — resume thumbnail preview */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
              Your Resume
            </p>
            <div
              className="relative rounded-xl overflow-hidden border border-border bg-card shadow-elevated group"
              data-ocid="payment.resume_preview"
            >
              {/* PDF-like thumbnail via scaled iframe */}
              <div className="w-full aspect-[210/297] overflow-hidden relative">
                {previewHtml ? (
                  <div className="w-full h-full relative">
                    <iframe
                      srcDoc={previewHtml}
                      title="Resume preview"
                      className="absolute inset-0 w-[794px] h-[1123px] pointer-events-none"
                      style={{
                        transform: "scale(var(--preview-scale, 0.38))",
                        transformOrigin: "top left",
                        border: "none",
                      }}
                      onLoad={(e) => {
                        const parent = (e.target as HTMLIFrameElement)
                          .parentElement;
                        if (parent) {
                          const scale = parent.offsetWidth / 794;
                          (parent as HTMLElement).style.setProperty(
                            "--preview-scale",
                            String(scale),
                          );
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-muted-foreground/40" />
                  </div>
                )}
              </div>

              {/* Overlay badge */}
              <div className="absolute bottom-3 left-3">
                <Badge
                  variant="secondary"
                  className="text-xs bg-card/90 backdrop-blur-sm border border-border"
                >
                  {resume.title || "Untitled Resume"}
                </Badge>
              </div>
            </div>

            {/* What you get */}
            <div className="mt-6 space-y-2.5">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                What's included
              </p>
              <ul className="space-y-2">
                {WHAT_YOU_GET.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                      <Icon className="w-3 h-3 text-primary" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — checkout panel */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-elevated sticky top-6">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border">
              <h1 className="font-display text-lg font-bold tracking-tight">
                Download as PDF
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Pay once. Download any time.
              </p>
            </div>

            {/* Price breakdown */}
            <div className="px-6 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {resume.title || "Untitled Resume"}
                </span>
                <span className="font-mono font-semibold text-foreground">
                  ${(PRICE_CENTS / 100).toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span>Total due</span>
                <span className="font-mono text-lg text-primary">
                  ${(PRICE_CENTS / 100).toFixed(2)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6 space-y-3">
              {resume.downloadUnlocked ? (
                <Button
                  className="w-full gap-2 font-semibold"
                  size="lg"
                  onClick={handleDownloadDirectly}
                  disabled={isGeneratingPDF}
                  data-ocid="payment.download_button"
                >
                  {isGeneratingPDF ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating PDF…
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download PDF
                    </>
                  )}
                </Button>
              ) : stripeConfigured ? (
                <Button
                  className="w-full gap-2 font-semibold"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={createCheckout.isPending}
                  data-ocid="payment.pay_button"
                >
                  {createCheckout.isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Redirecting to Stripe…
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Pay ${(PRICE_CENTS / 100).toFixed(2)} &amp; Download
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div
                    className="rounded-lg px-4 py-3 text-sm text-muted-foreground text-center border border-border bg-muted/30"
                    data-ocid="payment.stripe_not_configured"
                  >
                    Payments not yet configured.
                  </div>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setShowStripeSetup(true)}
                    data-ocid="payment.configure_stripe_button"
                  >
                    <Lock className="w-4 h-4" />
                    Configure Stripe (Admin)
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center pt-1">
                <Lock className="w-3 h-3 flex-shrink-0" />
                <span>
                  Secured by Stripe — your card never touches our servers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Setup Dialog */}
      <Dialog open={showStripeSetup} onOpenChange={setShowStripeSetup}>
        <DialogContent data-ocid="payment.stripe_setup_dialog">
          <DialogHeader>
            <DialogTitle>Configure Stripe Payments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm mb-1.5 block">Stripe Secret Key</Label>
              <Input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="sk_live_..."
                data-ocid="payment.stripe_secret_input"
              />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">
                Allowed Countries (comma-separated)
              </Label>
              <Input
                value={allowedCountries}
                onChange={(e) => setAllowedCountries(e.target.value)}
                placeholder="US,CA,GB,AU"
                data-ocid="payment.stripe_countries_input"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleStripeSetup}
              disabled={setStripeConfig.isPending || !secretKey}
              data-ocid="payment.stripe_save_button"
            >
              {setStripeConfig.isPending ? "Saving…" : "Save Configuration"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
