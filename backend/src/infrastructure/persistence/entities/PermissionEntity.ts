import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { OrganizationalUnitEntity } from "./OrganizationalUnitEntity";

@Entity("permissions")
export class PermissionEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @ManyToMany(() => OrganizationalUnitEntity, (unit) => unit.permissions)
  @JoinTable({
    name: "unit_permissions",
    joinColumn: {
      name: "permissionId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "organizationalUnitId",
      referencedColumnName: "id",
    },
  })
  organizationalUnits!: OrganizationalUnitEntity[];
}
