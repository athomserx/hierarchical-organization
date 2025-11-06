import * as bcrypt from "bcryptjs";
import { OrganizationalUnit } from "@/core/organizational-units/organizational-unit";
import { UserProps } from "./user.interface";
import { Permission } from "../permissions/Permission";

export class User {
  id?: string;
  name: string;
  lastName: string;
  bloodType: string;
  email: string;
  passwordHash: string;
  organizationalUnit: OrganizationalUnit;
  permissions: Permission[];

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.lastName = props.lastName;
    this.bloodType = props.bloodType;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.organizationalUnit = props.organizationalUnit;
    this.permissions = props.permissions ?? [];
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}
