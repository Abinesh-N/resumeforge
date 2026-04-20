import Common "common";

module {
  public type PaymentStatus = {
    #pending;
    #success;
    #failed;
  };

  public type PaymentRecord = {
    id : Common.PaymentId;
    userId : Common.UserId;
    resumeId : Common.ResumeId;
    amount : Nat;
    var status : PaymentStatus;
    stripePaymentIntentId : Text;
    createdAt : Common.Timestamp;
    var unlockedAt : ?Common.Timestamp;
  };

  // Shared (API boundary) — no var fields
  public type PaymentRecordView = {
    id : Common.PaymentId;
    userId : Common.UserId;
    resumeId : Common.ResumeId;
    amount : Nat;
    status : PaymentStatus;
    stripePaymentIntentId : Text;
    createdAt : Common.Timestamp;
    unlockedAt : ?Common.Timestamp;
  };

  public type CreatePaymentInput = {
    resumeId : Common.ResumeId;
    amount : Nat;
    stripePaymentIntentId : Text;
  };
};
