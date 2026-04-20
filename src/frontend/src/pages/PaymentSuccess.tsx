import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Home,
  RefreshCw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import {
  useConfirmPayment,
  useCreatePaymentRecord,
  useGetResume,
  useGetStripeSessionStatus,
} from "../hooks/useBackend";
import { generatePDF } from "../utils/pdfGenerator";

type Stage =
  | "verifying"
  | "confirmed"
  | "downloading"
  | "downloaded"
  | "download_failed"
  | "payment_failed";

interface SessionResponse {
  payment_intent?: string;
  payment_status?: string;
  amount_total?: number;
  currency?: string;
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, string>;
  const sessionId = search?.session_id ?? "";

  const getStatus = useGetStripeSessionStatus();
  const createPaymentRecord = useCreatePaymentRecord();
  const confirmPayment = useConfirmPayment();

  const [stage, setStage] = useState<Stage>("verifying");
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const didRun = useRef(false);
  const sessionIdRef = useRef(sessionId);
  const getStatusRef = useRef(getStatus.mutateAsync);
  const createPaymentRef = useRef(createPaymentRecord.mutateAsync);
  const confirmPaymentRef = useRef(confirmPayment.mutateAsync);
  getStatusRef.current = getStatus.mutateAsync;
  createPaymentRef.current = createPaymentRecord.mutateAsync;
  confirmPaymentRef.current = confirmPayment.mutateAsync;

  // Load resume lazily — only once resumeId is available
  const { data: resume } = useGetResume(resumeId ?? "");

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const storedResumeId = localStorage.getItem("pending_payment_resume_id");
    if (storedResumeId) setResumeId(storedResumeId);

    const currentSessionId = sessionIdRef.current;
    if (!currentSessionId) {
      setStage("payment_failed");
      setErrorMsg("No payment session found.");
      return;
    }

    const run = async () => {
      try {
        // 1. Verify payment status with backend
        const status = await getStatusRef.current(currentSessionId);

        if (status.__kind__ !== "completed") {
          setStage("payment_failed");
          setErrorMsg(
            status.__kind__ === "failed"
              ? status.failed.error
              : "Payment was not completed.",
          );
          return;
        }

        // 2. Parse the stripe session response to get payment_intent
        let paymentIntentId = currentSessionId; // fallback
        try {
          const parsed = JSON.parse(
            status.completed.response,
          ) as SessionResponse;
          if (parsed?.payment_intent) paymentIntentId = parsed.payment_intent;
        } catch {
          // response may not be JSON — use sessionId as fallback
        }

        // 3. Create payment record if we have a resumeId
        let paymentRecordId: string | null = null;
        if (storedResumeId) {
          try {
            const record = await createPaymentRef.current({
              resumeId: storedResumeId,
              stripePaymentIntentId: paymentIntentId,
              amount: BigInt(500),
            });
            paymentRecordId = record.id;
          } catch {
            // Non-fatal — payment may already be recorded
          }
        }

        // 4. Confirm payment to unlock download
        if (paymentRecordId) {
          try {
            await confirmPaymentRef.current(paymentRecordId);
          } catch {
            // Non-fatal — proceed to download
          }
        }

        // Clean up stored resumeId
        localStorage.removeItem("pending_payment_resume_id");
        setStage("confirmed");
      } catch {
        setStage("payment_failed");
        setErrorMsg("Could not verify your payment. Please contact support.");
      }
    };

    run();
  }, []);

  // Auto-trigger download when stage becomes confirmed and resume is loaded
  useEffect(() => {
    if (stage !== "confirmed" || !resume) return;
    const download = async () => {
      setStage("downloading");
      try {
        await generatePDF(resume);
        setStage("downloaded");
      } catch {
        setStage("download_failed");
      }
    };
    // Small delay to let the UI render the success state first
    const t = setTimeout(download, 800);
    return () => clearTimeout(t);
  }, [stage, resume]);

  const handleManualDownload = async () => {
    if (!resume) return;
    setStage("downloading");
    try {
      await generatePDF(resume);
      setStage("downloaded");
    } catch {
      setStage("download_failed");
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Verifying */}
          {stage === "verifying" && (
            <div
              className="flex flex-col items-center gap-6 text-center"
              data-ocid="payment_success.loading_state"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-primary animate-spin" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold tracking-tight mb-1">
                  Verifying payment…
                </h1>
                <p className="text-sm text-muted-foreground">
                  Please wait while we confirm your payment with Stripe.
                </p>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                <div className="h-full w-1/2 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
          )}

          {/* Confirmed — about to download */}
          {stage === "confirmed" && (
            <div
              className="flex flex-col items-center gap-6 text-center"
              data-ocid="payment_success.success_state"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight mb-1">
                  Payment successful!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Preparing your PDF download…
                </p>
              </div>
            </div>
          )}

          {/* Downloading */}
          {stage === "downloading" && (
            <div
              className="flex flex-col items-center gap-6 text-center"
              data-ocid="payment_success.download_loading_state"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-primary animate-spin" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold tracking-tight mb-1">
                  Generating your PDF…
                </h1>
                <p className="text-sm text-muted-foreground">
                  This usually takes a few seconds.
                </p>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
          )}

          {/* Downloaded */}
          {stage === "downloaded" && (
            <div
              className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden"
              data-ocid="payment_success.downloaded_state"
            >
              <div className="flex flex-col items-center gap-4 text-center px-8 pt-10 pb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight mb-1.5">
                    Your PDF is downloading
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your resume PDF has been downloaded to your device. Check
                    your downloads folder.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="px-8 py-5 flex flex-col gap-3">
                {resumeId && (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleManualDownload}
                    data-ocid="payment_success.redownload_button"
                  >
                    <Download className="w-4 h-4" />
                    Download Again
                  </Button>
                )}
                <Button
                  className="w-full gap-2"
                  onClick={() => navigate({ to: "/dashboard" })}
                  data-ocid="payment_success.dashboard_button"
                >
                  <Home className="w-4 h-4" />
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}

          {/* Download failed — show manual download fallback */}
          {stage === "download_failed" && (
            <div
              className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden"
              data-ocid="payment_success.download_error_state"
            >
              <div className="flex flex-col items-center gap-4 text-center px-8 pt-10 pb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight mb-1.5">
                    Payment confirmed!
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your download unlock is saved. The PDF generation
                    encountered an issue — please try the manual download below.
                  </p>
                </div>

                <div className="w-full flex items-start gap-2.5 bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 text-left">
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive/90">
                    PDF generation failed. Your payment is recorded and you can
                    re-download from the dashboard at any time.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="px-8 py-5 flex flex-col gap-3">
                {resumeId && (
                  <Button
                    className="w-full gap-2"
                    onClick={handleManualDownload}
                    data-ocid="payment_success.manual_download_button"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => navigate({ to: "/dashboard" })}
                  data-ocid="payment_success.dashboard_button"
                >
                  <Home className="w-4 h-4" />
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}

          {/* Payment failed */}
          {stage === "payment_failed" && (
            <div
              className="flex flex-col items-center gap-6 text-center"
              data-ocid="payment_success.error_state"
            >
              <div className="w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                <AlertCircle className="w-9 h-9 text-destructive" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight mb-1.5">
                  Verification failed
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {errorMsg || "We could not verify your payment."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {resumeId && (
                  <Button
                    className="flex-1 gap-2"
                    onClick={() =>
                      navigate({
                        to: "/resume/$resumeId/payment",
                        params: { resumeId },
                      })
                    }
                    data-ocid="payment_success.retry_button"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => navigate({ to: "/dashboard" })}
                  data-ocid="payment_success.dashboard_button"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
