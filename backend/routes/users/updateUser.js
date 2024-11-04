import express from "express";
import { updateUserController } from "../../controllers/userController/index.js";

const router = express.Router();

router.patch("/:id", updateUserController);

export default router;
