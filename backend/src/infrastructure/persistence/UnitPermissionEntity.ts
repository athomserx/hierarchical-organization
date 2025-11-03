import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { OrganizationalUnitEntity } from "./OrganizationalUnitEntity";
import { PermissionEntity } from "./PermissionEntity";

@Entity("unit_permissions")
export class UnitPermissionEntity {
  @PrimaryColumn({ type: "uuid" })
  organizationalUnitId!: string;

  @ManyToOne(() => OrganizationalUnitEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "organizationalUnitId" })
  organizationalUnit!: OrganizationalUnitEntity;

  @PrimaryColumn({ type: "uuid" })
  permissionId!: string;

  @ManyToOne(() => PermissionEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "permissionId" })
  permission!: PermissionEntity;
}
