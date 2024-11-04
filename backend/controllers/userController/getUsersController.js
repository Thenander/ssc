import { getUsersFromDB } from "../../models/Users.js";
import { formatUsers } from "./helperFunctions.js";

export async function getUsersController(req, res, next) {
  try {
    const users = await getUsersFromDB();
    if (users) {
      res.json(formatUsers(users));
    } else {
      res.status(404).json({ error: "No users found" });
    }
  } catch (error) {
    next(error);
  }
}
