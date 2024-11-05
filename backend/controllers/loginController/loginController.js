import { getUserByUsernameDB } from "../../models/Login.js";
import bcrypt from "bcrypt";
import { createToken } from "../../JWT.js";

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
    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    return res.json({ message: "Logged in!", "access-token": accessToken });
  } catch (error) {
    next(error);
  }
}
