import { AxiosInstance } from 'axios';
import axiosClient from '@/apis/axios';

interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
}

class SubsApiService {
  private api: AxiosInstance = axiosClient;

  // POST /subscribers/verify/send/ — sends a subscription verification email
  async sendVerificationEmail(email: string): Promise<ApiResponse> {
    const { data } = await this.api.post<ApiResponse>('/subscribers/verify/send/', { email });
    return data;
  }

  // POST /subscribers/verify/ — verifies the token from the verification email link
  async verifyToken(token: string): Promise<ApiResponse> {
    const { data } = await this.api.post<ApiResponse>('/subscribers/verify/', { token });
    return data;
  }
}

export const subsApi = new SubsApiService();
