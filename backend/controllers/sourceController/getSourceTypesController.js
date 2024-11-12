import { getSourceTypesFromDB } from "../../models/Sources.js";
import { formatTypes } from "../helperFunctions.js";

export async function getSourceTypesController(req, res, next) {
  try {
    const types = await getSourceTypesFromDB();
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
