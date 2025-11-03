import { PermissionProps } from "./PermissionProps";

export class Permission {
  id: string;
  name: string;

  constructor(props: PermissionProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
