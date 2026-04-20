import Types "../types/template";
import Common "../types/common";

module {
  let templates : [Types.Template] = [
    // Modern (8)
    { id = "modern-clean";      name = "Modern Clean";            category = #Modern;       description = "A sleek, clean layout with modern typography and subtle accents." },
    { id = "modern-dark";       name = "Modern Dark";             category = #Modern;       description = "A striking dark-themed design with bold contrast for a standout resume." },
    { id = "modern-navy";       name = "Modern Navy";             category = #Modern;       description = "A professional navy-accented layout that exudes confidence and style." },
    { id = "modern-teal";       name = "Modern Teal";             category = #Modern;       description = "A fresh teal-accented modern design with clean section dividers." },
    { id = "modern-slate";      name = "Modern Slate";            category = #Modern;       description = "A sophisticated slate-grey palette with a sharp, contemporary feel." },
    { id = "modern-gradient";   name = "Modern Gradient";         category = #Modern;       description = "A dynamic gradient header design that draws immediate attention." },
    { id = "modern-bold";       name = "Modern Bold";             category = #Modern;       description = "A bold, eye-catching design with strong headers and contrasting colours." },
    { id = "modern-compact";    name = "Modern Compact";          category = #Modern;       description = "A space-efficient modern layout that packs more content on one page." },

    // Professional (8)
    { id = "pro-classic";       name = "Professional Classic";    category = #Professional; description = "A timeless, structured layout trusted by professionals worldwide." },
    { id = "pro-executive";     name = "Executive Pro";           category = #Professional; description = "An authoritative design for senior-level and executive candidates." },
    { id = "pro-corporate";     name = "Corporate Professional";  category = #Professional; description = "A polished corporate look ideal for finance, law, and consulting roles." },
    { id = "pro-formal";        name = "Formal Professional";     category = #Professional; description = "A strictly formal layout appropriate for government and traditional sectors." },
    { id = "pro-elegant";       name = "Elegant Professional";    category = #Professional; description = "An elegant serif-driven design conveying prestige and refinement." },
    { id = "pro-refined";       name = "Refined Professional";    category = #Professional; description = "A refined layout with tasteful spacing and well-structured sections." },
    { id = "pro-polished";      name = "Polished Pro";            category = #Professional; description = "A highly polished professional template with crisp typography." },
    { id = "pro-distinguished"; name = "Distinguished Pro";       category = #Professional; description = "A distinguished layout with understated luxury for top-tier professionals." },

    // Creative (6)
    { id = "creative-color";    name = "Creative Color";          category = #Creative;     description = "A vibrant, colourful design that showcases personality and creativity." },
    { id = "creative-vibrant";  name = "Vibrant Creative";        category = #Creative;     description = "Bold colour blocks and expressive typography for creative roles." },
    { id = "creative-bold";     name = "Bold Creative";           category = #Creative;     description = "Daring layouts and oversized type for those who make a statement." },
    { id = "creative-designer"; name = "Designer Portfolio";      category = #Creative;     description = "A portfolio-inspired layout perfect for UX/UI and graphic designers." },
    { id = "creative-artistic"; name = "Artistic Flair";          category = #Creative;     description = "An artistically crafted layout with unique decorative elements." },
    { id = "creative-dynamic";  name = "Dynamic Creative";        category = #Creative;     description = "A dynamic asymmetric design that breaks conventional resume molds." },

    // Minimal (6)
    { id = "minimal-pure";      name = "Minimal Pure";            category = #Minimal;      description = "A pure, distraction-free minimal design focused entirely on content." },
    { id = "minimal-clean";     name = "Clean Minimal";           category = #Minimal;      description = "Crisp whitespace and restrained typography for the minimalist." },
    { id = "minimal-zen";       name = "Zen Minimal";             category = #Minimal;      description = "A zen-inspired layout with generous breathing room between sections." },
    { id = "minimal-swiss";     name = "Swiss Minimal";           category = #Minimal;      description = "Swiss-grid precision with strict typographic hierarchy and no fuss." },
    { id = "minimal-nordic";    name = "Nordic Minimal";          category = #Minimal;      description = "A nordic-inspired clean design with a cool, understated aesthetic." },
    { id = "minimal-simple";    name = "Simple Clean";            category = #Minimal;      description = "The simplest possible layout — effective, readable, and timeless." },

    // Two-Column (5)
    { id = "twocol-modern";     name = "Two-Column Modern";       category = #TwoColumn;    description = "A modern two-column split with a prominent sidebar for skills." },
    { id = "twocol-classic";    name = "Two-Column Classic";      category = #TwoColumn;    description = "A classic two-column format balancing experience and skills sections." },
    { id = "twocol-skills";     name = "Skills-Focused";          category = #TwoColumn;    description = "A skills-forward layout with a dedicated sidebar for tech stacks." },
    { id = "twocol-sidebar";    name = "Dark Sidebar";            category = #TwoColumn;    description = "A high-contrast dark sidebar paired with a clean white content area." },
    { id = "twocol-accent";     name = "Accent Column";           category = #TwoColumn;    description = "A two-column design with a vivid accent strip for contact details." },

    // Academic (3)
    { id = "academic-traditional"; name = "Academic Traditional"; category = #Academic;     description = "A traditional academic CV format for universities and research roles." },
    { id = "academic-research";    name = "Research Scholar";     category = #Academic;     description = "A research-focused layout highlighting publications and projects." },
    { id = "academic-cv";          name = "Curriculum Vitae";     category = #Academic;     description = "A comprehensive CV layout for academic and scholarly applications." },

    // Executive (2)
    { id = "exec-premium";      name = "Executive Premium";       category = #Executive;    description = "A premium executive template conveying authority and leadership." },
    { id = "exec-leadership";   name = "Leadership Profile";      category = #Executive;    description = "A leadership-centred design spotlighting impact and achievements." },

    // Startup / Tech (2)
    { id = "startup-modern";    name = "Startup Modern";          category = #StartupTech;  description = "A modern startup-style template with a bold, forward-looking design." },
    { id = "startup-tech";      name = "Tech Professional";       category = #StartupTech;  description = "A tech-focused layout ideal for engineers, developers, and data roles." },
  ];

  public func getAllTemplates() : [Types.Template] {
    templates;
  };

  public func getTemplate(id : Common.TemplateId) : ?Types.Template {
    templates.find(func(t : Types.Template) : Bool { t.id == id });
  };
};
