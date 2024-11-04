import express from "express";
import profile from "./profile.js";
import loginUser from "./loginUser.js";

const router = express.Router();
router.use("/profile", profile);
router.use("/", loginUser);

export default router;
