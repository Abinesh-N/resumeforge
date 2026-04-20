import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import {
  useGetMyProfile,
  useIsStripeConfigured,
  useSetStripeConfiguration,
  useUpdateMyProfile,
} from "../hooks/useBackend";

export default function Settings() {
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: stripeConfigured } = useIsStripeConfigured();
  const updateProfile = useUpdateMyProfile();
  const setStripeConfig = useSetStripeConfiguration();

  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [secretKey, setSecretKey] = useState("");
  const [countries, setCountries] = useState("US,CA,GB,AU");

  const handleSaveProfile = async () => {
    try {
      await updateProfile.mutateAsync({
        name: name || null,
        email: email || null,
      });
      toast.success("Profile updated.");
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  const handleStripeSetup = async () => {
    const allowedCountries = countries
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    try {
      await setStripeConfig.mutateAsync({ secretKey, allowedCountries });
      toast.success("Stripe configured.");
      setSecretKey("");
    } catch {
      toast.error("Failed to configure Stripe.");
    }
  };

  return (
    <Layout>
      <div className="max-w-[680px] mx-auto px-6 py-10">
        <h1 className="font-display text-2xl font-bold tracking-tight mb-8">
          Settings
        </h1>

        {/* Profile */}
        <section className="bg-card rounded-xl border border-border p-6 mb-6">
          <h2 className="font-semibold text-sm mb-5">Profile</h2>
          {profileLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Display Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  data-ocid="settings.name_input"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  data-ocid="settings.email_input"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                disabled={updateProfile.isPending}
                className="gap-2"
                data-ocid="settings.save_profile_button"
              >
                <Save className="w-3.5 h-3.5" />
                Save Profile
              </Button>
            </div>
          )}
        </section>

        <Separator className="my-6" />

        {/* Stripe config */}
        <section className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-sm">Stripe Configuration</h2>
            {stripeConfigured ? (
              <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                Configured
              </span>
            ) : (
              <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded-full font-medium">
                Not configured
              </span>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Stripe Secret Key
              </Label>
              <Input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="sk_live_... or sk_test_..."
                data-ocid="settings.stripe_key_input"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Allowed Countries (comma-separated ISO codes)
              </Label>
              <Input
                value={countries}
                onChange={(e) => setCountries(e.target.value)}
                placeholder="US,CA,GB,AU"
                data-ocid="settings.stripe_countries_input"
              />
            </div>
            <Button
              onClick={handleStripeSetup}
              disabled={setStripeConfig.isPending || !secretKey}
              className="gap-2"
              data-ocid="settings.stripe_save_button"
            >
              <Save className="w-3.5 h-3.5" />
              {stripeConfigured ? "Update Stripe" : "Configure Stripe"}
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
