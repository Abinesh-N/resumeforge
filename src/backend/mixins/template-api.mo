import TemplateTypes "../types/template";
import Common "../types/common";
import TemplateLib "../lib/template";

mixin () {
  public query func getTemplates() : async [TemplateTypes.Template] {
    TemplateLib.getAllTemplates();
  };

  public query func getTemplate(templateId : Common.TemplateId) : async ?TemplateTypes.Template {
    TemplateLib.getTemplate(templateId);
  };
};
