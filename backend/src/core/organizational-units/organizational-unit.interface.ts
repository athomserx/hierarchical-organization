import { OrganizationalUnit } from "./organizational-unit";

export interface OrganizationalUnitProps {
  id: string;
  name: string;
  parent?: OrganizationalUnit;
}

export interface OrganizationModuleDTO {
  id?: string;
  name: string;
  parentId: string;
  permissions: string[];
}
