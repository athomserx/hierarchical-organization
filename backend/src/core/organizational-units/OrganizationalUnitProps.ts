import { OrganizationalUnit } from "./OrganizationalUnit";

export interface OrganizationalUnitProps {
  id: string;
  name: string;
  parent?: OrganizationalUnit;
}
