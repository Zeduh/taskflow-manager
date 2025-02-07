import { ApiService } from './api.service';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return ApiService.fetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async register(data: RegisterData): Promise<void> {
    return ApiService.fetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};