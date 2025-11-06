import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { OrganizationalUnitEntity } from "./OrganizationalUnitEntity";
import { PermissionEntity } from "./PermissionEntity";
import { UserEntity } from "./UserEntity";

@Entity("user_permissions")
export class UserPermissionsEntity {
  @PrimaryColumn({ type: "uuid" })
  userId!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: UserEntity;

  @PrimaryColumn({ type: "uuid" })
  permissionId!: string;

  @ManyToOne(() => PermissionEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "permissionId" })
  permission!: PermissionEntity;
}
