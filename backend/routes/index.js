import express from "express";
import userRoutes from "./users/index.js";
import loginRoutes from "./login/index.js";

const router = express.Router();

router.use("/api/V1/users", userRoutes);
router.use("/api/V1/login", loginRoutes);

export default router;
