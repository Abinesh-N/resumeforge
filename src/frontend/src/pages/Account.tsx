import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Clock, CreditCard } from "lucide-react";
import { Layout } from "../components/Layout";
import { useGetMyProfile, useGetPaymentHistory } from "../hooks/useBackend";
import { PaymentStatus } from "../types";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_STYLES: Record<PaymentStatus, string> = {
  [PaymentStatus.success]: "bg-primary/10 text-primary",
  [PaymentStatus.pending]: "bg-muted text-muted-foreground",
  [PaymentStatus.failed]: "bg-destructive/10 text-destructive",
};

export default function Account() {
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: payments, isLoading: paymentsLoading } = useGetPaymentHistory();

  return (
    <Layout>
      <div className="max-w-[680px] mx-auto px-6 py-10">
        <h1 className="font-display text-2xl font-bold tracking-tight mb-8">
          Account
        </h1>

        {/* Profile summary */}
        <section className="bg-card rounded-xl border border-border p-6 mb-6">
          <h2 className="font-semibold text-sm mb-4">Profile</h2>
          {profileLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ) : profile ? (
            <div className="space-y-1 text-sm">
              {profile.name && <p className="font-medium">{profile.name}</p>}
              {profile.email && (
                <p className="text-muted-foreground">{profile.email}</p>
              )}
              <p
                className="text-xs text-muted-foreground font-mono mt-2 truncate"
                title={profile.principalId}
              >
                ID: {profile.principalId}
              </p>
              <p className="text-xs text-muted-foreground">
                Member since {formatDate(profile.createdAt)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No profile data available.
            </p>
          )}
        </section>

        {/* Payment history */}
        <section className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment History
          </h2>
          {paymentsLoading ? (
            <div
              className="space-y-3"
              data-ocid="account.payments.loading_state"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={`pay-skel-${String(i)}`}
                  className="h-12 w-full"
                />
              ))}
            </div>
          ) : !payments || payments.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground text-sm"
              data-ocid="account.payments.empty_state"
            >
              No payments yet.
            </div>
          ) : (
            <div className="space-y-2">
              {payments.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-none"
                  data-ocid={`account.payment.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                      <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        ${(Number(p.amount) / 100).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {formatDate(p.createdAt)}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`text-xs font-medium ${STATUS_STYLES[p.status as PaymentStatus]}`}
                  >
                    {p.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
