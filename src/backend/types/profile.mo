import Common "common";

module {
  public type Profile = {
    principalId : Common.UserId;
    var email : ?Text;
    var name : ?Text;
    createdAt : Common.Timestamp;
  };

  // Shared (API boundary) — no var fields
  public type ProfileView = {
    principalId : Common.UserId;
    email : ?Text;
    name : ?Text;
    createdAt : Common.Timestamp;
  };
};
