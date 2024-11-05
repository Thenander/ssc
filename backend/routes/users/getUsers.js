import express from "express";
import { getUsersController } from "../../controllers/userController/index.js";
import { validateToken } from "../../JWT.js";

const router = express.Router();

router.get("/", validateToken, getUsersController);

export default router;
