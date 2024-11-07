import express from "express";
import { registerUserController } from "../../controllers/authController/index.js";

const router = express.Router();

router.post("/", registerUserController);

export default router;
