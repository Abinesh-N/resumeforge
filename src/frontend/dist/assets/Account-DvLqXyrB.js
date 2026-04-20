import { j as jsxRuntimeExports } from "./index-twaNkWBq.js";
import { B as Badge } from "./badge-B6UcY6kV.js";
import { S as Skeleton } from "./skeleton-CSD9JFy2.js";
import { L as Layout } from "./Layout-BNrULSDb.js";
import { m as useGetMyProfile, a as useGetPaymentHistory, P as PaymentStatus } from "./useBackend-QfFKXp8l.js";
import { C as CreditCard } from "./credit-card-DPwt6VN6.js";
import { C as Clock } from "./clock-B0_7tfBl.js";
import "./createLucideIcon-C7JxXydK.js";
import "./dropdown-menu-Dmk7dh1d.js";
import "./index-D34DepkZ.js";
import "./file-text-CZLJ6psy.js";
import "./user-blf5ZQGb.js";
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
const STATUS_STYLES = {
  [PaymentStatus.success]: "bg-primary/10 text-primary",
  [PaymentStatus.pending]: "bg-muted text-muted-foreground",
  [PaymentStatus.failed]: "bg-destructive/10 text-destructive"
};
function Account() {
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: payments, isLoading: paymentsLoading } = useGetPaymentHistory();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[680px] mx-auto px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight mb-8", children: "Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm mb-4", children: "Profile" }),
      profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" })
      ] }) : profile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
        profile.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.name }),
        profile.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: profile.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs text-muted-foreground font-mono mt-2 truncate",
            title: profile.principalId,
            children: [
              "ID: ",
              profile.principalId
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Member since ",
          formatDate(profile.createdAt)
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No profile data available." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-sm mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
        "Payment History"
      ] }),
      paymentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "space-y-3",
          "data-ocid": "account.payments.loading_state",
          children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Skeleton,
            {
              className: "h-12 w-full"
            },
            `pay-skel-${String(i)}`
          ))
        }
      ) : !payments || payments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-10 text-muted-foreground text-sm",
          "data-ocid": "account.payments.empty_state",
          children: "No payments yet."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: payments.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between py-3 border-b border-border last:border-none",
          "data-ocid": `account.payment.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                  "$",
                  (Number(p.amount) / 100).toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
                  formatDate(p.createdAt)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs font-medium ${STATUS_STYLES[p.status]}`,
                children: p.status
              }
            )
          ]
        },
        p.id
      )) })
    ] })
  ] }) });
}
export {
  Account as default
};
