import { UsersService } from "@/core/users/users.service";
import { UserRequest } from "@/shared/interfaces/user-request";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET should be defined in environment variables");
}

export const authGuard = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "The access token is invalid or inexistent",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };

    req.userId = payload.userId;

    const usersService = new UsersService();
    const user = await usersService.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};
