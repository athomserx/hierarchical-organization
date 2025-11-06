import { Permission } from "../permissions/Permission";
import { OrganizationalUnit } from "./organizational-unit";

export interface OrganizationalUnitProps {
  id: string;
  name: string;
  parent?: OrganizationalUnit;
  permissions?: Permission[];
}

export interface OrganizationModuleDTO {
  id?: string;
  name: string;
  parentId: string;
  permissions: string[];
}
