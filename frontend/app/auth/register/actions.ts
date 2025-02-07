'use server';

import { RegisterFormData } from './types';

export async function registerUser(data: RegisterFormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { 
        success: false, 
        error: error.message || 'Erro ao registrar usuário' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Erro no registro:', error);
    return { 
      success: false, 
      error: 'Falha ao registrar usuário. Tente novamente.' 
    };
  }
}