import express from "express";
import { addUserController } from "../../controllers/userController/index.js";

const router = express.Router();

router.post("/", addUserController);

export default router;
