const baseStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Georgia', serif; font-size: 10pt; line-height: 1.5; color: #1a1a1a; }
  .page { width: 794px; min-height: 1123px; padding: 48px 56px; background: #fff; }
  h1 { font-size: 24pt; font-weight: 700; }
  h2 { font-size: 11pt; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  h3 { font-size: 10.5pt; font-weight: 600; }
  p, li { font-size: 9.5pt; line-height: 1.6; }
  ul { padding-left: 16px; }
  .section { margin-bottom: 22px; }
  .divider { border: none; border-top: 1px solid #e5e5e5; margin: 8px 0 12px; }
  .row { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .date { font-size: 9pt; color: #666; white-space: nowrap; }
  .contact-row { display: flex; gap: 16px; font-size: 9pt; color: #555; flex-wrap: wrap; }
  .skills-grid { display: flex; flex-wrap: wrap; gap: 6px; }
  .skill-tag { background: #f3f4f6; padding: 2px 8px; border-radius: 3px; font-size: 8.5pt; }
`;
function renderPersonalInfo(info, style = "left") {
  if (style === "centered") {
    return `
      <div class="section" style="text-align:center;">
        <h1>${info.name}</h1>
        <div class="contact-row" style="justify-content:center; margin-top:6px;">
          ${info.email ? `<span>${info.email}</span>` : ""}
          ${info.phone ? `<span>${info.phone}</span>` : ""}
          ${info.location ? `<span>${info.location}</span>` : ""}
        </div>
        ${info.summary ? `<p style="margin-top:10px; font-style:italic; color:#555;">${info.summary}</p>` : ""}
      </div>`;
  }
  if (style === "split") {
    return `
      <div class="section row">
        <h1 style="flex:1;">${info.name}</h1>
        <div style="text-align:right; font-size:9pt; color:#555; line-height:1.8;">
          ${info.email ? `<div>${info.email}</div>` : ""}
          ${info.phone ? `<div>${info.phone}</div>` : ""}
          ${info.location ? `<div>${info.location}</div>` : ""}
        </div>
      </div>
      ${info.summary ? `<div class="section"><p>${info.summary}</p></div>` : ""}`;
  }
  return `
    <div class="section">
      <h1>${info.name}</h1>
      <div class="contact-row" style="margin-top:4px;">
        ${info.email ? `<span>${info.email}</span>` : ""}
        ${info.phone ? `<span>${info.phone}</span>` : ""}
        ${info.location ? `<span>${info.location}</span>` : ""}
      </div>
      ${info.summary ? `<p style="margin-top:8px; color:#444;">${info.summary}</p>` : ""}
    </div>`;
}
function renderExperience(experience) {
  if (!experience.length) return "";
  const items = experience.map(
    (e) => `
    <div style="margin-bottom:12px;">
      <div class="row">
        <h3>${e.title} <span style="font-weight:400; color:#555;">— ${e.company}</span></h3>
        <span class="date">${e.startDate}${e.endDate ? ` – ${e.endDate}` : ""}</span>
      </div>
      ${e.description ? `<p style="margin-top:4px;">${e.description}</p>` : ""}
    </div>`
  ).join("");
  return `<div class="section"><h2>Experience</h2><hr class="divider"/>${items}</div>`;
}
function renderEducation(education) {
  if (!education.length) return "";
  const items = education.map(
    (e) => `
    <div style="margin-bottom:10px;">
      <div class="row">
        <h3>${e.degree} <span style="font-weight:400; color:#555;">— ${e.school}</span></h3>
        <span class="date">${e.startDate}${e.endDate ? ` – ${e.endDate}` : ""}</span>
      </div>
      ${e.description ? `<p style="margin-top:3px;">${e.description}</p>` : ""}
    </div>`
  ).join("");
  return `<div class="section"><h2>Education</h2><hr class="divider"/>${items}</div>`;
}
function renderSkills(skills) {
  if (!skills.length) return "";
  return `<div class="section"><h2>Skills</h2><hr class="divider"/><div class="skills-grid">${skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}</div></div>`;
}
function renderProjects(projects) {
  if (!projects.length) return "";
  const items = projects.map(
    (p) => `
    <div style="margin-bottom:10px;">
      <h3>${p.title}${p.link ? ` <a href="${p.link}" style="font-size:8.5pt; font-weight:400; color:#4b6bfb;">${p.link}</a>` : ""}</h3>
      ${p.description ? `<p style="margin-top:3px;">${p.description}</p>` : ""}
    </div>`
  ).join("");
  return `<div class="section"><h2>Projects</h2><hr class="divider"/>${items}</div>`;
}
function templateModernClean(content) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    ${baseStyles}
    h1 { color: #1a1a2e; }
    h2 { color: #4b6bfb; border-bottom: 2px solid #4b6bfb; padding-bottom: 4px; }
  </style></head><body><div class="page">
    ${renderPersonalInfo(content.personalInfo, "split")}
    ${renderExperience(content.experience)}
    ${renderEducation(content.education)}
    ${renderSkills(content.skills)}
    ${renderProjects(content.projects)}
  </div></body></html>`;
}
function templateProfessionalExec(content) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    ${baseStyles}
    .page { padding: 48px 56px; }
    h1 { font-size: 22pt; color: #111827; letter-spacing: -0.02em; }
    h2 { color: #374151; font-size: 10pt; }
    .header-line { border-top: 3px solid #111827; margin: 10px 0; }
  </style></head><body><div class="page">
    ${renderPersonalInfo(content.personalInfo, "left")}
    <div class="header-line"></div>
    ${renderExperience(content.experience)}
    ${renderEducation(content.education)}
    ${renderSkills(content.skills)}
    ${renderProjects(content.projects)}
  </div></body></html>`;
}
function templateCreativeBold(content) {
  const info = content.personalInfo;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    ${baseStyles}
    body { font-family: 'Arial', sans-serif; }
    .hero { background: #1a1a2e; color: white; padding: 28px 56px; margin: -48px -56px 32px; }
    .hero h1 { color: white; font-size: 28pt; }
    .hero .contact-row { color: rgba(255,255,255,0.75); }
    .hero p { color: rgba(255,255,255,0.85); margin-top: 8px; }
    h2 { color: #4b6bfb; font-size: 10pt; }
    .skill-tag { background: #ede9fe; color: #4c1d95; }
  </style></head><body><div class="page">
    <div class="hero">
      <h1>${info.name}</h1>
      <div class="contact-row" style="margin-top:6px;">
        ${info.email ? `<span>${info.email}</span>` : ""}
        ${info.phone ? `<span>${info.phone}</span>` : ""}
        ${info.location ? `<span>${info.location}</span>` : ""}
      </div>
      ${info.summary ? `<p style="margin-top:10px;">${info.summary}</p>` : ""}
    </div>
    ${renderExperience(content.experience)}
    ${renderEducation(content.education)}
    ${renderSkills(content.skills)}
    ${renderProjects(content.projects)}
  </div></body></html>`;
}
function templateMinimalZen(content) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    ${baseStyles}
    body { font-family: 'Helvetica Neue', sans-serif; color: #333; }
    h1 { font-size: 20pt; font-weight: 300; letter-spacing: 0.05em; }
    h2 { font-weight: 400; color: #999; font-size: 8.5pt; letter-spacing: 0.15em; }
    h3 { font-weight: 500; }
    .divider { border-color: #eee; }
    .skill-tag { background: none; border: 1px solid #ddd; color: #555; }
    .contact-row { color: #999; }
  </style></head><body><div class="page">
    ${renderPersonalInfo(content.personalInfo, "centered")}
    ${renderExperience(content.experience)}
    ${renderEducation(content.education)}
    ${renderSkills(content.skills)}
    ${renderProjects(content.projects)}
  </div></body></html>`;
}
function templateTwoColumn(content) {
  const info = content.personalInfo;
  const sidebar = `
    <div style="width:220px; min-width:220px; background:#f8fafc; padding:24px 20px; border-radius:4px;">
      <h1 style="font-size:16pt; margin-bottom:12px;">${info.name}</h1>
      <div style="font-size:8.5pt; color:#555; line-height:2;">
        ${info.email ? `<div>📧 ${info.email}</div>` : ""}
        ${info.phone ? `<div>📞 ${info.phone}</div>` : ""}
        ${info.location ? `<div>📍 ${info.location}</div>` : ""}
      </div>
      ${info.summary ? `<p style="font-size:8.5pt; margin-top:12px; color:#555; line-height:1.6;">${info.summary}</p>` : ""}
      ${content.skills.length ? `<div style="margin-top:16px;"><h2 style="font-size:9pt; margin-bottom:8px;">SKILLS</h2><div class="skills-grid">${content.skills.map((s) => `<span class="skill-tag" style="background:#e2e8f0; font-size:8pt;">${s}</span>`).join("")}</div></div>` : ""}
    </div>`;
  const main = `
    <div style="flex:1; padding-left:24px;">
      ${renderExperience(content.experience)}
      ${renderEducation(content.education)}
      ${renderProjects(content.projects)}
    </div>`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    ${baseStyles}
    h2 { color: #2563eb; }
  </style></head><body><div class="page" style="display:flex; gap:0; padding:40px;">
    ${sidebar}${main}
  </div></body></html>`;
}
function templateAcademic(content) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    ${baseStyles}
    body { font-family: 'Times New Roman', Times, serif; }
    h1 { font-size: 20pt; text-align: center; }
    .contact-row { justify-content: center; }
    h2 { font-size: 10.5pt; text-align: center; text-transform: uppercase; letter-spacing: 0.1em; }
    .divider { border-color: #000; }
    h3 { font-style: italic; font-weight: normal; }
  </style></head><body><div class="page">
    ${renderPersonalInfo(content.personalInfo, "centered")}
    ${renderExperience(content.experience)}
    ${renderEducation(content.education)}
    ${renderSkills(content.skills)}
    ${renderProjects(content.projects)}
  </div></body></html>`;
}
function templateStartupModern(content) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    ${baseStyles}
    body { font-family: 'Inter', 'Segoe UI', sans-serif; }
    h1 { font-size: 26pt; font-weight: 800; color: #0f172a; }
    h2 { color: #0ea5e9; font-size: 9pt; margin-bottom: 6px; }
    .divider { border-color: #e2e8f0; }
    h3 { color: #0f172a; }
    .skill-tag { background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }
    .date { color: #0ea5e9; font-weight: 500; }
  </style></head><body><div class="page">
    ${renderPersonalInfo(content.personalInfo, "split")}
    ${renderExperience(content.experience)}
    ${renderProjects(content.projects)}
    ${renderEducation(content.education)}
    ${renderSkills(content.skills)}
  </div></body></html>`;
}
function templateElegantDark(content) {
  const info = content.personalInfo;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    ${baseStyles}
    body { background: #fff; }
    .header { background: #1e293b; color: white; padding: 32px 56px; margin: -48px -56px 28px; }
    .header h1 { color: white; font-size: 24pt; letter-spacing: -0.02em; }
    .header .contact-row { color: #94a3b8; margin-top: 6px; }
    .header p { color: #cbd5e1; margin-top: 8px; font-size: 9pt; }
    h2 { color: #475569; }
    h3 { color: #1e293b; }
    .skill-tag { background: #f1f5f9; color: #334155; }
    .date { color: #64748b; }
  </style></head><body><div class="page">
    <div class="header">
      <h1>${info.name}</h1>
      <div class="contact-row">
        ${info.email ? `<span>${info.email}</span>` : ""}
        ${info.phone ? `<span>${info.phone}</span>` : ""}
        ${info.location ? `<span>${info.location}</span>` : ""}
      </div>
      ${info.summary ? `<p>${info.summary}</p>` : ""}
    </div>
    ${renderExperience(content.experience)}
    ${renderEducation(content.education)}
    ${renderSkills(content.skills)}
    ${renderProjects(content.projects)}
  </div></body></html>`;
}
const templateMap = {
  "modern-clean": templateModernClean,
  "professional-exec": templateProfessionalExec,
  "creative-bold": templateCreativeBold,
  "minimal-zen": templateMinimalZen,
  "two-column": templateTwoColumn,
  academic: templateAcademic,
  "startup-modern": templateStartupModern,
  "elegant-dark": templateElegantDark
};
function renderTemplate(templateId, content) {
  const renderer = templateMap[templateId] ?? templateModernClean;
  return renderer(content);
}
const TEMPLATE_IDS = Object.keys(templateMap);
export {
  TEMPLATE_IDS as T,
  renderTemplate as r
};
