import Types "../types/resume";
import Common "../types/common";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

module {
  public func createResume(
    resumes : Map.Map<Common.ResumeId, Types.Resume>,
    nextId : { var value : Nat },
    ownerId : Common.UserId,
    input : Types.CreateResumeInput,
    now : Common.Timestamp,
  ) : Types.ResumeView {
    nextId.value += 1;
    let id = "resume-" # nextId.value.toText();
    let resume : Types.Resume = {
      id;
      ownerId;
      templateId = input.templateId;
      var title = input.title;
      var content = input.content;
      createdAt = now;
      var updatedAt = now;
      var downloadUnlocked = false;
    };
    resumes.add(id, resume);
    toView(resume);
  };

  public func getResume(
    resumes : Map.Map<Common.ResumeId, Types.Resume>,
    callerId : Common.UserId,
    resumeId : Common.ResumeId,
  ) : ?Types.ResumeView {
    switch (resumes.get(resumeId)) {
      case (?r) {
        if (r.ownerId == callerId) { ?toView(r) } else { null };
      };
      case null { null };
    };
  };

  public func getMyResumes(
    resumes : Map.Map<Common.ResumeId, Types.Resume>,
    ownerId : Common.UserId,
  ) : [Types.ResumeView] {
    resumes.values()
      .filter(func(r : Types.Resume) : Bool { r.ownerId == ownerId })
      .map(func(r : Types.Resume) : Types.ResumeView { toView(r) })
      .toArray();
  };

  public func updateResume(
    resumes : Map.Map<Common.ResumeId, Types.Resume>,
    callerId : Common.UserId,
    input : Types.UpdateResumeInput,
    now : Common.Timestamp,
  ) : Types.ResumeView {
    switch (resumes.get(input.id)) {
      case null { Runtime.trap("Resume not found") };
      case (?r) {
        if (r.ownerId != callerId) { Runtime.trap("Unauthorized: not your resume") };
        let updated : Types.Resume = {
          id = r.id;
          ownerId = r.ownerId;
          templateId = input.templateId;
          var title = input.title;
          var content = input.content;
          createdAt = r.createdAt;
          var updatedAt = now;
          var downloadUnlocked = r.downloadUnlocked;
        };
        resumes.add(input.id, updated);
        toView(updated);
      };
    };
  };

  public func deleteResume(
    resumes : Map.Map<Common.ResumeId, Types.Resume>,
    callerId : Common.UserId,
    resumeId : Common.ResumeId,
  ) : Bool {
    switch (resumes.get(resumeId)) {
      case null { false };
      case (?r) {
        if (r.ownerId != callerId) { Runtime.trap("Unauthorized: not your resume") };
        resumes.remove(resumeId);
        true;
      };
    };
  };

  public func unlockDownload(
    resumes : Map.Map<Common.ResumeId, Types.Resume>,
    resumeId : Common.ResumeId,
  ) : () {
    switch (resumes.get(resumeId)) {
      case null { Runtime.trap("Resume not found") };
      case (?r) { r.downloadUnlocked := true };
    };
  };

  public func toView(r : Types.Resume) : Types.ResumeView {
    {
      id = r.id;
      ownerId = r.ownerId;
      templateId = r.templateId;
      title = r.title;
      content = r.content;
      createdAt = r.createdAt;
      updatedAt = r.updatedAt;
      downloadUnlocked = r.downloadUnlocked;
    };
  };
};
