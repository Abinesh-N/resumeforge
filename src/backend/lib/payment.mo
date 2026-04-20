import Types "../types/payment";
import Common "../types/common";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

module {
  public func createPaymentRecord(
    payments : Map.Map<Common.PaymentId, Types.PaymentRecord>,
    nextId : { var value : Nat },
    userId : Common.UserId,
    input : Types.CreatePaymentInput,
    now : Common.Timestamp,
  ) : Types.PaymentRecordView {
    nextId.value += 1;
    let id = "payment-" # nextId.value.toText();
    let record : Types.PaymentRecord = {
      id;
      userId;
      resumeId = input.resumeId;
      amount = input.amount;
      var status = #pending;
      stripePaymentIntentId = input.stripePaymentIntentId;
      createdAt = now;
      var unlockedAt = null;
    };
    payments.add(id, record);
    toView(record);
  };

  public func confirmPayment(
    payments : Map.Map<Common.PaymentId, Types.PaymentRecord>,
    paymentId : Common.PaymentId,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : Types.PaymentRecordView {
    switch (payments.get(paymentId)) {
      case null { Runtime.trap("Payment record not found") };
      case (?p) {
        if (p.userId != userId) { Runtime.trap("Unauthorized: not your payment") };
        p.status := #success;
        p.unlockedAt := ?now;
        toView(p);
      };
    };
  };

  public func getPaymentHistory(
    payments : Map.Map<Common.PaymentId, Types.PaymentRecord>,
    userId : Common.UserId,
  ) : [Types.PaymentRecordView] {
    payments.values()
      .filter(func(p : Types.PaymentRecord) : Bool { p.userId == userId })
      .map(func(p : Types.PaymentRecord) : Types.PaymentRecordView { toView(p) })
      .toArray();
  };

  public func getPaymentByStripeId(
    payments : Map.Map<Common.PaymentId, Types.PaymentRecord>,
    stripePaymentIntentId : Text,
  ) : ?Types.PaymentRecord {
    payments.values().find(
      func(p : Types.PaymentRecord) : Bool {
        p.stripePaymentIntentId == stripePaymentIntentId
      }
    );
  };

  public func toView(p : Types.PaymentRecord) : Types.PaymentRecordView {
    {
      id = p.id;
      userId = p.userId;
      resumeId = p.resumeId;
      amount = p.amount;
      status = p.status;
      stripePaymentIntentId = p.stripePaymentIntentId;
      createdAt = p.createdAt;
      unlockedAt = p.unlockedAt;
    };
  };
};
