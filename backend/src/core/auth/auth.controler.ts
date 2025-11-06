import { Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import { UsersService } from "@/core/users/users.service";
import { LoginCredentials } from "./auth.interface";
import { UserClaimsDto } from "../users/user.interface";

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthController {
  private usersService: UsersService;
  public router: Router;

  constructor() {
    this.usersService = new UsersService();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/login", this.login.bind(this));
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as LoginCredentials;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "userName and password fields are required" });
    }

    try {
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = user.validatePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, userName: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      const userClaims: UserClaimsDto = {
        user: {
          id: user.id!,
          name: user.name,
          lastName: user.lastName,
          bloodType: user.bloodType,
          email: user.email,
          organizationalUnitId: user.organizationalUnit.id,
        },
        permissions: [],
      };

      return res.status(200).json({
        token,
        userClaims,
      });
    } catch (error) {
      console.error("Error while trying to login", error);

      return res
        .status(500)
        .json({ message: "There was an error while trying to login", error });
    }
  }
}
