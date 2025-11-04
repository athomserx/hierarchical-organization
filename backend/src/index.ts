import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/audit", auditRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
