import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UsersController } from "./core/users/user.controller";
import { AuthController } from "./core/auth/auth.controler";
import { authGuard } from "./middlewares/auth.middleware";
import "reflect-metadata";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Controllers instantiation
const usersController = new UsersController();
const authController = new AuthController();

// Routes
app.use("/api/users", authGuard, usersController.router);
app.use("/api/notifications", authGuard, (req, res) => []);
app.use("/api/auth", authController.router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
