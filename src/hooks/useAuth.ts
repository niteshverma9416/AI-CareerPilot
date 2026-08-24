import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/api/authApi";

/**
 * Hook to manage registration API request mutation lifecycle.
 */
export function useRegisterMutation() {
  return useMutation({
    mutationFn: (userData: any) => authApi.register(userData),
  });
}

/**
 * Hook to manage login API request mutation lifecycle.
 */
export function useLoginMutation() {
  return useMutation({
    mutationFn: (credentials: any) => authApi.login(credentials),
  });
}
