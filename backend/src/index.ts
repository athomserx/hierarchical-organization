import sequelize from "@/config/db";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const verifyDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

verifyDatabaseConnection();

// Routes
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/audit", auditRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
