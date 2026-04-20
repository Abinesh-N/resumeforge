import ProfileTypes "types/profile";
import ResumeTypes "types/resume";
import PaymentTypes "types/payment";
import Common "types/common";
import Map "mo:core/Map";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

import ProfileMixin "mixins/profile-api";
import ResumeMixin "mixins/resume-api";
import TemplateMixin "mixins/template-api";
import PaymentMixin "mixins/payment-api";

actor {
  // --- Stable state ---
  let profiles = Map.empty<Common.UserId, ProfileTypes.Profile>();
  let resumes = Map.empty<Common.ResumeId, ResumeTypes.Resume>();
  let payments = Map.empty<Common.PaymentId, PaymentTypes.PaymentRecord>();

  var resumeCounter = { var value : Nat = 0 };
  var paymentCounter = { var value : Nat = 0 };

  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // --- Mixin composition ---
  include ProfileMixin(profiles);
  include ResumeMixin(resumes, resumeCounter);
  include TemplateMixin();
  include PaymentMixin(payments, paymentCounter, resumes);

  // --- Stripe functions (declared directly as required) ---
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller = _ }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    stripeConfiguration := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
