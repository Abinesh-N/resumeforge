import ResumeTypes "../types/resume";
import Common "../types/common";
import ResumeLib "../lib/resume";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  resumes : Map.Map<Common.ResumeId, ResumeTypes.Resume>,
  resumeCounter : { var value : Nat },
) {
  public shared ({ caller }) func createResume(input : ResumeTypes.CreateResumeInput) : async ResumeTypes.ResumeView {
    ResumeLib.createResume(resumes, resumeCounter, caller.toText(), input, Time.now());
  };

  public shared query ({ caller }) func getResume(resumeId : Common.ResumeId) : async ?ResumeTypes.ResumeView {
    ResumeLib.getResume(resumes, caller.toText(), resumeId);
  };

  public shared query ({ caller }) func getMyResumes() : async [ResumeTypes.ResumeView] {
    ResumeLib.getMyResumes(resumes, caller.toText());
  };

  public shared ({ caller }) func updateResume(input : ResumeTypes.UpdateResumeInput) : async ResumeTypes.ResumeView {
    ResumeLib.updateResume(resumes, caller.toText(), input, Time.now());
  };

  public shared ({ caller }) func deleteResume(resumeId : Common.ResumeId) : async Bool {
    ResumeLib.deleteResume(resumes, caller.toText(), resumeId);
  };
};
