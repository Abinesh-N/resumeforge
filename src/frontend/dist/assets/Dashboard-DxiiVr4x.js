import { j as jsxRuntimeExports, r as reactExports, b as useNavigate, c as ue } from "./index-CHkBZu-Y.js";
import { c as composeEventHandlers, a as createSlottable, b as createContextScope } from "./index-BIM_whpq.js";
import { c as createLucideIcon, u as useComposedRefs, a as cn, b as buttonVariants, B as Button } from "./createLucideIcon-CQLhgfvi.js";
import { R as Root, W as WarningProvider, C as Content, T as Title, D as Description, a as Close, c as createDialogScope, P as Portal, O as Overlay, b as Trigger } from "./index-Clr7yjk2.js";
import { B as Badge } from "./badge-i_UGihi_.js";
import { C as Card, a as CardHeader, b as CardContent, c as CardFooter } from "./card-Di4AEnvC.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem, d as DropdownMenuSeparator } from "./dropdown-menu-C-uBelgT.js";
import { S as Skeleton } from "./skeleton-hpK5ufmO.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, m as motion } from "./proxy-uwznEHZD.js";
import { u as useGetMyResumes, a as useGetPaymentHistory, b as useDeleteResume, P as PaymentStatus, T as TemplateCategory } from "./useBackend-Dx4X0RW6.js";
import { L as Layout } from "./Layout-BoV8p-Qb.js";
import { D as Download, g as generatePDF } from "./pdfGenerator-AcrOjJJ8.js";
import { P as Plus, T as Trash2 } from "./trash-2-pWec8ULL.js";
import { F as FileText } from "./file-text-C0DsHqB3.js";
import { C as CreditCard } from "./credit-card-nYe8B718.js";
import { C as Clock } from "./clock-D66h79_Z.js";
import "./user-BaAuUfwD.js";
import "./templateRenderer-CYLFjN06.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const CATEGORY_CONFIG = {
  [TemplateCategory.Modern]: {
    label: "Modern",
    textClass: "text-blue-400",
    bgClass: "bg-blue-500/10 border-blue-500/25",
    dotClass: "bg-blue-400"
  },
  [TemplateCategory.Professional]: {
    label: "Professional",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10 border-emerald-500/25",
    dotClass: "bg-emerald-400"
  },
  [TemplateCategory.Creative]: {
    label: "Creative",
    textClass: "text-violet-400",
    bgClass: "bg-violet-500/10 border-violet-500/25",
    dotClass: "bg-violet-400"
  },
  [TemplateCategory.Minimal]: {
    label: "Minimal",
    textClass: "text-amber-400",
    bgClass: "bg-amber-500/10 border-amber-500/25",
    dotClass: "bg-amber-400"
  }
};
function getCategoryFromTemplateId(templateId) {
  const lower = templateId.toLowerCase();
  for (const cat of Object.values(TemplateCategory)) {
    if (lower.includes(cat.toLowerCase())) return cat;
  }
  return TemplateCategory.Modern;
}
function formatDate(ts) {
  const ms = Number(ts / 1000000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatAmount(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
function ResumeThumbnail({ category }) {
  const cfg = CATEGORY_CONFIG[category];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `w-full h-[120px] rounded-lg border flex flex-col gap-2 items-center justify-center ${cfg.bgClass}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-9 h-9 rounded-full border-2 flex items-center justify-center ${cfg.bgClass}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: `w-4 h-4 ${cfg.textClass}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 w-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-1.5 w-full rounded-full opacity-50 ${cfg.dotClass}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 w-4/5 rounded-full opacity-30 ${cfg.dotClass}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 w-full rounded-full opacity-25 ${cfg.dotClass}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 w-3/5 rounded-full opacity-20 ${cfg.dotClass}` })
        ] })
      ]
    }
  );
}
function ResumeCard({ resume, index, onDelete }) {
  const navigate = useNavigate();
  const category = getCategoryFromTemplateId(resume.templateId);
  const cfg = CATEGORY_CONFIG[category];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group flex flex-col bg-card border-border hover:border-primary/30 transition-smooth hover:shadow-elevated",
      "data-ocid": `dashboard.resume_card.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "p-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: `text-xs font-medium border ${cfg.bgClass} ${cfg.textClass}`,
              "data-ocid": `dashboard.resume_card.category_badge.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${cfg.dotClass}`
                  }
                ),
                cfg.label
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground -mr-1 -mt-1",
                "aria-label": "Resume actions",
                "data-ocid": `dashboard.resume_card.actions_menu.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-4 h-4" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => navigate({
                    to: "/resume/$resumeId/edit",
                    params: { resumeId: resume.id }
                  }),
                  "data-ocid": `dashboard.resume_card.edit_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 mr-2" }),
                    "Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => navigate({
                    to: "/resume/$resumeId/advanced",
                    params: { resumeId: resume.id }
                  }),
                  "data-ocid": `dashboard.resume_card.advanced_edit_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 mr-2" }),
                    "Advanced Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
              resume.downloadUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: async () => {
                    try {
                      ue.info("Generating PDF…");
                      await generatePDF(resume);
                      ue.success("PDF downloaded!");
                    } catch {
                      ue.error("PDF generation failed. Please try again.");
                    }
                  },
                  "data-ocid": `dashboard.resume_card.download_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
                    "Download PDF"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => navigate({
                    to: "/resume/$resumeId/payment",
                    params: { resumeId: resume.id }
                  }),
                  "data-ocid": `dashboard.resume_card.pay_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 mr-2" }),
                    "Pay to Download"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => onDelete(resume),
                  className: "text-destructive focus:text-destructive",
                  "data-ocid": `dashboard.resume_card.delete_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                    "Delete"
                  ]
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pt-2 pb-3 flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeThumbnail, { category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-sm font-semibold text-foreground truncate",
              title: resume.title,
              children: resume.title || "Untitled Resume"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "px-4 py-3 border-t border-border/50 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: formatDate(resume.updatedAt) })
          ] }),
          resume.downloadUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-xs shrink-0 border-emerald-500/25 bg-emerald-500/10 text-emerald-400 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-2.5 h-2.5" }),
                "Unlocked"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs shrink-0 border-border text-muted-foreground",
              children: "Locked"
            }
          )
        ] })
      ]
    }
  );
}
function SkeletonCards() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
      "data-ocid": "dashboard.resumes.loading_state",
      children: ["a", "b", "c", "d"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "flex flex-col bg-card border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "p-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pt-2 pb-3 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[120px] w-full rounded-lg" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "px-4 py-3 border-t border-border/50 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
            ] })
          ]
        },
        `skel-${id}`
      ))
    }
  );
}
function EmptyResumes() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex flex-col items-center justify-center py-24 text-center",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      "data-ocid": "dashboard.resumes.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-9 h-9 text-muted-foreground/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "No resumes yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed", children: "Build your professional resume in minutes. Pick a template and start editing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => navigate({ to: "/templates" }),
            "data-ocid": "dashboard.resumes.create_first_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
              "Create Your First Resume"
            ]
          }
        )
      ]
    }
  );
}
function DownloadHistory({
  payments,
  resumes,
  isLoading
}) {
  const completed = payments.filter((p) => p.status === PaymentStatus.success);
  const resumeMap = Object.fromEntries(resumes.map((r) => [r.id, r.title]));
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "dashboard.history.loading_state", children: ["a", "b", "c"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-4 py-3 border-b border-border/50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
        ]
      },
      `hist-skel-${id}`
    )) });
  }
  if (completed.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "dashboard.history.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-7 h-7 text-muted-foreground/50" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: "No downloads yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Unlock a resume to see your payment and download history here." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", "data-ocid": "dashboard.history.table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Resume Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Download Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Amount" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: completed.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/40 hover:bg-muted/20 transition-colors",
        "data-ocid": `dashboard.history.row.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4 font-medium text-foreground", children: resumeMap[p.resumeId] ?? "Deleted Resume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4 text-muted-foreground", children: p.unlockedAt ? formatDate(p.unlockedAt) : formatDate(p.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 text-right font-mono text-foreground tabular-nums", children: formatAmount(p.amount) })
        ]
      },
      p.id
    )) })
  ] }) });
}
function Dashboard() {
  const navigate = useNavigate();
  const { data: resumes = [], isLoading: resumesLoading } = useGetMyResumes();
  const { data: payments = [], isLoading: paymentsLoading } = useGetPaymentHistory();
  const deleteResume = useDeleteResume();
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  const sortedResumes = [...resumes].sort(
    (a, b) => Number(b.updatedAt - a.updatedAt)
  );
  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    const title = pendingDelete.title;
    try {
      await deleteResume.mutateAsync(pendingDelete.id);
      ue.success(`"${title}" has been deleted.`);
    } catch {
      ue.error("Failed to delete resume. Please try again.");
    } finally {
      setPendingDelete(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8",
          "data-ocid": "dashboard.page_header",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-tight", children: "Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage your resumes and track downloads" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => navigate({ to: "/templates" }),
                className: "shrink-0",
                "data-ocid": "dashboard.create_resume_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                  "Create New Resume"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "resumes", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsList,
          {
            className: "mb-6 bg-muted/40 border border-border",
            "data-ocid": "dashboard.tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "resumes",
                  className: "gap-1.5",
                  "data-ocid": "dashboard.resumes_tab",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
                    "My Resumes",
                    resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 text-xs bg-primary/15 text-primary rounded px-1.5 py-0.5 font-mono leading-none", children: resumes.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "history",
                  className: "gap-1.5",
                  "data-ocid": "dashboard.history_tab",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
                    "Download History"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "resumes", "data-ocid": "dashboard.resumes_panel", children: resumesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCards, {}) : sortedResumes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyResumes, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: sortedResumes.map((resume, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ResumeCard,
              {
                resume,
                index: i + 1,
                onDelete: setPendingDelete
              }
            )
          },
          resume.id
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", "data-ocid": "dashboard.history_panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Payment & Download History" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DownloadHistory,
            {
              payments,
              resumes,
              isLoading: paymentsLoading
            }
          )
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!pendingDelete,
        onOpenChange: (open) => !open && setPendingDelete(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "dashboard.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete resume?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                '"',
                pendingDelete == null ? void 0 : pendingDelete.title,
                '"'
              ] }),
              "? This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogCancel,
              {
                onClick: () => setPendingDelete(null),
                "data-ocid": "dashboard.delete_dialog.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDeleteConfirm,
                disabled: deleteResume.isPending,
                className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                "data-ocid": "dashboard.delete_dialog.confirm_button",
                children: deleteResume.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Dashboard as default
};
