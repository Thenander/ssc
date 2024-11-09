import express from "express";
import authRoutes from "./auth/index.js";
import userRoutes from "./users/index.js";

const router = express.Router();

router.use("/api/V1/auth", authRoutes);
router.use("/api/V1/users", userRoutes);

router.use((req, res, next) => {
  res.status(404).json({ err: "File not found" });
});

export default router;
