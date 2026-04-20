import type { ResumeContent } from "../types";

// ─── Shared helpers ──────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Wrap a value with a data-editable attribute for click-to-edit
function ed(fieldPath: string, value: string, style = ""): string {
  const escaped = esc(value);
  return `<span data-editable="${fieldPath}" style="cursor:pointer;${style}">${escaped}</span>`;
}

function contact(
  info: ResumeContent["personalInfo"],
  sep = " &nbsp;·&nbsp; ",
  color = "#666",
): string {
  const parts: string[] = [];
  if (info.email) parts.push(ed("personalInfo.email", info.email));
  if (info.phone) parts.push(ed("personalInfo.phone", info.phone));
  if (info.location) parts.push(ed("personalInfo.location", info.location));
  if (!parts.length) return "";
  return `<span style="color:${color};font-size:9pt;">${parts.join(sep)}</span>`;
}

function expItems(
  experience: ResumeContent["experience"],
  titleColor = "#1a1a1a",
  dateColor = "#666",
  companyColor = "#444",
): string {
  return experience
    .map(
      (e, i) => `
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:baseline;">
        <span style="font-weight:700;font-size:10pt;color:${titleColor};">${ed(`experience.${i}.title`, e.title)}</span>
        <span style="font-size:8.5pt;color:${dateColor};white-space:nowrap;">${ed(`experience.${i}.startDate`, e.startDate)}${e.endDate ? ` – ${ed(`experience.${i}.endDate`, e.endDate)}` : ""}</span>
      </div>
      <div style="font-size:9pt;color:${companyColor};margin-bottom:3px;">${ed(`experience.${i}.company`, e.company)}</div>
      ${e.description ? `<div style="font-size:9pt;line-height:1.55;color:#444;">${ed(`experience.${i}.description`, e.description)}</div>` : ""}
    </div>`,
    )
    .join("");
}

function eduItems(
  education: ResumeContent["education"],
  titleColor = "#1a1a1a",
  dateColor = "#666",
): string {
  return education
    .map(
      (e, i) => `
    <div style="margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:baseline;">
        <span style="font-weight:700;font-size:10pt;color:${titleColor};">${ed(`education.${i}.degree`, e.degree)}</span>
        <span style="font-size:8.5pt;color:${dateColor};white-space:nowrap;">${ed(`education.${i}.startDate`, e.startDate)}${e.endDate ? ` – ${ed(`education.${i}.endDate`, e.endDate)}` : ""}</span>
      </div>
      <div style="font-size:9pt;color:#555;">${ed(`education.${i}.school`, e.school)}</div>
      ${e.description ? `<div style="font-size:8.5pt;color:#666;margin-top:2px;">${ed(`education.${i}.description`, e.description)}</div>` : ""}
    </div>`,
    )
    .join("");
}

function projItems(
  projects: ResumeContent["projects"],
  titleColor = "#1a1a1a",
  linkColor = "#2563eb",
): string {
  return projects
    .map(
      (p, i) => `
    <div style="margin-bottom:10px;">
      <span style="font-weight:700;font-size:10pt;color:${titleColor};">${ed(`projects.${i}.title`, p.title)}</span>
      ${p.link ? `<span style="font-size:8pt;color:${linkColor};margin-left:8px;">${ed(`projects.${i}.link`, p.link)}</span>` : ""}
      ${p.description ? `<div style="font-size:9pt;line-height:1.55;color:#444;margin-top:2px;">${ed(`projects.${i}.description`, p.description)}</div>` : ""}
    </div>`,
    )
    .join("");
}

function skillPills(
  skills: string[],
  bg = "#f3f4f6",
  color = "#374151",
  border = "",
): string {
  return skills
    .map(
      (s, i) =>
        `<span data-editable="skills.${i}" style="background:${bg};color:${color};${border ? `border:1px solid ${border};` : ""}padding:2px 9px;border-radius:3px;font-size:8.5pt;display:inline-block;margin:2px 3px 2px 0;cursor:pointer;">${esc(s)}</span>`,
    )
    .join("");
}

function skillDots(skills: string[], dotColor = "#2563eb"): string {
  return skills
    .map(
      (s, i) =>
        `<div style="font-size:9pt;color:#333;margin-bottom:4px;"><span style="color:${dotColor};margin-right:6px;">●</span><span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span></div>`,
    )
    .join("");
}

function html(head: string, body: string, extra = ""): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Segoe UI',Arial,sans-serif;font-size:10pt;line-height:1.5;color:#1a1a1a;}${extra}</style></head><body>${head}${body}</body></html>`;
}

function page(
  content: string,
  pad = "40px 50px",
  bg = "#fff",
  extra = "",
): string {
  return `<div style="width:794px;min-height:1123px;background:${bg};padding:${pad};${extra}">${content}</div>`;
}

// ─── Template 1: modern-clean ────────────────────────────────────────────────

function tModernClean(c: ResumeContent): string {
  const h = `
    <div style="padding-bottom:16px;border-bottom:3px solid #e5e7eb;margin-bottom:20px;">
      <div style="font-size:26pt;font-weight:800;color:#111827;letter-spacing:-0.5px;">${ed("personalInfo.name", c.personalInfo.name)}</div>
      <div style="margin-top:5px;">${contact(c.personalInfo, " · ", "#6b7280")}</div>
      ${c.personalInfo.summary ? `<div style="margin-top:8px;font-size:9pt;color:#4b5563;line-height:1.6;">${ed("personalInfo.summary", c.personalInfo.summary)}</div>` : ""}
    </div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:800;color:#2563eb;letter-spacing:0.08em;text-transform:uppercase;border-left:3px solid #2563eb;padding-left:8px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#6b7280", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#6b7280")),
    wrap("Projects", projItems(c.projects, "#111827")),
    wrap("Skills", skillPills(c.skills, "#eff6ff", "#1d4ed8")),
  ].join("");
  return html("", page(h + b));
}

// ─── Template 2: modern-dark ─────────────────────────────────────────────────

function tModernDark(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#1A1A2E;padding:30px 50px;margin:-40px -50px 28px;"><div style="font-size:28pt;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">${ed("personalInfo.name", info.name)}</div><div style="font-size:10pt;color:#00D4FF;font-weight:600;margin-top:4px;">${contact(info, " · ", "#94a3b8")}</div>${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:#cbd5e1;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#00D4FF;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;"><span style="color:#00D4FF;">✦</span> ${t}</div>`;
  const hr = `<div style="border-bottom:1px solid #e5e7eb;margin-bottom:12px;"></div>`;
  const wrap = (t: string, inner: string) =>
    inner
      ? `<div style="margin-bottom:20px;">${sec(t)}${hr}${inner}</div>`
      : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#00D4FF", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#00D4FF")),
    wrap("Projects", projItems(c.projects, "#111827", "#00D4FF")),
    wrap("Skills", skillPills(c.skills, "#e0f2fe", "#0c4a6e")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 3: modern-navy ─────────────────────────────────────────────────

function tModernNavy(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `
    <div style="padding-bottom:18px;margin-bottom:22px;border-bottom:2px solid #1E3A5F;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;">
        <div>
          <div style="font-size:26pt;font-weight:800;color:#1E3A5F;">${ed("personalInfo.name", info.name)}</div>
        </div>
        <div style="text-align:right;font-size:9pt;color:#4b5563;line-height:1.8;">
          ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}
          ${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}
          ${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
        </div>
      </div>
      ${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:#374151;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}
    </div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#1E3A5F;letter-spacing:0.08em;text-transform:uppercase;border-bottom:2px solid #1E3A5F;padding-bottom:4px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:22px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#1E3A5F", "#6b7280", "#374151")),
    wrap("Education", eduItems(c.education, "#1E3A5F", "#6b7280")),
    wrap("Projects", projItems(c.projects, "#1E3A5F", "#1E3A5F")),
    wrap("Skills", skillPills(c.skills, "#eff6ff", "#1E3A5F", "#bfdbfe")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 4: modern-teal ─────────────────────────────────────────────────

function tModernTeal(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#0D9488;padding:30px 50px;margin:-40px -50px 28px;"><div style="font-size:27pt;font-weight:800;color:#fff;">${ed("personalInfo.name", info.name)}</div><div style="margin-top:6px;font-size:9pt;color:rgba(255,255,255,0.85);">${contact(info, " · ", "rgba(255,255,255,0.85)")}</div>${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:rgba(255,255,255,0.9);line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#0D9488;border-bottom:2px solid #0D9488;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#0D9488", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#0D9488")),
    wrap("Projects", projItems(c.projects, "#111827", "#0D9488")),
    wrap("Skills", skillPills(c.skills, "#f0fdfa", "#065f46", "#99f6e4")),
  ].join("");
  return html("", page(hdr + b, "40px 50px", "#FAFAFA"));
}

// ─── Template 5: modern-slate ────────────────────────────────────────────────

function tModernSlate(c: ResumeContent): string {
  const info = c.personalInfo;
  const sidebar = `
    <div style="width:220px;min-width:220px;background:#334155;padding:28px 20px;color:#fff;">
      <div style="font-size:17pt;font-weight:800;color:#fff;line-height:1.2;margin-bottom:6px;">${ed("personalInfo.name", info.name)}</div>
      <div style="height:3px;background:#94a3b8;margin-bottom:14px;"></div>
      <div style="font-size:8.5pt;color:#cbd5e1;line-height:2.0;">
        ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}
        ${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}
        ${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
      </div>
      ${info.summary ? `<div style="margin-top:14px;font-size:8.5pt;color:#94a3b8;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}
      ${c.skills.length ? `<div style="margin-top:18px;"><div style="font-size:8pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin-bottom:8px;">Skills</div>${skillDots(c.skills, "#38bdf8")}</div>` : ""}
    </div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;color:#334155;letter-spacing:0.08em;text-transform:uppercase;border-bottom:2px solid #334155;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const main = `<div style="flex:1;padding:28px 28px;">${[
    wrap("Experience", expItems(c.experience, "#1e293b", "#64748b", "#334155")),
    wrap("Education", eduItems(c.education, "#1e293b", "#64748b")),
    wrap("Projects", projItems(c.projects, "#1e293b", "#2563eb")),
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;display:flex;background:#fff;">${sidebar}${main}</div>`,
    "",
  );
}

// ─── Template 6: modern-gradient ─────────────────────────────────────────────

function tModernGradient(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:linear-gradient(135deg,#7C3AED,#2563EB);padding:30px 50px;margin:-40px -50px 28px;"><div style="font-size:27pt;font-weight:800;color:#fff;">${ed("personalInfo.name", info.name)}</div><div style="margin-top:6px;font-size:9pt;color:rgba(255,255,255,0.85);">${contact(info, " · ", "rgba(255,255,255,0.85)")}</div>${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:rgba(255,255,255,0.9);line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#7C3AED;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;padding-left:8px;border-left:3px solid #7C3AED;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#7C3AED", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#7C3AED")),
    wrap("Projects", projItems(c.projects, "#111827", "#7C3AED")),
    wrap("Skills", skillPills(c.skills, "#ede9fe", "#4c1d95")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 7: modern-bold ─────────────────────────────────────────────────

function tModernBold(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#000;padding:28px 50px;margin:-40px -50px 30px;"><div style="font-size:30pt;font-weight:900;color:#fff;letter-spacing:-1px;">${ed("personalInfo.name", info.name)}</div><div style="font-size:11pt;font-weight:700;color:#F59E0B;margin-top:4px;">${contact(info, " · ", "#d1d5db")}</div></div>`;
  const sec = (t: string) =>
    `<div style="margin-bottom:12px;"><div style="font-size:10pt;font-weight:900;color:#000;letter-spacing:0.04em;text-transform:uppercase;">${t}</div><div style="height:3px;background:#F59E0B;margin-top:3px;"></div></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:22px;">${sec(t)}${inner}</div>` : "";
  const b = [
    info.summary
      ? `<div style="margin-bottom:20px;font-size:9pt;color:#374151;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", expItems(c.experience, "#000", "#F59E0B", "#374151")),
    wrap("Education", eduItems(c.education, "#000", "#F59E0B")),
    wrap("Projects", projItems(c.projects, "#000", "#F59E0B")),
    wrap("Skills", skillPills(c.skills, "#fef3c7", "#92400e")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 8: modern-compact ──────────────────────────────────────────────

function tModernCompact(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#f1f5f9;padding:14px 16px;margin-bottom:14px;border-radius:3px;"><div style="font-size:16pt;font-weight:800;color:#1e293b;">${ed("personalInfo.name", info.name)}</div><div style="font-size:8.5pt;color:#64748b;margin-top:3px;">${contact(info, " · ", "#64748b")}</div></div>`;
  const sec = (t: string) =>
    `<span style="background:#e2e8f0;color:#475569;font-size:7.5pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:1px 7px;border-radius:10px;">${t}</span>`;
  const wrap = (title: string, inner: string) =>
    inner
      ? `<div style="margin-bottom:13px;">${sec(title)}<div style="margin-top:7px;">${inner}</div></div>`
      : "";
  const exp = c.experience
    .map(
      (e, i) =>
        `<div style="margin-bottom:9px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:9.5pt;">${ed(`experience.${i}.title`, e.title)}</span><span style="font-size:8pt;color:#64748b;">${ed(`experience.${i}.startDate`, e.startDate)}–${ed(`experience.${i}.endDate`, e.endDate)}</span></div><div style="font-size:8.5pt;color:#475569;">${ed(`experience.${i}.company`, e.company)}</div>${e.description ? `<div style="font-size:8.5pt;color:#4b5563;line-height:1.5;">${ed(`experience.${i}.description`, e.description)}</div>` : ""}</div>`,
    )
    .join("");
  const edu = c.education
    .map(
      (e, i) =>
        `<div style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:9.5pt;">${ed(`education.${i}.degree`, e.degree)}</span><span style="font-size:8pt;color:#64748b;">${ed(`education.${i}.startDate`, e.startDate)}–${ed(`education.${i}.endDate`, e.endDate)}</span></div><div style="font-size:8.5pt;color:#475569;">${ed(`education.${i}.school`, e.school)}</div></div>`,
    )
    .join("");
  const b = [
    info.summary
      ? `<div style="margin-bottom:12px;font-size:9pt;color:#374151;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", exp),
    wrap("Education", edu),
    wrap("Projects", projItems(c.projects, "#1e293b", "#2563eb")),
    wrap(
      "Skills",
      c.skills
        .map(
          (s, i) =>
            `<span data-editable="skills.${i}" style="font-size:8.5pt;color:#374151;margin-right:12px;cursor:pointer;">${esc(s)}</span>`,
        )
        .join(""),
    ),
  ].join("");
  return html("", page(hdr + b, "28px 32px"));
}

// ─── Template 9: pro-classic ─────────────────────────────────────────────────

function tProClassic(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="text-align:center;padding-bottom:16px;margin-bottom:18px;border-bottom:2px solid #374151;"><div style="font-size:24pt;font-weight:900;color:#111827;letter-spacing:0.02em;">${ed("personalInfo.name", info.name)}</div><div style="font-size:9pt;color:#6b7280;margin-top:6px;">${contact(info, " · ", "#6b7280")}</div></div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#374151;letter-spacing:0.12em;text-transform:uppercase;text-align:center;border-bottom:1px solid #d1d5db;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    info.summary
      ? `<div style="text-align:center;font-size:9pt;color:#4b5563;font-style:italic;margin-bottom:18px;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Professional Experience", expItems(c.experience)),
    wrap("Education", eduItems(c.education)),
    wrap(
      "Skills",
      `<div style="text-align:center;font-size:9pt;color:#374151;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join(" · ")}</div>`,
    ),
    wrap("Projects", projItems(c.projects)),
  ].join("");
  return html(
    "",
    page(hdr + b),
    "body{font-family:'Times New Roman',Times,serif;}",
  );
}

// ─── Template 10: pro-executive ──────────────────────────────────────────────

function tProExecutive(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `
    <div style="border-top:3px solid #D97706;padding-top:18px;margin-bottom:22px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;">
        <div style="font-size:27pt;font-weight:900;color:#111827;letter-spacing:-0.5px;">${ed("personalInfo.name", info.name)}</div>
        <div style="text-align:right;font-size:9pt;color:#4b5563;line-height:1.9;">
          ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
        </div>
      </div>
      ${info.summary ? `<div style="margin-top:12px;font-size:9.5pt;color:#374151;line-height:1.65;border-left:3px solid #D97706;padding-left:12px;">${ed("personalInfo.summary", info.summary)}</div>` : ""}
    </div>`;
  const sec = (t: string) =>
    `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><div style="font-size:9.5pt;font-weight:800;color:#111827;letter-spacing:0.06em;text-transform:uppercase;">${t}</div><div style="flex:1;height:1px;background:#D97706;"></div></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:22px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#D97706", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#D97706")),
    wrap("Projects", projItems(c.projects, "#111827", "#D97706")),
    wrap("Skills", skillPills(c.skills, "#fffbeb", "#92400e", "#fde68a")),
  ].join("");
  return html("", page(hdr + b, "40px 52px"));
}

// ─── Template 11: pro-corporate ──────────────────────────────────────────────

function tProCorporate(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#003366;padding:26px 50px;margin:-40px -50px 26px;"><div style="font-size:25pt;font-weight:800;color:#fff;">${ed("personalInfo.name", info.name)}</div><div style="font-size:9pt;color:#7eb3e8;margin-top:5px;">${contact(info, " · ", "#7eb3e8")}</div></div>`;
  const sec = (t: string) =>
    `<div style="background:#003366;color:#fff;font-size:8.5pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;margin-bottom:10px;display:inline-block;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner
      ? `<div style="margin-bottom:20px;">${sec(t)}<div style="border-left:3px solid #003366;padding-left:12px;">${inner}</div></div>`
      : "";
  const b = [
    info.summary
      ? `<div style="margin-bottom:18px;font-size:9pt;color:#374151;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap(
      "Professional Experience",
      expItems(c.experience, "#003366", "#003366", "#374151"),
    ),
    wrap("Education", eduItems(c.education, "#003366", "#003366")),
    wrap("Projects", projItems(c.projects, "#003366", "#003366")),
    wrap(
      "Skills",
      `<div>${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="font-size:9pt;color:#374151;margin-right:14px;cursor:pointer;">▸ ${esc(s)}</span>`).join("")}</div>`,
    ),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 12: pro-formal ─────────────────────────────────────────────────

function tProFormal(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="text-align:center;margin-bottom:20px;"><div style="font-size:22pt;font-weight:700;color:#111827;font-variant:small-caps;letter-spacing:0.06em;">${ed("personalInfo.name", info.name)}</div><div style="height:1px;background:#111827;margin:10px auto;width:80%;"></div><div style="font-size:8.5pt;color:#4b5563;">${contact(info, "   |   ", "#4b5563")}</div></div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;color:#111827;letter-spacing:0.1em;text-transform:uppercase;font-variant:small-caps;margin-bottom:6px;border-bottom:1px solid #9ca3af;padding-bottom:2px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:18px;">${sec(t)}${inner}</div>` : "";
  const b = [
    info.summary
      ? `<div style="font-size:9pt;color:#4b5563;line-height:1.65;font-style:italic;margin-bottom:18px;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", expItems(c.experience, "#111827", "#4b5563", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#4b5563")),
    wrap(
      "Skills",
      `<div style="font-size:9pt;color:#374151;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join(", ")}</div>`,
    ),
    wrap("Projects", projItems(c.projects)),
  ].join("");
  return html("", page(hdr + b), "body{font-family:'Times New Roman',serif;}");
}

// ─── Template 13: pro-elegant ────────────────────────────────────────────────

function tProElegant(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="margin-bottom:22px;padding-bottom:16px;"><div style="font-size:26pt;font-weight:800;color:#9B2335;">${ed("personalInfo.name", info.name)}</div><div style="font-size:9pt;color:#6b7280;margin-top:5px;">${contact(info, " · ", "#6b7280")}</div>${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:#374151;line-height:1.65;font-style:italic;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#9B2335;letter-spacing:0.06em;text-transform:uppercase;padding-left:10px;border-left:3px solid #9B2335;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#9B2335", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#9B2335")),
    wrap("Projects", projItems(c.projects, "#111827", "#9B2335")),
    wrap("Skills", skillPills(c.skills, "#fff0f0", "#9B2335", "#fecaca")),
  ].join("");
  return html("", page(hdr + b), "body{font-family:'Georgia',serif;}");
}

// ─── Template 14: pro-refined ────────────────────────────────────────────────

function tProRefined(c: ResumeContent): string {
  const info = c.personalInfo;
  const left = `
    <div style="width:200px;min-width:200px;background:#F8F8F8;padding:28px 18px;border-right:1px solid #e5e7eb;">
      <div style="font-size:14pt;font-weight:800;color:#166534;margin-bottom:10px;">${ed("personalInfo.name", info.name)}</div>
      <div style="height:2px;background:#166534;margin-bottom:12px;"></div>
      <div style="font-size:8.5pt;color:#374151;line-height:1.9;">
        ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
      </div>
      ${info.summary ? `<div style="margin-top:12px;font-size:8.5pt;color:#4b5563;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}
      ${c.skills.length ? `<div style="margin-top:16px;"><div style="font-size:8pt;font-weight:700;color:#166534;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;">Skills</div>${skillDots(c.skills, "#166534")}</div>` : ""}
    </div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;color:#166534;letter-spacing:0.08em;text-transform:uppercase;border-bottom:2px solid #166534;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const right = `<div style="flex:1;padding:28px 24px;">${[
    wrap("Experience", expItems(c.experience, "#111827", "#166534", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#166534")),
    wrap("Projects", projItems(c.projects, "#111827", "#166534")),
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;display:flex;">${left}${right}</div>`,
  );
}

// ─── Template 15: pro-polished ───────────────────────────────────────────────

function tProPolished(c: ResumeContent): string {
  const info = c.personalInfo;
  const stripes = Array(8)
    .fill(0)
    .map(
      (_, i) =>
        `<div style="position:absolute;top:0;left:${i * 12}%;width:12%;height:100%;background:rgba(255,255,255,${i % 2 === 0 ? "0.06" : "0"});"></div>`,
    )
    .join("");
  const hdr = `<div style="background:#1e3a5f;padding:26px 50px;margin:-40px -50px 26px;position:relative;overflow:hidden;">${stripes}<div style="position:relative;z-index:1;font-size:25pt;font-weight:800;color:#fff;">${ed("personalInfo.name", info.name)}</div><div style="position:relative;z-index:1;font-size:9pt;color:#94a3b8;margin-top:5px;">${contact(info, " · ", "#94a3b8")}</div></div>`;
  const sec = (t: string) =>
    `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;"><div style="font-size:9pt;font-weight:700;color:#1e3a5f;letter-spacing:0.08em;text-transform:uppercase;">${t}</div><div style="flex:1;height:1px;background:#94a3b8;"></div></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    info.summary
      ? `<div style="margin-bottom:18px;font-size:9pt;color:#374151;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", expItems(c.experience, "#1e3a5f", "#64748b", "#374151")),
    wrap("Education", eduItems(c.education, "#1e3a5f", "#64748b")),
    wrap("Skills", skillPills(c.skills, "#f1f5f9", "#334155", "#cbd5e1")),
    wrap("Projects", projItems(c.projects, "#1e3a5f", "#1e3a5f")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 16: pro-distinguished ─────────────────────────────────────────

function tProDistinguished(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `
    <div style="display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:14px;border-bottom:4px solid #EA580C;margin-bottom:22px;">
      <div style="font-size:26pt;font-weight:900;color:#111827;">${ed("personalInfo.name", info.name)}</div>
      <div style="text-align:right;font-size:9pt;color:#4b5563;line-height:1.9;">
        ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
      </div>
    </div>${info.summary ? `<div style="margin-bottom:18px;font-size:9pt;color:#374151;line-height:1.65;">${ed("personalInfo.summary", info.summary)}</div>` : ""}`;
  const sec = (t: string) =>
    `<div style="border-left:4px solid #EA580C;padding-left:10px;font-size:9.5pt;font-weight:800;color:#111827;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:22px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#EA580C", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#EA580C")),
    wrap("Projects", projItems(c.projects, "#111827", "#EA580C")),
    wrap("Skills", skillPills(c.skills, "#fff7ed", "#9a3412", "#fed7aa")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 17: creative-color ─────────────────────────────────────────────

function tCreativeColor(c: ResumeContent): string {
  const info = c.personalInfo;
  const initials = info.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const sidebar = `
    <div style="width:235px;min-width:235px;background:#4F46E5;padding:28px 20px;color:#fff;">
      <div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:20pt;font-weight:800;color:#fff;margin-bottom:14px;">${initials}</div>
      <div style="font-size:16pt;font-weight:800;color:#fff;line-height:1.2;margin-bottom:4px;">${ed("personalInfo.name", info.name)}</div>
      <div style="height:2px;background:rgba(255,255,255,0.3);margin:10px 0;"></div>
      <div style="font-size:8.5pt;color:rgba(255,255,255,0.8);line-height:2.0;">
        ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
      </div>
      ${info.summary ? `<div style="margin-top:14px;font-size:8.5pt;color:rgba(255,255,255,0.85);line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}
      ${c.skills.length ? `<div style="margin-top:18px;"><div style="font-size:8pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:8px;">Skills</div>${c.skills.map((s, i) => `<div data-editable="skills.${i}" style="font-size:8.5pt;color:#e0e7ff;margin-bottom:4px;cursor:pointer;">▸ ${esc(s)}</div>`).join("")}</div>` : ""}
    </div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#4F46E5;letter-spacing:0.08em;text-transform:uppercase;border-bottom:2px solid #4F46E5;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const main = `<div style="flex:1;padding:28px 26px;">${[
    wrap("Experience", expItems(c.experience, "#111827", "#4F46E5", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#4F46E5")),
    wrap("Projects", projItems(c.projects, "#111827", "#4F46E5")),
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;display:flex;">${sidebar}${main}</div>`,
  );
}

// ─── Template 18: creative-vibrant ───────────────────────────────────────────

function tCreativeVibrant(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#F97316;padding:28px 50px;margin:-40px -50px 26px;"><div style="font-size:28pt;font-weight:800;color:#fff;">${ed("personalInfo.name", info.name)}</div><div style="font-size:9pt;color:rgba(255,255,255,0.85);margin-top:6px;">${contact(info, " · ", "rgba(255,255,255,0.85)")}</div>${info.summary ? `<div style="margin-top:8px;font-size:9pt;color:rgba(255,255,255,0.9);line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#F97316;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;"><span style="display:inline-block;width:20px;height:3px;background:#F97316;vertical-align:middle;margin-right:8px;"></span>${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner
      ? `<div style="margin-bottom:20px;">${sec(t)}<div style="border-left:2px solid #fed7aa;padding-left:12px;">${inner}</div></div>`
      : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#F97316", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#F97316")),
    wrap("Projects", projItems(c.projects, "#111827", "#F97316")),
    wrap("Skills", skillPills(c.skills, "#fff7ed", "#c2410c", "#fed7aa")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 19: creative-bold ──────────────────────────────────────────────

function tCreativeBold(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#0F172A;padding:36px 50px;margin:-40px -50px 30px;"><div style="font-size:32pt;font-weight:900;color:#22C55E;letter-spacing:-1px;">${ed("personalInfo.name", info.name)}</div><div style="font-size:9pt;color:#94a3b8;margin-top:6px;">${contact(info, " · ", "#94a3b8")}</div>${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:#cbd5e1;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:10pt;font-weight:900;color:#22C55E;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:10px;padding-bottom:4px;border-bottom:2px solid #22C55E;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:22px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#22C55E", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#22C55E")),
    wrap("Projects", projItems(c.projects, "#111827", "#22C55E")),
    wrap("Skills", skillPills(c.skills, "#f0fdf4", "#166534", "#bbf7d0")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 20: creative-designer ─────────────────────────────────────────

function tCreativeDesigner(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `
    <div style="padding-bottom:16px;border-bottom:3px solid #EC4899;margin-bottom:20px;">
      <div style="font-size:28pt;font-weight:900;color:#111827;">${ed("personalInfo.name", info.name)}</div>
      <div style="display:flex;gap:20px;margin-top:8px;flex-wrap:wrap;">
        ${info.email ? `<span style="font-size:8.5pt;color:#EC4899;font-weight:600;">${ed("personalInfo.email", info.email)}</span>` : ""}
        ${info.phone ? `<span style="font-size:8.5pt;color:#6b7280;">${ed("personalInfo.phone", info.phone)}</span>` : ""}
        ${info.location ? `<span style="font-size:8.5pt;color:#6b7280;">${ed("personalInfo.location", info.location)}</span>` : ""}
      </div>
    </div>`;
  const skillTags = c.skills.length
    ? `<div style="margin-bottom:20px;"><div style="font-size:9pt;font-weight:700;color:#EC4899;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Skills & Tools</div><div>${skillPills(c.skills, "#fdf2f8", "#9d174d", "#f9a8d4")}</div></div>`
    : "";
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#EC4899;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">${t}</div>`;
  const left = `<div style="width:270px;min-width:270px;padding-right:20px;border-right:2px solid #fce7f3;">
    ${skillTags}
    ${c.projects.length ? `${sec("Projects")}<div>${projItems(c.projects, "#111827", "#EC4899")}</div>` : ""}
  </div>`;
  const right = `<div style="flex:1;padding-left:20px;">
    ${c.experience.length ? `${sec("Experience")}<div style="margin-bottom:18px;">${expItems(c.experience, "#111827", "#EC4899", "#374151")}</div>` : ""}
    ${c.education.length ? `${sec("Education")}<div>${eduItems(c.education, "#111827", "#EC4899")}</div>` : ""}
  </div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;padding:36px 40px;background:#fff;"><div>${hdr}<div style="display:flex;">${left}${right}</div></div></div>`,
  );
}

// ─── Template 21: creative-artistic ─────────────────────────────────────────

function tCreativeArtistic(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="margin-bottom:24px;"><div style="font-size:34pt;font-weight:300;color:#111827;letter-spacing:-1px;">${ed("personalInfo.name", info.name)}</div><div style="margin-top:6px;font-size:9pt;color:#6b7280;">${contact(info, " · ", "#6b7280")}</div>${info.summary ? `<div style="margin-top:10px;font-size:9.5pt;color:#374151;line-height:1.65;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const colors = {
    experience: "#2563EB",
    education: "#059669",
    skills: "#7C3AED",
    projects: "#F97316",
  };
  const sec = (t: string, color: string) =>
    `<div style="border-left:8px solid ${color};padding-left:14px;margin-bottom:12px;"><div style="font-size:9.5pt;font-weight:800;color:${color};letter-spacing:0.08em;text-transform:uppercase;">${t}</div></div>`;
  const wrap = (t: string, inner: string, color: string) =>
    inner
      ? `<div style="margin-bottom:22px;">${sec(t, color)}<div style="padding-left:22px;">${inner}</div></div>`
      : "";
  const b = [
    wrap(
      "Experience",
      expItems(c.experience, "#111827", colors.experience, "#374151"),
      colors.experience,
    ),
    wrap(
      "Education",
      eduItems(c.education, "#111827", colors.education),
      colors.education,
    ),
    wrap("Skills", skillPills(c.skills, "#ede9fe", "#4c1d95"), colors.skills),
    wrap(
      "Projects",
      projItems(c.projects, "#111827", colors.projects),
      colors.projects,
    ),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 22: creative-dynamic ───────────────────────────────────────────

function tCreativeDynamic(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#581C87;padding:28px 50px 38px;margin:-40px -50px 30px;clip-path:polygon(0 0,100% 0,100% 80%,0 100%);"><div style="font-size:26pt;font-weight:800;color:#fff;">${ed("personalInfo.name", info.name)}</div><div style="font-size:9pt;color:rgba(255,255,255,0.8);margin-top:5px;">${contact(info, " · ", "rgba(255,255,255,0.8)")}</div></div>`;
  const sec = (t: string) =>
    `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;"><div style="width:6px;height:6px;background:#7C3AED;transform:rotate(45deg);"></div><div style="font-size:9.5pt;font-weight:700;color:#581C87;letter-spacing:0.08em;text-transform:uppercase;">${t}</div><div style="flex:1;height:1px;background:#e9d5ff;"></div></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    info.summary
      ? `<div style="margin-bottom:18px;font-size:9pt;color:#374151;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", expItems(c.experience, "#111827", "#7C3AED", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#7C3AED")),
    wrap("Projects", projItems(c.projects, "#111827", "#7C3AED")),
    wrap("Skills", skillPills(c.skills, "#f3e8ff", "#6b21a8")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 23: minimal-pure ───────────────────────────────────────────────

function tMinimalPure(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="margin-bottom:28px;"><div style="font-size:28pt;font-weight:300;color:#111827;letter-spacing:-0.5px;">${ed("personalInfo.name", info.name)}</div><div style="margin-top:5px;font-size:8.5pt;color:#9ca3af;">${contact(info, "  ·  ", "#9ca3af")}</div></div>`;
  const sec = (t: string) =>
    `<div style="font-size:8pt;font-weight:400;color:#9ca3af;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:22px;">${sec(t)}${inner}</div>` : "";
  const exp = c.experience
    .map(
      (e, i) =>
        `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;"><span style="font-size:10pt;color:#111827;">${ed(`experience.${i}.title`, e.title)}</span><span style="font-size:8.5pt;color:#9ca3af;">${ed(`experience.${i}.startDate`, e.startDate)}–${ed(`experience.${i}.endDate`, e.endDate)}</span></div><div style="font-size:9pt;color:#6b7280;">${ed(`experience.${i}.company`, e.company)}</div>${e.description ? `<div style="font-size:9pt;color:#6b7280;line-height:1.55;margin-top:3px;">${ed(`experience.${i}.description`, e.description)}</div>` : ""}</div>`,
    )
    .join("");
  const edu = c.education
    .map(
      (e, i) =>
        `<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;"><span style="font-size:10pt;color:#111827;">${ed(`education.${i}.degree`, e.degree)}</span><span style="font-size:8.5pt;color:#9ca3af;">${ed(`education.${i}.startDate`, e.startDate)}–${ed(`education.${i}.endDate`, e.endDate)}</span></div><div style="font-size:9pt;color:#6b7280;">${ed(`education.${i}.school`, e.school)}</div></div>`,
    )
    .join("");
  const b = [
    info.summary
      ? `<div style="margin-bottom:22px;font-size:9pt;color:#6b7280;line-height:1.7;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", exp),
    wrap("Education", edu),
    wrap(
      "Skills",
      `<div style="font-size:9pt;color:#6b7280;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join("  ·  ")}</div>`,
    ),
    wrap(
      "Projects",
      c.projects
        .map(
          (p, i) =>
            `<div style="margin-bottom:9px;"><div style="font-size:10pt;color:#111827;">${ed(`projects.${i}.title`, p.title)}</div>${p.description ? `<div style="font-size:9pt;color:#6b7280;margin-top:2px;">${ed(`projects.${i}.description`, p.description)}</div>` : ""}</div>`,
        )
        .join(""),
    ),
  ].join("");
  return html(
    "",
    page(hdr + b, "48px 56px"),
    "body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;}",
  );
}

// ─── Template 24: minimal-clean ──────────────────────────────────────────────

function tMinimalClean(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:10px;border-bottom:1px solid #d1d5db;margin-bottom:20px;"><div style="font-size:22pt;font-weight:700;color:#111827;">${ed("personalInfo.name", info.name)}</div><div style="font-size:8.5pt;color:#6b7280;text-align:right;line-height:1.8;">${[
    info.email,
    info.phone,
    info.location,
  ]
    .filter(Boolean)
    .map((v, vi) => {
      const keys = ["email", "phone", "location"];
      return `<span style="display:block;">${ed(`personalInfo.${keys[vi]}`, v!)}</span>`;
    })
    .join(
      "",
    )}</div></div>${info.summary ? `<div style="font-size:9pt;color:#374151;line-height:1.65;margin-bottom:18px;">${ed("personalInfo.summary", info.summary)}</div>` : ""}`;
  const sec = (t: string) =>
    `<div style="font-size:8.5pt;font-weight:600;color:#6b7280;letter-spacing:0.15em;text-transform:uppercase;font-variant:small-caps;margin-bottom:8px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const exp = c.experience
    .map(
      (e, i) =>
        `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:10pt;">${ed(`experience.${i}.title`, e.title)} <span style="color:#059669;">@ ${ed(`experience.${i}.company`, e.company)}</span></span><span style="font-size:8.5pt;color:#059669;">${ed(`experience.${i}.startDate`, e.startDate)}–${ed(`experience.${i}.endDate`, e.endDate)}</span></div>${e.description ? `<div style="font-size:9pt;color:#374151;line-height:1.55;margin-top:3px;">${ed(`experience.${i}.description`, e.description)}</div>` : ""}</div>`,
    )
    .join("");
  const edu = c.education
    .map(
      (e, i) =>
        `<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:10pt;">${ed(`education.${i}.degree`, e.degree)} <span style="color:#059669;">@ ${ed(`education.${i}.school`, e.school)}</span></span><span style="font-size:8.5pt;color:#059669;">${ed(`education.${i}.startDate`, e.startDate)}–${ed(`education.${i}.endDate`, e.endDate)}</span></div>${e.description ? `<div style="font-size:8.5pt;color:#4b5563;margin-top:2px;">${ed(`education.${i}.description`, e.description)}</div>` : ""}</div>`,
    )
    .join("");
  const b = [
    wrap("Experience", exp),
    wrap("Education", edu),
    wrap(
      "Skills",
      `<div style="font-size:9pt;color:#374151;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join(", ")}</div>`,
    ),
    wrap("Projects", projItems(c.projects, "#111827", "#059669")),
  ].join("");
  return html(
    "",
    page(hdr + b, "40px 48px"),
    "body{font-family:'Helvetica Neue',Arial,sans-serif;}",
  );
}

// ─── Template 25: minimal-zen ────────────────────────────────────────────────

function tMinimalZen(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="text-align:center;margin-bottom:28px;"><div style="font-size:26pt;font-weight:400;color:#111827;letter-spacing:0.02em;">${ed("personalInfo.name", info.name)}</div><div style="margin-top:6px;font-size:9pt;color:#9ca3af;">${contact(info, "  ·  ", "#9ca3af")}</div></div>`;
  const sec = (t: string) =>
    `<div style="text-align:center;font-size:9pt;font-weight:600;color:#92400E;letter-spacing:0.18em;text-transform:uppercase;margin:20px 0 12px;"><span style="padding:0 16px;position:relative;">${t}</span></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div>${sec(t)}${inner}</div>` : "";
  const b = [
    info.summary
      ? `<div style="text-align:center;font-size:9pt;color:#6b7280;line-height:1.7;max-width:580px;margin:0 auto 24px;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", expItems(c.experience, "#111827", "#92400E", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#92400E")),
    wrap(
      "Skills",
      `<div style="text-align:center;font-size:9pt;color:#4b5563;margin-bottom:18px;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join("  ·  ")}</div>`,
    ),
    wrap("Projects", projItems(c.projects, "#111827", "#92400E")),
  ].join("");
  return html(
    "",
    page(hdr + b, "44px 52px"),
    "body{font-family:'Georgia',serif;}",
  );
}

// ─── Template 26: minimal-swiss ──────────────────────────────────────────────

function tMinimalSwiss(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;padding-bottom:20px;border-bottom:1px solid #111827;margin-bottom:24px;"><div><div style="font-size:24pt;font-weight:900;color:#111827;letter-spacing:-0.5px;">${ed("personalInfo.name", info.name)}</div></div><div style="text-align:right;font-size:8.5pt;color:#4b5563;line-height:1.9;">${[
    info.email,
    info.phone,
    info.location,
  ]
    .filter(Boolean)
    .map((v, vi) => {
      const keys = ["email", "phone", "location"];
      return `<div>${ed(`personalInfo.${keys[vi]}`, v!)}</div>`;
    })
    .join("")}</div></div>`;
  let idx = 0;
  const sec = (t: string) => {
    idx++;
    return `<div style="display:grid;grid-template-columns:60px 1fr;gap:16px;margin-bottom:22px;"><div style="font-size:11pt;font-weight:900;color:#DC2626;">0${idx}</div><div><div style="font-size:9pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#111827;margin-bottom:10px;">${t}</div>`;
  };
  const wrap = (t: string, inner: string) =>
    inner ? `${sec(t)}${inner}</div></div>` : "";
  const b = [
    info.summary
      ? `<div style="margin-bottom:22px;display:grid;grid-template-columns:60px 1fr;gap:16px;"><div style="font-size:11pt;font-weight:900;color:#DC2626;">00</div><div style="font-size:9pt;color:#4b5563;line-height:1.65;">${ed("personalInfo.summary", info.summary)}</div></div>`
      : "",
    wrap("Experience", expItems(c.experience, "#111827", "#DC2626", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#DC2626")),
    wrap(
      "Skills",
      `<div style="font-size:9pt;color:#374151;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join(", ")}</div>`,
    ),
    wrap("Projects", projItems(c.projects, "#111827", "#DC2626")),
  ].join("");
  return html(
    "",
    page(hdr + b, "44px 50px"),
    "body{font-family:'Helvetica Neue',Arial,sans-serif;}",
  );
}

// ─── Template 27: minimal-nordic ─────────────────────────────────────────────

function tMinimalNordic(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#f5f0eb;padding:24px 28px;margin-bottom:22px;border-radius:2px;"><div style="font-size:22pt;font-weight:500;color:#1c1917;letter-spacing:0.01em;">${ed("personalInfo.name", info.name)}</div><div style="margin-top:6px;font-size:8.5pt;color:#78716c;">${contact(info, " · ", "#78716c")}</div>${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:#44403c;line-height:1.65;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:8.5pt;font-weight:600;color:#64748B;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid #e7e5e4;padding-bottom:4px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const exp = c.experience
    .map(
      (e, i) =>
        `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:600;font-size:10pt;color:#1c1917;">${ed(`experience.${i}.title`, e.title)}</span><span style="font-size:8.5pt;color:#78716c;">${ed(`experience.${i}.startDate`, e.startDate)}–${ed(`experience.${i}.endDate`, e.endDate)}</span></div><div style="font-size:9pt;color:#57534e;">${ed(`experience.${i}.company`, e.company)}</div>${e.description ? `<div style="font-size:9pt;color:#57534e;line-height:1.55;margin-top:3px;">${ed(`experience.${i}.description`, e.description)}</div>` : ""}</div>`,
    )
    .join("");
  const b = [
    wrap("Experience", exp),
    wrap("Education", eduItems(c.education, "#1c1917", "#78716c")),
    wrap(
      "Skills",
      `<div style="font-size:9pt;color:#57534e;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join("  ·  ")}</div>`,
    ),
    wrap("Projects", projItems(c.projects, "#1c1917", "#64748B")),
  ].join("");
  return html(
    "",
    page(hdr + b, "32px 36px"),
    "body{font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;}",
  );
}

// ─── Template 28: minimal-simple ─────────────────────────────────────────────

function tMinimalSimple(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="margin-bottom:16px;border-bottom:1px solid #000;padding-bottom:10px;"><div style="font-size:18pt;font-weight:700;color:#000;">${ed("personalInfo.name", info.name)}</div><div style="font-size:9pt;color:#333;margin-top:3px;">${contact(info, " | ", "#333")}</div></div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#000;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;margin-top:4px;">${t}</div><div style="border-bottom:1px solid #000;margin-bottom:8px;"></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:14px;">${sec(t)}${inner}</div>` : "";
  const exp = c.experience
    .map(
      (e, i) =>
        `<div style="margin-bottom:9px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:9.5pt;">${ed(`experience.${i}.title`, e.title)}, ${ed(`experience.${i}.company`, e.company)}</span><span style="font-size:9pt;">${ed(`experience.${i}.startDate`, e.startDate)}–${ed(`experience.${i}.endDate`, e.endDate)}</span></div>${e.description ? `<div style="font-size:9pt;color:#333;margin-top:2px;">${ed(`experience.${i}.description`, e.description)}</div>` : ""}</div>`,
    )
    .join("");
  const edu = c.education
    .map(
      (e, i) =>
        `<div style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:9.5pt;">${ed(`education.${i}.degree`, e.degree)}, ${ed(`education.${i}.school`, e.school)}</span><span style="font-size:9pt;">${ed(`education.${i}.startDate`, e.startDate)}–${ed(`education.${i}.endDate`, e.endDate)}</span></div></div>`,
    )
    .join("");
  const b = [
    info.summary
      ? `<div style="font-size:9pt;color:#333;line-height:1.6;margin-bottom:14px;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", exp),
    wrap("Education", edu),
    wrap(
      "Skills",
      `<div style="font-size:9pt;color:#333;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join(", ")}</div>`,
    ),
    wrap("Projects", projItems(c.projects, "#000", "#000")),
  ].join("");
  return html(
    "",
    page(hdr + b, "36px 42px"),
    "body{font-family:'Times New Roman',serif;}",
  );
}

// ─── Template 29: twocol-modern ──────────────────────────────────────────────

function tTwocolModern(c: ResumeContent): string {
  const info = c.personalInfo;
  const left = `
    <div style="width:250px;min-width:250px;background:#EFF6FF;padding:28px 20px;">
      <div style="font-size:17pt;font-weight:800;color:#1d4ed8;margin-bottom:6px;">${ed("personalInfo.name", info.name)}</div>
      <div style="height:3px;background:#3B82F6;margin-bottom:14px;"></div>
      <div style="font-size:8.5pt;color:#374151;line-height:2.0;">
        ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
      </div>
      ${info.summary ? `<div style="margin-top:12px;font-size:8.5pt;color:#4b5563;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}
      ${c.skills.length ? `<div style="margin-top:18px;"><div style="font-size:8pt;font-weight:700;color:#1d4ed8;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Skills</div>${skillPills(c.skills, "#dbeafe", "#1e40af")}</div>` : ""}
      ${c.education.length ? `<div style="margin-top:18px;"><div style="font-size:8pt;font-weight:700;color:#1d4ed8;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Education</div>${eduItems(c.education, "#1e40af", "#3B82F6")}</div>` : ""}
    </div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;color:#3B82F6;letter-spacing:0.08em;text-transform:uppercase;border-bottom:2px solid #3B82F6;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const right = `<div style="flex:1;padding:28px 24px;">${[
    wrap("Experience", expItems(c.experience, "#111827", "#3B82F6", "#374151")),
    wrap("Projects", projItems(c.projects, "#111827", "#3B82F6")),
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;display:flex;">${left}${right}</div>`,
  );
}

// ─── Template 30: twocol-classic ─────────────────────────────────────────────

function tTwocolClassic(c: ResumeContent): string {
  const info = c.personalInfo;
  const left = `
    <div style="width:220px;min-width:220px;background:#F3F4F6;padding:28px 18px;border-right:1px solid #d1d5db;">
      <div style="font-size:8pt;font-weight:700;color:#1E3A5F;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Contact</div>
      <div style="font-size:8.5pt;color:#374151;line-height:1.9;margin-bottom:18px;">
        ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
      </div>
      ${c.skills.length ? `<div style="font-size:8pt;font-weight:700;color:#1E3A5F;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Skills</div><div style="margin-bottom:18px;">${skillDots(c.skills, "#1E3A5F")}</div>` : ""}
      ${c.education.length ? `<div style="font-size:8pt;font-weight:700;color:#1E3A5F;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Education</div>${eduItems(c.education, "#1E3A5F", "#64748b")}` : ""}
    </div>`;
  const hdr = `<div style="padding-bottom:14px;border-bottom:3px solid #1E3A5F;margin-bottom:18px;"><div style="font-size:22pt;font-weight:800;color:#1E3A5F;">${ed("personalInfo.name", info.name)}</div>${info.summary ? `<div style="font-size:9pt;color:#4b5563;margin-top:6px;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;color:#1E3A5F;letter-spacing:0.08em;text-transform:uppercase;border-bottom:2px solid #1E3A5F;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:18px;">${sec(t)}${inner}</div>` : "";
  const right = `<div style="flex:1;padding:28px 22px;">${hdr}${[
    wrap("Experience", expItems(c.experience, "#1E3A5F", "#64748b", "#374151")),
    wrap("Projects", projItems(c.projects, "#1E3A5F", "#1E3A5F")),
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;display:flex;">${left}${right}</div>`,
  );
}

// ─── Template 31: twocol-skills ──────────────────────────────────────────────

function tTwocolSkills(c: ResumeContent): string {
  const info = c.personalInfo;
  const skillBars = c.skills
    .map((s, i) => {
      const w = [90, 80, 75, 85, 70, 65, 88, 72, 95, 60][i % 10];
      return `<div style="margin-bottom:7px;"><div data-editable="skills.${i}" style="font-size:8.5pt;color:#dcfce7;margin-bottom:2px;cursor:pointer;">${esc(s)}</div><div style="background:rgba(255,255,255,0.15);border-radius:2px;height:5px;"><div style="background:#4ade80;height:5px;border-radius:2px;width:${w}%;"></div></div></div>`;
    })
    .join("");
  const left = `
    <div style="width:230px;min-width:230px;background:#14532D;padding:28px 18px;color:#fff;">
      <div style="font-size:8pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#86efac;margin-bottom:8px;">Skills</div>
      <div style="margin-bottom:20px;">${skillBars}</div>
      <div style="font-size:8pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#86efac;margin-bottom:8px;">Education</div>
      ${c.education.map((e, i) => `<div style="margin-bottom:10px;"><div style="font-weight:700;font-size:9pt;color:#dcfce7;">${ed(`education.${i}.degree`, e.degree)}</div><div style="font-size:8.5pt;color:#86efac;">${ed(`education.${i}.school`, e.school)}</div><div style="font-size:8pt;color:#4ade80;">${ed(`education.${i}.startDate`, e.startDate)}–${ed(`education.${i}.endDate`, e.endDate)}</div></div>`).join("")}
    </div>`;
  const hdr = `<div style="padding-bottom:14px;border-bottom:3px solid #14532D;margin-bottom:18px;"><div style="font-size:22pt;font-weight:800;color:#14532D;">${ed("personalInfo.name", info.name)}</div><div style="font-size:8.5pt;color:#6b7280;margin-top:4px;">${contact(info, " · ", "#6b7280")}</div>${info.summary ? `<div style="font-size:9pt;color:#374151;margin-top:8px;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;color:#14532D;letter-spacing:0.08em;text-transform:uppercase;border-bottom:2px solid #14532D;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:18px;">${sec(t)}${inner}</div>` : "";
  const right = `<div style="flex:1;padding:28px 22px;">${hdr}${[
    wrap("Experience", expItems(c.experience, "#14532D", "#16a34a", "#374151")),
    wrap("Projects", projItems(c.projects, "#14532D", "#16a34a")),
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;display:flex;">${left}${right}</div>`,
  );
}

// ─── Template 32: twocol-sidebar ─────────────────────────────────────────────

function tTwocolSidebar(c: ResumeContent): string {
  const info = c.personalInfo;
  const left = `
    <div style="width:212px;min-width:212px;background:#111827;padding:28px 18px;color:#fff;">
      <div style="font-size:16pt;font-weight:800;color:#fff;line-height:1.2;margin-bottom:6px;">${ed("personalInfo.name", info.name)}</div>
      <div style="height:2px;background:#F59E0B;margin-bottom:14px;"></div>
      <div style="font-size:8pt;font-weight:700;color:#F59E0B;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Contact</div>
      <div style="font-size:8.5pt;color:#d1d5db;line-height:2.0;margin-bottom:18px;">
        ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
      </div>
      ${c.skills.length ? `<div style="font-size:8pt;font-weight:700;color:#F59E0B;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Skills</div><div style="margin-bottom:18px;">${c.skills.map((s, i) => `<div data-editable="skills.${i}" style="font-size:8.5pt;color:#d1d5db;margin-bottom:3px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.07);cursor:pointer;">${esc(s)}</div>`).join("")}</div>` : ""}
      ${c.education.length ? `<div style="font-size:8pt;font-weight:700;color:#F59E0B;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Education</div>${c.education.map((e, i) => `<div style="margin-bottom:10px;"><div style="font-weight:700;font-size:8.5pt;color:#f3f4f6;">${ed(`education.${i}.degree`, e.degree)}</div><div style="font-size:8pt;color:#9ca3af;">${ed(`education.${i}.school`, e.school)}</div><div style="font-size:7.5pt;color:#F59E0B;">${ed(`education.${i}.startDate`, e.startDate)}–${ed(`education.${i}.endDate`, e.endDate)}</div></div>`).join("")}` : ""}
    </div>`;
  const hdr = `<div style="padding-bottom:14px;border-bottom:3px solid #111827;margin-bottom:18px;"><div style="font-size:22pt;font-weight:800;color:#111827;">${ed("personalInfo.name", info.name)}</div>${info.summary ? `<div style="font-size:9pt;color:#4b5563;margin-top:8px;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;color:#F59E0B;letter-spacing:0.08em;text-transform:uppercase;border-bottom:2px solid #F59E0B;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:18px;">${sec(t)}${inner}</div>` : "";
  const right = `<div style="flex:1;background:#FAFAFA;padding:28px 22px;">${hdr}${[
    wrap("Experience", expItems(c.experience, "#111827", "#d97706", "#374151")),
    wrap("Projects", projItems(c.projects, "#111827", "#d97706")),
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;display:flex;">${left}${right}</div>`,
  );
}

// ─── Template 33: twocol-accent ──────────────────────────────────────────────

function tTwocolAccent(c: ResumeContent): string {
  const info = c.personalInfo;
  const left = `
    <div style="width:230px;min-width:230px;padding:28px 18px;background:#fff;">
      <div style="font-size:8pt;font-weight:700;color:#F97316;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Contact</div>
      <div style="font-size:8.5pt;color:#374151;line-height:1.9;margin-bottom:18px;">
        ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
      </div>
      ${c.skills.length ? `<div style="font-size:8pt;font-weight:700;color:#F97316;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Skills</div><div style="margin-bottom:18px;">${skillPills(c.skills, "#fff7ed", "#c2410c", "#fed7aa")}</div>` : ""}
      ${c.education.length ? `<div style="font-size:8pt;font-weight:700;color:#F97316;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Education</div>${eduItems(c.education, "#111827", "#F97316")}` : ""}
    </div>`;
  const divider = `<div style="width:4px;min-width:4px;background:#F97316;"></div>`;
  const hdr = `<div style="padding-bottom:14px;border-bottom:2px solid #F97316;margin-bottom:18px;"><div style="font-size:22pt;font-weight:800;color:#111827;">${ed("personalInfo.name", info.name)}</div>${info.summary ? `<div style="font-size:9pt;color:#374151;margin-top:6px;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9pt;font-weight:700;color:#F97316;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:18px;">${sec(t)}${inner}</div>` : "";
  const right = `<div style="flex:1;padding:28px 20px;">${hdr}${[
    wrap("Experience", expItems(c.experience, "#111827", "#F97316", "#374151")),
    wrap("Projects", projItems(c.projects, "#111827", "#F97316")),
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;display:flex;border:1px solid #f3f4f6;">${left}${divider}${right}</div>`,
  );
}

// ─── Template 34: academic-traditional ───────────────────────────────────────

function tAcademicTraditional(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="text-align:center;margin-bottom:20px;"><div style="font-size:20pt;font-weight:700;color:#111827;font-variant:small-caps;letter-spacing:0.08em;">${ed("personalInfo.name", info.name)}</div><div style="height:1px;background:#374151;margin:10px 40px;"></div><div style="font-size:8.5pt;color:#374151;">${contact(info, "  ·  ", "#374151")}</div></div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#111827;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1.5px solid #374151;padding-bottom:2px;margin-bottom:10px;margin-top:18px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner
      ? `<div>${sec(t)}<div style="padding-left:12px;">${inner}</div></div>`
      : "";
  const exp = c.experience
    .map(
      (e, i) =>
        `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;"><div><span style="font-weight:700;font-style:italic;font-size:9.5pt;">${ed(`experience.${i}.title`, e.title)}</span>, <span style="font-size:9.5pt;">${ed(`experience.${i}.company`, e.company)}</span></div><span style="font-size:9pt;">${ed(`experience.${i}.startDate`, e.startDate)}–${ed(`experience.${i}.endDate`, e.endDate)}</span></div>${e.description ? `<div style="font-size:9pt;color:#374151;margin-top:3px;">${ed(`experience.${i}.description`, e.description)}</div>` : ""}</div>`,
    )
    .join("");
  const b = [
    info.summary
      ? `<div style="font-size:9pt;color:#374151;font-style:italic;line-height:1.65;margin-bottom:14px;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Education", eduItems(c.education, "#111827", "#374151")),
    wrap("Experience", exp),
    wrap("Research & Projects", projItems(c.projects, "#111827", "#374151")),
    wrap(
      "Skills",
      `<div style="font-size:9pt;color:#374151;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join(", ")}</div>`,
    ),
  ].join("");
  return html(
    "",
    page(hdr + b, "44px 52px"),
    "body{font-family:'Times New Roman',Times,serif;}",
  );
}

// ─── Template 35: academic-research ──────────────────────────────────────────

function tAcademicResearch(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="border-top:3px solid #0D9488;padding-top:16px;margin-bottom:20px;"><div style="font-size:22pt;font-weight:700;color:#111827;">${ed("personalInfo.name", info.name)}</div><div style="margin-top:5px;font-size:8.5pt;color:#6b7280;">${contact(info, " · ", "#6b7280")}</div>${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:#374151;line-height:1.65;">${ed("personalInfo.summary", info.summary)}</div>` : ""}</div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#0D9488;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;padding-bottom:3px;border-bottom:1.5px solid #0D9488;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Education", eduItems(c.education, "#111827", "#0D9488")),
    wrap(
      "Research Experience",
      expItems(c.experience, "#111827", "#0D9488", "#374151"),
    ),
    wrap(
      "Publications & Projects",
      projItems(c.projects, "#111827", "#0D9488"),
    ),
    wrap(
      "Technical Skills",
      `<div style="font-size:9pt;color:#374151;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join(", ")}</div>`,
    ),
  ].join("");
  return html(
    "",
    page(hdr + b, "44px 52px"),
    "body{font-family:'Georgia',serif;}",
  );
}

// ─── Template 36: academic-cv ────────────────────────────────────────────────

function tAcademicCv(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="text-align:center;margin-bottom:22px;padding-bottom:14px;border-bottom:2px solid #1E3A8A;"><div style="font-size:22pt;font-weight:700;color:#1E3A8A;">${ed("personalInfo.name", info.name)}</div><div style="margin-top:6px;font-size:8.5pt;color:#4b5563;">${contact(info, " | ", "#4b5563")}</div></div>`;
  const sec = (t: string) =>
    `<div style="font-size:9.5pt;font-weight:700;color:#1E3A8A;letter-spacing:0.08em;text-transform:uppercase;border-bottom:1px solid #1E3A8A;padding-bottom:3px;margin-bottom:10px;">${t}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    info.summary
      ? `<div style="font-size:9pt;color:#374151;line-height:1.65;margin-bottom:18px;font-style:italic;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Education", eduItems(c.education, "#1E3A8A", "#1E3A8A")),
    wrap(
      "Research & Academic Experience",
      expItems(c.experience, "#1E3A8A", "#1E3A8A", "#374151"),
    ),
    wrap(
      "Publications & Projects",
      projItems(c.projects, "#1E3A8A", "#1E3A8A"),
    ),
    wrap(
      "Awards & Skills",
      `<div style="font-size:9pt;color:#374151;">${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="cursor:pointer;">${esc(s)}</span>`).join(" · ")}</div>`,
    ),
  ].join("");
  return html(
    "",
    page(hdr + b, "44px 52px"),
    "body{font-family:'Times New Roman',serif;}",
  );
}

// ─── Template 37: exec-premium ───────────────────────────────────────────────

function tExecPremium(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `
    <div style="background:#FEF3C7;padding:28px 52px;margin:-40px -52px 28px;">
      <div style="font-size:28pt;font-weight:800;color:#78350f;letter-spacing:-0.5px;">${ed("personalInfo.name", info.name)}</div>
      <div style="margin-top:8px;display:flex;gap:16px;flex-wrap:wrap;">
        ${info.email ? `<span style="font-size:8.5pt;color:#92400e;">${ed("personalInfo.email", info.email)}</span>` : ""}
        ${info.phone ? `<span style="font-size:8.5pt;color:#92400e;">${ed("personalInfo.phone", info.phone)}</span>` : ""}
        ${info.location ? `<span style="font-size:8.5pt;color:#92400e;">${ed("personalInfo.location", info.location)}</span>` : ""}
      </div>
    </div>${info.summary ? `<div style="font-size:9.5pt;color:#4b5563;line-height:1.7;margin-bottom:22px;font-style:italic;border-left:4px solid #D97706;padding-left:16px;">${ed("personalInfo.summary", info.summary)}</div>` : ""}`;
  const sec = (t: string) =>
    `<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;"><div style="font-size:9.5pt;font-weight:800;color:#78350f;letter-spacing:0.06em;text-transform:uppercase;">${t}</div><div style="flex:1;height:1.5px;background:linear-gradient(to right,#D97706,transparent);"></div></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:22px;">${sec(t)}${inner}</div>` : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#78350f", "#D97706", "#374151")),
    wrap("Education", eduItems(c.education, "#78350f", "#D97706")),
    wrap("Projects", projItems(c.projects, "#78350f", "#D97706")),
    wrap("Skills", skillPills(c.skills, "#fffbeb", "#92400e", "#fde68a")),
  ].join("");
  return html(
    "",
    page(hdr + b, "40px 52px"),
    "body{font-family:'Georgia',serif;}",
  );
}

// ─── Template 38: exec-leadership ────────────────────────────────────────────

function tExecLeadership(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#374151;padding:28px 50px;margin:-40px -50px 26px;"><div style="font-size:26pt;font-weight:800;color:#fff;">${ed("personalInfo.name", info.name)}</div><div style="font-size:9pt;color:#9ca3af;margin-top:5px;">${contact(info, " · ", "#9ca3af")}</div></div>`;
  const sec = (t: string) =>
    `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><div style="width:4px;height:16px;background:#059669;"></div><div style="font-size:9.5pt;font-weight:700;color:#374151;letter-spacing:0.06em;text-transform:uppercase;">${t}</div></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const b = [
    info.summary
      ? `<div style="font-size:9.5pt;color:#374151;line-height:1.65;margin-bottom:20px;padding:12px 16px;background:#f9fafb;border-left:4px solid #059669;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", expItems(c.experience, "#111827", "#059669", "#374151")),
    wrap("Education", eduItems(c.education, "#111827", "#059669")),
    wrap("Projects", projItems(c.projects, "#111827", "#059669")),
    wrap("Skills", skillPills(c.skills, "#f0fdf4", "#166534", "#bbf7d0")),
  ].join("");
  return html("", page(hdr + b));
}

// ─── Template 39: startup-modern ─────────────────────────────────────────────

function tStartupModern(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `
    <div style="padding-bottom:16px;border-bottom:2px solid #e5e7eb;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <div>
          <div style="font-size:26pt;font-weight:900;color:#111827;letter-spacing:-0.5px;">${ed("personalInfo.name", info.name)}</div>
        </div>
        <div style="text-align:right;font-size:8.5pt;color:#6b7280;line-height:1.9;">
          ${info.email ? `<div>${ed("personalInfo.email", info.email)}</div>` : ""}${info.phone ? `<div>${ed("personalInfo.phone", info.phone)}</div>` : ""}${info.location ? `<div>${ed("personalInfo.location", info.location)}</div>` : ""}
        </div>
      </div>
      ${info.summary ? `<div style="margin-top:10px;font-size:9pt;color:#374151;line-height:1.6;">${ed("personalInfo.summary", info.summary)}</div>` : ""}
    </div>`;
  const sec = (t: string) =>
    `<div style="font-size:8.5pt;color:#16A34A;font-family:monospace;margin-bottom:8px;"><span style="color:#6b7280;">// </span><span style="font-weight:700;letter-spacing:0.05em;">${t.toUpperCase()}</span></div><div style="height:1px;background:#e5e7eb;margin-bottom:10px;"></div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const skillLine = c.skills.length
    ? `<div style="margin-bottom:20px;"><div style="font-size:8.5pt;color:#16A34A;font-family:monospace;margin-bottom:8px;"><span style="color:#6b7280;">// </span><span style="font-weight:700;">SKILLS</span></div><div style="height:1px;background:#e5e7eb;margin-bottom:10px;"></div>${skillPills(c.skills, "#eff6ff", "#1d4ed8", "#bfdbfe")}</div>`
    : "";
  const b = [
    wrap("Experience", expItems(c.experience, "#111827", "#2563EB", "#374151")),
    wrap("Projects", projItems(c.projects, "#111827", "#2563EB")),
    wrap("Education", eduItems(c.education, "#111827", "#2563EB")),
    skillLine,
  ].join("");
  return html(
    "",
    page(hdr + b),
    "body{font-family:'Segoe UI',system-ui,sans-serif;}",
  );
}

// ─── Template 40: startup-tech ───────────────────────────────────────────────

function tStartupTech(c: ResumeContent): string {
  const info = c.personalInfo;
  const hdr = `<div style="background:#000;padding:28px 50px;margin:-40px -50px 0;border-bottom:1px solid #1f2937;"><div style="font-size:13pt;font-family:monospace;color:#22C55E;margin-bottom:4px;">$ whoami</div><div style="font-size:26pt;font-weight:900;color:#f9fafb;letter-spacing:-0.5px;">${ed("personalInfo.name", info.name)}<span style="color:#22C55E;font-weight:400;font-size:20pt;"> _</span></div><div style="font-size:8.5pt;color:#6b7280;margin-top:5px;font-family:monospace;">${contact(info, "  |  ", "#6b7280")}</div></div>`;
  const sec = (t: string) =>
    `<div style="color:#22C55E;font-size:9pt;font-weight:700;font-family:monospace;margin-bottom:8px;padding:2px 0;border-bottom:1px solid #374151;"># ${t.toLowerCase()}</div>`;
  const wrap = (t: string, inner: string) =>
    inner ? `<div style="margin-bottom:20px;">${sec(t)}${inner}</div>` : "";
  const exp = c.experience
    .map(
      (e, i) =>
        `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:9.5pt;color:#f3f4f6;">${ed(`experience.${i}.title`, e.title)}</span><span style="font-size:8.5pt;color:#22C55E;font-family:monospace;">${ed(`experience.${i}.startDate`, e.startDate)}–${ed(`experience.${i}.endDate`, e.endDate)}</span></div><div style="font-size:9pt;color:#9ca3af;">${ed(`experience.${i}.company`, e.company)}</div>${e.description ? `<div style="font-size:9pt;color:#d1d5db;line-height:1.55;margin-top:3px;">${ed(`experience.${i}.description`, e.description)}</div>` : ""}</div>`,
    )
    .join("");
  const edu = c.education
    .map(
      (e, i) =>
        `<div style="margin-bottom:9px;"><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;font-size:9.5pt;color:#f3f4f6;">${ed(`education.${i}.degree`, e.degree)}</span><span style="font-size:8.5pt;color:#22C55E;font-family:monospace;">${ed(`education.${i}.startDate`, e.startDate)}–${ed(`education.${i}.endDate`, e.endDate)}</span></div><div style="font-size:9pt;color:#9ca3af;">${ed(`education.${i}.school`, e.school)}</div></div>`,
    )
    .join("");
  const projs = c.projects
    .map(
      (p, i) =>
        `<div style="margin-bottom:9px;"><span style="font-weight:700;font-size:9.5pt;color:#22C55E;">${ed(`projects.${i}.title`, p.title)}</span>${p.link ? `<span style="font-size:8pt;color:#6b7280;margin-left:8px;font-family:monospace;">${ed(`projects.${i}.link`, p.link)}</span>` : ""}${p.description ? `<div style="font-size:9pt;color:#d1d5db;margin-top:2px;">${ed(`projects.${i}.description`, p.description)}</div>` : ""}</div>`,
    )
    .join("");
  const skillsRow = c.skills.length
    ? `<div style="margin-bottom:20px;">${sec("Skills")}<div>${c.skills.map((s, i) => `<span data-editable="skills.${i}" style="background:#1f2937;color:#22C55E;font-family:monospace;font-size:8pt;padding:2px 8px;border:1px solid #374151;border-radius:2px;display:inline-block;margin:2px 3px 2px 0;cursor:pointer;">${esc(s)}</span>`).join("")}</div></div>`
    : "";
  const body = `<div style="padding:24px 50px;background:#111827;">${[
    info.summary
      ? `<div style="margin-bottom:18px;font-size:9pt;color:#9ca3af;line-height:1.6;font-family:monospace;padding:10px;background:#000;border-left:3px solid #22C55E;">${ed("personalInfo.summary", info.summary)}</div>`
      : "",
    wrap("Experience", exp),
    wrap("Projects", projs),
    wrap("Education", edu),
    skillsRow,
  ].join("")}</div>`;
  return html(
    "",
    `<div style="width:794px;min-height:1123px;">${hdr}${body}</div>`,
    "body{font-family:'Segoe UI',system-ui,sans-serif;background:#111827;}",
  );
}

// ─── Template map & exports ──────────────────────────────────────────────────

const templateMap: Record<string, (content: ResumeContent) => string> = {
  "modern-clean": tModernClean,
  "modern-dark": tModernDark,
  "modern-navy": tModernNavy,
  "modern-teal": tModernTeal,
  "modern-slate": tModernSlate,
  "modern-gradient": tModernGradient,
  "modern-bold": tModernBold,
  "modern-compact": tModernCompact,
  "pro-classic": tProClassic,
  "pro-executive": tProExecutive,
  "pro-corporate": tProCorporate,
  "pro-formal": tProFormal,
  "pro-elegant": tProElegant,
  "pro-refined": tProRefined,
  "pro-polished": tProPolished,
  "pro-distinguished": tProDistinguished,
  "creative-color": tCreativeColor,
  "creative-vibrant": tCreativeVibrant,
  "creative-bold": tCreativeBold,
  "creative-designer": tCreativeDesigner,
  "creative-artistic": tCreativeArtistic,
  "creative-dynamic": tCreativeDynamic,
  "minimal-pure": tMinimalPure,
  "minimal-clean": tMinimalClean,
  "minimal-zen": tMinimalZen,
  "minimal-swiss": tMinimalSwiss,
  "minimal-nordic": tMinimalNordic,
  "minimal-simple": tMinimalSimple,
  "twocol-modern": tTwocolModern,
  "twocol-classic": tTwocolClassic,
  "twocol-skills": tTwocolSkills,
  "twocol-sidebar": tTwocolSidebar,
  "twocol-accent": tTwocolAccent,
  "academic-traditional": tAcademicTraditional,
  "academic-research": tAcademicResearch,
  "academic-cv": tAcademicCv,
  "exec-premium": tExecPremium,
  "exec-leadership": tExecLeadership,
  "startup-modern": tStartupModern,
  "startup-tech": tStartupTech,
};

export const TEMPLATE_IDS = Object.keys(templateMap);

export function renderTemplate(
  templateId: string,
  content: ResumeContent,
): string {
  const renderer = templateMap[templateId] ?? tModernClean;
  return renderer(content);
}
