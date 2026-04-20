import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export function Layout({ children, showNav = true }: LayoutProps) {
  const { isAuthenticated, login, clear, loginStatus, identity } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isInitializing = loginStatus === "initializing";
  const isLoggingIn = loginStatus === "logging-in";

  const handleLogout = () => {
    clear();
    queryClient.clear();
    router.navigate({ to: "/" });
  };

  const principalStr = identity?.getPrincipal()?.toString();
  const initials = principalStr ? principalStr.slice(0, 2).toUpperCase() : "RF";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showNav && (
        <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
          <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-[15px] text-foreground tracking-tight">
                ResumeForge
              </span>
            </Link>

            {/* Nav links */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
                  activeProps={{ className: "text-foreground bg-muted/50" }}
                  data-ocid="nav.dashboard_link"
                >
                  <span className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </span>
                </Link>
                <Link
                  to="/templates"
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
                  activeProps={{ className: "text-foreground bg-muted/50" }}
                  data-ocid="nav.templates_link"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Templates
                  </span>
                </Link>
              </nav>
            )}

            {/* Auth controls */}
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <Button
                  onClick={login}
                  disabled={isInitializing || isLoggingIn}
                  size="sm"
                  data-ocid="nav.login_button"
                >
                  {isInitializing
                    ? "Loading..."
                    : isLoggingIn
                      ? "Signing in..."
                      : "Sign in"}
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
                      data-ocid="nav.user_menu"
                    >
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" data-ocid="nav.menu.dashboard_link">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" data-ocid="nav.menu.settings_link">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account" data-ocid="nav.menu.account_link">
                        <User className="w-4 h-4 mr-2" />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive focus:text-destructive"
                      data-ocid="nav.logout_button"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border py-5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
              <FileText className="w-3 h-3 text-primary" />
            </div>
            <span className="font-medium text-foreground/70">ResumeForge</span>
          </div>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline underline-offset-2 transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
