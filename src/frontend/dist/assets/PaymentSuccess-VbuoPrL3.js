import { b as useNavigate, g as useSearch, r as reactExports, j as jsxRuntimeExports } from "./index-twaNkWBq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-C7JxXydK.js";
import { S as Separator } from "./separator-C8a_aty2.js";
import { L as Layout } from "./Layout-BNrULSDb.js";
import { j as useGetStripeSessionStatus, k as useCreatePaymentRecord, l as useConfirmPayment, e as useGetResume } from "./useBackend-QfFKXp8l.js";
import { D as Download, g as generatePDF } from "./pdfGenerator-DrdGieLq.js";
import { R as RefreshCw } from "./refresh-cw-CgJzdZ3t.js";
import { C as CircleCheck } from "./circle-check-DfWprz9t.js";
import { H as House } from "./house-B306NLFP.js";
import "./index-D34DepkZ.js";
import "./dropdown-menu-Dmk7dh1d.js";
import "./file-text-CZLJ6psy.js";
import "./user-blf5ZQGb.js";
import "./templateRenderer-C4YBmo0g.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function PaymentSuccess() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const sessionId = (search == null ? void 0 : search.session_id) ?? "";
  const getStatus = useGetStripeSessionStatus();
  const createPaymentRecord = useCreatePaymentRecord();
  const confirmPayment = useConfirmPayment();
  const [stage, setStage] = reactExports.useState("verifying");
  const [resumeId, setResumeId] = reactExports.useState(null);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const didRun = reactExports.useRef(false);
  const sessionIdRef = reactExports.useRef(sessionId);
  const getStatusRef = reactExports.useRef(getStatus.mutateAsync);
  const createPaymentRef = reactExports.useRef(createPaymentRecord.mutateAsync);
  const confirmPaymentRef = reactExports.useRef(confirmPayment.mutateAsync);
  getStatusRef.current = getStatus.mutateAsync;
  createPaymentRef.current = createPaymentRecord.mutateAsync;
  confirmPaymentRef.current = confirmPayment.mutateAsync;
  const { data: resume } = useGetResume(resumeId ?? "");
  reactExports.useEffect(() => {
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
        const status = await getStatusRef.current(currentSessionId);
        if (status.__kind__ !== "completed") {
          setStage("payment_failed");
          setErrorMsg(
            status.__kind__ === "failed" ? status.failed.error : "Payment was not completed."
          );
          return;
        }
        let paymentIntentId = currentSessionId;
        try {
          const parsed = JSON.parse(
            status.completed.response
          );
          if (parsed == null ? void 0 : parsed.payment_intent) paymentIntentId = parsed.payment_intent;
        } catch {
        }
        let paymentRecordId = null;
        if (storedResumeId) {
          try {
            const record = await createPaymentRef.current({
              resumeId: storedResumeId,
              stripePaymentIntentId: paymentIntentId,
              amount: BigInt(500)
            });
            paymentRecordId = record.id;
          } catch {
          }
        }
        if (paymentRecordId) {
          try {
            await confirmPaymentRef.current(paymentRecordId);
          } catch {
          }
        }
        localStorage.removeItem("pending_payment_resume_id");
        setStage("confirmed");
      } catch {
        setStage("payment_failed");
        setErrorMsg("Could not verify your payment. Please contact support.");
      }
    };
    run();
  }, []);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    stage === "verifying" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-6 text-center",
        "data-ocid": "payment_success.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8 text-primary animate-spin" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold tracking-tight mb-1", children: "Verifying payment…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Please wait while we confirm your payment with Stripe." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted/30 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-1/2 bg-primary rounded-full animate-pulse" }) })
        ]
      }
    ),
    stage === "confirmed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-6 text-center",
        "data-ocid": "payment_success.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight mb-1", children: "Payment successful!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Preparing your PDF download…" })
          ] })
        ]
      }
    ),
    stage === "downloading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-6 text-center",
        "data-ocid": "payment_success.download_loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8 text-primary animate-spin" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold tracking-tight mb-1", children: "Generating your PDF…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This usually takes a few seconds." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted/30 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-3/4 bg-primary rounded-full animate-pulse" }) })
        ]
      }
    ),
    stage === "downloaded" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden",
        "data-ocid": "payment_success.downloaded_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center px-8 pt-10 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight mb-1.5", children: "Your PDF is downloading" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Your resume PDF has been downloaded to your device. Check your downloads folder." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-5 flex flex-col gap-3", children: [
            resumeId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full gap-2",
                onClick: handleManualDownload,
                "data-ocid": "payment_success.redownload_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  "Download Again"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full gap-2",
                onClick: () => navigate({ to: "/dashboard" }),
                "data-ocid": "payment_success.dashboard_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
                  "Go to Dashboard"
                ]
              }
            )
          ] })
        ]
      }
    ),
    stage === "download_failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden",
        "data-ocid": "payment_success.download_error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center px-8 pt-10 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight mb-1.5", children: "Payment confirmed!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Your download unlock is saved. The PDF generation encountered an issue — please try the manual download below." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex items-start gap-2.5 bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive/90", children: "PDF generation failed. Your payment is recorded and you can re-download from the dashboard at any time." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-5 flex flex-col gap-3", children: [
            resumeId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full gap-2",
                onClick: handleManualDownload,
                "data-ocid": "payment_success.manual_download_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  "Download PDF"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full gap-2",
                onClick: () => navigate({ to: "/dashboard" }),
                "data-ocid": "payment_success.dashboard_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
                  "Go to Dashboard"
                ]
              }
            )
          ] })
        ]
      }
    ),
    stage === "payment_failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-6 text-center",
        "data-ocid": "payment_success.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-9 h-9 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight mb-1.5", children: "Verification failed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: errorMsg || "We could not verify your payment." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full", children: [
            resumeId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 gap-2",
                onClick: () => navigate({
                  to: "/resume/$resumeId/payment",
                  params: { resumeId }
                }),
                "data-ocid": "payment_success.retry_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                  "Try Again"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "flex-1 gap-2",
                onClick: () => navigate({ to: "/dashboard" }),
                "data-ocid": "payment_success.dashboard_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
                  "Dashboard"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] }) }) });
}
export {
  PaymentSuccess as default
};
