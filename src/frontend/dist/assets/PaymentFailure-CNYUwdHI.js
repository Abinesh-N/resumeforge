import { b as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CHkBZu-Y.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-CQLhgfvi.js";
import { S as Separator } from "./separator-DtfJRHQU.js";
import { L as Layout } from "./Layout-BoV8p-Qb.js";
import { R as RefreshCw } from "./refresh-cw-DASRptIj.js";
import { H as House } from "./house-CmFvvI_L.js";
import { A as ArrowLeft } from "./arrow-left-BBZYYzFF.js";
import "./index-BIM_whpq.js";
import "./dropdown-menu-C-uBelgT.js";
import "./file-text-C0DsHqB3.js";
import "./user-BaAuUfwD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function PaymentFailure() {
  const navigate = useNavigate();
  const [resumeId, setResumeId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("pending_payment_resume_id");
    if (stored) setResumeId(stored);
  }, []);
  const handleTryAgain = () => {
    if (resumeId) {
      navigate({
        to: "/resume/$resumeId/payment",
        params: { resumeId }
      });
    } else {
      navigate({ to: "/dashboard" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-12",
      "data-ocid": "payment_failure.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center px-8 pt-10 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-9 h-9 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight mb-1.5", children: "Payment not completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto", children: "Your payment was cancelled or did not go through. No charges have been made to your card." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-muted-foreground/50 flex-shrink-0" }),
              "Your resume is saved and waiting for you"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full gap-2 font-semibold",
                size: "lg",
                onClick: handleTryAgain,
                "data-ocid": "payment_failure.try_again_button",
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
                className: "w-full gap-2",
                onClick: () => navigate({ to: "/dashboard" }),
                "data-ocid": "payment_failure.dashboard_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
                  "Return to Dashboard"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground/60", children: [
            "Need help?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://caffeine.ai?utm_source=payment-failure",
                target: "_blank",
                rel: "noreferrer",
                className: "underline underline-offset-2 hover:text-muted-foreground transition-colors",
                children: "Contact support"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/dashboard" }),
            className: "flex items-center gap-1.5 mx-auto mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "payment_failure.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
              "Back to Dashboard"
            ]
          }
        )
      ] })
    }
  ) });
}
export {
  PaymentFailure as default
};
