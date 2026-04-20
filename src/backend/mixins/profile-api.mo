import ProfileTypes "../types/profile";
import Common "../types/common";
import ProfileLib "../lib/profile";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (profiles : Map.Map<Common.UserId, ProfileTypes.Profile>) {
  public shared ({ caller }) func getMyProfile() : async ?ProfileTypes.ProfileView {
    ProfileLib.getProfile(profiles, caller.toText());
  };

  public shared ({ caller }) func updateMyProfile(email : ?Text, name : ?Text) : async ProfileTypes.ProfileView {
    ProfileLib.updateProfile(profiles, caller.toText(), email, name, Time.now());
  };
};
