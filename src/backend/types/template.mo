import Common "common";

module {
  public type TemplateCategory = {
    #Modern;
    #Professional;
    #Creative;
    #Minimal;
    #TwoColumn;
    #Academic;
    #Executive;
    #StartupTech;
  };

  public type Template = {
    id : Common.TemplateId;
    name : Text;
    category : TemplateCategory;
    description : Text;
  };
};
