import { OrganizationalUnit } from "@/core/organizational-units/OrganizationalUnit";
import { UserProps } from "./user.interface";

export class User {
  id?: string;
  name: string;
  lastName: string;
  bloodType: string;
  email: string;
  organizationalUnit: OrganizationalUnit;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.lastName = props.lastName;
    this.bloodType = props.bloodType;
    this.email = props.email;
    this.organizationalUnit = props.organizationalUnit;
  }
}
