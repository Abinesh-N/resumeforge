import { r as reactExports, j as jsxRuntimeExports, b as useNavigate, c as ue } from "./index-twaNkWBq.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-C7JxXydK.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BTFaX9y9.js";
import { I as Input } from "./input-CuTyS7TI.js";
import { S as Skeleton } from "./skeleton-CSD9JFy2.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, d as usePresence, e as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion, T as Tabs, a as TabsList, b as TabsTrigger } from "./proxy-5OyuIFzp.js";
import { L as Layout } from "./Layout-BNrULSDb.js";
import { c as useGetTemplates, d as useCreateResume } from "./useBackend-QfFKXp8l.js";
import { T as TEMPLATE_IDS, r as renderTemplate } from "./templateRenderer-C4YBmo0g.js";
import { C as Check } from "./check-BLsQ0cCJ.js";
import "./index-DrKy2u-n.js";
import "./index-D34DepkZ.js";
import "./dropdown-menu-Dmk7dh1d.js";
import "./file-text-CZLJ6psy.js";
import "./user-blf5ZQGb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const SAMPLE_CONTENT = {
  personalInfo: {
    name: "Alexandra Chen",
    email: "alex@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    summary: "Product-driven software engineer with 6+ years crafting scalable web applications and leading cross-functional teams."
  },
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Horizon Labs",
      startDate: "Jan 2021",
      endDate: "Present",
      description: "Led development of core platform features serving 500K+ users. Reduced API latency by 40%."
    },
    {
      title: "Software Engineer",
      company: "Beacon Inc.",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      description: "Built React component library adopted across 12 product teams."
    }
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "Stanford University",
      startDate: "2014",
      endDate: "2018",
      description: "Dean's List, ACM Chapter President"
    }
  ],
  skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS", "Figma"],
  projects: [
    {
      title: "OpenMetrics",
      link: "github.com/openmetrics",
      description: "Open-source observability toolkit with 2K+ GitHub stars. Real-time dashboards with WebSocket streaming."
    }
  ]
};
const ALL_TEMPLATES = [
  // Modern (8)
  {
    id: "modern-clean",
    name: "Modern Clean",
    category: "Modern",
    description: "Clean blue accents with left-border section headers and pill skill badges."
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    category: "Modern",
    description: "Dark navy header with cyan highlights — striking and contemporary."
  },
  {
    id: "modern-navy",
    name: "Modern Navy",
    category: "Modern",
    description: "Sophisticated navy palette with right-aligned contact details."
  },
  {
    id: "modern-teal",
    name: "Modern Teal",
    category: "Modern",
    description: "Vibrant teal header with matching section dividers on a light background."
  },
  {
    id: "modern-slate",
    name: "Modern Slate",
    category: "Modern",
    description: "Two-column layout with dark slate sidebar and skill dots."
  },
  {
    id: "modern-gradient",
    name: "Gradient",
    category: "Modern",
    description: "Bold purple-to-blue gradient header for a tech-forward impression."
  },
  {
    id: "modern-bold",
    name: "Bold",
    category: "Modern",
    description: "Black header with amber accents — powerful and high-contrast."
  },
  {
    id: "modern-compact",
    name: "Compact",
    category: "Modern",
    description: "Compact layout with pill-badge section labels, ideal for dense content."
  },
  // Professional (8)
  {
    id: "pro-classic",
    name: "Classic",
    category: "Professional",
    description: "Centered serif layout inspired by traditional print resumes."
  },
  {
    id: "pro-executive",
    name: "Executive",
    category: "Professional",
    description: "Gold accent line with right-aligned contact — executive presence."
  },
  {
    id: "pro-corporate",
    name: "Corporate",
    category: "Professional",
    description: "Deep navy corporate header with structured indented sections."
  },
  {
    id: "pro-formal",
    name: "Formal",
    category: "Professional",
    description: "Small-caps typography with formal serif font and clean dividers."
  },
  {
    id: "pro-elegant",
    name: "Elegant",
    category: "Professional",
    description: "Crimson accents with Georgian serif — refined and elegant."
  },
  {
    id: "pro-refined",
    name: "Refined",
    category: "Professional",
    description: "Green sidebar with skill list on the left, experience on the right."
  },
  {
    id: "pro-polished",
    name: "Polished",
    category: "Professional",
    description: "Stripe-textured navy header with a subtle refined aesthetic."
  },
  {
    id: "pro-distinguished",
    name: "Distinguished",
    category: "Professional",
    description: "Bold orange accent bar with separated header and clean typography."
  },
  // Creative (6)
  {
    id: "creative-color",
    name: "Color Burst",
    category: "Creative",
    description: "Indigo sidebar with avatar initials — vibrant and personality-driven."
  },
  {
    id: "creative-vibrant",
    name: "Vibrant Orange",
    category: "Creative",
    description: "Energetic orange header with timeline-style experience section."
  },
  {
    id: "creative-bold",
    name: "Terminal Dark",
    category: "Creative",
    description: "Dark background with neon green accents — developer aesthetic."
  },
  {
    id: "creative-designer",
    name: "Designer Split",
    category: "Creative",
    description: "Pink accent split layout with skills and projects in the left column."
  },
  {
    id: "creative-artistic",
    name: "Artistic",
    category: "Creative",
    description: "Multi-color section borders — each section has its own accent color."
  },
  {
    id: "creative-dynamic",
    name: "Dynamic",
    category: "Creative",
    description: "Diagonal clip-path purple header with diamond bullet section markers."
  },
  // Minimal (6)
  {
    id: "minimal-pure",
    name: "Pure",
    category: "Minimal",
    description: "Ultra-light Helvetica layout — maximum whitespace, zero decoration."
  },
  {
    id: "minimal-clean",
    name: "Clean",
    category: "Minimal",
    description: "Green at-sign for company names — subtle color in a clean framework."
  },
  {
    id: "minimal-zen",
    name: "Zen",
    category: "Minimal",
    description: "Centered serif layout with warm amber section titles — meditative calm."
  },
  {
    id: "minimal-swiss",
    name: "Swiss Grid",
    category: "Minimal",
    description: "Numbered sections on a strict Swiss-style typographic grid."
  },
  {
    id: "minimal-nordic",
    name: "Nordic",
    category: "Minimal",
    description: "Warm beige header block with stone tones — Scandinavian simplicity."
  },
  {
    id: "minimal-simple",
    name: "Simple",
    category: "Minimal",
    description: "Times New Roman with thin rules — timeless, no-frills simplicity."
  },
  // Two-Column (5)
  {
    id: "twocol-modern",
    name: "Blue Split",
    category: "Two-Column",
    description: "Blue left panel with skills and education; experience on the right."
  },
  {
    id: "twocol-classic",
    name: "Classic Split",
    category: "Two-Column",
    description: "Navy sidebar with dot-skills list and right-side main content."
  },
  {
    id: "twocol-skills",
    name: "Skills Chart",
    category: "Two-Column",
    description: "Dark green left panel with animated skill-bar chart visualization."
  },
  {
    id: "twocol-sidebar",
    name: "Dark Sidebar",
    category: "Two-Column",
    description: "Charcoal sidebar with amber accents and clean right-side layout."
  },
  {
    id: "twocol-accent",
    name: "Accent Line",
    category: "Two-Column",
    description: "Orange vertical accent divider separating left and right content."
  },
  // Academic (3)
  {
    id: "academic-traditional",
    name: "Traditional",
    category: "Academic",
    description: "Centered small-caps serif layout for academic and faculty positions."
  },
  {
    id: "academic-research",
    name: "Research CV",
    category: "Academic",
    description: "Teal accents with emphasis on education, research, and publications."
  },
  {
    id: "academic-cv",
    name: "Academic CV",
    category: "Academic",
    description: "Navy centered header in Times New Roman — classic academic CV style."
  },
  // Executive (2)
  {
    id: "exec-premium",
    name: "Premium Gold",
    category: "Executive",
    description: "Warm amber header on cream — premium quality for senior leadership."
  },
  {
    id: "exec-leadership",
    name: "Leadership",
    category: "Executive",
    description: "Charcoal header with green leadership accents and call-out summary."
  },
  // Startup & Tech (2)
  {
    id: "startup-modern",
    name: "Startup",
    category: "Startup & Tech",
    description: "Monospace comment-style section headers — modern startup engineer look."
  },
  {
    id: "startup-tech",
    name: "Terminal",
    category: "Startup & Tech",
    description: "Full dark terminal aesthetic with green-on-black code style."
  }
];
const CATEGORIES = [
  "All",
  "Modern",
  "Professional",
  "Creative",
  "Minimal",
  "Two-Column",
  "Academic",
  "Executive",
  "Startup & Tech"
];
const CATEGORY_BADGE = {
  Modern: "bg-blue-50 text-blue-700 border-blue-200",
  Professional: "bg-slate-100 text-slate-700 border-slate-200",
  Creative: "bg-purple-50 text-purple-700 border-purple-200",
  Minimal: "bg-stone-100 text-stone-600 border-stone-200",
  "Two-Column": "bg-green-50 text-green-700 border-green-200",
  Academic: "bg-amber-50 text-amber-700 border-amber-200",
  Executive: "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Startup & Tech": "bg-emerald-50 text-emerald-700 border-emerald-200"
};
function mergeTemplates(backendTemplates) {
  if (!backendTemplates || backendTemplates.length === 0) return ALL_TEMPLATES;
  const backendIds = new Set(backendTemplates.map((t) => t.id));
  const extras = ALL_TEMPLATES.filter((t) => !backendIds.has(t.id));
  const merged = [
    ...backendTemplates.map((t) => {
      const local = ALL_TEMPLATES.find((l) => l.id === t.id);
      return {
        id: t.id,
        name: (local == null ? void 0 : local.name) ?? t.name,
        category: (local == null ? void 0 : local.category) ?? t.category,
        description: (local == null ? void 0 : local.description) ?? t.description ?? ""
      };
    }),
    ...extras
  ];
  return merged;
}
function TemplatePreview({
  templateId,
  scale,
  className
}) {
  const templateHtml = renderTemplate(templateId, SAMPLE_CONTENT);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `relative overflow-hidden bg-white ${className ?? ""}`,
      style: { aspectRatio: "210/297" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          srcDoc: templateHtml,
          title: `Preview of ${templateId}`,
          scrolling: "no",
          style: {
            width: `${Math.round(100 / scale)}%`,
            height: `${Math.round(100 / scale)}%`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: "none",
            display: "block",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}
function TemplateCard({
  template,
  index,
  isSelected,
  isCreating,
  onSelect,
  onPreview,
  onUse
}) {
  const badgeClass = CATEGORY_BADGE[template.category] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.97 },
      transition: { duration: 0.2, delay: Math.min(index * 0.02, 0.3) },
      "data-ocid": `templates.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: [
            "group rounded-xl border bg-card overflow-hidden cursor-pointer transition-all duration-200 w-full text-left",
            isSelected ? "border-primary shadow-[0_0_0_2px_oklch(var(--primary)/0.2)] ring-2 ring-primary/10" : "border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
          ].join(" "),
          onClick: () => onSelect(template.id),
          "aria-pressed": isSelected,
          "aria-label": `Select ${template.name} template`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative border-b border-border overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TemplatePreview, { templateId: template.id, scale: 0.28 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-200 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    onPreview(template);
                  },
                  className: "opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 bg-background/95 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border shadow-lg",
                  "data-ocid": `templates.preview_button.${index + 1}`,
                  "aria-label": `Preview ${template.name}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                    "Preview"
                  ]
                }
              ) }),
              isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`,
                  children: template.category
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-1 truncate", children: template.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed min-h-[2.6rem]", children: template.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "w-full gap-1.5 h-8 text-xs",
                  variant: isSelected ? "default" : "outline",
                  onClick: (e) => {
                    e.stopPropagation();
                    onUse(template.id);
                  },
                  disabled: isCreating,
                  "data-ocid": `templates.use_button.${index + 1}`,
                  children: isCreating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
                    "Creating…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                    "Use This Template"
                  ] })
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function TemplatePreviewModal({
  template,
  isOpen,
  isCreating,
  onClose,
  onUse
}) {
  if (!template) return null;
  const badgeClass = CATEGORY_BADGE[template.category] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-3xl p-0 overflow-hidden border-border bg-card",
      "data-ocid": "templates.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "px-6 pt-5 pb-4 border-b border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-semibold text-base text-foreground truncate", children: template.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`,
                  children: template.category
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "shrink-0 gap-1.5",
                onClick: () => onUse(template.id),
                disabled: isCreating,
                "data-ocid": "templates.confirm_button",
                children: isCreating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
                  "Creating…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                  "Use This Template"
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: template.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto bg-muted/30 p-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-lg shadow-lg rounded-sm overflow-hidden border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TemplatePreview,
          {
            templateId: template.id,
            scale: 0.62,
            className: "w-full"
          }
        ) }) })
      ]
    }
  ) });
}
function SkeletonGrid({ count = 12 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5",
      "data-ocid": "templates.loading_state",
      children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full", style: { aspectRatio: "210/297" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full mt-1" })
            ] })
          ]
        },
        `skel-${String(i)}`
      ))
    }
  );
}
function CountBadge({ count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 font-medium tabular-nums", children: count });
}
function Templates() {
  const navigate = useNavigate();
  const { data: backendTemplates, isLoading } = useGetTemplates();
  const createResume = useCreateResume();
  const [selectedCategory, setSelectedCategory] = reactExports.useState("All");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [previewTemplate, setPreviewTemplate] = reactExports.useState(
    null
  );
  const [creatingId, setCreatingId] = reactExports.useState(null);
  const templates = reactExports.useMemo(
    () => mergeTemplates(backendTemplates),
    [backendTemplates]
  );
  const allTemplates = reactExports.useMemo(() => {
    const existingIds = new Set(templates.map((t) => t.id));
    const missing = TEMPLATE_IDS.filter((id) => !existingIds.has(id));
    const fallbacks = missing.map((id) => ({
      id,
      name: id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      category: "Modern",
      description: "Professional resume template."
    }));
    return [...templates, ...fallbacks];
  }, [templates]);
  const categoryCounts = reactExports.useMemo(() => {
    const counts = { All: allTemplates.length };
    for (const t of allTemplates) {
      counts[t.category] = (counts[t.category] ?? 0) + 1;
    }
    return counts;
  }, [allTemplates]);
  const filtered = reactExports.useMemo(() => {
    let result = allTemplates;
    if (selectedCategory !== "All") {
      result = result.filter((t) => t.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allTemplates, selectedCategory, searchQuery]);
  const handleUse = reactExports.useCallback(
    async (templateId) => {
      setCreatingId(templateId);
      try {
        const resume = await createResume.mutateAsync({
          title: "My Resume",
          templateId,
          content: {
            personalInfo: {
              name: "",
              email: "",
              phone: "",
              location: "",
              summary: ""
            },
            education: [],
            experience: [],
            skills: [],
            projects: []
          }
        });
        navigate({
          to: "/resume/$resumeId/edit",
          params: { resumeId: resume.id }
        });
      } catch {
        ue.error("Failed to create resume. Please try again.");
        setCreatingId(null);
      }
    },
    [createResume, navigate]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", "data-ocid": "templates.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col sm:flex-row sm:items-end gap-4 justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight text-foreground mb-2", children: "Choose Your Template" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-lg", children: [
                allTemplates.length,
                " professionally designed layouts — all support click-to-edit, rich text, and PDF export."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  placeholder: "Search templates…",
                  className: "pl-8 h-9 text-sm",
                  "data-ocid": "templates.search_input"
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.08 },
          className: "mb-8 overflow-x-auto",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tabs,
            {
              value: selectedCategory,
              onValueChange: (v) => {
                setSelectedCategory(v);
                setSearchQuery("");
              },
              "data-ocid": "templates.category.tab",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "bg-muted/60 border border-border p-0.5 h-auto inline-flex min-w-max", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: cat,
                  className: "text-xs px-3.5 py-1.5 whitespace-nowrap data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                  "data-ocid": `templates.filter.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}.tab`,
                  children: [
                    cat,
                    categoryCounts[cat] !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CountBadge, { count: categoryCounts[cat] })
                  ]
                },
                cat
              )) })
            }
          )
        }
      ),
      !isLoading && searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
        filtered.length,
        " template",
        filtered.length !== 1 ? "s" : "",
        ' for "',
        searchQuery,
        '"'
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 12 }),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5",
          children: filtered.map((template, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TemplateCard,
            {
              template,
              index: i,
              isSelected: selectedId === template.id,
              isCreating: creatingId === template.id,
              onSelect: setSelectedId,
              onPreview: setPreviewTemplate,
              onUse: handleUse
            },
            template.id
          ))
        },
        `${selectedCategory}-${searchQuery}`
      ) }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "text-center py-24 text-muted-foreground",
          "data-ocid": "templates.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "🔍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No templates found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-4", children: searchQuery ? `No results for "${searchQuery}"` : "No templates in this category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                },
                "data-ocid": "templates.clear_filter_button",
                children: "Clear filters"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TemplatePreviewModal,
      {
        template: previewTemplate,
        isOpen: !!previewTemplate,
        isCreating: creatingId === (previewTemplate == null ? void 0 : previewTemplate.id),
        onClose: () => setPreviewTemplate(null),
        onUse: handleUse
      }
    )
  ] });
}
export {
  Templates as default
};
