import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UsersController } from "./core/users/user.controller";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Controllers instantiation
const usersController = new UsersController();

// Routes
app.use("/api/users", usersController.router);
app.use("/api/notifications", (req, res) => []);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
