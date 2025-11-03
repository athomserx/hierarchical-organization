import { User } from "@/core/users/User";
import { NotificationProps } from "./NotificationProps";

export class Notification {
  id: string;
  user: User;
  message: string;
  read: boolean;
  createdAt: Date;

  constructor(props: NotificationProps) {
    this.id = props.id;
    this.user = props.user;
    this.message = props.message;
    this.read = props.read;
    this.createdAt = props.createdAt;
  }
}
