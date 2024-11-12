import { getReleaseTypesFromDB } from "../../models/Releases.js";
import { formatTypes } from "../helperFunctions.js";

export async function getReleaseTypesController(req, res, next) {
  try {
    const types = await getReleaseTypesFromDB();
    if (types) {
      const formattedTypes = formatTypes(types);
      res.json(formattedTypes);
    } else {
      res.status(404).json({ error: "No types found" });
    }
  } catch (error) {
    next(error);
  }
}
