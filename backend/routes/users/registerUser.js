import express from "express";
import { registerNewUserController } from "../../controllers/userController/index.js";

const router = express.Router();

router.post("/", registerNewUserController);

export default router;
