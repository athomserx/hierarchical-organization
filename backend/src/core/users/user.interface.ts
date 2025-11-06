import { OrganizationalUnit } from "@/core/organizational-units/OrganizationalUnit";
import { User } from "./user";

export interface UserProps {
  id?: string;
  name: string;
  lastName: string;
  bloodType: string;
  email: string;
  passwordHash: string;
  organizationalUnit: OrganizationalUnit;
}

export interface UserRequestDto {
  name: string;
  lastName: string;
  bloodType: string;
  email: string;
  password: string;
  organizationalUnitId: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  lastName: string;
  bloodType: string;
  email: string;
  organizationalUnitId: string;
}

export interface UserClaims {
  user: UserResponseDto;
  permissions: string[];
}
