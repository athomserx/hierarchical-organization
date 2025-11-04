import { User } from "@/core/users/user";

export interface NotificationProps {
  id: string;
  user: User;
  message: string;
  read: boolean;
  createdAt: Date;
}
