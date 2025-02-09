'use server'

import { AuthService } from '@/app/services/auth.service';
import { LoginCredentials } from '@/app/types/auth.types';

export async function loginUser(credentials: LoginCredentials) {
  try {
    const response = await AuthService.login(credentials);
    return { success: true, data: response };
  } catch (error) {
    return { 
      success: false, 
      error: 'Email ou senha inválidos'
    };
  }
}