import { OrganizationalUnit } from "@/core/organizational-units/OrganizationalUnit";
import { Permission } from "@/core/permissions/Permission";
import { UnitPermissionProps } from "./UnitPermissionProps";

export class UnitPermission {
  organizationalUnit: OrganizationalUnit;
  permission: Permission;

  constructor(props: UnitPermissionProps) {
    this.organizationalUnit = props.organizationalUnit;
    this.permission = props.permission;
  }
}
