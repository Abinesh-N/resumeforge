import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Home, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";

export default function PaymentFailure() {
  const navigate = useNavigate();
  const [resumeId, setResumeId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the pending resumeId that was stored before Stripe redirect
    const stored = localStorage.getItem("pending_payment_resume_id");
    if (stored) setResumeId(stored);
    // Don't remove it here — user may want to retry
  }, []);

  const handleTryAgain = () => {
    if (resumeId) {
      navigate({
        to: "/resume/$resumeId/payment",
        params: { resumeId },
      });
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <Layout>
      <div
        className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-12"
        data-ocid="payment_failure.page"
      >
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
            {/* Icon + heading */}
            <div className="flex flex-col items-center gap-4 text-center px-8 pt-10 pb-6">
              <div className="w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                <XCircle className="w-9 h-9 text-destructive" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight mb-1.5">
                  Payment not completed
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  Your payment was cancelled or did not go through. No charges
                  have been made to your card.
                </p>
              </div>

              {/* Info pill */}
              <div className="flex items-center gap-2 bg-muted/40 border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                Your resume is saved and waiting for you
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="px-8 py-5 space-y-3">
              <Button
                className="w-full gap-2 font-semibold"
                size="lg"
                onClick={handleTryAgain}
                data-ocid="payment_failure.try_again_button"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => navigate({ to: "/dashboard" })}
                data-ocid="payment_failure.dashboard_button"
              >
                <Home className="w-4 h-4" />
                Return to Dashboard
              </Button>
            </div>

            {/* Footnote */}
            <div className="px-8 pb-6">
              <p className="text-center text-xs text-muted-foreground/60">
                Need help?{" "}
                <a
                  href="https://caffeine.ai?utm_source=payment-failure"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>

          {/* Back link */}
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard" })}
            className="flex items-center gap-1.5 mx-auto mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="payment_failure.back_link"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
}
