import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./UserEntity";
import { PermissionEntity } from "./PermissionEntity";

@Entity("organizational_units")
export class OrganizationalUnitEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "uuid", nullable: true })
  parentId!: string | null;

  @ManyToOne(() => OrganizationalUnitEntity, (unit) => unit.children)
  @JoinColumn({ name: "parentId" })
  parent?: OrganizationalUnitEntity;

  @OneToMany(() => OrganizationalUnitEntity, (unit) => unit.parent)
  children!: OrganizationalUnitEntity[];

  @OneToMany(() => UserEntity, (user) => user.organizationalUnit)
  users!: UserEntity[];

  @ManyToMany(
    () => PermissionEntity,
    (permission) => permission.organizationalUnits
  )
  permissions!: PermissionEntity[];
}
