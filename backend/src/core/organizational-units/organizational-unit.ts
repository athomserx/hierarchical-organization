import { Permission } from "../permissions/Permission";
import { OrganizationalUnitProps } from "./organizational-unit.interface";

export class OrganizationalUnit {
  id: string;
  name: string;
  parent?: OrganizationalUnit;
  permissions?: Permission[];

  constructor(props: OrganizationalUnitProps) {
    this.id = props.id;
    this.name = props.name;
    this.parent = props.parent;
    this.permissions = props.permissions;
  }
}
