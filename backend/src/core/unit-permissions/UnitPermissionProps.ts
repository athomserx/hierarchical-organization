import { OrganizationalUnit } from "@/core/organizational-units/OrganizationalUnit";
import { Permission } from "@/core/permissions/Permission";

export interface UnitPermissionProps {
  organizationalUnit: OrganizationalUnit;
  permission: Permission;
}
