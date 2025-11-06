import { UserRequest } from "@/shared/interfaces/user-request";
import { Response, Router } from "express";

export class OrganizationalUnitController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAvailableModules);
  }

  //   export interface OrganizationModule {
  //   id: string;
  //   name: string;
  //   parentId: string;
  //   permissions: string[];
  // }

  public getAvailableModules(req: UserRequest, res: Response) {
    console.log(req.user);
  }
}
