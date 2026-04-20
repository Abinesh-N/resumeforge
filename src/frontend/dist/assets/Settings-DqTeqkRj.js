import { r as reactExports, j as jsxRuntimeExports, c as ue } from "./index-CHkBZu-Y.js";
import { B as Button } from "./createLucideIcon-CQLhgfvi.js";
import { I as Input } from "./input-C255lSwx.js";
import { L as Label } from "./label-Bii44QNS.js";
import { S as Separator } from "./separator-DtfJRHQU.js";
import { S as Skeleton } from "./skeleton-hpK5ufmO.js";
import { L as Layout } from "./Layout-BoV8p-Qb.js";
import { m as useGetMyProfile, g as useIsStripeConfigured, n as useUpdateMyProfile, i as useSetStripeConfiguration } from "./useBackend-Dx4X0RW6.js";
import { S as Save } from "./save-CwomlRyS.js";
import "./index-BIM_whpq.js";
import "./dropdown-menu-C-uBelgT.js";
import "./file-text-C0DsHqB3.js";
import "./user-BaAuUfwD.js";
function Settings() {
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: stripeConfigured } = useIsStripeConfigured();
  const updateProfile = useUpdateMyProfile();
  const setStripeConfig = useSetStripeConfiguration();
  const [name, setName] = reactExports.useState((profile == null ? void 0 : profile.name) ?? "");
  const [email, setEmail] = reactExports.useState((profile == null ? void 0 : profile.email) ?? "");
  const [secretKey, setSecretKey] = reactExports.useState("");
  const [countries, setCountries] = reactExports.useState("US,CA,GB,AU");
  const handleSaveProfile = async () => {
    try {
      await updateProfile.mutateAsync({
        name: name || null,
        email: email || null
      });
      ue.success("Profile updated.");
    } catch {
      ue.error("Failed to update profile.");
    }
  };
  const handleStripeSetup = async () => {
    const allowedCountries = countries.split(",").map((c) => c.trim()).filter(Boolean);
    try {
      await setStripeConfig.mutateAsync({ secretKey, allowedCountries });
      ue.success("Stripe configured.");
      setSecretKey("");
    } catch {
      ue.error("Failed to configure Stripe.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[680px] mx-auto px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight mb-8", children: "Settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm mb-5", children: "Profile" }),
      profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Display Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Your name",
              "data-ocid": "settings.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "you@example.com",
              type: "email",
              "data-ocid": "settings.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSaveProfile,
            disabled: updateProfile.isPending,
            className: "gap-2",
            "data-ocid": "settings.save_profile_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
              "Save Profile"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-xl border border-border p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Stripe Configuration" }),
        stripeConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium", children: "Configured" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded-full font-medium", children: "Not configured" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Stripe Secret Key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "password",
              value: secretKey,
              onChange: (e) => setSecretKey(e.target.value),
              placeholder: "sk_live_... or sk_test_...",
              "data-ocid": "settings.stripe_key_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Allowed Countries (comma-separated ISO codes)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: countries,
              onChange: (e) => setCountries(e.target.value),
              placeholder: "US,CA,GB,AU",
              "data-ocid": "settings.stripe_countries_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleStripeSetup,
            disabled: setStripeConfig.isPending || !secretKey,
            className: "gap-2",
            "data-ocid": "settings.stripe_save_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
              stripeConfigured ? "Update Stripe" : "Configure Stripe"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Settings as default
};
