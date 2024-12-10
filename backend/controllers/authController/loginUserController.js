import { getUserByUsernameDB } from "../../models/Auth.js";
import bcrypt from "bcrypt";
import { createToken } from "../../JWT.js";
import { formatUsers } from "../helperFunctions.js";

export async function loginUserController(req, res, next) {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json("Username missing!");
  }

  if (!password) {
    return res.status(400).json("Password missing!");
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

    return res.status(200).json({
      ...formattedUser,
      message: "Logged in!",
      data: {
        accessToken,
      },
    });

    // return res.json({ ...formattedUser, token });
  } catch (error) {
    next(error);
  }
}
