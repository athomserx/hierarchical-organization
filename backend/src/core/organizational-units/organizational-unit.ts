import { OrganizationalUnitProps } from "./organizational-unit.interface";

export class OrganizationalUnit {
  id: string;
  name: string;
  parent?: OrganizationalUnit;

  constructor(props: OrganizationalUnitProps) {
    this.id = props.id;
    this.name = props.name;
    this.parent = props.parent;
  }
}
