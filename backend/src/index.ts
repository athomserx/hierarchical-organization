import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UsersController } from "./core/users/user.controller";
import { AuthController } from "./core/auth/auth.controler";
import { authGuard } from "./middlewares/auth.middleware";
import "reflect-metadata";
import db from "./infrastructure/persistence/AppDataSource";
import { OrganizationalUnitController } from "./core/organizational-units/OrganizationalUnitController";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Controllers instantiation
const usersController = new UsersController();
const authController = new AuthController();
const organizationalUnitController = new OrganizationalUnitController();

// Routes
app.use("/api/users", authGuard, usersController.router);
app.use("/api/notifications", authGuard, (req, res) => []);
app.use("/api/modules", authGuard, organizationalUnitController.router);
app.use("/api/auth", authController.router);

async function main() {
  try {
    await db.initialize();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  }
}

main();
