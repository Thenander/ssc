import express from "express";
import { loginUserController } from "../../controllers/loginController/index.js";

const router = express.Router();

router.post("/", loginUserController);

export default router;
