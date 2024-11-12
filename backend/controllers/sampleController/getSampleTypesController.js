import { getSampleTypesFromDB } from "../../models/Samples.js";
import { formatTypes } from "../helperFunctions.js";

export async function getSampleTypesController(req, res, next) {
  try {
    const types = await getSampleTypesFromDB();
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
