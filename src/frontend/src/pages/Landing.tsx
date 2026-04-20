import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  FileText,
  Layers,
  Star,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Feature cards ──────────────────────────────────────────
const FEATURES = [
  {
    icon: Layers,
    title: "Dual Editor Modes",
    desc: "Switch between a guided form builder and a powerful TipTap rich-text editor. Bold, italic, alignment, drag-and-drop sections — full word-processor control.",
    badge: "Form + Advanced",
  },
  {
    icon: FileText,
    title: "Professional Templates",
    desc: "8 hand-crafted designs across Modern, Professional, Creative, and Minimal categories. Switch templates anytime without losing your content.",
    badge: "8 Templates",
  },
  {
    icon: CreditCard,
    title: "Pay Once, Download Forever",
    desc: "Build and edit your resume completely free. Pay a single flat fee when ready — your print-ready A4 PDF downloads instantly after payment.",
    badge: "Instant PDF",
  },
];

// ── Testimonials ───────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Sarah Kim",
    role: "Product Designer at Figma",
    avatar: "SK",
    quote:
      "ResumeForge's advanced editor finally lets me control every detail. I landed three interviews within a week of updating my resume.",
  },
  {
    name: "Marcus Chen",
    role: "Senior Engineer at Stripe",
    avatar: "MC",
    quote:
      "The dual mode is genius. I used the form builder to structure everything, then the advanced editor to fine-tune formatting. Perfect workflow.",
  },
  {
    name: "Priya Mehta",
    role: "Product Manager at Linear",
    avatar: "PM",
    quote:
      "Clean templates, instant PDF, and a pay-once model. Refreshing compared to the subscription-everything alternatives out there.",
  },
];

// ── Hero checklist ─────────────────────────────────────────
const HERO_CHECKS = [
  "No subscription — build free, pay to export",
  "ATS-friendly formatting out of the box",
  "Instant PDF download right after payment",
];

// ── Intersection-based fade-in hook ───────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ── Resume mockup ──────────────────────────────────────────
function ResumeMockup() {
  return (
    <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 lg:ml-auto">
      {/* ambient glow */}
      <div className="absolute -inset-6 bg-primary/8 rounded-[40px] blur-3xl pointer-events-none" />

      {/* card */}
      <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.7)] transform-gpu rotate-[1.5deg] hover:rotate-0 transition-transform duration-700 ease-out">
        <img
          src="/assets/generated/resume-mockup-hero.dim_800x1000.png"
          alt="Resume preview"
          className="w-full object-cover block"
          loading="eager"
        />
        {/* bottom badge */}
        <div className="absolute bottom-3 inset-x-3">
          <div className="bg-card/90 backdrop-blur-sm border border-border/60 rounded-lg px-3 py-2.5 flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">PDF Ready</p>
              <p className="text-[10px] text-muted-foreground truncate">
                Alex_Chen_Resume_2026.pdf
              </p>
            </div>
            <Badge className="ml-auto text-[10px] px-1.5 py-0.5 bg-primary/15 text-primary border-primary/20 shrink-0">
              $5
            </Badge>
          </div>
        </div>
      </div>

      {/* floating pill */}
      <div className="absolute -top-3 -right-4 bg-card border border-border rounded-full px-3 py-1.5 shadow-elevated">
        <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
          <Star className="w-3 h-3 text-primary fill-primary" />
          Modern Template
        </span>
      </div>
    </div>
  );
}

// ── Landing page ───────────────────────────────────────────
export default function Landing() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const [mounted, setMounted] = useState(false);
  const featuresAnim = useFadeIn();
  const testimonialsAnim = useFadeIn();
  const ctaAnim = useFadeIn();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const signingIn = isLoggingIn || isInitializing;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-[15px] tracking-tight text-foreground">
              ResumeForge
            </span>
          </div>

          <nav className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm" data-ocid="nav.dashboard_button">
                  Go to Dashboard
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={login}
                  disabled={signingIn}
                  className="text-muted-foreground hover:text-foreground hidden sm:inline-flex"
                  data-ocid="nav.signin_button"
                >
                  Sign in
                </Button>
                <Button
                  size="sm"
                  onClick={login}
                  disabled={signingIn}
                  data-ocid="nav.get_started_button"
                >
                  {isLoggingIn ? "Signing in…" : "Get started"}
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden" data-ocid="hero.section">
          {/* grid bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--border) / 0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              opacity: 0.4,
            }}
          />
          {/* top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-primary/6 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative max-w-[1200px] mx-auto px-6 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              {/* Left copy */}
              <div className="space-y-7">
                <div
                  className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  <Badge
                    variant="secondary"
                    className="mb-5 text-xs font-medium bg-primary/10 text-primary border border-primary/25 gap-1.5"
                  >
                    <Zap className="w-3 h-3 fill-primary" />
                    Build free · Pay once · Download forever
                  </Badge>

                  <h1 className="font-display text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-foreground">
                    Build professional resumes that{" "}
                    <span className="text-primary">get you hired</span>
                  </h1>
                </div>

                <p
                  className={`text-lg text-muted-foreground leading-relaxed max-w-[440px] transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  ResumeForge pairs a guided form builder with a powerful
                  rich-text editor. Choose from 8 professional templates, edit
                  freely, then pay once for your print-ready PDF.
                </p>

                <ul
                  className={`space-y-2.5 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  {HERO_CHECKS.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                >
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Welcome back! Your resumes are ready.
                      </p>
                      <Link to="/dashboard">
                        <Button
                          size="lg"
                          className="font-semibold text-base px-8 h-12 shadow-elevated"
                          data-ocid="hero.dashboard_cta"
                        >
                          Go to Dashboard
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        className="font-semibold text-base px-8 h-12 shadow-elevated"
                        onClick={login}
                        disabled={signingIn}
                        data-ocid="hero.start_building_cta"
                      >
                        {isLoggingIn
                          ? "Signing in…"
                          : "Start Building — It's Free"}
                        {!isLoggingIn && (
                          <ArrowRight className="w-4 h-4 ml-2" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-12 text-base"
                        onClick={() =>
                          document
                            .getElementById("features")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                        data-ocid="hero.see_features_button"
                      >
                        See features
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Right visual */}
              <div
                className={`flex justify-center lg:justify-end transition-all duration-700 delay-[350ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <ResumeMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────── */}
        <section
          id="features"
          ref={featuresAnim.ref}
          className="bg-muted/30 border-y border-border py-20"
          data-ocid="features.section"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div
              className={`text-center mb-14 transition-all duration-700 ${featuresAnim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Why ResumeForge
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Everything you need to land the role
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card
                    key={f.title}
                    className={`p-6 bg-card border border-border hover:border-primary/30 group transition-all duration-500 hover:shadow-elevated ${
                      featuresAnim.visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: featuresAnim.visible
                        ? `${i * 100 + 80}ms`
                        : "0ms",
                    }}
                    data-ocid={`features.item.${i + 1}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-semibold text-foreground text-[15px] leading-snug">
                        {f.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5 shrink-0 bg-muted text-muted-foreground"
                      >
                        {f.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────── */}
        <section
          ref={testimonialsAnim.ref}
          className="py-20 bg-background"
          data-ocid="testimonials.section"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div
              className={`text-center mb-14 transition-all duration-700 ${testimonialsAnim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Social Proof
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Trusted by professionals
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <Card
                  key={t.name}
                  className={`p-6 bg-card border border-border transition-all duration-500 ${
                    testimonialsAnim.visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: testimonialsAnim.visible
                      ? `${i * 100 + 80}ms`
                      : "0ms",
                  }}
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <div className="flex gap-0.5 mb-4">
                    {(["s1", "s2", "s3", "s4", "s5"] as const).map((sk) => (
                      <Star
                        key={sk}
                        className="w-3.5 h-3.5 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm text-foreground/80 leading-relaxed mb-5">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {t.avatar}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ─────────────────────────────────────── */}
        <section
          ref={ctaAnim.ref}
          className="bg-muted/30 border-t border-border py-20"
          data-ocid="cta.section"
        >
          <div
            className={`max-w-[580px] mx-auto px-6 text-center transition-all duration-700 ${ctaAnim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Your next job starts with a great resume
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Join professionals who use ResumeForge to craft resumes that stand
              out. Build free — pay once when you're ready to download.
            </p>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="font-semibold px-10 h-12 shadow-elevated"
                  data-ocid="cta.dashboard_button"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="font-semibold px-10 h-12 shadow-elevated"
                onClick={login}
                disabled={signingIn}
                data-ocid="cta.start_button"
              >
                {isLoggingIn ? "Signing in…" : "Start Building — It's Free"}
                {!isLoggingIn && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            )}
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer
        className="bg-card border-t border-border py-8"
        data-ocid="footer.section"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-foreground leading-none">
                ResumeForge
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Build resumes that get you hired
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline underline-offset-2 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
