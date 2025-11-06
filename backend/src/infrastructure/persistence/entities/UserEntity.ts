import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { OrganizationalUnitEntity } from "./OrganizationalUnitEntity";
import { NotificationEntity } from "./NotificationEntity";
import { PermissionEntity } from "./PermissionEntity";

@Entity("users")
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  lastName!: string;

  @Column({ type: "varchar" })
  bloodType!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "uuid" })
  organizationalUnitId!: string;

  @Column({ type: "varchar" })
  passwordHash!: string;

  @ManyToOne(() => OrganizationalUnitEntity, (unit) => unit.users)
  @JoinColumn({ name: "organizationalUnitId" })
  organizationalUnit!: OrganizationalUnitEntity;

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications!: NotificationEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.users)
  permissions!: PermissionEntity[];
}
