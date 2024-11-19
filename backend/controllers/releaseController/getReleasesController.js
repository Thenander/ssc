import { getReleasesFromDB } from "../../models/Releases.js";

export async function getReleasesController(req, res, next) {
  const id = req.params.id;

  console.log("id", id);

  try {
    const releases = await getReleasesFromDB();
    if (releases) {
      res.json(releases);
    } else {
      res.status(404).json({ error: "No releases found" });
    }
  } catch (error) {
    next(error);
  }
}
