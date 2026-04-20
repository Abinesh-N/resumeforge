import Common "common";

module {
  public type EducationEntry = {
    degree : Text;
    school : Text;
    startDate : Text;
    endDate : Text;
    description : Text;
  };

  public type ExperienceEntry = {
    title : Text;
    company : Text;
    startDate : Text;
    endDate : Text;
    description : Text;
  };

  public type ProjectEntry = {
    title : Text;
    description : Text;
    link : Text;
  };

  public type PersonalInfo = {
    name : Text;
    email : Text;
    phone : Text;
    location : Text;
    summary : Text;
  };

  public type ResumeContent = {
    personalInfo : PersonalInfo;
    education : [EducationEntry];
    experience : [ExperienceEntry];
    skills : [Text];
    projects : [ProjectEntry];
  };

  public type Resume = {
    id : Common.ResumeId;
    ownerId : Common.UserId;
    templateId : Common.TemplateId;
    var title : Text;
    var content : ResumeContent;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
    var downloadUnlocked : Bool;
  };

  // Shared (API boundary) — no var fields
  public type ResumeView = {
    id : Common.ResumeId;
    ownerId : Common.UserId;
    templateId : Common.TemplateId;
    title : Text;
    content : ResumeContent;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    downloadUnlocked : Bool;
  };

  public type CreateResumeInput = {
    templateId : Common.TemplateId;
    title : Text;
    content : ResumeContent;
  };

  public type UpdateResumeInput = {
    id : Common.ResumeId;
    templateId : Common.TemplateId;
    title : Text;
    content : ResumeContent;
  };
};
