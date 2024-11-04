import express from "express";

import getUser from "./getUser.js";
import getUsers from "./getUsers.js";
import addUser from "./addUser.js";
import deleteUser from "./deleteUser.js";
import updateUser from "./updateUser.js";
import registerUser from "./registerUser.js";

const router = express.Router();

router.use("/user", getUser);
router.use("/all", getUsers);
router.use("/add", addUser);
router.use("/delete", deleteUser);
router.use("/update", updateUser);
router.use("/register", registerUser);

export default router;
