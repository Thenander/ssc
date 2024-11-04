import express from "express";
import { profileController } from "../../controllers/loginController/index.js";
import { validateToken } from "../../JWT.js";

const router = express.Router();

router.get("/", validateToken, profileController);

export default router;
