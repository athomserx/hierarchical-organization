import { User } from "@/core/users/user";
import { Request } from "express";

export interface UserRequest extends Request {
  userId?: string;
  user?: User;
}
