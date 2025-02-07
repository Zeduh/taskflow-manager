export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    name: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }