import { Toaster } from "@/components/ui/sonner";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy, useEffect } from "react";

// Lazy pages
const LandingPage = lazy(() => import("./pages/Landing"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const TemplatesPage = lazy(() => import("./pages/Templates"));
const ResumeFormEditorPage = lazy(() => import("./pages/ResumeFormEditor"));
const AdvancedEditorPage = lazy(() => import("./pages/AdvancedEditor"));
const PaymentPage = lazy(() => import("./pages/Payment"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailurePage = lazy(() => import("./pages/PaymentFailure"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const AccountPage = lazy(() => import("./pages/Account"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

// Auth guard component
function ProtectedOutlet() {
  const { isAuthenticated, loginStatus } = useInternetIdentity();
  const isInitializing = loginStatus === "initializing";

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      // Use location replace so back-button doesn't loop
      window.location.replace("/");
    }
  }, [isAuthenticated, isInitializing]);

  if (isInitializing) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <PageLoader />;
  }

  return <Outlet />;
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </>
  ),
});

// Public routes
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  ),
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PaymentSuccessPage />
    </Suspense>
  ),
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PaymentFailurePage />
    </Suspense>
  ),
});

// Protected layout route
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedOutlet,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const templatesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/templates",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TemplatesPage />
    </Suspense>
  ),
});

const resumeFormEditorRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/resume/$resumeId/edit",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ResumeFormEditorPage />
    </Suspense>
  ),
});

const advancedEditorRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/resume/$resumeId/advanced",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdvancedEditorPage />
    </Suspense>
  ),
});

const paymentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/resume/$resumeId/payment",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PaymentPage />
    </Suspense>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SettingsPage />
    </Suspense>
  ),
});

const accountRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/account",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AccountPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  protectedRoute.addChildren([
    dashboardRoute,
    templatesRoute,
    resumeFormEditorRoute,
    advancedEditorRoute,
    paymentRoute,
    settingsRoute,
    accountRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
