import PaymentTypes "../types/payment";
import Common "../types/common";
import PaymentLib "../lib/payment";
import ResumeLib "../lib/resume";
import ResumeTypes "../types/resume";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  payments : Map.Map<Common.PaymentId, PaymentTypes.PaymentRecord>,
  paymentCounter : { var value : Nat },
  resumes : Map.Map<Common.ResumeId, ResumeTypes.Resume>,
) {
  public shared ({ caller }) func createPaymentRecord(input : PaymentTypes.CreatePaymentInput) : async PaymentTypes.PaymentRecordView {
    PaymentLib.createPaymentRecord(payments, paymentCounter, caller.toText(), input, Time.now());
  };

  public shared ({ caller }) func confirmPayment(paymentId : Common.PaymentId) : async PaymentTypes.PaymentRecordView {
    let now = Time.now();
    let view = PaymentLib.confirmPayment(payments, paymentId, caller.toText(), now);
    ResumeLib.unlockDownload(resumes, view.resumeId);
    view;
  };

  public shared query ({ caller }) func getPaymentHistory() : async [PaymentTypes.PaymentRecordView] {
    PaymentLib.getPaymentHistory(payments, caller.toText());
  };
};
