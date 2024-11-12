import { getReleaseTypesFromDB } from "../../models/Releases.js";

export async function getFormatTypesController(req, res, next) {
  try {
    const formats = await getReleaseTypesFromDB();
    if (formats) {
      res.json(formats);
    } else {
      res.status(404).json({ error: "No formats found" });
    }
  } catch (error) {
    next(error);
  }
}
