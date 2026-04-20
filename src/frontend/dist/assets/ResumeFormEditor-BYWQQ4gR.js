import { r as reactExports, j as jsxRuntimeExports, d as useParams, b as useNavigate, c as ue } from "./index-CHkBZu-Y.js";
import { B as Badge } from "./badge-i_UGihi_.js";
import { c as createLucideIcon, u as useComposedRefs, a as cn, B as Button } from "./createLucideIcon-CQLhgfvi.js";
import { d as Presence, P as Primitive, u as useControllableState, c as composeEventHandlers, e as useSize, b as createContextScope } from "./index-BIM_whpq.js";
import { C as Check } from "./check-CX7XN8-b.js";
import { I as Input } from "./input-C255lSwx.js";
import { L as Label } from "./label-Bii44QNS.js";
import { S as Separator } from "./separator-DtfJRHQU.js";
import { S as Skeleton } from "./skeleton-hpK5ufmO.js";
import { e as useGetResume, c as useGetTemplates, f as useUpdateResume } from "./useBackend-Dx4X0RW6.js";
import { u as useResumeEditor, C as ChevronLeft } from "./useResumeEditor-BniZNMr9.js";
import { D as Download, g as generatePDF } from "./pdfGenerator-AcrOjJJ8.js";
import { r as renderTemplate, T as TEMPLATE_IDS } from "./templateRenderer-CYLFjN06.js";
import { U as User } from "./user-BaAuUfwD.js";
import { S as Save } from "./save-CwomlRyS.js";
import { R as RefreshCw } from "./refresh-cw-DASRptIj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
];
const CodeXml = createLucideIcon("code-xml", __iconNode$2);
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
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$1);
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
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode);
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const emptyContent = {
  personalInfo: { name: "", email: "", phone: "", location: "", summary: "" },
  education: [],
  experience: [],
  skills: [],
  projects: []
};
const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "skills", label: "Skills", icon: CodeXml },
  { id: "projects", label: "Projects", icon: FolderOpen }
];
const TEMPLATE_LABELS = {
  "modern-clean": "Modern",
  "professional-exec": "Executive",
  "creative-bold": "Creative",
  "minimal-zen": "Minimal",
  "two-column": "Two-Col",
  academic: "Academic",
  "startup-modern": "Startup",
  "elegant-dark": "Elegant"
};
function SectionNav({
  active,
  onChange,
  content
}) {
  const counts = {
    personal: content.personalInfo.name ? 1 : 0,
    experience: content.experience.length,
    education: content.education.length,
    skills: content.skills.length,
    projects: content.projects.length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "w-44 shrink-0 sticky top-[120px] self-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-2", children: "Sections" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5", children: SECTIONS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onChange(id),
        "data-ocid": `editor.section_nav.${id}`,
        className: `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active === id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label }),
          counts[id] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `ml-auto text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center ${active === id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
              children: counts[id]
            }
          )
        ]
      }
    ) }, id)) })
  ] });
}
function TemplateThumbnail({
  templateId,
  active,
  content,
  onClick
}) {
  const html = renderTemplate(templateId, content);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `editor.template_thumb.${templateId}`,
      className: `relative rounded-md overflow-hidden border-2 transition-all shrink-0 ${active ? "border-primary shadow-[0_0_0_3px] shadow-primary/20" : "border-border hover:border-primary/50"}`,
      style: { width: 72, height: 96 },
      title: TEMPLATE_LABELS[templateId] ?? templateId,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none",
            style: {
              transformOrigin: "top left",
              transform: "scale(0.09)",
              width: 794,
              height: 1123,
              position: "absolute",
              top: 0,
              left: 0,
              background: "#fff"
            },
            dangerouslySetInnerHTML: { __html: html }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute bottom-0 inset-x-0 py-0.5 text-[9px] font-medium text-center ${active ? "bg-primary text-primary-foreground" : "bg-muted/80 text-muted-foreground"}`,
            children: TEMPLATE_LABELS[templateId] ?? templateId
          }
        )
      ]
    }
  );
}
function SaveStatus({
  isSaving,
  isDirty
}) {
  if (isSaving) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "text-xs text-muted-foreground flex items-center gap-1.5",
        "data-ocid": "editor.saving_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 animate-spin" }),
          "Saving…"
        ]
      }
    );
  }
  if (!isDirty) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "text-xs text-primary flex items-center gap-1.5",
        "data-ocid": "editor.saved_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
          "Saved"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "text-xs text-muted-foreground",
      "data-ocid": "editor.unsaved_state",
      children: "Unsaved changes"
    }
  );
}
function ResumeFormEditor() {
  const { resumeId } = useParams({ from: "/protected/resume/$resumeId/edit" });
  const navigate = useNavigate();
  const { data: resume, isLoading } = useGetResume(resumeId);
  const { data: templates } = useGetTemplates();
  const updateResume = useUpdateResume();
  const [activeSection, setActiveSection] = reactExports.useState("personal");
  const [skillInput, setSkillInput] = reactExports.useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = reactExports.useState(false);
  const sectionRefs = reactExports.useRef(
    {}
  );
  const handleSave = reactExports.useCallback(
    async (data) => {
      if (!resumeId) return;
      await updateResume.mutateAsync({ id: resumeId, ...data });
    },
    [resumeId, updateResume]
  );
  const editor = useResumeEditor({
    initialContent: (resume == null ? void 0 : resume.content) ?? emptyContent,
    initialTitle: (resume == null ? void 0 : resume.title) ?? "My Resume",
    initialTemplateId: (resume == null ? void 0 : resume.templateId) ?? "modern-clean",
    onSave: handleSave
  });
  const scrollToSection = (id) => {
    var _a;
    setActiveSection(id);
    (_a = sectionRefs.current[id]) == null ? void 0 : _a.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  reactExports.useEffect(() => {
    const observers = [];
    for (const { id } of SECTIONS) {
      const el = sectionRefs.current[id];
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);
  const updatePersonalInfo = (field, value) => {
    editor.setContent({
      ...editor.content,
      personalInfo: { ...editor.content.personalInfo, [field]: value }
    });
  };
  const addExperience = () => {
    editor.setContent({
      ...editor.content,
      experience: [
        ...editor.content.experience,
        { title: "", company: "", startDate: "", endDate: "", description: "" }
      ]
    });
  };
  const updateExperience = (index, field, value) => {
    editor.setContent({
      ...editor.content,
      experience: editor.content.experience.map(
        (e, i) => i === index ? { ...e, [field]: value } : e
      )
    });
  };
  const removeExperience = (index) => {
    editor.setContent({
      ...editor.content,
      experience: editor.content.experience.filter((_, i) => i !== index)
    });
  };
  const addEducation = () => {
    editor.setContent({
      ...editor.content,
      education: [
        ...editor.content.education,
        { degree: "", school: "", startDate: "", endDate: "", description: "" }
      ]
    });
  };
  const updateEducation = (index, field, value) => {
    editor.setContent({
      ...editor.content,
      education: editor.content.education.map(
        (e, i) => i === index ? { ...e, [field]: value } : e
      )
    });
  };
  const removeEducation = (index) => {
    editor.setContent({
      ...editor.content,
      education: editor.content.education.filter((_, i) => i !== index)
    });
  };
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };
  const addSkill = () => {
    const val = skillInput.replace(/,/g, "").trim();
    if (!val) return;
    editor.setContent({
      ...editor.content,
      skills: [...editor.content.skills, val]
    });
    setSkillInput("");
  };
  const removeSkill = (index) => {
    editor.setContent({
      ...editor.content,
      skills: editor.content.skills.filter((_, i) => i !== index)
    });
  };
  const addProject = () => {
    editor.setContent({
      ...editor.content,
      projects: [
        ...editor.content.projects,
        { title: "", description: "", link: "" }
      ]
    });
  };
  const updateProject = (index, field, value) => {
    editor.setContent({
      ...editor.content,
      projects: editor.content.projects.map(
        (p, i) => i === index ? { ...p, [field]: value } : p
      )
    });
  };
  const removeProject = (index) => {
    editor.setContent({
      ...editor.content,
      projects: editor.content.projects.filter((_, i) => i !== index)
    });
  };
  const handleManualSave = async () => {
    try {
      await editor.manualSave();
      ue.success("Resume saved successfully.");
    } catch {
      ue.error("Failed to save resume.");
    }
  };
  const handleDownloadPDF = async () => {
    if (!resume) return;
    if (!resume.downloadUnlocked) {
      navigate({ to: "/resume/$resumeId/payment", params: { resumeId } });
      return;
    }
    setIsGeneratingPDF(true);
    try {
      const resumeForPDF = {
        ...resume,
        content: editor.content,
        title: editor.title,
        templateId: editor.templateId
      };
      await generatePDF(resumeForPDF);
      ue.success("PDF downloaded successfully!");
    } catch {
      ue.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  const isRequiredFilled = editor.content.personalInfo.name.trim().length > 0 && editor.content.personalInfo.email.trim().length > 0;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 bg-card border-b border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 bg-card border-b border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-44 bg-card border-r border-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-[45] p-6 space-y-4", children: ["personal", "experience", "education", "skills"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, s)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-[55] bg-muted/20 border-l border-border p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-full w-full rounded-xl" }) })
      ] })
    ] });
  }
  if (!resume) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Resume not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: () => navigate({ to: "/dashboard" }),
          children: "Back to Dashboard"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "form_editor.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 h-14 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => navigate({ to: "/dashboard" }),
                className: "gap-1.5 shrink-0 h-8",
                "data-ocid": "editor.back_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Dashboard" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: editor.title,
                onChange: (e) => editor.setTitle(e.target.value),
                className: "h-8 max-w-[200px] font-semibold text-sm bg-transparent border-transparent hover:border-input focus:border-input transition-colors",
                "data-ocid": "editor.title_input",
                "aria-label": "Resume title"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SaveStatus, { isSaving: editor.isSaving, isDirty: editor.isDirty })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => navigate({
                  to: "/resume/$resumeId/advanced",
                  params: { resumeId }
                }),
                className: "gap-1.5 h-8 hidden sm:flex",
                "data-ocid": "editor.advanced_editor_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-3.5 h-3.5" }),
                  "Advanced Editor"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleManualSave,
                disabled: editor.isSaving || !isRequiredFilled,
                className: "gap-1.5 h-8",
                "data-ocid": "editor.save_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                  "Save"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleDownloadPDF,
                disabled: isGeneratingPDF || !isRequiredFilled,
                className: "gap-1.5 h-8",
                "data-ocid": "editor.download_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                  isGeneratingPDF ? "Generating…" : resume.downloadUnlocked ? "Download PDF" : "Unlock PDF · $5"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-[45] flex min-w-0 border-r border-border overflow-y-auto",
              style: { maxHeight: "calc(100vh - 56px)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block border-r border-border bg-card/50 px-2 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionNav,
                  {
                    active: activeSection,
                    onChange: scrollToSection,
                    content: editor.content
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-5 py-6 space-y-6 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "section",
                    {
                      ref: (el) => {
                        sectionRefs.current.personal = el;
                      },
                      className: "bg-card rounded-xl border border-border p-5",
                      "data-ocid": "editor.personal_section",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-primary" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Personal Information" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: [
                              "Full Name ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                value: editor.content.personalInfo.name,
                                onChange: (e) => updatePersonalInfo("name", e.target.value),
                                placeholder: "Alex Johnson",
                                className: !editor.content.personalInfo.name.trim() ? "border-destructive/40 focus:border-destructive" : "",
                                "data-ocid": "editor.personal_name_input"
                              }
                            ),
                            !editor.content.personalInfo.name.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs text-destructive mt-1",
                                "data-ocid": "editor.name.field_error",
                                children: "Full name is required"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: [
                              "Email ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                value: editor.content.personalInfo.email,
                                onChange: (e) => updatePersonalInfo("email", e.target.value),
                                placeholder: "alex@example.com",
                                type: "email",
                                className: !editor.content.personalInfo.email.trim() ? "border-destructive/40 focus:border-destructive" : "",
                                "data-ocid": "editor.personal_email_input"
                              }
                            ),
                            !editor.content.personalInfo.email.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs text-destructive mt-1",
                                "data-ocid": "editor.email.field_error",
                                children: "Email is required"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Phone" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                value: editor.content.personalInfo.phone,
                                onChange: (e) => updatePersonalInfo("phone", e.target.value),
                                placeholder: "+1 (555) 000-0000",
                                "data-ocid": "editor.personal_phone_input"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Location" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                value: editor.content.personalInfo.location,
                                onChange: (e) => updatePersonalInfo("location", e.target.value),
                                placeholder: "San Francisco, CA",
                                "data-ocid": "editor.personal_location_input"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Professional Summary" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Textarea,
                              {
                                value: editor.content.personalInfo.summary,
                                onChange: (e) => updatePersonalInfo("summary", e.target.value),
                                placeholder: "Results-driven engineer with 5+ years building scalable web applications…",
                                rows: 4,
                                "data-ocid": "editor.personal_summary_textarea"
                              }
                            )
                          ] })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "section",
                    {
                      ref: (el) => {
                        sectionRefs.current.experience = el;
                      },
                      className: "bg-card rounded-xl border border-border p-5",
                      "data-ocid": "editor.experience_section",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3.5 h-3.5 text-primary" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Work Experience" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "outline",
                              onClick: addExperience,
                              className: "h-7 text-xs gap-1",
                              "data-ocid": "editor.add_experience_button",
                              children: "+ Add Entry"
                            }
                          )
                        ] }),
                        editor.content.experience.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-lg",
                            "data-ocid": "editor.experience.empty_state",
                            children: 'No experience yet — click "Add Entry" to begin'
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: editor.content.experience.map(
                          (exp, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ExperienceCard,
                            {
                              exp,
                              index: i,
                              onChange: updateExperience,
                              onRemove: removeExperience
                            },
                            `exp-${exp.company}-${exp.startDate}-${i}`
                          )
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "section",
                    {
                      ref: (el) => {
                        sectionRefs.current.education = el;
                      },
                      className: "bg-card rounded-xl border border-border p-5",
                      "data-ocid": "editor.education_section",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 text-primary" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Education" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "outline",
                              onClick: addEducation,
                              className: "h-7 text-xs gap-1",
                              "data-ocid": "editor.add_education_button",
                              children: "+ Add Entry"
                            }
                          )
                        ] }),
                        editor.content.education.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-lg",
                            "data-ocid": "editor.education.empty_state",
                            children: 'No education yet — click "Add Entry" to begin'
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: editor.content.education.map(
                          (edu, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            EducationCard,
                            {
                              edu,
                              index: i,
                              onChange: updateEducation,
                              onRemove: removeEducation
                            },
                            `edu-${edu.school}-${edu.startDate}-${i}`
                          )
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "section",
                    {
                      ref: (el) => {
                        sectionRefs.current.skills = el;
                      },
                      className: "bg-card rounded-xl border border-border p-5",
                      "data-ocid": "editor.skills_section",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-3.5 h-3.5 text-primary" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Skills" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              value: skillInput,
                              onChange: (e) => setSkillInput(e.target.value),
                              onKeyDown: handleSkillKeyDown,
                              placeholder: "Type a skill and press Enter or comma…",
                              className: "flex-1",
                              "data-ocid": "editor.skill_input"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "outline",
                              onClick: addSkill,
                              className: "shrink-0",
                              "data-ocid": "editor.add_skill_button",
                              children: "Add"
                            }
                          )
                        ] }),
                        editor.content.skills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-sm text-muted-foreground text-center py-4 border border-dashed border-border rounded-lg",
                            "data-ocid": "editor.skills.empty_state",
                            children: "Add skills like React, TypeScript, Python…"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: editor.content.skills.map((skill, i) => {
                          const skillKey = `skill-${skill}`;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Badge,
                            {
                              variant: "secondary",
                              className: "gap-1.5 pr-1 py-1 text-xs",
                              "data-ocid": `editor.skill.item.${i + 1}`,
                              children: [
                                skill,
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => removeSkill(i),
                                    className: "ml-0.5 hover:text-destructive transition-colors leading-none text-base",
                                    "aria-label": `Remove ${skill}`,
                                    "data-ocid": `editor.skill.delete_button.${i + 1}`,
                                    children: "×"
                                  }
                                )
                              ]
                            },
                            skillKey
                          );
                        }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "section",
                    {
                      ref: (el) => {
                        sectionRefs.current.projects = el;
                      },
                      className: "bg-card rounded-xl border border-border p-5 mb-10",
                      "data-ocid": "editor.projects_section",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3.5 h-3.5 text-primary" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Projects" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "outline",
                              onClick: addProject,
                              className: "h-7 text-xs gap-1",
                              "data-ocid": "editor.add_project_button",
                              children: "+ Add Entry"
                            }
                          )
                        ] }),
                        editor.content.projects.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-lg",
                            "data-ocid": "editor.projects.empty_state",
                            children: 'No projects yet — click "Add Entry" to begin'
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: editor.content.projects.map(
                          (proj, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ProjectCard,
                            {
                              proj,
                              index: i,
                              onChange: updateProject,
                              onRemove: removeProject
                            },
                            `proj-${proj.title}-${i}`
                          )
                        ) })
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-[55] hidden lg:flex flex-col min-w-0 bg-muted/10 overflow-hidden",
              style: { maxHeight: "calc(100vh - 56px)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 py-2.5 flex items-center justify-between shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Live Preview" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-[10px] font-medium",
                      "data-ocid": "editor.preview_badge",
                      children: TEMPLATE_LABELS[editor.templateId] ?? editor.templateId
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex-1 overflow-auto p-6",
                    "data-ocid": "editor.preview_panel",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mx-auto rounded-lg border border-border/50 shadow-lg overflow-hidden bg-white",
                        style: { width: 794 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: { minHeight: 1123 },
                            dangerouslySetInnerHTML: {
                              __html: renderTemplate(editor.templateId, editor.content)
                            }
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-card border-t border-border px-4 py-3 shrink-0",
                    "data-ocid": "editor.template_strip",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5", children: "Choose Template" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-1", children: (templates ? templates.map((t) => t.id) : TEMPLATE_IDS).map(
                        (tid) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          TemplateThumbnail,
                          {
                            templateId: tid,
                            active: editor.templateId === tid,
                            content: editor.content,
                            onClick: () => editor.setTemplateId(tid)
                          },
                          tid
                        )
                      ) })
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function EntryCard({
  index,
  ocidPrefix,
  onRemove,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-border bg-background/50 p-4 relative",
      "data-ocid": `${ocidPrefix}.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onRemove(index),
            className: "absolute top-3 right-3 text-xs text-muted-foreground hover:text-destructive transition-colors px-1.5 py-0.5 rounded border border-border hover:border-destructive/40",
            "data-ocid": `${ocidPrefix}.delete_button.${index + 1}`,
            "aria-label": "Remove entry",
            children: "Remove"
          }
        ),
        children
      ]
    }
  );
}
function ExperienceCard({
  exp,
  index,
  onChange,
  onRemove
}) {
  const isPresent = exp.endDate === "Present" || exp.endDate === "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EntryCard, { index, ocidPrefix: "editor.experience", onRemove, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 pr-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Job Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: exp.title,
          onChange: (e) => onChange(index, "title", e.target.value),
          placeholder: "Senior Engineer"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Company" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: exp.company,
          onChange: (e) => onChange(index, "company", e.target.value),
          placeholder: "Acme Corp"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Start Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: exp.startDate,
          onChange: (e) => onChange(index, "startDate", e.target.value),
          placeholder: "Jan 2021"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "End Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: `exp-present-${index}`,
              checked: isPresent,
              onCheckedChange: (checked) => onChange(index, "endDate", checked ? "Present" : "")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: `exp-present-${index}`,
              className: "text-xs text-muted-foreground cursor-pointer",
              children: "Currently working here"
            }
          )
        ] }),
        !isPresent && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: exp.endDate,
            onChange: (e) => onChange(index, "endDate", e.target.value),
            placeholder: "Dec 2023"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: exp.description,
          onChange: (e) => onChange(index, "description", e.target.value),
          placeholder: "• Led migration from monolith to microservices\n• Reduced API response time by 40%",
          rows: 3
        }
      )
    ] })
  ] }) });
}
function EducationCard({
  edu,
  index,
  onChange,
  onRemove
}) {
  const isPresent = edu.endDate === "Present" || edu.endDate === "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EntryCard, { index, ocidPrefix: "editor.education", onRemove, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 pr-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Degree" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: edu.degree,
          onChange: (e) => onChange(index, "degree", e.target.value),
          placeholder: "B.S. Computer Science"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "School" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: edu.school,
          onChange: (e) => onChange(index, "school", e.target.value),
          placeholder: "Stanford University"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Start Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: edu.startDate,
          onChange: (e) => onChange(index, "startDate", e.target.value),
          placeholder: "Sep 2017"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "End Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: `edu-present-${index}`,
              checked: isPresent,
              onCheckedChange: (checked) => onChange(index, "endDate", checked ? "Present" : "")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: `edu-present-${index}`,
              className: "text-xs text-muted-foreground cursor-pointer",
              children: "Currently enrolled"
            }
          )
        ] }),
        !isPresent && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: edu.endDate,
            onChange: (e) => onChange(index, "endDate", e.target.value),
            placeholder: "May 2021"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: edu.description,
          onChange: (e) => onChange(index, "description", e.target.value),
          placeholder: "GPA: 3.8/4.0, Dean's List, Relevant coursework…",
          rows: 2
        }
      )
    ] })
  ] }) });
}
function ProjectCard({
  proj,
  index,
  onChange,
  onRemove
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EntryCard, { index, ocidPrefix: "editor.project", onRemove, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pr-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Project Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: proj.title,
          onChange: (e) => onChange(index, "title", e.target.value),
          placeholder: "ResumeForge — AI Resume Builder"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground mb-1 block", children: [
        "URL / Link",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: proj.link,
          onChange: (e) => onChange(index, "link", e.target.value),
          placeholder: "https://github.com/user/project",
          type: "url"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: proj.description,
          onChange: (e) => onChange(index, "description", e.target.value),
          placeholder: "Built with React and TypeScript. Key features: real-time collaboration, PDF export…",
          rows: 3
        }
      )
    ] })
  ] }) });
}
export {
  ResumeFormEditor as default
};
