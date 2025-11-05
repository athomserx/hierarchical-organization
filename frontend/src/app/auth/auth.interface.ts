import { UserClaims } from '@/interfaces/users.interface';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userClaims: UserClaims;
}
