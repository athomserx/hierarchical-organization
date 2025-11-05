export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  bloodType: string;
}

export interface UserClaims {
  user: User;
  permissions: string[];
}
