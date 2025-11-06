import { OrganizationalUnit } from "@/core/organizational-units/organizational-unit";
import { Permission } from "@/core/permissions/Permission";

export interface UnitPermissionProps {
  organizationalUnit: OrganizationalUnit;
  permission: Permission;
}
