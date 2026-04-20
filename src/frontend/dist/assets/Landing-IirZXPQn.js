import { u as useInternetIdentity, a as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-twaNkWBq.js";
import { B as Badge } from "./badge-B6UcY6kV.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-C7JxXydK.js";
import { C as Card } from "./card-DyGkX4wC.js";
import { F as FileText } from "./file-text-CZLJ6psy.js";
import { Z as Zap } from "./zap-j_INqqqX.js";
import { C as CreditCard } from "./credit-card-DPwt6VN6.js";
function useAuth() {
  const { login, clear, isAuthenticated, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isInitializing = loginStatus === "initializing";
  const isLoggingIn = loginStatus === "logging-in";
  const logout = () => {
    clear();
    queryClient.clear();
  };
  const principal = identity == null ? void 0 : identity.getPrincipal();
  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    principal,
    identity,
    login,
    logout,
    loginStatus
  };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const FEATURES = [
  {
    icon: Layers,
    title: "Dual Editor Modes",
    desc: "Switch between a guided form builder and a powerful TipTap rich-text editor. Bold, italic, alignment, drag-and-drop sections — full word-processor control.",
    badge: "Form + Advanced"
  },
  {
    icon: FileText,
    title: "Professional Templates",
    desc: "8 hand-crafted designs across Modern, Professional, Creative, and Minimal categories. Switch templates anytime without losing your content.",
    badge: "8 Templates"
  },
  {
    icon: CreditCard,
    title: "Pay Once, Download Forever",
    desc: "Build and edit your resume completely free. Pay a single flat fee when ready — your print-ready A4 PDF downloads instantly after payment.",
    badge: "Instant PDF"
  }
];
const TESTIMONIALS = [
  {
    name: "Sarah Kim",
    role: "Product Designer at Figma",
    avatar: "SK",
    quote: "ResumeForge's advanced editor finally lets me control every detail. I landed three interviews within a week of updating my resume."
  },
  {
    name: "Marcus Chen",
    role: "Senior Engineer at Stripe",
    avatar: "MC",
    quote: "The dual mode is genius. I used the form builder to structure everything, then the advanced editor to fine-tune formatting. Perfect workflow."
  },
  {
    name: "Priya Mehta",
    role: "Product Manager at Linear",
    avatar: "PM",
    quote: "Clean templates, instant PDF, and a pay-once model. Refreshing compared to the subscription-everything alternatives out there."
  }
];
const HERO_CHECKS = [
  "No subscription — build free, pay to export",
  "ATS-friendly formatting out of the box",
  "Instant PDF download right after payment"
];
function useFadeIn() {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}
function ResumeMockup() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[340px] mx-auto lg:mx-0 lg:ml-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-6 bg-primary/8 rounded-[40px] blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-border/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.7)] transform-gpu rotate-[1.5deg] hover:rotate-0 transition-transform duration-700 ease-out", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/resume-mockup-hero.dim_800x1000.png",
          alt: "Resume preview",
          className: "w-full object-cover block",
          loading: "eager"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 inset-x-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/90 backdrop-blur-sm border border-border/60 rounded-lg px-3 py-2.5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "PDF Ready" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: "Alex_Chen_Resume_2026.pdf" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-auto text-[10px] px-1.5 py-0.5 bg-primary/15 text-primary border-primary/20 shrink-0", children: "$5" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 -right-4 bg-card border border-border rounded-full px-3 py-1.5 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-primary fill-primary" }),
      "Modern Template"
    ] }) })
  ] });
}
function Landing() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const [mounted, setMounted] = reactExports.useState(false);
  const featuresAnim = useFadeIn();
  const testimonialsAnim = useFadeIn();
  const ctaAnim = useFadeIn();
  reactExports.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);
  const signingIn = isLoggingIn || isInitializing;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-[15px] tracking-tight text-foreground", children: "ResumeForge" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-3", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", "data-ocid": "nav.dashboard_button", children: [
        "Go to Dashboard",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1.5" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: login,
            disabled: signingIn,
            className: "text-muted-foreground hover:text-foreground hidden sm:inline-flex",
            "data-ocid": "nav.signin_button",
            children: "Sign in"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: login,
            disabled: signingIn,
            "data-ocid": "nav.get_started_button",
            children: isLoggingIn ? "Signing in…" : "Get started"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", "data-ocid": "hero.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: "linear-gradient(to right, oklch(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--border) / 0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              opacity: 0.4
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-primary/6 rounded-full blur-[80px] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-[1200px] mx-auto px-6 py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-14 lg:gap-20 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "mb-5 text-xs font-medium bg-primary/10 text-primary border border-primary/25 gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 fill-primary" }),
                        "Build free · Pay once · Download forever"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-foreground", children: [
                    "Build professional resumes that",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "get you hired" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-lg text-muted-foreground leading-relaxed max-w-[440px] transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`,
                children: "ResumeForge pairs a guided form builder with a powerful rich-text editor. Choose from 8 professional templates, edit freely, then pay once for your print-ready PDF."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "ul",
              {
                className: `space-y-2.5 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`,
                children: HERO_CHECKS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-2.5 text-sm text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                      item
                    ]
                  },
                  item
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`,
                children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Welcome back! Your resumes are ready." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "font-semibold text-base px-8 h-12 shadow-elevated",
                      "data-ocid": "hero.dashboard_cta",
                      children: [
                        "Go to Dashboard",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                      ]
                    }
                  ) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "font-semibold text-base px-8 h-12 shadow-elevated",
                      onClick: login,
                      disabled: signingIn,
                      "data-ocid": "hero.start_building_cta",
                      children: [
                        isLoggingIn ? "Signing in…" : "Start Building — It's Free",
                        !isLoggingIn && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "lg",
                      className: "h-12 text-base",
                      onClick: () => {
                        var _a;
                        return (_a = document.getElementById("features")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                      },
                      "data-ocid": "hero.see_features_button",
                      children: "See features"
                    }
                  )
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex justify-center lg:justify-end transition-all duration-700 delay-[350ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeMockup, {})
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          id: "features",
          ref: featuresAnim.ref,
          className: "bg-muted/30 border-y border-border py-20",
          "data-ocid": "features.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `text-center mb-14 transition-all duration-700 ${featuresAnim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-3", children: "Why ResumeForge" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Everything you need to land the role" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: FEATURES.map((f, i) => {
              const Icon = f.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: `p-6 bg-card border border-border hover:border-primary/30 group transition-all duration-500 hover:shadow-elevated ${featuresAnim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
                  style: {
                    transitionDelay: featuresAnim.visible ? `${i * 100 + 80}ms` : "0ms"
                  },
                  "data-ocid": `features.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-[15px] leading-snug", children: f.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-[10px] px-2 py-0.5 shrink-0 bg-muted text-muted-foreground",
                          children: f.badge
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.desc })
                  ]
                },
                f.title
              );
            }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          ref: testimonialsAnim.ref,
          className: "py-20 bg-background",
          "data-ocid": "testimonials.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `text-center mb-14 transition-all duration-700 ${testimonialsAnim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-3", children: "Social Proof" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Trusted by professionals" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: `p-6 bg-card border border-border transition-all duration-500 ${testimonialsAnim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
                style: {
                  transitionDelay: testimonialsAnim.visible ? `${i * 100 + 80}ms` : "0ms"
                },
                "data-ocid": `testimonials.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-4", children: ["s1", "s2", "s3", "s4", "s5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: "w-3.5 h-3.5 text-primary fill-primary"
                    },
                    sk
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-sm text-foreground/80 leading-relaxed mb-5", children: [
                    '"',
                    t.quote,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: t.avatar }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: t.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.role })
                    ] })
                  ] })
                ]
              },
              t.name
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          ref: ctaAnim.ref,
          className: "bg-muted/30 border-t border-border py-20",
          "data-ocid": "cta.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `max-w-[580px] mx-auto px-6 text-center transition-all duration-700 ${ctaAnim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-4", children: "Your next job starts with a great resume" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Join professionals who use ResumeForge to craft resumes that stand out. Build free — pay once when you're ready to download." }),
                isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "font-semibold px-10 h-12 shadow-elevated",
                    "data-ocid": "cta.dashboard_button",
                    children: [
                      "Open Dashboard",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                    ]
                  }
                ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "font-semibold px-10 h-12 shadow-elevated",
                    onClick: login,
                    disabled: signingIn,
                    "data-ocid": "cta.start_button",
                    children: [
                      isLoggingIn ? "Signing in…" : "Start Building — It's Free",
                      !isLoggingIn && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                    ]
                  }
                )
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "footer",
      {
        className: "bg-card border-t border-border py-8",
        "data-ocid": "footer.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-md bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground leading-none", children: "ResumeForge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Build resumes that get you hired" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            ". Built with love using",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hover:text-foreground underline underline-offset-2 transition-colors",
                children: "caffeine.ai"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Landing as default
};
