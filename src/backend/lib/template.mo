import Types "../types/template";
import Common "../types/common";

module {
  let templates : [Types.Template] = [
    // Modern (2)
    { id = "modern-clean";   name = "Clean Modern";        category = #Modern;       description = "A sleek, clean layout with modern typography and subtle accents." },
    { id = "modern-bold";    name = "Bold Modern";         category = #Modern;       description = "A bold, eye-catching design with strong headers and contrasting colours." },
    // Professional (2)
    { id = "pro-classic";    name = "Classic Pro";         category = #Professional; description = "A timeless, structured layout trusted by professionals worldwide." },
    { id = "pro-executive";  name = "Executive";           category = #Professional; description = "An authoritative design for senior-level and executive candidates." },
    // Creative (2)
    { id = "creative-color"; name = "Colorful Creative";   category = #Creative;     description = "A vibrant, colourful design that showcases personality and creativity." },
    { id = "creative-art";   name = "Artistic";            category = #Creative;     description = "An artistically-crafted layout with unique visual elements." },
    // Minimal (2)
    { id = "minimal-pure";   name = "Pure Minimal";        category = #Minimal;      description = "A pure, distraction-free minimal design focused on content." },
    { id = "minimal-light";  name = "Light Minimal";       category = #Minimal;      description = "A light, airy minimal layout with generous whitespace." },
  ];

  public func getAllTemplates() : [Types.Template] {
    templates;
  };

  public func getTemplate(id : Common.TemplateId) : ?Types.Template {
    templates.find(func(t : Types.Template) : Bool { t.id == id });
  };
};
