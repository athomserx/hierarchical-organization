import * as bcrypt from "bcryptjs";
import { OrganizationalUnit } from "@/core/organizational-units/OrganizationalUnit";
import { UserProps } from "./user.interface";

export class User {
  id?: string;
  name: string;
  lastName: string;
  bloodType: string;
  email: string;
  passwordHash: string;
  organizationalUnit: OrganizationalUnit;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.lastName = props.lastName;
    this.bloodType = props.bloodType;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.organizationalUnit = props.organizationalUnit;
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}
