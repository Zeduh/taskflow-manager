'use server';

import { RegisterFormData } from './types';
import { AuthService } from '@/app/services/auth.service';
import { redirect } from 'next/navigation';

export async function registerUser(data: RegisterFormData) {
  try {
    await AuthService.register(data);
    redirect('/auth/login');
  } catch (error) {
    throw new Error('Falha no registro');
  }
}