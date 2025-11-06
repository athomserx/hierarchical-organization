import { Request, Response, NextFunction, Router } from "express";
import { UsersService } from "./users.service";
import { UserRequest } from "@/shared/interfaces/user-request";

export class UsersController {
  private usersService: UsersService;
  public router: Router;

  constructor() {
    this.usersService = new UsersService();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get("/", this.getAllUsers);
    // this.router.post("/", this.createUser);
    // this.router.get("/:id", this.getUserById);
    // this.router.put("/:id", this.updateUser);

    this.router.get("/permissions", this.getUserPermissions.bind(this));
  }

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // try {
    //   const userData = req.body;
    //   const newUser = await this.usersService.createUser(userData);
    //   res.status(201).json({
    //     message: "User created successfully",
    //     data: newUser,
    //   });
    // } catch (error) {
    //   next(error);
    // }
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
    // try {
    //   const userId = req.params.id;
    //   const user = await this.usersService.findUserById(userId);
    //   if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    //   }
    //   res.status(200).json(user);
    // } catch (error) {
    //   next(error);
    // }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // try {
    //   const userId = req.params.id;
    //   const updateData = req.body;
    //   const updatedUser = await this.usersService.updateUser(
    //     userId,
    //     updateData
    //   );
    //   res.status(200).json({
    //     message: "Usuario updated",
    //     data: updatedUser,
    //   });
    // } catch (error) {
    //   next(error);
    // }
  };

  public async getUserPermissions(req: UserRequest, res: Response) {
    const user = req.user;

    try {
      const permissions = await this.usersService.calculateUserPermissions(
        user?.id!
      );

      res.status(200).json(permissions);
    } catch (error) {
      console.error("Error while getting the user permissions", error);

      return res.status(500).json({
        message: "There was an error while trying to get the user permissions",
        error,
      });
    }
  }
}
