import { UserRequest } from "@/shared/interfaces/user-request";
import { Response, Router } from "express";
import { OrganizationalUnitService } from "./organizational-unit.service";

export class OrganizationalUnitController {
  private organizationalUnitService: OrganizationalUnitService;
  public router: Router;

  constructor() {
    this.organizationalUnitService = new OrganizationalUnitService();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAvailableModules.bind(this));
  }

  //   export interface OrganizationModule {
  //   id: string;
  //   name: string;
  //   parentId: string;
  //   permissions: string[];
  // }

  public async getAvailableModules(req: UserRequest, res: Response) {
    const user = req.user;

    try {
      const modules = await this.organizationalUnitService.getDownwardsTree(
        user!.organizationalUnit.id
      );

      res.status(200).json(modules);
    } catch (error) {
      console.error("Error while getting the modules", error);

      return res.status(500).json({
        message: "There was an error while trying to get the modules",
        error,
      });
    }
  }
}
