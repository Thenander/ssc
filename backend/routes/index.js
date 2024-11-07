import express from "express";
import authRoutes from "./auth/index.js";
import userRoutes from "./users/index.js";

const router = express.Router();

router.use("/api/V1/auth", authRoutes);
router.use("/api/V1/users", userRoutes);

export default router;
