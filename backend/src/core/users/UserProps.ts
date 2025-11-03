import { OrganizationalUnit } from "@/core/organizational-units/OrganizationalUnit";

export interface UserProps {
  id: string;
  name: string;
  lastName: string;
  bloodType: string;
  email: string;
  organizationalUnit: OrganizationalUnit;
}
