import { getUserByUsernameDB } from "../../models/Login.js";
import { formatUsers } from "../helperFunctions.js";

export async function profileController(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json("username or password missing!");
  }

  try {
    const user = await getUserByUsernameDB(username);

    if (!user) {
      return res.status(400).json("No user!");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Username or password is wrong" });
    }

    const formattedUser = formatUsers([user]);

    return res.status(200).json(formattedUser);
  } catch (error) {
    next(error);
  }
}
