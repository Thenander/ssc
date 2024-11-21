import express from "express";
import loginUser from "./loginUser.js";
// import registerUser from "./registerUser.js";

const router = express.Router();
router.use("/login", loginUser);
// router.use("/register", registerUser);

export default router;
