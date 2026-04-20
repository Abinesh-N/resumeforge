import { d as useParams, b as useNavigate, r as reactExports, j as jsxRuntimeExports, c as ue } from "./index-CHkBZu-Y.js";
import { B as Badge } from "./badge-i_UGihi_.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-CQLhgfvi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DEsBu1N2.js";
import { I as Input } from "./input-C255lSwx.js";
import { L as Label } from "./label-Bii44QNS.js";
import { S as Separator } from "./separator-DtfJRHQU.js";
import { S as Skeleton } from "./skeleton-hpK5ufmO.js";
import { L as Layout } from "./Layout-BoV8p-Qb.js";
import { e as useGetResume, g as useIsStripeConfigured, h as useCreateCheckoutSession, i as useSetStripeConfiguration } from "./useBackend-Dx4X0RW6.js";
import { D as Download, g as generatePDF } from "./pdfGenerator-AcrOjJJ8.js";
import { r as renderTemplate } from "./templateRenderer-CYLFjN06.js";
import { A as ArrowLeft } from "./arrow-left-BBZYYzFF.js";
import { C as CircleCheck } from "./circle-check-B8hfVE84.js";
import { F as FileText } from "./file-text-C0DsHqB3.js";
import { Z as Zap } from "./zap-CLVG3FGS.js";
import { R as RefreshCw } from "./refresh-cw-DASRptIj.js";
import { C as CreditCard } from "./credit-card-nYe8B718.js";
import "./index-Clr7yjk2.js";
import "./index-BIM_whpq.js";
import "./dropdown-menu-C-uBelgT.js";
import "./user-BaAuUfwD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const PRICE_CENTS = 500;
const WHAT_YOU_GET = [
  { icon: FileText, label: "Print-ready A4 PDF" },
  { icon: Zap, label: "Instant download after payment" },
  { icon: Shield, label: "ATS-optimised formatting" },
  { icon: Download, label: "Download again any time" }
];
function Payment() {
  const { resumeId } = useParams({
    from: "/protected/resume/$resumeId/payment"
  });
  const navigate = useNavigate();
  const { data: resume, isLoading: resumeLoading } = useGetResume(resumeId);
  const { data: stripeConfigured, isLoading: stripeLoading } = useIsStripeConfigured();
  const createCheckout = useCreateCheckoutSession();
  const setStripeConfig = useSetStripeConfiguration();
  const [isGeneratingPDF, setIsGeneratingPDF] = reactExports.useState(false);
  const [showStripeSetup, setShowStripeSetup] = reactExports.useState(false);
  const [secretKey, setSecretKey] = reactExports.useState("");
  const [allowedCountries, setAllowedCountries] = reactExports.useState("US,CA,GB,AU");
  const handleCheckout = async () => {
    try {
      localStorage.setItem("pending_payment_resume_id", resumeId);
      const session = await createCheckout.mutateAsync([
        {
          productName: "Resume PDF Download",
          productDescription: `Download: ${(resume == null ? void 0 : resume.title) ?? "Resume"}`,
          currency: "usd",
          priceInCents: BigInt(PRICE_CENTS),
          quantity: BigInt(1)
        }
      ]);
      if (!(session == null ? void 0 : session.url)) throw new Error("Stripe session missing url");
      window.location.href = session.url;
    } catch {
      localStorage.removeItem("pending_payment_resume_id");
      ue.error("Failed to start checkout. Please try again.");
    }
  };
  const handleDownloadDirectly = async () => {
    if (!resume) return;
    setIsGeneratingPDF(true);
    try {
      await generatePDF(resume);
      ue.success("PDF downloaded!");
    } catch {
      ue.error("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  const handleStripeSetup = async () => {
    const countries = allowedCountries.split(",").map((c) => c.trim()).filter(Boolean);
    try {
      await setStripeConfig.mutateAsync({
        secretKey,
        allowedCountries: countries
      });
      ue.success("Stripe configured successfully.");
      setShowStripeSetup(false);
    } catch {
      ue.error("Failed to configure Stripe.");
    }
  };
  const previewHtml = resume ? renderTemplate(resume.templateId, resume.content) : null;
  if (resumeLoading || stripeLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-6 py-16 space-y-4",
        "data-ocid": "payment.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg mt-4" })
            ] })
          ] })
        ]
      }
    ) });
  }
  if (!resume) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32 text-muted-foreground", children: "Resume not found." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => navigate({ to: "/resume/$resumeId/edit", params: { resumeId } }),
          className: "gap-1.5 mb-8 -ml-2 text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "payment.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to editor"
          ]
        }
      ),
      resume.downloadUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-5 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Download already unlocked" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You've already paid for this resume. Download it anytime below." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1fr_380px] gap-8 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3", children: "Your Resume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative rounded-xl overflow-hidden border border-border bg-card shadow-elevated group",
              "data-ocid": "payment.resume_preview",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[210/297] overflow-hidden relative", children: previewHtml ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "iframe",
                  {
                    srcDoc: previewHtml,
                    title: "Resume preview",
                    className: "absolute inset-0 w-[794px] h-[1123px] pointer-events-none",
                    style: {
                      transform: "scale(var(--preview-scale, 0.38))",
                      transformOrigin: "top left",
                      border: "none"
                    },
                    onLoad: (e) => {
                      const parent = e.target.parentElement;
                      if (parent) {
                        const scale = parent.offsetWidth / 794;
                        parent.style.setProperty(
                          "--preview-scale",
                          String(scale)
                        );
                      }
                    }
                  }
                ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-muted/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-muted-foreground/40" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-xs bg-card/90 backdrop-blur-sm border border-border",
                    children: resume.title || "Untitled Resume"
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold", children: "What's included" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: WHAT_YOU_GET.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-2.5 text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3 text-primary" }) }),
                  label
                ]
              },
              label
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border overflow-hidden shadow-elevated sticky top-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold tracking-tight", children: "Download as PDF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Pay once. Download any time." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: resume.title || "Untitled Resume" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
                "$",
                (PRICE_CENTS / 100).toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg text-primary", children: [
                "$",
                (PRICE_CENTS / 100).toFixed(2)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 space-y-3", children: [
            resume.downloadUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full gap-2 font-semibold",
                size: "lg",
                onClick: handleDownloadDirectly,
                disabled: isGeneratingPDF,
                "data-ocid": "payment.download_button",
                children: isGeneratingPDF ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }),
                  "Generating PDF…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  "Download PDF"
                ] })
              }
            ) : stripeConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full gap-2 font-semibold",
                size: "lg",
                onClick: handleCheckout,
                disabled: createCheckout.isPending,
                "data-ocid": "payment.pay_button",
                children: createCheckout.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }),
                  "Redirecting to Stripe…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                  "Pay $",
                  (PRICE_CENTS / 100).toFixed(2),
                  " & Download"
                ] })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-lg px-4 py-3 text-sm text-muted-foreground text-center border border-border bg-muted/30",
                  "data-ocid": "payment.stripe_not_configured",
                  children: "Payments not yet configured."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full gap-2",
                  onClick: () => setShowStripeSetup(true),
                  "data-ocid": "payment.configure_stripe_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                    "Configure Stripe (Admin)"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground justify-center pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secured by Stripe — your card never touches our servers." })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showStripeSetup, onOpenChange: setShowStripeSetup, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "payment.stripe_setup_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Configure Stripe Payments" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm mb-1.5 block", children: "Stripe Secret Key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "password",
              value: secretKey,
              onChange: (e) => setSecretKey(e.target.value),
              placeholder: "sk_live_...",
              "data-ocid": "payment.stripe_secret_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm mb-1.5 block", children: "Allowed Countries (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: allowedCountries,
              onChange: (e) => setAllowedCountries(e.target.value),
              placeholder: "US,CA,GB,AU",
              "data-ocid": "payment.stripe_countries_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full",
            onClick: handleStripeSetup,
            disabled: setStripeConfig.isPending || !secretKey,
            "data-ocid": "payment.stripe_save_button",
            children: setStripeConfig.isPending ? "Saving…" : "Save Configuration"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Payment as default
};
