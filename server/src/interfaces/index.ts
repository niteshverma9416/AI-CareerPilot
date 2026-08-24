export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface IHealthStatus {
  success: true;
  message: string;
  timestamp: string;
  environment: string;
}
