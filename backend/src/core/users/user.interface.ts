import { OrganizationalUnit } from "@/core/organizational-units/organizational-unit";
import { Permission } from "../permissions/Permission";

export interface UserProps {
  id?: string;
  name: string;
  lastName: string;
  bloodType: string;
  email: string;
  passwordHash: string;
  organizationalUnit: OrganizationalUnit;
  permissions?: Permission[];
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

export interface UserClaimsDto {
  user: UserResponseDto;
  permissions: Permission[];
}
