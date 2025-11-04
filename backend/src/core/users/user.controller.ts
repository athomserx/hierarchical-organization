import { Request, Response, NextFunction, Router } from "express";
import { UsersService } from "./users.service";
import { authGuard } from "@/middlewares/auth.middleware";

export class UsersController {
  private usersService: UsersService;
  public router: Router;

  constructor() {
    this.usersService = new UsersService();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", authGuard, this.getAllUsers);
    this.router.post("/", authGuard, this.createUser);
    this.router.get("/:id", authGuard, this.getUserById);
    this.router.put("/:id", authGuard, this.updateUser);

    this.router.get("/:id/permissions", authGuard, this.getUserPermissions);
  }

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.body;
      const newUser = await this.usersService.createUser(userData);

      res.status(201).json({
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await this.usersService.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const user = await this.usersService.findUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      const updatedUser = await this.usersService.updateUser(
        userId,
        updateData
      );

      res.status(200).json({
        message: "Usuario updated",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  public getUserPermissions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;

      const permissions = await this.usersService.calculateUserPermissions(
        userId
      );

      res.status(200).json({ userId, permissions });
    } catch (error) {
      next(error);
    }
  };
}
