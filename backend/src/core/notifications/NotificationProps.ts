import { User } from "@/core/users/User";

export interface NotificationProps {
  id: string;
  user: User;
  message: string;
  read: boolean;
  createdAt: Date;
}
