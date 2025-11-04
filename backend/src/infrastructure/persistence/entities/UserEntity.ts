import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { OrganizationalUnitEntity } from "./OrganizationalUnitEntity";
import { NotificationEntity } from "./NotificationEntity";

@Entity("users")
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  bloodType!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "uuid" })
  organizationalUnitId!: string;

  @ManyToOne(() => OrganizationalUnitEntity, (unit) => unit.users)
  @JoinColumn({ name: "organizationalUnitId" })
  organizationalUnit!: OrganizationalUnitEntity;

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications!: NotificationEntity[];
}
