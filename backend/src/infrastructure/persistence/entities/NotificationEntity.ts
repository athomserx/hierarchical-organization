import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("notifications")
export class NotificationEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  message!: string;

  @Column({ default: false })
  read!: boolean;

  @Column({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column({ type: "uuid" })
  userId!: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: "userId" })
  user!: UserEntity;
}
