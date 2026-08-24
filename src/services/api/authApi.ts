import { apiClient } from "./client";

export const authApi = {
  /**
   * Register a new user in the system.
   */
  register: async (userData: any) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  /**
   * Log in an existing user.
   */
  login: async (credentials: any) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },
};
export default authApi;
