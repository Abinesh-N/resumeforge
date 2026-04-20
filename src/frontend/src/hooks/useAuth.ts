import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const { login, clear, isAuthenticated, loginStatus, identity } =
    useInternetIdentity();
  const queryClient = useQueryClient();

  const isInitializing = loginStatus === "initializing";
  const isLoggingIn = loginStatus === "logging-in";

  const logout = () => {
    clear();
    queryClient.clear();
  };

  const principal = identity?.getPrincipal();

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    principal,
    identity,
    login,
    logout,
    loginStatus,
  };
}
