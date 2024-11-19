import { getReleaseById } from "../../models/Releases.js";

export async function getReleaseByIdController(req, res, next) {
  const id = req.params.id;

  console.log("id", id);

  try {
    const user = await getReleaseById(id);

    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: "Release not found" });
    }
  } catch (error) {
    next(error);
  }
}
