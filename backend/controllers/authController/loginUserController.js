import { getUserByUsernameDB } from "../../models/Auth.js";
import bcrypt from "bcrypt";
import { createToken } from "../../JWT.js";
import { formatUsers } from "../helperFunctions.js";

export async function loginUserController(req, res, next) {
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

    const accessToken = createToken(user);
    const formattedUser = formatUsers([user])[0];

    res.cookie("token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    return res.json({ ...formattedUser, token: accessToken });
  } catch (error) {
    next(error);
  }
}
