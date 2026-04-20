import Types "../types/profile";
import Common "../types/common";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

module {
  public func getOrCreate(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    callerId : Common.UserId,
    now : Common.Timestamp,
  ) : Types.Profile {
    switch (profiles.get(callerId)) {
      case (?p) { p };
      case null {
        let profile : Types.Profile = {
          principalId = callerId;
          var email = null;
          var name = null;
          createdAt = now;
        };
        profiles.add(callerId, profile);
        profile;
      };
    };
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    callerId : Common.UserId,
  ) : ?Types.ProfileView {
    switch (profiles.get(callerId)) {
      case (?p) { ?toView(p) };
      case null { null };
    };
  };

  public func updateProfile(
    profiles : Map.Map<Common.UserId, Types.Profile>,
    callerId : Common.UserId,
    email : ?Text,
    name : ?Text,
    now : Common.Timestamp,
  ) : Types.ProfileView {
    let profile = getOrCreate(profiles, callerId, now);
    switch (email) {
      case (?e) { profile.email := ?e };
      case null {};
    };
    switch (name) {
      case (?n) { profile.name := ?n };
      case null {};
    };
    toView(profile);
  };

  public func toView(p : Types.Profile) : Types.ProfileView {
    {
      principalId = p.principalId;
      email = p.email;
      name = p.name;
      createdAt = p.createdAt;
    };
  };
};
