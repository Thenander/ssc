import express from "express";
import { getUserByIdController } from "../../controllers/userController/index.js";

const router = express.Router();

router.get("/:id", getUserByIdController);

export default router;
